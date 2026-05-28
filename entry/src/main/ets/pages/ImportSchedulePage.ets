import { scheduleParser, ParsedCourse } from '../controller/ScheduleParser';
import { scheduleController } from '../controller/ScheduleController';
import { Course } from '../model/Course';
import { router } from '@kit.ArkUI';
import { ThemeColors } from '../common/theme/ThemeColors';

@Entry
@Component
struct ImportSchedulePage {
  @State inputText: string = '';
  @State resultSuccess: boolean = false;
  @State resultCourseCount: number = 0;
  @State resultMessage: string = '';
  @State resultCourses: ParsedCourse[] = [];
  @State showResult: boolean = false;
  @StorageLink('themeIndex') themeIndex: number = 0;

  private t(): ThemeColors { return ThemeColors.getTheme(this.themeIndex); }

  build() {
    Column() {
      this.TitleBar()
      Scroll() {
        Column() {
          this.Instruction()
          this.InputArea()
          this.ParseButton()
          if (this.showResult) { this.ResultArea() }
        }.padding(16)
      }.layoutWeight(1)
    }
    .width('100%').height('100%').backgroundColor(this.t().bg)
    .animation({ duration: 200 })
  }

  @Builder TitleBar() {
    Row() {
      Text('导入课表').fontSize(20).fontWeight(FontWeight.Bold).fontColor(this.t().text)
      Blank()
      Button('返回').fontSize(14).type(ButtonType.Capsule)
        .backgroundColor(this.t().border).fontColor(this.t().textSecondary)
        .onClick(() => { router.back() })
    }
    .width('100%').height(56).padding({ left: 16, right: 16 }).backgroundColor(this.t().card)
  }

  @Builder Instruction() {
    Column() {
      Text('如何导入课表').fontSize(15).fontWeight(FontWeight.Medium).fontColor(this.t().text)
        .alignSelf(ItemAlign.Start)
      Text('1. 用手机拍下课表照片，用文字识别工具提取文字\n2. 将提取的文字粘贴到下方输入框\n3. 或者手动按格式输入')
        .fontSize(12).fontColor(this.t().textHint).lineHeight(18).margin({ top: 6 })
        .alignSelf(ItemAlign.Start)
      Text('格式示例：\n高等数学 教师:张三 教室:A201 周一 第1-2节')
        .fontSize(11).fontColor(this.t().primary).lineHeight(18).margin({ top: 8 })
        .alignSelf(ItemAlign.Start)
    }
    .width('100%').backgroundColor(this.t().primaryLight).borderRadius(12)
    .padding(14).margin({ bottom: 16 })
  }

  @Builder InputArea() {
    Column() {
      Text('粘贴课表文字').fontSize(13).fontColor(this.t().textSecondary)
        .alignSelf(ItemAlign.Start).margin({ bottom: 8 })
      TextArea({ placeholder: '在此粘贴课表文字内容...' })
        .width('100%').height(200).fontSize(14).borderRadius(10)
        .backgroundColor(this.t().inputBg)
        .onChange((value: string) => { this.inputText = value })
    }.width('100%').margin({ bottom: 16 })
  }

  @Builder ParseButton() {
    Button('解析课表')
      .width('100%').height(48).fontSize(16).fontWeight(FontWeight.Medium)
      .fontColor('#FFFFFF')
      .backgroundColor(this.inputText.length > 0 ? this.t().primary : this.t().border)
      .borderRadius(12)
      .enabled(this.inputText.length > 0)
      .onClick(() => { this.parseSchedule() })
      .margin({ bottom: 20 })
  }

  @Builder ResultArea() {
    Column() {
      Text(this.resultMessage)
        .fontSize(15).fontWeight(FontWeight.Medium)
        .fontColor(this.resultSuccess ? this.t().success : this.t().warning)
        .margin({ bottom: 12 })

      ForEach(this.resultCourses, (c: ParsedCourse, index: number) => {
        Row() {
          Column() {
            Text(c.name).fontSize(14).fontWeight(FontWeight.Medium).fontColor(this.t().text)
            Text(this.formatDaySlot(c.dayOfWeek, c.startSlot, c.endSlot))
              .fontSize(11).fontColor(this.t().textHint).margin({ top: 2 })
          }
          .alignItems(HorizontalAlign.Start).layoutWeight(1)
          Checkbox().select(true)
        }
        .width('100%').borderRadius(10).backgroundColor(this.t().card)
        .padding(12).margin({ bottom: 8 })
      })

      Button('全部添加到课表')
        .width('100%').height(44).fontSize(15).fontColor('#FFFFFF')
        .backgroundColor(this.t().success).borderRadius(12).margin({ top: 8 })
        .onClick(() => { this.importAll() })
    }.width('100%')
  }

  private parseSchedule(): void {
    const result = scheduleParser.parseRawText(this.inputText);
    this.resultSuccess = result.success;
    this.resultCourses = result.courses;
    this.showResult = true;
    const cn = this.resultCourses.length.toString();
    if (result.success) this.resultMessage = '识别到 ' + cn + ' 门课程';
    else this.resultMessage = '未完全识别 (' + cn + ' 条推测)';
  }

  private importAll(): void {
    const colors: string[] = ['#4A90D9', '#E8A838', '#34C759', '#FF3B30', '#AF52DE',
                               '#FF9500', '#007AFF', '#FF2D55', '#5856D6', '#0A84FF'];
    const courses = this.resultCourses;
    for (let i = 0; i < courses.length; i++) {
      const c = courses[i];
      const course = new Course();
      course.name = c.name; course.teacher = c.teacher; course.location = c.location;
      course.dayOfWeek = c.dayOfWeek; course.startSlot = c.startSlot; course.endSlot = c.endSlot;
      course.color = colors[i % colors.length];
      scheduleController.addCourse(course);
    }
    router.back();
  }

  private formatDaySlot(dayOfWeek: number, start: number, end: number): string {
    const dayNames: string[] = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
    const day: string = dayOfWeek >= 0 && dayOfWeek < 7 ? dayNames[dayOfWeek] : '';
    return day + ' 第' + start.toString() + '-' + end.toString() + '节';
  }
}
