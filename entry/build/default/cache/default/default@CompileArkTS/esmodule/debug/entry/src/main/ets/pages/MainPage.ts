if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface MainPage_Params {
    currentTabIndex?: number;
    showQuestionDialog?: boolean;
    questionMessage?: string;
    questionOptions?: string[];
    currentQuestionId?: number;
    planTotalHours?: string;
    planCourseCount?: string;
    planHwCount?: string;
    planScore?: string;
    planStatus?: string;
    themeIndex?: number;
}
import router from "@ohos:router";
import { CommonConstants } from "@bundle:com.studymanager.app/entry/ets/common/constants/CommonConstants";
import { ThemeColors } from "@bundle:com.studymanager.app/entry/ets/common/theme/ThemeColors";
import type { Course } from '../model/Course';
import type { Homework } from '../model/Homework';
import { ScheduleSlotType } from "@bundle:com.studymanager.app/entry/ets/model/ScheduleSlot";
import type { ScheduleSlot } from "@bundle:com.studymanager.app/entry/ets/model/ScheduleSlot";
import { scheduleController } from "@bundle:com.studymanager.app/entry/ets/controller/ScheduleController";
import { homeworkController } from "@bundle:com.studymanager.app/entry/ets/controller/HomeworkController";
import { alertController, AlertLevel } from "@bundle:com.studymanager.app/entry/ets/controller/AlertController";
import type { AlertInfo } from "@bundle:com.studymanager.app/entry/ets/controller/AlertController";
import { planController } from "@bundle:com.studymanager.app/entry/ets/controller/PlanController";
import { studentQuestionsController } from "@bundle:com.studymanager.app/entry/ets/controller/StudentQuestionsController";
import { TimeUtils } from "@bundle:com.studymanager.app/entry/ets/common/utils/TimeUtils";
AppStorage.setOrCreate('themeIndex', 0);
class MainPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__currentTabIndex = new ObservedPropertySimplePU(0, this, "currentTabIndex");
        this.__showQuestionDialog = new ObservedPropertySimplePU(false, this, "showQuestionDialog");
        this.__questionMessage = new ObservedPropertySimplePU('', this, "questionMessage");
        this.__questionOptions = new ObservedPropertyObjectPU([], this, "questionOptions");
        this.__currentQuestionId = new ObservedPropertySimplePU(0, this, "currentQuestionId");
        this.__planTotalHours = new ObservedPropertySimplePU('0', this, "planTotalHours");
        this.__planCourseCount = new ObservedPropertySimplePU('0', this, "planCourseCount");
        this.__planHwCount = new ObservedPropertySimplePU('0', this, "planHwCount");
        this.__planScore = new ObservedPropertySimplePU('', this, "planScore");
        this.__planStatus = new ObservedPropertySimplePU('', this, "planStatus");
        this.__themeIndex = this.createStorageLink('themeIndex', 0, "themeIndex");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: MainPage_Params) {
        if (params.currentTabIndex !== undefined) {
            this.currentTabIndex = params.currentTabIndex;
        }
        if (params.showQuestionDialog !== undefined) {
            this.showQuestionDialog = params.showQuestionDialog;
        }
        if (params.questionMessage !== undefined) {
            this.questionMessage = params.questionMessage;
        }
        if (params.questionOptions !== undefined) {
            this.questionOptions = params.questionOptions;
        }
        if (params.currentQuestionId !== undefined) {
            this.currentQuestionId = params.currentQuestionId;
        }
        if (params.planTotalHours !== undefined) {
            this.planTotalHours = params.planTotalHours;
        }
        if (params.planCourseCount !== undefined) {
            this.planCourseCount = params.planCourseCount;
        }
        if (params.planHwCount !== undefined) {
            this.planHwCount = params.planHwCount;
        }
        if (params.planScore !== undefined) {
            this.planScore = params.planScore;
        }
        if (params.planStatus !== undefined) {
            this.planStatus = params.planStatus;
        }
    }
    updateStateVars(params: MainPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__currentTabIndex.purgeDependencyOnElmtId(rmElmtId);
        this.__showQuestionDialog.purgeDependencyOnElmtId(rmElmtId);
        this.__questionMessage.purgeDependencyOnElmtId(rmElmtId);
        this.__questionOptions.purgeDependencyOnElmtId(rmElmtId);
        this.__currentQuestionId.purgeDependencyOnElmtId(rmElmtId);
        this.__planTotalHours.purgeDependencyOnElmtId(rmElmtId);
        this.__planCourseCount.purgeDependencyOnElmtId(rmElmtId);
        this.__planHwCount.purgeDependencyOnElmtId(rmElmtId);
        this.__planScore.purgeDependencyOnElmtId(rmElmtId);
        this.__planStatus.purgeDependencyOnElmtId(rmElmtId);
        this.__themeIndex.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__currentTabIndex.aboutToBeDeleted();
        this.__showQuestionDialog.aboutToBeDeleted();
        this.__questionMessage.aboutToBeDeleted();
        this.__questionOptions.aboutToBeDeleted();
        this.__currentQuestionId.aboutToBeDeleted();
        this.__planTotalHours.aboutToBeDeleted();
        this.__planCourseCount.aboutToBeDeleted();
        this.__planHwCount.aboutToBeDeleted();
        this.__planScore.aboutToBeDeleted();
        this.__planStatus.aboutToBeDeleted();
        this.__themeIndex.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __currentTabIndex: ObservedPropertySimplePU<number>;
    get currentTabIndex() {
        return this.__currentTabIndex.get();
    }
    set currentTabIndex(newValue: number) {
        this.__currentTabIndex.set(newValue);
    }
    private __showQuestionDialog: ObservedPropertySimplePU<boolean>;
    get showQuestionDialog() {
        return this.__showQuestionDialog.get();
    }
    set showQuestionDialog(newValue: boolean) {
        this.__showQuestionDialog.set(newValue);
    }
    private __questionMessage: ObservedPropertySimplePU<string>;
    get questionMessage() {
        return this.__questionMessage.get();
    }
    set questionMessage(newValue: string) {
        this.__questionMessage.set(newValue);
    }
    private __questionOptions: ObservedPropertyObjectPU<string[]>;
    get questionOptions() {
        return this.__questionOptions.get();
    }
    set questionOptions(newValue: string[]) {
        this.__questionOptions.set(newValue);
    }
    private __currentQuestionId: ObservedPropertySimplePU<number>;
    get currentQuestionId() {
        return this.__currentQuestionId.get();
    }
    set currentQuestionId(newValue: number) {
        this.__currentQuestionId.set(newValue);
    }
    private __planTotalHours: ObservedPropertySimplePU<string>;
    get planTotalHours() {
        return this.__planTotalHours.get();
    }
    set planTotalHours(newValue: string) {
        this.__planTotalHours.set(newValue);
    }
    private __planCourseCount: ObservedPropertySimplePU<string>;
    get planCourseCount() {
        return this.__planCourseCount.get();
    }
    set planCourseCount(newValue: string) {
        this.__planCourseCount.set(newValue);
    }
    private __planHwCount: ObservedPropertySimplePU<string>;
    get planHwCount() {
        return this.__planHwCount.get();
    }
    set planHwCount(newValue: string) {
        this.__planHwCount.set(newValue);
    }
    private __planScore: ObservedPropertySimplePU<string>;
    get planScore() {
        return this.__planScore.get();
    }
    set planScore(newValue: string) {
        this.__planScore.set(newValue);
    }
    private __planStatus: ObservedPropertySimplePU<string>;
    get planStatus() {
        return this.__planStatus.get();
    }
    set planStatus(newValue: string) {
        this.__planStatus.set(newValue);
    }
    private __themeIndex: ObservedPropertyAbstractPU<number>;
    get themeIndex() {
        return this.__themeIndex.get();
    }
    set themeIndex(newValue: number) {
        this.__themeIndex.set(newValue);
    }
    private theme(): ThemeColors { return ThemeColors.getTheme(this.themeIndex); }
    aboutToAppear(): void {
        planController.generatePlan();
        this.refreshPlanStats();
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Context.animation({ duration: 200, curve: Curve.EaseInOut });
            Column.backgroundColor(this.theme().bg);
            Column.width('100%');
            Column.height('100%');
            Context.animation(null);
        }, Column);
        this.TitleBar.bind(this)();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Tabs.create({ index: this.currentTabIndex });
            Tabs.barHeight(56);
            Tabs.animationDuration(200);
            Tabs.layoutWeight(1);
            Tabs.onChange((index: number) => {
                this.currentTabIndex = index;
                if (index === 2) {
                    planController.generatePlan();
                    this.refreshPlanStats();
                }
            });
        }, Tabs);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TabContent.create(() => {
                this.ScheduleContent.bind(this)();
            });
            TabContent.tabBar({ builder: () => {
                    this.TabBar.call(this, 0, '课表');
                } });
        }, TabContent);
        TabContent.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TabContent.create(() => {
                this.HomeworkContent.bind(this)();
            });
            TabContent.tabBar({ builder: () => {
                    this.TabBar.call(this, 1, '作业');
                } });
        }, TabContent);
        TabContent.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TabContent.create(() => {
                this.PlanContent.bind(this)();
            });
            TabContent.tabBar({ builder: () => {
                    this.TabBar.call(this, 2, '计划');
                } });
        }, TabContent);
        TabContent.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TabContent.create(() => {
                this.AlertsContent.bind(this)();
            });
            TabContent.tabBar({ builder: () => {
                    this.TabBar.call(this, 3, '提醒');
                } });
        }, TabContent);
        TabContent.pop();
        Tabs.pop();
        Column.pop();
    }
    TitleBar(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.height(56);
            Row.padding({ left: 16, right: 16 });
            Row.backgroundColor(this.theme().card);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('Study Manager');
            Text.fontSize(20);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor(this.theme().text);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel(this.theme().name);
            Button.fontSize(11);
            Button.height(28);
            Button.borderRadius(14);
            Button.type(ButtonType.Capsule);
            Button.backgroundColor(this.theme().primaryLight);
            Button.fontColor(this.theme().primary);
            Button.onClick(() => { this.themeIndex = ThemeColors.cycle(this.themeIndex); });
        }, Button);
        Button.pop();
        Row.pop();
    }
    TabBar(index: number, title: string, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(title);
            Text.fontSize(12);
            Text.fontColor(this.currentTabIndex === index ? this.theme().tabActive : this.theme().tabInactive);
            Text.margin({ bottom: 4 });
        }, Text);
        Text.pop();
        Column.pop();
    }
    ScheduleContent(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.height('100%');
        }, Column);
        this.DaySelector.bind(this)();
        this.ScheduleHeader.bind(this)();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Scroll.create();
            Scroll.layoutWeight(1);
        }, Scroll);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.padding(16);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const course = _item;
                this.CourseCard.bind(this)(course);
            };
            this.forEachUpdateFunction(elmtId, scheduleController.getCoursesForDay(scheduleController.selectedDay), forEachItemGenFunction, (course: Course) => course.id.toString(), false, false);
        }, ForEach);
        ForEach.pop();
        Column.pop();
        Scroll.pop();
        Column.pop();
    }
    DaySelector(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.padding({ left: 8, right: 8, top: 8, bottom: 4 });
            Row.justifyContent(FlexAlign.SpaceEvenly);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = (_item, index: number) => {
                const day = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create();
                    Column.width(44);
                    Column.height(56);
                    Column.borderRadius(12);
                    Column.backgroundColor(scheduleController.selectedDay === index ? this.theme().primary : this.theme().border);
                    Column.justifyContent(FlexAlign.Center);
                    Column.margin({ left: index === 0 ? 0 : 4, right: index === 6 ? 0 : 4 });
                    Column.onClick(() => { scheduleController.selectedDay = index; });
                }, Column);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(day.substring(0, 1));
                    Text.fontSize(13);
                    Text.fontColor(scheduleController.selectedDay === index ? '#FFFFFF' : this.theme().textSecondary);
                }, Text);
                Text.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(day.substring(1));
                    Text.fontSize(11);
                    Text.fontColor(scheduleController.selectedDay === index ? '#FFFFFF' : this.theme().textHint);
                    Text.margin({ top: 2 });
                }, Text);
                Text.pop();
                Column.pop();
            };
            this.forEachUpdateFunction(elmtId, CommonConstants.WEEKDAYS, forEachItemGenFunction, undefined, true, false);
        }, ForEach);
        ForEach.pop();
        Row.pop();
    }
    ScheduleHeader(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.padding({ left: 16, right: 16, top: 4, bottom: 8 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.margin({ right: 12 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Circle.create({ width: 8, height: 8 });
            Circle.fill(this.theme().courseBlue);
        }, Circle);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('课程');
            Text.fontSize(11);
            Text.fontColor(this.theme().textHint);
            Text.margin({ left: 4 });
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.margin({ right: 12 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Circle.create({ width: 8, height: 8 });
            Circle.fill(this.theme().courseYellow);
        }, Circle);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('作业');
            Text.fontSize(11);
            Text.fontColor(this.theme().textHint);
            Text.margin({ left: 4 });
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Circle.create({ width: 8, height: 8 });
            Circle.fill(this.theme().restGray);
        }, Circle);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('休息');
            Text.fontSize(11);
            Text.fontColor(this.theme().textHint);
            Text.margin({ left: 4 });
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('导入课表');
            Button.fontSize(12);
            Button.height(28);
            Button.borderRadius(14);
            Button.type(ButtonType.Capsule);
            Button.backgroundColor(this.theme().primaryLight);
            Button.fontColor(this.theme().primary);
            Button.margin({ right: 8 });
            Button.onClick(() => { router.pushUrl({ url: 'pages/ImportSchedulePage' }); });
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('+ 课程');
            Button.fontSize(12);
            Button.height(28);
            Button.borderRadius(14);
            Button.type(ButtonType.Capsule);
            Button.onClick(() => { this.showAddCourse(); });
        }, Button);
        Button.pop();
        Row.pop();
    }
    CourseCard(course: Course, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.height(80);
            Row.borderRadius(12);
            Row.backgroundColor(this.theme().card);
            Row.padding(12);
            Row.margin({ bottom: 10 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width(4);
            Column.height('100%');
            Column.borderRadius(2);
            Column.backgroundColor(course.color);
        }, Column);
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.alignItems(HorizontalAlign.Start);
            Column.margin({ left: 12 });
            Column.layoutWeight(1);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(course.name);
            Text.fontSize(16);
            Text.fontWeight(FontWeight.Medium);
            Text.fontColor(this.theme().text);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.courseSubtitle(course));
            Text.fontSize(12);
            Text.fontColor(this.theme().textHint);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.slotText(course.startSlot, course.endSlot));
            Text.fontSize(12);
            Text.fontColor(this.theme().textSecondary);
            Text.margin({ top: 4 });
        }, Text);
        Text.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('删除');
            Button.fontSize(12);
            Button.type(ButtonType.Capsule);
            Button.backgroundColor(this.theme().dangerLight);
            Button.fontColor(this.theme().danger);
            Button.onClick(() => { scheduleController.removeCourse(course.id); });
        }, Button);
        Button.pop();
        Row.pop();
    }
    HomeworkContent(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.height('100%');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.padding({ left: 16, right: 16, top: 12, bottom: 4 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('作业列表');
            Text.fontSize(16);
            Text.fontWeight(FontWeight.Medium);
            Text.fontColor(this.theme().text);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('+ 添加');
            Button.fontSize(12);
            Button.height(28);
            Button.borderRadius(14);
            Button.type(ButtonType.Capsule);
            Button.onClick(() => { router.pushUrl({ url: 'pages/InputHomeworkPage' }); });
        }, Button);
        Button.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Scroll.create();
            Scroll.layoutWeight(1);
        }, Scroll);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.padding(16);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (homeworkController.homeworks.length === 0) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.EmptyHint.bind(this)('还没有添加作业\n点击右上角 + 开始');
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const hw = _item;
                this.HomeworkCard.bind(this)(hw);
            };
            this.forEachUpdateFunction(elmtId, homeworkController.homeworks, forEachItemGenFunction, (hw: Homework) => hw.id.toString(), false, false);
        }, ForEach);
        ForEach.pop();
        Column.pop();
        Scroll.pop();
        Column.pop();
    }
    HomeworkCard(hw: Homework, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.borderRadius(12);
            Column.backgroundColor(this.theme().card);
            Column.padding(14);
            Column.margin({ bottom: 10 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Checkbox.create({ name: 'hw_' + hw.id.toString(), group: 'homework' });
            Checkbox.select(hw.completed);
            Checkbox.onChange((value: boolean) => { homeworkController.toggleComplete(hw.id); });
        }, Checkbox);
        Checkbox.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.alignItems(HorizontalAlign.Start);
            Column.margin({ left: 10 });
            Column.layoutWeight(1);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(hw.title);
            Text.fontSize(15);
            Text.fontWeight(FontWeight.Medium);
            Text.fontColor(hw.completed ? this.theme().textHint : this.theme().text);
            Text.decoration({ type: hw.completed ? TextDecorationType.LineThrough : TextDecorationType.None });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (hw.courseName !== '') {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(hw.courseName);
                        Text.fontSize(12);
                        Text.fontColor(this.theme().textHint);
                    }, Text);
                    Text.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.alignItems(HorizontalAlign.End);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(TimeUtils.formatMinutes(hw.estimatedMinutes));
            Text.fontSize(12);
            Text.fontColor(this.theme().textSecondary);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.deadlineLabel(hw));
            Text.fontSize(10);
            Text.fontColor(hw.isUrgent() ? this.theme().danger : this.theme().textHint);
            Text.margin({ top: 2 });
        }, Text);
        Text.pop();
        Column.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.margin({ top: 8 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Progress.create({ value: hw.actualMinutes, total: hw.estimatedMinutes, type: ProgressType.Linear });
            Progress.width('80%');
            Progress.height(4);
            Progress.color(hw.completed ? this.theme().success : this.theme().primary);
            Progress.style({ strokeWidth: 4, strokeRadius: 2 });
        }, Progress);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.percentLabel(hw));
            Text.fontSize(11);
            Text.fontColor(this.theme().textHint);
            Text.margin({ left: 8 });
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (hw.isUrgent() && !hw.completed) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('时间紧迫！');
                        Text.fontSize(11);
                        Text.fontColor(this.theme().danger);
                        Text.backgroundColor(this.theme().dangerLight);
                        Text.padding({ left: 8, right: 8, top: 2, bottom: 2 });
                        Text.borderRadius(4);
                        Text.margin({ top: 6 });
                    }, Text);
                    Text.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        Column.pop();
    }
    PlanContent(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.height('100%');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.padding({ left: 16, right: 16, top: 12, bottom: 4 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('学习计划');
            Text.fontSize(16);
            Text.fontWeight(FontWeight.Medium);
            Text.fontColor(this.theme().text);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('重新生成');
            Button.fontSize(12);
            Button.height(28);
            Button.borderRadius(14);
            Button.type(ButtonType.Capsule);
            Button.backgroundColor(this.theme().primaryLight);
            Button.fontColor(this.theme().primary);
            Button.onClick(() => { planController.generatePlan(); this.refreshPlanStats(); });
        }, Button);
        Button.pop();
        Row.pop();
        this.DaySelector.bind(this)();
        this.PlanSummary.bind(this)();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Scroll.create();
            Scroll.layoutWeight(1);
        }, Scroll);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.padding(16);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const slot = _item;
                this.PlanSlotCard.bind(this)(slot);
            };
            this.forEachUpdateFunction(elmtId, planController.getPlanForDay(scheduleController.selectedDay), forEachItemGenFunction, (slot: ScheduleSlot, index: number) => index.toString(), false, true);
        }, ForEach);
        ForEach.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (planController.getPlanForDay(scheduleController.selectedDay).length === 0) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.EmptyHint.bind(this)('这天没有安排\n去添加课程或作业吧');
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        Column.pop();
        Scroll.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (studentQuestionsController.currentQuestion !== null) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.QuestionBanner.bind(this)();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        Column.pop();
    }
    PlanSummary(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.padding(16);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.justifyContent(FlexAlign.SpaceEvenly);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.planTotalHours);
            Text.fontSize(20);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor(this.theme().primary);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('学习时长');
            Text.fontSize(11);
            Text.fontColor(this.theme().textHint);
        }, Text);
        Text.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.planCourseCount);
            Text.fontSize(20);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor(this.theme().courseYellow);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('课程');
            Text.fontSize(11);
            Text.fontColor(this.theme().textHint);
        }, Text);
        Text.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.planHwCount);
            Text.fontSize(20);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor(this.theme().success);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('待完成');
            Text.fontSize(11);
            Text.fontColor(this.theme().textHint);
        }, Text);
        Text.pop();
        Column.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.margin({ top: 10 });
            Row.padding({ left: 16, right: 16 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.planStatus);
            Text.fontSize(11);
            Text.fontColor(this.theme().textHint);
            Text.layoutWeight(1);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.planScore);
            Text.fontSize(11);
            Text.fontColor(this.theme().textSecondary);
        }, Text);
        Text.pop();
        Row.pop();
        Column.pop();
    }
    PlanSlotCard(slot: ScheduleSlot, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.height(70);
            Row.borderRadius(12);
            Row.backgroundColor(this.theme().card);
            Row.padding(12);
            Row.margin({ bottom: 8 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width(4);
            Column.height('100%');
            Column.borderRadius(2);
            Column.backgroundColor(slot.color);
        }, Column);
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.alignItems(HorizontalAlign.Start);
            Column.margin({ left: 12 });
            Column.layoutWeight(1);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(slot.title);
            Text.fontSize(15);
            Text.fontWeight(FontWeight.Medium);
            Text.fontColor(this.theme().text);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (slot.type === ScheduleSlotType.COURSE) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(slot.location !== '' ? slot.location : '教室');
                        Text.fontSize(12);
                        Text.fontColor(this.theme().textHint);
                    }, Text);
                    Text.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('作业任务');
                        Text.fontSize(12);
                        Text.fontColor(this.theme().textHint);
                    }, Text);
                    Text.pop();
                });
            }
        }, If);
        If.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.slotDetail(slot));
            Text.fontSize(11);
            Text.fontColor(this.theme().textSecondary);
            Text.margin({ top: 2 });
        }, Text);
        Text.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(slot.type === ScheduleSlotType.COURSE ? '课程' :
                slot.type === ScheduleSlotType.REST ? '休息' : '作业');
            Text.fontSize(11);
            Text.fontColor('#FFFFFF');
            Text.backgroundColor(slot.type === ScheduleSlotType.COURSE ? this.theme().courseBlue :
                slot.type === ScheduleSlotType.REST ? this.theme().restGray : slot.color);
            Text.borderRadius(8);
            Text.padding({ left: 8, right: 8, top: 3, bottom: 3 });
        }, Text);
        Text.pop();
        Row.pop();
    }
    AlertsContent(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.height('100%');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.padding({ left: 16, right: 16, top: 12, bottom: 4 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('提醒中心');
            Text.fontSize(16);
            Text.fontWeight(FontWeight.Medium);
            Text.fontColor(this.theme().text);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('清空');
            Button.fontSize(12);
            Button.height(28);
            Button.borderRadius(14);
            Button.type(ButtonType.Capsule);
            Button.backgroundColor(this.theme().primaryLight);
            Button.fontColor(this.theme().primary);
            Button.onClick(() => { alertController.clearAlerts(); });
        }, Button);
        Button.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Scroll.create();
            Scroll.layoutWeight(1);
        }, Scroll);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.padding(16);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const alert = _item;
                this.AlertCard.bind(this)(alert);
            };
            this.forEachUpdateFunction(elmtId, alertController.getActiveAlerts(), forEachItemGenFunction, (alert: AlertInfo) => alert.timestamp.toString(), false, false);
        }, ForEach);
        ForEach.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (alertController.getActiveAlerts().length === 0) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.EmptyHint.bind(this)('暂无提醒\n一切尽在掌握');
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        Column.pop();
        Scroll.pop();
        Column.pop();
    }
    AlertCard(alert: AlertInfo, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.borderRadius(12);
            Row.backgroundColor(this.theme().card);
            Row.padding(14);
            Row.margin({ bottom: 8 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(alert.level === AlertLevel.URGENT ? '!' : 'i');
            Text.width(24);
            Text.height(24);
            Text.borderRadius(12);
            Text.backgroundColor(alert.level === AlertLevel.URGENT ? this.theme().danger : this.theme().warning);
            Text.fontColor('#FFFFFF');
            Text.fontSize(14);
            Text.textAlign(TextAlign.Center);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(alert.message);
            Text.fontSize(13);
            Text.fontColor(this.theme().text);
            Text.layoutWeight(1);
            Text.margin({ left: 12 });
            Text.maxLines(2);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(TimeUtils.getTimeShort(alert.timestamp));
            Text.fontSize(10);
            Text.fontColor(this.theme().textHint);
        }, Text);
        Text.pop();
        Row.pop();
    }
    QuestionBanner(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.backgroundColor(this.theme().primaryLight);
            Row.padding(12);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('?');
            Text.width(20);
            Text.height(20);
            Text.borderRadius(10);
            Text.backgroundColor(this.theme().primary);
            Text.fontColor('#FFFFFF');
            Text.fontSize(12);
            Text.textAlign(TextAlign.Center);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(studentQuestionsController.currentQuestion!.question);
            Text.fontSize(12);
            Text.fontColor(this.theme().text);
            Text.layoutWeight(1);
            Text.margin({ left: 8 });
            Text.maxLines(2);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('去看看 >');
            Text.fontSize(11);
            Text.fontColor(this.theme().primary);
            Text.onClick(() => {
                this.showQuestionDialog = true;
                const sq = studentQuestionsController.currentQuestion;
                if (sq !== null) {
                    this.questionMessage = sq.question;
                    this.questionOptions = sq.options;
                    this.currentQuestionId = sq.id;
                }
            });
        }, Text);
        Text.pop();
        Row.pop();
    }
    EmptyHint(text: string, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.height(200);
            Column.justifyContent(FlexAlign.Center);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(text);
            Text.fontSize(14);
            Text.fontColor(this.theme().textPlaceholder);
            Text.textAlign(TextAlign.Center);
            Text.lineHeight(22);
        }, Text);
        Text.pop();
        Column.pop();
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
            confirm: { value: '确定', action: () => { } },
            cancel: () => { }
        });
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "MainPage";
    }
}
registerNamedRoute(() => new MainPage(undefined, {}), "", { bundleName: "com.studymanager.app", moduleName: "entry", pagePath: "pages/MainPage", pageFullPath: "entry/src/main/ets/pages/MainPage", integratedHsp: "false", moduleType: "followWithHap" });
