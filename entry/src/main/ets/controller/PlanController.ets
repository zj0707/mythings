import { ScheduleSlot, ScheduleSlotType, WeeklyPlan } from '../model/ScheduleSlot';
import { Homework } from '../model/Homework';
import { Course } from '../model/Course';
import { StudentProfile } from '../model/StudentProfile';
import { scheduleController } from './ScheduleController';
import { homeworkController } from './HomeworkController';
import { CommonConstants } from '../common/constants/CommonConstants';
import { Logger } from '../common/utils/Logger';

@Observed
export class PlanController {
  @Track currentPlan: WeeklyPlan = new WeeklyPlan();
  @Track profile: StudentProfile = StudentProfile.getDefault();
  @Track isGenerating: boolean = false;
  @Track optimizationScore: number = 0;

  generatePlan(): WeeklyPlan {
    this.isGenerating = true;
    Logger.info('Generating optimized weekly plan...');

    const plan = new WeeklyPlan();
    plan.weekStart = this.getWeekStart();
    plan.slots = [];

    const allHw = homeworkController.sortByPriority();
    let totalScore = 0;

    for (let day = 0; day < CommonConstants.WEEKDAYS.length; day++) {
      const isWeekend = (day >= 5);
      const courses = scheduleController.getCoursesForDay(day);
      const maxDailySlots = isWeekend ? this.profile.maxStudyHoursPerDay * 2 :
                                         this.profile.maxStudyHoursPerDay;

      plan.slots = plan.slots.concat(this.fillDayWithCourses(courses));

      const occupiedArr: number[] = this.getOccupiedSlotsArr(day, courses);
      const availableSlots = this.getAvailableSlotsSmart(day, occupiedArr);

      const unassigned: Homework[] = [];
      for (let i = 0; i < allHw.length; i++) {
        if (!this.isHomeworkInSlots(allHw[i], plan.slots)) {
          unassigned.push(allHw[i]);
        }
      }

      const ordered = this.optimizeOrder(unassigned, day);
      const dayPlan = this.assignHomeworkToSlots(availableSlots, ordered, day);

      let daySlotsCount = 0;
      for (let i = 0; i < dayPlan.length; i++) {
        daySlotsCount += (dayPlan[i].endSlot - dayPlan[i].startSlot);
        plan.slots.push(dayPlan[i]);
      }

      const dayHours = daySlotsCount * CommonConstants.SLOT_DURATION_MINUTES / 60;
      if (dayHours > maxDailySlots) {
        totalScore -= (dayHours - maxDailySlots) * 10;
      } else {
        totalScore += dayHours * 5;
      }
    }

    this.addRestSlots(plan);
    this.currentPlan = plan;
    this.optimizationScore = totalScore;
    this.isGenerating = false;
    Logger.info(`Plan generated, score: ${totalScore}`);
    return plan;
  }

  private getWeekStart(): number {
    const now = new Date();
    const day = now.getDay();
    const diff = day === 0 ? 6 : day - 1;
    const monday = new Date(now.getTime() - diff * 24 * 60 * 60 * 1000);
    monday.setHours(0, 0, 0, 0);
    return monday.getTime();
  }

  private getOccupiedSlotsArr(day: number, courses: Course[]): number[] {
    const result: number[] = [];
    for (let i = 0; i < courses.length; i++) {
      const c = courses[i];
      for (let s = c.startSlot; s < c.endSlot; s++) {
        const key = day * CommonConstants.COURSE_SLOT_COUNT + s;
        if (result.indexOf(key) < 0) {
          result.push(key);
        }
      }
    }
    return result;
  }

  private getAvailableSlotsSmart(day: number, occupied: number[]): number[] {
    const available: number[] = [];
    const totalSlots = CommonConstants.COURSE_SLOT_COUNT;
    const isWeekend = (day >= 5);

    const restStartSlot = this.hourToSlot(this.profile.restStartHour);
    const restEndSlot = this.hourToSlot(this.profile.restEndHour);

    for (let slot = 0; slot < totalSlots; slot++) {
      const key = day * CommonConstants.COURSE_SLOT_COUNT + slot;
      if (occupied.indexOf(key) >= 0) continue;

      const hour = CommonConstants.FIRST_SLOT_TIME + Math.floor(slot * 0.75);
      if (this.profile.isRestTime(hour)) continue;

      if (isWeekend && slot < 4) continue;

      available.push(slot);
    }
    return available;
  }

  private hourToSlot(hour: number): number {
    return Math.max(0, hour - CommonConstants.FIRST_SLOT_TIME);
  }

  private optimizeOrder(hwList: Homework[], day: number): Homework[] {
    const sorted = hwList.slice();
    sorted.sort((a: Homework, b: Homework) => {
      const urgencyA = Math.max(0, 168 - a.getRemainingHours()) * 10;
      const urgencyB = Math.max(0, 168 - b.getRemainingHours()) * 10;
      const scoreA = urgencyA + a.priority * 50 + a.estimatedMinutes * 0.1;
      const scoreB = urgencyB + b.priority * 50 + b.estimatedMinutes * 0.1;
      return scoreB - scoreA;
    });
    return sorted;
  }

  private fillDayWithCourses(courses: Course[]): ScheduleSlot[] {
    const result: ScheduleSlot[] = [];
    for (let i = 0; i < courses.length; i++) {
      const c = courses[i];
      const slot = new ScheduleSlot();
      slot.dayOfWeek = c.dayOfWeek;
      slot.startSlot = c.startSlot;
      slot.endSlot = c.endSlot;
      slot.title = c.name;
      slot.type = ScheduleSlotType.COURSE;
      slot.courseName = c.name;
      slot.location = c.location;
      slot.color = c.color;
      result.push(slot);
    }
    return result;
  }

