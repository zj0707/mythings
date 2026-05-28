import { router } from '@kit.ArkUI';
import { CommonConstants } from '../common/constants/CommonConstants';
import { ThemeColors } from '../common/theme/ThemeColors';
import { Course } from '../model/Course';
import { Homework } from '../model/Homework';
import { ScheduleSlot, ScheduleSlotType } from '../model/ScheduleSlot';
import { scheduleController } from '../controller/ScheduleController';
import { homeworkController } from '../controller/HomeworkController';
import { alertController, AlertLevel, AlertInfo } from '../controller/AlertController';
import { planController } from '../controller/PlanController';
import { studentQuestionsController } from '../controller/StudentQuestionsController';
import { TimeUtils } from '../common/utils/TimeUtils';

AppStorage.setOrCreate('themeIndex', 0);

@Entry
@Component
struct MainPage {
  @State currentTabIndex: number = 0;
  @State showQuestionDialog: boolean = false;
  @State questionMessage: string = '';
  @State questionOptions: string[] = [];
  @State currentQuestionId: number = 0;
  @State planTotalHours: string = '0';
  @State planCourseCount: string = '0';
  @State planHwCount: string = '0';
  @State planScore: string = '';
  @State planStatus: string = '';
  @StorageLink('themeIndex') themeIndex: number = 0;

  private theme(): ThemeColors { return ThemeColors.getTheme(this.themeIndex); }

  aboutToAppear(): void {
    planController.generatePlan();
    this.refreshPlanStats();
  }

  build() {
    Column() {
      this.TitleBar()
      Tabs({ index: this.currentTabIndex }) {
        TabContent() { this.ScheduleContent() }
          .tabBar(this.TabBar(0, '课表'))
        TabContent() { this.HomeworkContent() }
          .tabBar(this.TabBar(1, '作业'))
        TabContent() { this.PlanContent() }
          .tabBar(this.TabBar(2, '计划'))
        TabContent() { this.AlertsContent() }
          .tabBar(this.TabBar(3, '提醒'))
      }
      .barHeight(56)
      .animationDuration(200)
      .layoutWeight(1)
      .onChange((index: number) => {
        this.currentTabIndex = index;
        if (index === 2) {
          planController.generatePlan();
          this.refreshPlanStats();
        }
      })
    }
    .backgroundColor(this.theme().bg)
    .width('100%').height('100%')
    .animation({ duration: 200, curve: Curve.EaseInOut })
  }

  @Builder TitleBar() {
    Row() {
      Text('Study Manager')
        .fontSize(20).fontWeight(FontWeight.Bold).fontColor(this.theme().text)
      Blank()
      Button(this.theme().name)
        .fontSize(11).height(28).borderRadius(14).type(ButtonType.Capsule)
        .backgroundColor(this.theme().primaryLight).fontColor(this.theme().primary)
        .onClick(() => { this.themeIndex = ThemeColors.cycle(this.themeIndex) })
    }
    .width('100%').height(56).padding({ left: 16, right: 16 })
    .backgroundColor(this.theme().card)
  }

  @Builder TabBar(index: number, title: string) {
    Column() {
      Text(title)
        .fontSize(12)
        .fontColor(this.currentTabIndex === index ? this.theme().tabActive : this.theme().tabInactive)
        .margin({ bottom: 4 })
    }
  }

  @Builder ScheduleContent() {
    Column() {
      this.DaySelector()
      this.ScheduleHeader()
      Scroll() {
        Column() {
          ForEach(scheduleController.getCoursesForDay(scheduleController.selectedDay),
            (course: Course) => { this.CourseCard(course) },
            (course: Course) => course.id.toString()
          )
        }.padding(16)
      }.layoutWeight(1)
    }.width('100%').height('100%')
  }

  @Builder DaySelector() {
    Row() {
      ForEach(CommonConstants.WEEKDAYS, (day: string, index: number) => {
        Column() {
          Text(day.substring(0, 1))
            .fontSize(13)
            .fontColor(scheduleController.selectedDay === index ? '#FFFFFF' : this.theme().textSecondary)
          Text(day.substring(1))
            .fontSize(11)
            .fontColor(scheduleController.selectedDay === index ? '#FFFFFF' : this.theme().textHint)
            .margin({ top: 2 })
        }
        .width(44).height(56).borderRadius(12)
        .backgroundColor(scheduleController.selectedDay === index ? this.theme().primary : this.theme().border)
        .justifyContent(FlexAlign.Center)
        .margin({ left: index === 0 ? 0 : 4, right: index === 6 ? 0 : 4 })
        .onClick(() => { scheduleController.selectedDay = index })
      })
    }
    .width('100%').padding({ left: 8, right: 8, top: 8, bottom: 4 })
    .justifyContent(FlexAlign.SpaceEvenly)
  }

