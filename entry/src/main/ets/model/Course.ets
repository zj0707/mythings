export class Course {
  id: number = 0;
  name: string = '';
  teacher: string = '';
  location: string = '';
  dayOfWeek: number = 0;
  startSlot: number = 0;
  endSlot: number = 0;
  color: string = '#4A90D9';
  weekType: number = 0;

  static from(data: Course): Course {
    const c = new Course();
    c.id = data.id;
    c.name = data.name;
    c.teacher = data.teacher;
    c.location = data.location;
    c.dayOfWeek = data.dayOfWeek;
    c.startSlot = data.startSlot;
    c.endSlot = data.endSlot;
    c.color = data.color || '#4A90D9';
    c.weekType = data.weekType;
    return c;
  }

  getTimeSpan(): string {
    return `第${this.startSlot}-${this.endSlot}节`;
  }
}