  private assignHomeworkToSlots(available: number[], hwList: Homework[], day: number): ScheduleSlot[] {
    const result: ScheduleSlot[] = [];
    if (available.length === 0 || hwList.length === 0) return result;

    const slotMinutes = CommonConstants.SLOT_DURATION_MINUTES;
    let hwIndex = 0;
    let slotIndex = 0;

    while (hwIndex < hwList.length && slotIndex < available.length) {
      const hw = hwList[hwIndex];
      const remainingMin = hw.estimatedMinutes - hw.actualMinutes;
      if (remainingMin <= 0) {
        hwIndex++;
        continue;
      }

      const neededSlots = Math.ceil(remainingMin / slotMinutes);
      const canFit = this.canFitConsecutive(available, slotIndex, neededSlots);
      let actualSlots = neededSlots;
      if (!canFit) {
        actualSlots = this.maxConsecutive(available, slotIndex);
        if (actualSlots < 1) actualSlots = 1;
      }

      const taskMin = actualSlots * slotMinutes;

      const studySlot = new ScheduleSlot();
      studySlot.dayOfWeek = day;
      studySlot.startSlot = available[slotIndex];
      studySlot.endSlot = available[slotIndex] + actualSlots;
      studySlot.title = `${hw.title} (预计${taskMin}分钟)`;
      studySlot.type = ScheduleSlotType.HOMEWORK;
      studySlot.homeworkId = hw.id;
      studySlot.courseName = hw.courseName;
      studySlot.color = this.deadlineColor(hw);
      result.push(studySlot);

      const breakSlots = Math.max(1, Math.ceil(this.profile.breakMinutes / slotMinutes));
      slotIndex += actualSlots + breakSlots;
      hwIndex++;
    }
    return result;
  }

  private deadlineColor(hw: Homework): string {
    if (hw.isOverdue()) return '#FF3B30';
    if (hw.isUrgent()) return '#FF9500';
    if (hw.getRemainingHours() < 48) return '#E8A838';
    return '#34C759';
  }

  private canFitConsecutive(available: number[], start: number, needed: number): boolean {
    if (start + needed > available.length) return false;
    for (let i = 1; i < needed; i++) {
      if (available[start + i] !== available[start] + i) return false;
    }
    return true;
  }

  private maxConsecutive(available: number[], start: number): number {
    let count = 1;
    for (let i = start + 1; i < available.length; i++) {
      if (available[i] === available[start] + count) { count++; }
      else { break; }
    }
    return count;
  }

  private isHomeworkInSlots(hw: Homework, slots: ScheduleSlot[]): boolean {
    for (let i = 0; i < slots.length; i++) {
      if (slots[i].type === ScheduleSlotType.HOMEWORK && slots[i].homeworkId === hw.id) {
        return true;
      }
    }
    return false;
  }

  private addRestSlots(plan: WeeklyPlan): void {
    for (let day = 0; day < CommonConstants.WEEKDAYS.length; day++) {
      const existing = this.slotsForDay(plan, day);
      const totalSlots = CommonConstants.COURSE_SLOT_COUNT;

      for (let slot = 0; slot < totalSlots; slot++) {
        const hour = CommonConstants.FIRST_SLOT_TIME + Math.floor(slot * 0.75);
        if (!this.profile.isRestTime(hour)) continue;

        let isOccupied = false;
        for (let i = 0; i < existing.length; i++) {
          if (slot >= existing[i].startSlot && slot < existing[i].endSlot) {
            isOccupied = true;
            break;
          }
        }
        if (!isOccupied) {
          const rest = new ScheduleSlot();
          rest.dayOfWeek = day;
          rest.startSlot = slot;
          rest.endSlot = slot + 2;
          rest.title = '休息时间';
          rest.type = ScheduleSlotType.REST;
          rest.color = '#8E8E93';
          rest.isRest = true;
          plan.slots.push(rest);
        }
      }
    }
  }

  private slotsForDay(plan: WeeklyPlan, day: number): ScheduleSlot[] {
    const result: ScheduleSlot[] = [];
    for (let i = 0; i < plan.slots.length; i++) {
      if (plan.slots[i].dayOfWeek === day) result.push(plan.slots[i]);
    }
    return result;
  }

  getPlanForDay(day: number): ScheduleSlot[] {
    const all = this.currentPlan.slots;
    const result: ScheduleSlot[] = [];
    for (let i = 0; i < all.length; i++) {
      if (all[i].dayOfWeek === day) result.push(all[i]);
    }
    result.sort((a: ScheduleSlot, b: ScheduleSlot) => a.startSlot - b.startSlot);
    return result;
  }

  getTotalStudyHours(day: number): number {
    let totalSlots = 0;
    const daySlots = this.getPlanForDay(day);
    for (let i = 0; i < daySlots.length; i++) {
      if (daySlots[i].type === ScheduleSlotType.HOMEWORK) {
        totalSlots += (daySlots[i].endSlot - daySlots[i].startSlot);
      }
    }
    return (totalSlots * CommonConstants.SLOT_DURATION_MINUTES) / 60;
  }

  getOverloadStatus(): string {
    const score = this.optimizationScore;
    if (score > 100) return '优秀：计划安排合理';
    if (score > 0) return '良好：基本可完成';
    if (score > -50) return '注意：时间较紧';
    return '警告：可能无法完成所有任务';
  }
}

export const planController = new PlanController();