  @Builder ScheduleHeader() {
    Row() {
      Row() {
        Circle({ width: 8, height: 8 }).fill(this.theme().courseBlue)
        Text('课程').fontSize(11).fontColor(this.theme().textHint).margin({ left: 4 })
      }.margin({ right: 12 })
      Row() {
        Circle({ width: 8, height: 8 }).fill(this.theme().courseYellow)
        Text('作业').fontSize(11).fontColor(this.theme().textHint).margin({ left: 4 })
      }.margin({ right: 12 })
      Row() {
        Circle({ width: 8, height: 8 }).fill(this.theme().restGray)
        Text('休息').fontSize(11).fontColor(this.theme().textHint).margin({ left: 4 })
      }
      Blank()
      Button('导入课表')
        .fontSize(12).height(28).borderRadius(14).type(ButtonType.Capsule)
        .backgroundColor(this.theme().primaryLight).fontColor(this.theme().primary)
        .margin({ right: 8 })
        .onClick(() => { router.pushUrl({ url: 'pages/ImportSchedulePage' }) })
      Button('+ 课程')
        .fontSize(12).height(28).borderRadius(14).type(ButtonType.Capsule)
        .onClick(() => { this.showAddCourse() })
    }
    .width('100%').padding({ left: 16, right: 16, top: 4, bottom: 8 })
  }

  @Builder CourseCard(course: Course) {
    Row() {
      Column().width(4).height('100%').borderRadius(2).backgroundColor(course.color)
      Column() {
        Text(course.name).fontSize(16).fontWeight(FontWeight.Medium).fontColor(this.theme().text)
        Text(this.courseSubtitle(course)).fontSize(12).fontColor(this.theme().textHint)
        Text(this.slotText(course.startSlot, course.endSlot)).fontSize(12)
          .fontColor(this.theme().textSecondary).margin({ top: 4 })
      }
      .alignItems(HorizontalAlign.Start).margin({ left: 12 }).layoutWeight(1)
      Button('删除')
        .fontSize(12).type(ButtonType.Capsule)
        .backgroundColor(this.theme().dangerLight).fontColor(this.theme().danger)
        .onClick(() => { scheduleController.removeCourse(course.id) })
    }
    .width('100%').height(80).borderRadius(12)
    .backgroundColor(this.theme().card).padding(12).margin({ bottom: 10 })
  }

  @Builder HomeworkContent() {
    Column() {
      Row() {
        Text('作业列表').fontSize(16).fontWeight(FontWeight.Medium).fontColor(this.theme().text)
        Blank()
        Button('+ 添加')
          .fontSize(12).height(28).borderRadius(14).type(ButtonType.Capsule)
          .onClick(() => { router.pushUrl({ url: 'pages/InputHomeworkPage' }) })
      }
      .width('100%').padding({ left: 16, right: 16, top: 12, bottom: 4 })
      Scroll() {
        Column() {
          if (homeworkController.homeworks.length === 0) {
            this.EmptyHint('还没有添加作业\n点击右上角 + 开始')
          }
          ForEach(homeworkController.homeworks,
            (hw: Homework) => { this.HomeworkCard(hw) },
            (hw: Homework) => hw.id.toString()
          )
        }.padding(16)
      }.layoutWeight(1)
    }.width('100%').height('100%')
  }

  @Builder HomeworkCard(hw: Homework) {
    Column() {
      Row() {
        Checkbox({ name: 'hw_' + hw.id.toString(), group: 'homework' })
          .select(hw.completed)
          .onChange((value: boolean) => { homeworkController.toggleComplete(hw.id) })
        Column() {
          Text(hw.title)
            .fontSize(15).fontWeight(FontWeight.Medium)
            .fontColor(hw.completed ? this.theme().textHint : this.theme().text)
            .decoration({ type: hw.completed ? TextDecorationType.LineThrough : TextDecorationType.None })
          if (hw.courseName !== '') {
            Text(hw.courseName).fontSize(12).fontColor(this.theme().textHint)
          }
        }
        .alignItems(HorizontalAlign.Start).margin({ left: 10 }).layoutWeight(1)
        Column() {
          Text(TimeUtils.formatMinutes(hw.estimatedMinutes)).fontSize(12)
            .fontColor(this.theme().textSecondary)
          Text(this.deadlineLabel(hw)).fontSize(10)
            .fontColor(hw.isUrgent() ? this.theme().danger : this.theme().textHint)
            .margin({ top: 2 })
        }
        .alignItems(HorizontalAlign.End)
      }.width('100%')
      Row() {
        Progress({ value: hw.actualMinutes, total: hw.estimatedMinutes, type: ProgressType.Linear })
          .width('80%').height(4)
          .color(hw.completed ? this.theme().success : this.theme().primary)
          .style({ strokeWidth: 4, strokeRadius: 2 })
        Text(this.percentLabel(hw)).fontSize(11).fontColor(this.theme().textHint).margin({ left: 8 })
      }.width('100%').margin({ top: 8 })
      if (hw.isUrgent() && !hw.completed) {
        Text('时间紧迫！').fontSize(11).fontColor(this.theme().danger)
          .backgroundColor(this.theme().dangerLight)
          .padding({ left: 8, right: 8, top: 2, bottom: 2 }).borderRadius(4).margin({ top: 6 })
      }
    }
    .width('100%').borderRadius(12).backgroundColor(this.theme().card)
    .padding(14).margin({ bottom: 10 })
  }

