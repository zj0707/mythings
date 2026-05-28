import { Homework } from '../model/Homework';
import { homeworkController } from '../controller/HomeworkController';
import { router } from '@kit.ArkUI';
import { ThemeColors } from '../common/theme/ThemeColors';

@Entry
@Component
struct InputHomeworkPage {
  @State title: string = '';
  @State courseName: string = '';
  @State estimatedHoursStr: string = '1';
  @State estimatedMinutesStr: string = '0';
  @State deadlineDateStr: string = '';
  @State deadlineTimeStr: string = '20:00';
  @State priority: number = 0;
  @State description: string = '';
  @State errorMessage: string = '';
  @StorageLink('themeIndex') themeIndex: number = 0;

  private t(): ThemeColors { return ThemeColors.getTheme(this.themeIndex); }

  aboutToAppear(): void {
    const now = new Date();
    const dl = new Date(now.getTime() + 24 * 60 * 60 * 1000);
    const m = dl.getMonth() + 1;
    const d = dl.getDate();
    this.deadlineDateStr = dl.getFullYear().toString() + '-' +
      (m < 10 ? '0' : '') + m.toString() + '-' + (d < 10 ? '0' : '') + d.toString();
  }

  build() {
    Column() {
      this.TitleBar()
      Scroll() {
        Column() {
          this.TitleField()
          this.CourseNameField()
          this.TimeEstimateField()
          this.DeadlineField()
          this.PriorityRow()
          this.DescriptionField()
          if (this.errorMessage.length > 0) { this.ErrorBanner() }
          this.SubmitButton()
        }.padding(16)
      }.layoutWeight(1)
    }
    .width('100%').height('100%')
    .backgroundColor(this.t().bg)
    .animation({ duration: 200 })
  }

  @Builder TitleBar() {
    Row() {
      Text('添加作业')
        .fontSize(20).fontWeight(FontWeight.Bold).fontColor(this.t().text)
      Blank()
      Button('取消').fontSize(14).type(ButtonType.Capsule)
        .backgroundColor(this.t().border).fontColor(this.t().textSecondary)
        .onClick(() => { router.back() })
    }
    .width('100%').height(56).padding({ left: 16, right: 16 })
    .backgroundColor(this.t().card)
  }

  @Builder TitleField() {
    Column() {
      Text('作业标题 *').fontSize(13).fontColor(this.t().textSecondary)
        .alignSelf(ItemAlign.Start).margin({ bottom: 8 })
      TextInput({ placeholder: '输入作业名称' })
        .width('100%').height(48).fontSize(15).borderRadius(10)
        .backgroundColor(this.t().inputBg)
        .onChange((value: string) => { this.title = value })
    }.width('100%').margin({ bottom: 16 })
  }

  @Builder CourseNameField() {
    Column() {
      Text('所属课程').fontSize(13).fontColor(this.t().textSecondary)
        .alignSelf(ItemAlign.Start).margin({ bottom: 8 })
      TextInput({ placeholder: '输入课程名称' })
        .width('100%').height(48).fontSize(15).borderRadius(10)
        .backgroundColor(this.t().inputBg)
        .onChange((value: string) => { this.courseName = value })
    }.width('100%').margin({ bottom: 16 })
  }

  @Builder TimeEstimateField() {
    Column() {
      Text('预计完成时间 *').fontSize(13).fontColor(this.t().textSecondary)
        .alignSelf(ItemAlign.Start).margin({ bottom: 8 })
      Row() {
        TextInput({ placeholder: '小时' })
          .width('40%').height(48).fontSize(15).borderRadius(10)
          .backgroundColor(this.t().inputBg).type(InputType.Number)
          .onChange((value: string) => { this.estimatedHoursStr = value })
        Text('小时').fontSize(14).fontColor(this.t().textHint).margin({ left: 8, right: 16 })
        TextInput({ placeholder: '分钟' })
          .width('40%').height(48).fontSize(15).borderRadius(10)
          .backgroundColor(this.t().inputBg).type(InputType.Number)
          .onChange((value: string) => { this.estimatedMinutesStr = value })
        Text('分钟').fontSize(14).fontColor(this.t().textHint).margin({ left: 8 })
      }.width('100%')
    }.width('100%').margin({ bottom: 16 })
  }

