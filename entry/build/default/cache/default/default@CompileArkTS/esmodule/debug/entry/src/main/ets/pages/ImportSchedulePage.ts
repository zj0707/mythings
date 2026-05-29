if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface ImportSchedulePage_Params {
    inputText?: string;
    resultSuccess?: boolean;
    resultCourseCount?: number;
    resultMessage?: string;
    resultCourses?: ParsedCourse[];
    showResult?: boolean;
    themeIndex?: number;
}
import { scheduleParser } from "@bundle:com.studymanager.app/entry/ets/controller/ScheduleParser";
import type { ParsedCourse } from "@bundle:com.studymanager.app/entry/ets/controller/ScheduleParser";
import { scheduleController } from "@bundle:com.studymanager.app/entry/ets/controller/ScheduleController";
import { Course } from "@bundle:com.studymanager.app/entry/ets/model/Course";
import router from "@ohos:router";
import { ThemeColors } from "@bundle:com.studymanager.app/entry/ets/common/theme/ThemeColors";
class ImportSchedulePage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__inputText = new ObservedPropertySimplePU('', this, "inputText");
        this.__resultSuccess = new ObservedPropertySimplePU(false, this, "resultSuccess");
        this.__resultCourseCount = new ObservedPropertySimplePU(0, this, "resultCourseCount");
        this.__resultMessage = new ObservedPropertySimplePU('', this, "resultMessage");
        this.__resultCourses = new ObservedPropertyObjectPU([], this, "resultCourses");
        this.__showResult = new ObservedPropertySimplePU(false, this, "showResult");
        this.__themeIndex = this.createStorageLink('themeIndex', 0, "themeIndex");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: ImportSchedulePage_Params) {
        if (params.inputText !== undefined) {
            this.inputText = params.inputText;
        }
        if (params.resultSuccess !== undefined) {
            this.resultSuccess = params.resultSuccess;
        }
        if (params.resultCourseCount !== undefined) {
            this.resultCourseCount = params.resultCourseCount;
        }
        if (params.resultMessage !== undefined) {
            this.resultMessage = params.resultMessage;
        }
        if (params.resultCourses !== undefined) {
            this.resultCourses = params.resultCourses;
        }
        if (params.showResult !== undefined) {
            this.showResult = params.showResult;
        }
    }
    updateStateVars(params: ImportSchedulePage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__inputText.purgeDependencyOnElmtId(rmElmtId);
        this.__resultSuccess.purgeDependencyOnElmtId(rmElmtId);
        this.__resultCourseCount.purgeDependencyOnElmtId(rmElmtId);
        this.__resultMessage.purgeDependencyOnElmtId(rmElmtId);
        this.__resultCourses.purgeDependencyOnElmtId(rmElmtId);
        this.__showResult.purgeDependencyOnElmtId(rmElmtId);
        this.__themeIndex.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__inputText.aboutToBeDeleted();
        this.__resultSuccess.aboutToBeDeleted();
        this.__resultCourseCount.aboutToBeDeleted();
        this.__resultMessage.aboutToBeDeleted();
        this.__resultCourses.aboutToBeDeleted();
        this.__showResult.aboutToBeDeleted();
        this.__themeIndex.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __inputText: ObservedPropertySimplePU<string>;
    get inputText() {
        return this.__inputText.get();
    }
    set inputText(newValue: string) {
        this.__inputText.set(newValue);
    }
    private __resultSuccess: ObservedPropertySimplePU<boolean>;
    get resultSuccess() {
        return this.__resultSuccess.get();
    }
    set resultSuccess(newValue: boolean) {
        this.__resultSuccess.set(newValue);
    }
    private __resultCourseCount: ObservedPropertySimplePU<number>;
    get resultCourseCount() {
        return this.__resultCourseCount.get();
    }
    set resultCourseCount(newValue: number) {
        this.__resultCourseCount.set(newValue);
    }
    private __resultMessage: ObservedPropertySimplePU<string>;
    get resultMessage() {
        return this.__resultMessage.get();
    }
    set resultMessage(newValue: string) {
        this.__resultMessage.set(newValue);
    }
    private __resultCourses: ObservedPropertyObjectPU<ParsedCourse[]>;
    get resultCourses() {
        return this.__resultCourses.get();
    }
    set resultCourses(newValue: ParsedCourse[]) {
        this.__resultCourses.set(newValue);
    }
    private __showResult: ObservedPropertySimplePU<boolean>;
    get showResult() {
        return this.__showResult.get();
    }
    set showResult(newValue: boolean) {
        this.__showResult.set(newValue);
    }
    private __themeIndex: ObservedPropertyAbstractPU<number>;
    get themeIndex() {
        return this.__themeIndex.get();
    }
    set themeIndex(newValue: number) {
        this.__themeIndex.set(newValue);
    }
    private t(): ThemeColors { return ThemeColors.getTheme(this.themeIndex); }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Context.animation({ duration: 200 });
            Column.width('100%');
            Column.height('100%');
            Column.backgroundColor(this.t().bg);
            Context.animation(null);
        }, Column);
        this.TitleBar.bind(this)();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Scroll.create();
            Scroll.layoutWeight(1);
        }, Scroll);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.padding(16);
        }, Column);
        this.Instruction.bind(this)();
        this.InputArea.bind(this)();
        this.ParseButton.bind(this)();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.showResult) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.ResultArea.bind(this)();
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
    TitleBar(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.height(56);
            Row.padding({ left: 16, right: 16 });
            Row.backgroundColor(this.t().card);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('导入课表');
            Text.fontSize(20);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor(this.t().text);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('返回');
            Button.fontSize(14);
            Button.type(ButtonType.Capsule);
            Button.backgroundColor(this.t().border);
            Button.fontColor(this.t().textSecondary);
            Button.onClick(() => { router.back(); });
        }, Button);
        Button.pop();
        Row.pop();
    }
    Instruction(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.backgroundColor(this.t().primaryLight);
            Column.borderRadius(12);
            Column.padding(14);
            Column.margin({ bottom: 16 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('如何导入课表');
            Text.fontSize(15);
            Text.fontWeight(FontWeight.Medium);
            Text.fontColor(this.t().text);
            Text.alignSelf(ItemAlign.Start);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('1. 用手机拍下课表照片，用文字识别工具提取文字\n2. 将提取的文字粘贴到下方输入框\n3. 或者手动按格式输入');
            Text.fontSize(12);
            Text.fontColor(this.t().textHint);
            Text.lineHeight(18);
            Text.margin({ top: 6 });
            Text.alignSelf(ItemAlign.Start);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('格式示例：\n高等数学 教师:张三 教室:A201 周一 第1-2节');
            Text.fontSize(11);
            Text.fontColor(this.t().primary);
            Text.lineHeight(18);
            Text.margin({ top: 8 });
            Text.alignSelf(ItemAlign.Start);
        }, Text);
        Text.pop();
        Column.pop();
    }
    InputArea(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.margin({ bottom: 16 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('粘贴课表文字');
            Text.fontSize(13);
            Text.fontColor(this.t().textSecondary);
            Text.alignSelf(ItemAlign.Start);
            Text.margin({ bottom: 8 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TextArea.create({ placeholder: '在此粘贴课表文字内容...' });
            TextArea.width('100%');
            TextArea.height(200);
            TextArea.fontSize(14);
            TextArea.borderRadius(10);
            TextArea.backgroundColor(this.t().inputBg);
            TextArea.onChange((value: string) => { this.inputText = value; });
        }, TextArea);
        Column.pop();
    }
    ParseButton(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('解析课表');
            Button.width('100%');
            Button.height(48);
            Button.fontSize(16);
            Button.fontWeight(FontWeight.Medium);
            Button.fontColor('#FFFFFF');
            Button.backgroundColor(this.inputText.length > 0 ? this.t().primary : this.t().border);
            Button.borderRadius(12);
            Button.enabled(this.inputText.length > 0);
            Button.onClick(() => { this.parseSchedule(); });
            Button.margin({ bottom: 20 });
        }, Button);
        Button.pop();
    }
    ResultArea(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.resultMessage);
            Text.fontSize(15);
            Text.fontWeight(FontWeight.Medium);
            Text.fontColor(this.resultSuccess ? this.t().success : this.t().warning);
            Text.margin({ bottom: 12 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = (_item, index: number) => {
                const c = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Row.create();
                    Row.width('100%');
                    Row.borderRadius(10);
                    Row.backgroundColor(this.t().card);
                    Row.padding(12);
                    Row.margin({ bottom: 8 });
                }, Row);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create();
                    Column.alignItems(HorizontalAlign.Start);
                    Column.layoutWeight(1);
                }, Column);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(c.name);
                    Text.fontSize(14);
                    Text.fontWeight(FontWeight.Medium);
                    Text.fontColor(this.t().text);
                }, Text);
                Text.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(this.formatDaySlot(c.dayOfWeek, c.startSlot, c.endSlot));
                    Text.fontSize(11);
                    Text.fontColor(this.t().textHint);
                    Text.margin({ top: 2 });
                }, Text);
                Text.pop();
                Column.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Checkbox.create();
                    Checkbox.select(true);
                }, Checkbox);
                Checkbox.pop();
                Row.pop();
            };
            this.forEachUpdateFunction(elmtId, this.resultCourses, forEachItemGenFunction, undefined, true, false);
        }, ForEach);
        ForEach.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('全部添加到课表');
            Button.width('100%');
            Button.height(44);
            Button.fontSize(15);
            Button.fontColor('#FFFFFF');
            Button.backgroundColor(this.t().success);
            Button.borderRadius(12);
            Button.margin({ top: 8 });
            Button.onClick(() => { this.importAll(); });
        }, Button);
        Button.pop();
        Column.pop();
    }
    private parseSchedule(): void {
        const result = scheduleParser.parseRawText(this.inputText);
        this.resultSuccess = result.success;
        this.resultCourses = result.courses;
        this.showResult = true;
        const cn = this.resultCourses.length.toString();
        if (result.success)
            this.resultMessage = '识别到 ' + cn + ' 门课程';
        else
            this.resultMessage = '未完全识别 (' + cn + ' 条推测)';
    }
    private importAll(): void {
        const colors: string[] = ['#4A90D9', '#E8A838', '#34C759', '#FF3B30', '#AF52DE',
            '#FF9500', '#007AFF', '#FF2D55', '#5856D6', '#0A84FF'];
        const courses = this.resultCourses;
        for (let i = 0; i < courses.length; i++) {
            const c = courses[i];
            const course = new Course();
            course.name = c.name;
            course.teacher = c.teacher;
            course.location = c.location;
            course.dayOfWeek = c.dayOfWeek;
            course.startSlot = c.startSlot;
            course.endSlot = c.endSlot;
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
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "ImportSchedulePage";
    }
}
registerNamedRoute(() => new ImportSchedulePage(undefined, {}), "", { bundleName: "com.studymanager.app", moduleName: "entry", pagePath: "pages/ImportSchedulePage", pageFullPath: "entry/src/main/ets/pages/ImportSchedulePage", integratedHsp: "false", moduleType: "followWithHap" });