  @Builder PlanContent() {
    Column() {
      Row() {
        Text('学习计划').fontSize(16).fontWeight(FontWeight.Medium).fontColor(this.theme().text)
        Blank()
        Button('重新生成').fontSize(12).height(28).borderRadius(14).type(ButtonType.Capsule)
          .backgroundColor(this.theme().primaryLight).fontColor(this.theme().primary)
          .onClick(() => { planController.generatePlan(); this.refreshPlanStats() })
      }
      .width('100%').padding({ left: 16, right: 16, top: 12, bottom: 4 })
      this.DaySelector()
      this.PlanSummary()
      Scroll() {
        Column() {
          ForEach(planController.getPlanForDay(scheduleController.selectedDay),
            (slot: ScheduleSlot) => { this.PlanSlotCard(slot) },
            (slot: ScheduleSlot, index: number) => index.toString()
          )
          if (planController.getPlanForDay(scheduleController.selectedDay).length === 0) {
            this.EmptyHint('这天没有安排\n去添加课程或作业吧')
          }
        }.padding(16)
      }.layoutWeight(1)
      if (studentQuestionsController.currentQuestion !== null) {
        this.QuestionBanner()
      }
    }.width('100%').height('100%')
  }

  @Builder PlanSummary() {
    Column() {
      Row() {
        Column() {
          Text(this.planTotalHours).fontSize(20).fontWeight(FontWeight.Bold).fontColor(this.theme().primary)
          Text('学习时长').fontSize(11).fontColor(this.theme().textHint)
        }
        Column() {
          Text(this.planCourseCount).fontSize(20).fontWeight(FontWeight.Bold).fontColor(this.theme().courseYellow)
          Text('课程').fontSize(11).fontColor(this.theme().textHint)
        }
        Column() {
          Text(this.planHwCount).fontSize(20).fontWeight(FontWeight.Bold).fontColor(this.theme().success)
          Text('待完成').fontSize(11).fontColor(this.theme().textHint)
        }
      }.width('100%').justifyContent(FlexAlign.SpaceEvenly)
      Row() {
        Text(this.planStatus).fontSize(11).fontColor(this.theme().textHint).layoutWeight(1)
        Text(this.planScore).fontSize(11).fontColor(this.theme().textSecondary)
      }
      .width('100%').margin({ top: 10 }).padding({ left: 16, right: 16 })
    }.width('100%').padding(16)
  }

  @Builder PlanSlotCard(slot: ScheduleSlot) {
    Row() {
      Column().width(4).height('100%').borderRadius(2).backgroundColor(slot.color)
      Column() {
        Text(slot.title).fontSize(15).fontWeight(FontWeight.Medium).fontColor(this.theme().text)
        if (slot.type === ScheduleSlotType.COURSE) {
          Text(slot.location !== '' ? slot.location : '教室').fontSize(12).fontColor(this.theme().textHint)
        } else {
          Text('作业任务').fontSize(12).fontColor(this.theme().textHint)
        }
        Text(this.slotDetail(slot)).fontSize(11).fontColor(this.theme().textSecondary).margin({ top: 2 })
      }
      .alignItems(HorizontalAlign.Start).margin({ left: 12 }).layoutWeight(1)
      Text(slot.type === ScheduleSlotType.COURSE ? '课程' :
           slot.type === ScheduleSlotType.REST ? '休息' : '作业')
        .fontSize(11).fontColor('#FFFFFF')
        .backgroundColor(slot.type === ScheduleSlotType.COURSE ? this.theme().courseBlue :
                         slot.type === ScheduleSlotType.REST ? this.theme().restGray : slot.color)
        .borderRadius(8).padding({ left: 8, right: 8, top: 3, bottom: 3 })
    }
    .width('100%').height(70).borderRadius(12).backgroundColor(this.theme().card)
    .padding(12).margin({ bottom: 8 })
  }

