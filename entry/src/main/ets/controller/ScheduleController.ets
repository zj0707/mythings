import { Course } from '../model/Course';
import { CommonConstants } from '../common/constants/CommonConstants';
import { Logger } from '../common/utils/Logger';

export interface DayScheduleInfo {
  day: number;
  name: string;
  courses: Course[];
}

@Observed
export class ScheduleController {
  @Track courses: Course[] = [];
  @Track selectedDay: number = 0;

  private nextId(): number {
    let maxId = 0;
    for (let i = 0; i < this.courses.length; i++) {
      if (this.courses[i].id > maxId) {
        maxId = this.courses[i].id;
      }
    }
    return maxId + 1;
  }

  addCourse(course: Course): void {
    course.id = this.nextId();
    this.courses.push(course);
    Logger.info(`Course added: ${course.name}`);
  }

  removeCourse(id: number): void {
    for (let i = 0; i < this.courses.length; i++) {
      if (this.courses[i].id === id) {
        this.courses.splice(i, 1);
        Logger.info(`Course removed: ${id}`);
        return;
      }
    }
  }

  updateCourse(course: Course): void {
    for (let i = 0; i < this.courses.length; i++) {
      if (this.courses[i].id === course.id) {
        this.courses[i] = Course.from(course);
        Logger.info(`Course updated: ${course.name}`);
        return;
      }
    }
  }

  getCoursesForDay(day: number): Course[] {
    const result: Course[] = [];
    for (let i = 0; i < this.courses.length; i++) {
      if (this.courses[i].dayOfWeek === day) {
        result.push(this.courses[i]);
      }
    }
    result.sort((a: Course, b: Course) => a.startSlot - b.startSlot);
    return result;
  }

  getAllDays(): DayScheduleInfo[] {
    const result: DayScheduleInfo[] = [];
    for (let i = 0; i < CommonConstants.WEEKDAYS.length; i++) {
      const info: DayScheduleInfo = {
        day: i,
        name: CommonConstants.WEEKDAYS[i],
        courses: this.getCoursesForDay(i)
      };
      result.push(info);
    }
    return result;
  }

  isTimeBusy(day: number, startSlot: number, endSlot: number): boolean {
    for (let i = 0; i < this.courses.length; i++) {
      const c = this.courses[i];
      if (c.dayOfWeek !== day) continue;
      const overlap = (startSlot >= c.startSlot && startSlot < c.endSlot) ||
                      (endSlot > c.startSlot && endSlot <= c.endSlot) ||
                      (startSlot <= c.startSlot && endSlot >= c.endSlot);
      if (overlap) return true;
    }
    return false;
  }

  getCoursesByTimeRange(day: number, startSlot: number, endSlot: number): Course[] {
    const result: Course[] = [];
    for (let i = 0; i < this.courses.length; i++) {
      const c = this.courses[i];
      if (c.dayOfWeek === day && c.startSlot >= startSlot && c.endSlot <= endSlot) {
        result.push(c);
      }
    }
    return result;
  }
}

export const scheduleController = new ScheduleController();
