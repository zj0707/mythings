export class ParsedCourse {
  name: string = '';
  teacher: string = '';
  location: string = '';
  dayOfWeek: number = 0;
  startSlot: number = 0;
  endSlot: number = 0;
}

export class TimeSlot {
  dayOfWeek: number = 0;
  startSlot: number = 0;
  endSlot: number = 0;
}

export class SlotRange {
  start: number = 0;
  end: number = 0;
}

export class ScheduleParseResult {
  success: boolean = false;
  courses: ParsedCourse[] = [];
  rawText: string = '';
  errorMessage: string = '';
}

export class ScheduleParser {
  lastResult: ScheduleParseResult | null = null;

  parseRawText(rawText: string): ScheduleParseResult {
    const result = new ScheduleParseResult();
    result.rawText = rawText;

    if (rawText.length === 0) {
      result.errorMessage = '未识别到文字';
      return result;
    }

    const lines = this.splitLines(rawText);
    const parsedCourses: ParsedCourse[] = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (line.length === 0) continue;

      const course = this.tryParseLine(line);
      if (course !== null) {
        parsedCourses.push(course);
      }
    }

    if (parsedCourses.length === 0) {
      result.errorMessage = '未识别到课程信息，请检查课表格式或手动输入';
      result.courses = this.generateGuessFromLines(lines);
    } else {
      result.courses = parsedCourses;
      result.success = true;
    }

    this.lastResult = result;
    return result;
  }

  private splitLines(text: string): string[] {
    const result: string[] = [];
    let current = '';
    for (let i = 0; i < text.length; i++) {
      const ch = text.charAt(i);
      if (ch === '\n' || ch === '\r') {
        if (current.length > 0) {
          result.push(current);
          current = '';
        }
      } else {
        current += ch;
      }
    }
    if (current.length > 0) result.push(current);
    return result;
  }

  private tryParseLine(line: string): ParsedCourse | null {
    const name = this.extractName(line);
    if (name === '') return null;

    const teacher = this.extractTeacher(line);
    const location = this.extractLocation(line);
    const ts = this.extractTime(line);

    if (ts.dayOfWeek < 0) return null;

    const pc = new ParsedCourse();
    pc.name = name;
    pc.teacher = teacher;
    pc.location = location;
    pc.dayOfWeek = ts.dayOfWeek;
    pc.startSlot = ts.startSlot;
    pc.endSlot = ts.endSlot;
    return pc;
  }

  private extractName(line: string): string {
    const patterns: string[] = [
      '高等数学', '线性代数', '概率论', '离散数学',
      '大学英语', '大学物理', 'C语言', 'Java', 'Python',
      '数据结构', '操作系统', '计算机网络', '数据库',
      '马克思主义', '毛泽东', '思想道德', '形势与政策',
      '体育', '军事理论', '心理健康', '职业生涯',
      '电路', '模电', '数电', '信号', '通信',
      '微积分', '力学', '热学', '电磁学', '光学',
      '算法', '编译原理', '软件工程', '人工智能'
    ];

    for (let i = 0; i < patterns.length; i++) {
      if (line.indexOf(patterns[i]) >= 0) {
        return patterns[i];
      }
    }

    const colonIdx = line.indexOf(':');
    if (colonIdx >= 0) {
      return line.substring(0, colonIdx).trim();
    }
    const spaceIdx = line.indexOf(' ');
    if (spaceIdx > 0 && spaceIdx < 20) {
      return line.substring(0, spaceIdx).trim();
    }

    return '';
  }

  private extractTeacher(line: string): string {
    const teacherPatterns: string[] = ['教师:', '老师:', '教师：', '老师：'];
    for (let i = 0; i < teacherPatterns.length; i++) {
      const idx = line.indexOf(teacherPatterns[i]);
      if (idx >= 0) {
        const after = line.substring(idx + teacherPatterns[i].length);
        const spaceIdx = after.indexOf(' ');
        if (spaceIdx > 0) return after.substring(0, spaceIdx);
        return after;
      }
    }
    return '';
  }

  private extractLocation(line: string): string {
    const locPatterns: string[] = ['教室:', '地点:', '教室：', '地点：'];
    for (let i = 0; i < locPatterns.length; i++) {
      const idx = line.indexOf(locPatterns[i]);
      if (idx >= 0) {
        const after = line.substring(idx + locPatterns[i].length);
        const spaceIdx = after.indexOf(' ');
        if (spaceIdx > 0) return after.substring(0, spaceIdx);
        return after;
      }
    }

    const bm = this.matchBuilding(line);
    if (bm !== '') return bm;

    return '';
  }

  private matchBuilding(text: string): string {
    const patterns: string[] = ['教', '楼', '室', '堂', '馆'];
    for (let i = 0; i < patterns.length; i++) {
      const idx = text.indexOf(patterns[i]);
      if (idx > 0) {
        const start = Math.max(0, idx - 10);
        const end = Math.min(text.length, idx + 10);
        return text.substring(start, end).trim();
      }
    }
    return '';
  }

  private extractTime(line: string): TimeSlot {
    const dayNames: string[] = ['周一', '周二', '周三', '周四', '周五', '周六', '周日',
                                 '星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'];
    let dayOfWeek = -1;

    for (let i = 0; i < dayNames.length; i++) {
      if (line.indexOf(dayNames[i]) >= 0) {
        dayOfWeek = i % 7;
        break;
      }
    }

    const ts = new TimeSlot();
    if (dayOfWeek < 0) {
      ts.dayOfWeek = -1;
      ts.startSlot = 0;
      ts.endSlot = 0;
      return ts;
    }

    ts.dayOfWeek = dayOfWeek;
    ts.startSlot = 1;
    ts.endSlot = 2;

    const sr = this.matchSlots(line);
    if (sr.start > 0) {
      ts.startSlot = sr.start;
      ts.endSlot = sr.end;
    }

    return ts;
  }

  private matchSlots(line: string): SlotRange {
    const sr = new SlotRange();
    sr.start = 0;
    sr.end = 0;

    for (let end = 13; end >= 1; end--) {
      for (let start = 1; start < end; start++) {
        const pat = '第' + start.toString() + '-' + end.toString() + '节';
        if (line.indexOf(pat) >= 0) {
          sr.start = start;
          sr.end = end;
          return sr;
        }
        const pat2 = start.toString() + '-' + end.toString() + '节';
        if (line.indexOf(pat2) >= 0) {
          sr.start = start;
          sr.end = end;
          return sr;
        }
      }
    }
    return sr;
  }

  private generateGuessFromLines(lines: string[]): ParsedCourse[] {
    const result: ParsedCourse[] = [];
    const dayNames: string[] = ['周一', '周二', '周三', '周四', '周五'];

    let currentDay = -1;
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (line.length === 0) continue;

      for (let d = 0; d < dayNames.length; d++) {
        if (line.indexOf(dayNames[d]) >= 0) {
          currentDay = d;
          break;
        }
      }

      if (currentDay >= 0 && line.length > 2 && line !== dayNames[currentDay]) {
        const pc = new ParsedCourse();
        pc.name = line.substring(0, Math.min(15, line.length));
        pc.teacher = '';
        pc.location = '';
        pc.dayOfWeek = currentDay;
        pc.startSlot = 1;
        pc.endSlot = 2;
        result.push(pc);
      }
    }
    return result;
  }
}

export const scheduleParser = new ScheduleParser();
