export class Homework {
    id: number = 0;
    title: string = '';
    courseName: string = '';
    description: string = '';
    estimatedMinutes: number = 0;
    deadline: number = 0;
    completed: boolean = false;
    actualMinutes: number = 0;
    priority: number = 0;
    createdAt: number = Date.now();
    static from(data: Homework): Homework {
        const h = new Homework();
        h.id = data.id;
        h.title = data.title;
        h.courseName = data.courseName;
        h.description = data.description;
        h.estimatedMinutes = data.estimatedMinutes;
        h.deadline = data.deadline;
        h.completed = data.completed;
        h.actualMinutes = data.actualMinutes;
        h.priority = data.priority;
        h.createdAt = data.createdAt || Date.now();
        return h;
    }
    getRemainingHours(): number {
        if (this.completed)
            return 0;
        const remaining = this.deadline - Date.now();
        return Math.max(0, remaining / (1000 * 60 * 60));
    }
    isUrgent(): boolean {
        return this.getRemainingHours() < 24 && !this.completed;
    }
    isOverdue(): boolean {
        return Date.now() > this.deadline && !this.completed;
    }
}
