export class StudentProfile {
    restStartHour: number = 22;
    restEndHour: number = 7;
    maxStudyHoursPerDay: number = 6;
    preferredSlotDuration: number = 45;
    breakMinutes: number = 10;
    studyIntensity: number = 3;
    maxContinuousMinutes: number = 90;
    static getDefault(): StudentProfile {
        return new StudentProfile();
    }
    isRestTime(hour: number): boolean {
        if (this.restEndHour < this.restStartHour) {
            return hour >= this.restStartHour || hour < this.restEndHour;
        }
        return hour >= this.restStartHour && hour < 24;
    }
    getAvailableSlotsForDay(day: number, courseCount: number): number {
        return 14;
    }
}