  @Builder AlertsContent() {
    Column() {
      Row() {
        Text('提醒中心').fontSize(16).fontWeight(FontWeight.Medium).fontColor(this.theme().text)
        Blank()
        Button('清空').fontSize(12).height(28).borderRadius(14).type(ButtonType.Capsule)
          .backgroundColor(this.theme().primaryLight).fontColor(this.theme().primary)
          .onClick(() => { alertController.clearAlerts() })
      }
      .width('100%').padding({ left: 16, right: 16, top: 12, bottom: 4 })
      Scroll() {
        Column() {
          ForEach(alertController.getActiveAlerts(),
            (alert: AlertInfo) => { this.AlertCard(alert) },
            (alert: AlertInfo) => alert.timestamp.toString()
          )
          if (alertController.getActiveAlerts().length === 0) {
            this.EmptyHint('暂无提醒\n一切尽在掌握')
          }
        }.padding(16)
      }.layoutWeight(1)
    }.width('100%').height('100%')
  }

  @Builder AlertCard(alert: AlertInfo) {
    Row() {
      Text(alert.level === AlertLevel.URGENT ? '!' : 'i')
        .width(24).height(24).borderRadius(12)
        .backgroundColor(alert.level === AlertLevel.URGENT ? this.theme().danger : this.theme().warning)
        .fontColor('#FFFFFF').fontSize(14).textAlign(TextAlign.Center)
      Text(alert.message).fontSize(13).fontColor(this.theme().text)
        .layoutWeight(1).margin({ left: 12 }).maxLines(2)
      Text(TimeUtils.getTimeShort(alert.timestamp))
        .fontSize(10).fontColor(this.theme().textHint)
    }
    .width('100%').borderRadius(12).backgroundColor(this.theme().card)
    .padding(14).margin({ bottom: 8 })
  }

  @Builder QuestionBanner() {
    Row() {
      Text('?').width(20).height(20).borderRadius(10)
        .backgroundColor(this.theme().primary).fontColor('#FFFFFF').fontSize(12).textAlign(TextAlign.Center)
      Text(studentQuestionsController.currentQuestion!.question)
        .fontSize(12).fontColor(this.theme().text).layoutWeight(1).margin({ left: 8 }).maxLines(2)
      Text('去看看 >').fontSize(11).fontColor(this.theme().primary)
        .onClick(() => {
          this.showQuestionDialog = true;
          const sq = studentQuestionsController.currentQuestion;
          if (sq !== null) {
            this.questionMessage = sq.question;
            this.questionOptions = sq.options;
            this.currentQuestionId = sq.id;
          }
        })
    }
    .width('100%').backgroundColor(this.theme().primaryLight).padding(12)
  }

  @Builder EmptyHint(text: string) {
    Column() {
      Text(text).fontSize(14).fontColor(this.theme().textPlaceholder)
        .textAlign(TextAlign.Center).lineHeight(22)
    }
    .width('100%').height(200).justifyContent(FlexAlign.Center)
  }

  private refreshPlanStats(): void {
    const day = scheduleController.selectedDay;
    this.planTotalHours = planController.getTotalStudyHours(day).toFixed(1) + 'h';
    this.planCourseCount = scheduleController.getCoursesForDay(day).length.toString();
    this.planHwCount = homeworkController.getIncompleteHomeworks().length.toString();
    this.planScore = '优化分: ' + planController.optimizationScore.toString();
    this.planStatus = planController.getOverloadStatus();
  }

  private courseSubtitle(c: Course): string { return c.location + ' | ' + c.teacher; }
  private slotText(start: number, end: number): string { return '第' + start.toString() + '-' + end.toString() + '节'; }
  private deadlineLabel(hw: Homework): string { return '截止: ' + TimeUtils.formatTime(hw.deadline); }
  private percentLabel(hw: Homework): string { return Math.round(hw.actualMinutes / hw.estimatedMinutes * 100).toString() + '%'; }
  private slotDetail(slot: ScheduleSlot): string {
    const minutes = (slot.endSlot - slot.startSlot) * 45;
    return '第' + slot.startSlot.toString() + '-' + slot.endSlot.toString() + '节(' + minutes.toString() + '分钟)';
  }

  private showAddCourse(): void {
    AlertDialog.show({
      title: '添加课程',
      message: '请使用「导入课表」功能添加课程',
      confirm: { value: '确定', action: () => {} },
      cancel: () => {}
    })
  }
}
