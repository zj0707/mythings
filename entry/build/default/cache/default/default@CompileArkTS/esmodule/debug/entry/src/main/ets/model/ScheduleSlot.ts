export class ScheduleSlot {
    dayOfWeek: number = 0;
    startSlot: number = 0;
    endSlot: number = 0;
    title: string = '';
    type: number = 0;
    homeworkId: number = -1;
    courseName: string = '';
    location: string = '';
    color: string = '#4A90D9';
    isRest: boolean = false;
}
export enum ScheduleSlotType {
    COURSE = 0,
    HOMEWORK = 1,
    REST = 2
}
export class WeeklyPlan {
    weekStart: number = 0;
    slots: ScheduleSlot[] = [];
    generatedAt: number = Date.now();
}
