import { Homework } from '../model/Homework';
import { Logger } from '../common/utils/Logger';

@Observed
export class HomeworkController {
  @Track homeworks: Homework[] = [];
  private nextId: number = 1;

  private indexOfId(id: number): number {
    for (let i = 0; i < this.homeworks.length; i++) {
      if (this.homeworks[i].id === id) return i;
    }
    return -1;
  }

  private findByIndex(idx: number): Homework | null {
    if (idx >= 0 && idx < this.homeworks.length) return this.homeworks[idx];
    return null;
  }

  addHomework(homework: Homework): void {
    homework.id = this.nextId;
    this.nextId = this.nextId + 1;
    homework.createdAt = Date.now();
    this.homeworks.push(homework);
    Logger.info(`Homework added: ${homework.title}`);
  }

  removeHomework(id: number): void {
    const idx = this.indexOfId(id);
    if (idx >= 0) {
      this.homeworks.splice(idx, 1);
      Logger.info(`Homework removed: ${id}`);
    }
  }

  updateHomework(homework: Homework): void {
    const idx = this.indexOfId(homework.id);
    if (idx >= 0) {
      this.homeworks[idx] = Homework.from(homework);
      Logger.info(`Homework updated: ${homework.title}`);
    }
  }

  toggleComplete(id: number): void {
    const hw = this.findByIndex(this.indexOfId(id));
    if (hw !== null) {
      hw.completed = !hw.completed;
      if (hw.completed) {
        hw.actualMinutes = hw.estimatedMinutes;
      }
    }
  }

  getIncompleteHomeworks(): Homework[] {
    const result: Homework[] = [];
    for (let i = 0; i < this.homeworks.length; i++) {
      if (!this.homeworks[i].completed) {
        result.push(this.homeworks[i]);
      }
    }
    result.sort((a: Homework, b: Homework) => a.deadline - b.deadline);
    return result;
  }

  getOverdueHomeworks(): Homework[] {
    const result: Homework[] = [];
    for (let i = 0; i < this.homeworks.length; i++) {
      if (this.homeworks[i].isOverdue()) {
        result.push(this.homeworks[i]);
      }
    }
    return result;
  }

  getUrgentHomeworks(): Homework[] {
    const result: Homework[] = [];
    for (let i = 0; i < this.homeworks.length; i++) {
      if (this.homeworks[i].isUrgent()) {
        result.push(this.homeworks[i]);
      }
    }
    return result;
  }

  getTotalRemainingMinutes(): number {
    let sum: number = 0;
    const list = this.getIncompleteHomeworks();
    for (let i = 0; i < list.length; i++) {
      sum += list[i].estimatedMinutes - list[i].actualMinutes;
    }
    return sum;
  }

  sortByPriority(): Homework[] {
    const sorted = this.getIncompleteHomeworks().slice();
    sorted.sort((a: Homework, b: Homework) => {
      const scoreA = a.priority * 1000 + (1 / (a.getRemainingHours() + 1)) * 100;
      const scoreB = b.priority * 1000 + (1 / (b.getRemainingHours() + 1)) * 100;
      return scoreB - scoreA;
    });
    return sorted;
  }
}

export const homeworkController = new HomeworkController();