  @Builder DeadlineField() {
    Column() {
      Text('截止时间 *').fontSize(13).fontColor(this.t().textSecondary)
        .alignSelf(ItemAlign.Start).margin({ bottom: 8 })
      Row() {
        TextInput({ placeholder: 'YYYY-MM-DD' })
          .width('50%').height(48).fontSize(15).borderRadius(10)
          .backgroundColor(this.t().inputBg)
          .onChange((value: string) => { this.deadlineDateStr = value })
        TextInput({ placeholder: 'HH:MM' })
          .width('35%').height(48).fontSize(15).borderRadius(10)
          .backgroundColor(this.t().inputBg).margin({ left: 8 })
          .onChange((value: string) => { this.deadlineTimeStr = value })
      }.width('100%')
    }.width('100%').margin({ bottom: 16 })
  }

  @Builder PriorityRow() {
    Column() {
      Text('优先级').fontSize(13).fontColor(this.t().textSecondary)
        .alignSelf(ItemAlign.Start).margin({ bottom: 8 })
      Row() {
        ForEach(['普通', '重要', '紧急'], (label: string, index: number) => {
          Text(label)
            .fontSize(13)
            .fontColor(this.priority === index ? '#FFFFFF' : this.t().textSecondary)
            .backgroundColor(this.priority === index ?
              (index === 2 ? this.t().danger : index === 1 ? this.t().warning : this.t().success) : this.t().border)
            .borderRadius(8)
            .padding({ left: 20, right: 20, top: 8, bottom: 8 })
            .margin({ right: index < 2 ? 8 : 0 })
            .onClick(() => { this.priority = index })
        })
      }.width('100%')
    }.width('100%').margin({ bottom: 16 })
  }

  @Builder DescriptionField() {
    Column() {
      Text('备注').fontSize(13).fontColor(this.t().textSecondary)
        .alignSelf(ItemAlign.Start).margin({ bottom: 8 })
      TextArea({ placeholder: '添加备注信息...' })
        .width('100%').height(80).fontSize(14).borderRadius(10)
        .backgroundColor(this.t().inputBg)
        .onChange((value: string) => { this.description = value })
    }.width('100%').margin({ bottom: 24 })
  }

  @Builder ErrorBanner() {
    Text(this.errorMessage).fontSize(12).fontColor(this.t().danger)
      .backgroundColor(this.t().dangerLight).borderRadius(8).padding(12)
      .width('100%').margin({ bottom: 12 })
  }

  @Builder SubmitButton() {
    Button('添加作业')
      .width('100%').height(52).fontSize(17).fontWeight(FontWeight.Medium)
      .fontColor('#FFFFFF')
      .backgroundColor(this.title.length > 0 ? this.t().primary : this.t().border)
      .borderRadius(14)
      .enabled(this.title.length > 0)
      .onClick(() => { this.submitHomework() })
  }

  private parseNumber(str: string): number {
    const trimmed = str.trim();
    if (trimmed.length === 0) return -1;
    const n = Number(trimmed);
    if (n !== n) return -1;
    return n;
  }

  private submitHomework(): void {
    this.errorMessage = '';
    if (this.title.length === 0) { this.errorMessage = '请输入作业标题'; return; }
    const hours = this.parseNumber(this.estimatedHoursStr);
    const minutes = this.parseNumber(this.estimatedMinutesStr);
    if (hours < 0 && minutes < 0) { this.errorMessage = '请输入有效的预计时间'; return; }
    const totalMinutes = (hours > 0 ? hours * 60 : 0) + (minutes > 0 ? minutes : 0);
    if (totalMinutes <= 0) { this.errorMessage = '预计时间必须大于 0'; return; }
    const dateStr = this.deadlineDateStr.trim();
    const timeStr = this.deadlineTimeStr.trim();
    if (dateStr.length === 0) { this.errorMessage = '请输入截止日期（格式 YYYY-MM-DD）'; return; }
    const fullStr = dateStr + 'T' + (timeStr.length > 0 ? timeStr : '23:59') + ':00';
    const dl = Number(new Date(fullStr).getTime());
    if (dl <= 0) { this.errorMessage = '日期格式不正确，请使用 YYYY-MM-DD'; return; }
    const hw = new Homework();
    hw.title = this.title; hw.courseName = this.courseName;
    hw.description = this.description; hw.estimatedMinutes = totalMinutes;
    hw.priority = this.priority; hw.deadline = dl;
    homeworkController.addHomework(hw);
    router.back();
  }
}
