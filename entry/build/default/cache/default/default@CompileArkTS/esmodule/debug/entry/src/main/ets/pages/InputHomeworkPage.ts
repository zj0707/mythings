if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface InputHomeworkPage_Params {
    title?: string;
    courseName?: string;
    estimatedHoursStr?: string;
    estimatedMinutesStr?: string;
    deadlineDateStr?: string;
    deadlineTimeStr?: string;
    priority?: number;
    description?: string;
    errorMessage?: string;
    themeIndex?: number;
}
import { Homework } from "@bundle:com.studymanager.app/entry/ets/model/Homework";
import { homeworkController } from "@bundle:com.studymanager.app/entry/ets/controller/HomeworkController";
import router from "@ohos:router";
import { ThemeColors } from "@bundle:com.studymanager.app/entry/ets/common/theme/ThemeColors";
class InputHomeworkPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__title = new ObservedPropertySimplePU('', this, "title");
        this.__courseName = new ObservedPropertySimplePU('', this, "courseName");
        this.__estimatedHoursStr = new ObservedPropertySimplePU('1', this, "estimatedHoursStr");
        this.__estimatedMinutesStr = new ObservedPropertySimplePU('0', this, "estimatedMinutesStr");
        this.__deadlineDateStr = new ObservedPropertySimplePU('', this, "deadlineDateStr");
        this.__deadlineTimeStr = new ObservedPropertySimplePU('20:00', this, "deadlineTimeStr");
        this.__priority = new ObservedPropertySimplePU(0, this, "priority");
        this.__description = new ObservedPropertySimplePU('', this, "description");
        this.__errorMessage = new ObservedPropertySimplePU('', this, "errorMessage");
        this.__themeIndex = this.createStorageLink('themeIndex', 0, "themeIndex");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: InputHomeworkPage_Params) {
        if (params.title !== undefined) {
            this.title = params.title;
        }
        if (params.courseName !== undefined) {
            this.courseName = params.courseName;
        }
        if (params.estimatedHoursStr !== undefined) {
            this.estimatedHoursStr = params.estimatedHoursStr;
        }
        if (params.estimatedMinutesStr !== undefined) {
            this.estimatedMinutesStr = params.estimatedMinutesStr;
        }
        if (params.deadlineDateStr !== undefined) {
            this.deadlineDateStr = params.deadlineDateStr;
        }
        if (params.deadlineTimeStr !== undefined) {
            this.deadlineTimeStr = params.deadlineTimeStr;
        }
        if (params.priority !== undefined) {
            this.priority = params.priority;
        }
        if (params.description !== undefined) {
            this.description = params.description;
        }
        if (params.errorMessage !== undefined) {
            this.errorMessage = params.errorMessage;
        }
    }
    updateStateVars(params: InputHomeworkPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__title.purgeDependencyOnElmtId(rmElmtId);
        this.__courseName.purgeDependencyOnElmtId(rmElmtId);
        this.__estimatedHoursStr.purgeDependencyOnElmtId(rmElmtId);
        this.__estimatedMinutesStr.purgeDependencyOnElmtId(rmElmtId);
        this.__deadlineDateStr.purgeDependencyOnElmtId(rmElmtId);
        this.__deadlineTimeStr.purgeDependencyOnElmtId(rmElmtId);
        this.__priority.purgeDependencyOnElmtId(rmElmtId);
        this.__description.purgeDependencyOnElmtId(rmElmtId);
        this.__errorMessage.purgeDependencyOnElmtId(rmElmtId);
        this.__themeIndex.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__title.aboutToBeDeleted();
        this.__courseName.aboutToBeDeleted();
        this.__estimatedHoursStr.aboutToBeDeleted();
        this.__estimatedMinutesStr.aboutToBeDeleted();
        this.__deadlineDateStr.aboutToBeDeleted();
        this.__deadlineTimeStr.aboutToBeDeleted();
        this.__priority.aboutToBeDeleted();
        this.__description.aboutToBeDeleted();
        this.__errorMessage.aboutToBeDeleted();
        this.__themeIndex.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __title: ObservedPropertySimplePU<string>;
    get title() {
        return this.__title.get();
    }
    set title(newValue: string) {
        this.__title.set(newValue);
    }
    private __courseName: ObservedPropertySimplePU<string>;
    get courseName() {
        return this.__courseName.get();
    }
    set courseName(newValue: string) {
        this.__courseName.set(newValue);
    }
    private __estimatedHoursStr: ObservedPropertySimplePU<string>;
    get estimatedHoursStr() {
        return this.__estimatedHoursStr.get();
    }
    set estimatedHoursStr(newValue: string) {
        this.__estimatedHoursStr.set(newValue);
    }
    private __estimatedMinutesStr: ObservedPropertySimplePU<string>;
    get estimatedMinutesStr() {
        return this.__estimatedMinutesStr.get();
    }
    set estimatedMinutesStr(newValue: string) {
        this.__estimatedMinutesStr.set(newValue);
    }
    private __deadlineDateStr: ObservedPropertySimplePU<string>;
    get deadlineDateStr() {
        return this.__deadlineDateStr.get();
    }
    set deadlineDateStr(newValue: string) {
        this.__deadlineDateStr.set(newValue);
    }
    private __deadlineTimeStr: ObservedPropertySimplePU<string>;
    get deadlineTimeStr() {
        return this.__deadlineTimeStr.get();
    }
    set deadlineTimeStr(newValue: string) {
        this.__deadlineTimeStr.set(newValue);
    }
    private __priority: ObservedPropertySimplePU<number>;
    get priority() {
        return this.__priority.get();
    }
    set priority(newValue: number) {
        this.__priority.set(newValue);
    }
    private __description: ObservedPropertySimplePU<string>;
    get description() {
        return this.__description.get();
    }
    set description(newValue: string) {
        this.__description.set(newValue);
    }
    private __errorMessage: ObservedPropertySimplePU<string>;
    get errorMessage() {
        return this.__errorMessage.get();
    }
    set errorMessage(newValue: string) {
        this.__errorMessage.set(newValue);
    }
    private __themeIndex: ObservedPropertyAbstractPU<number>;
    get themeIndex() {
        return this.__themeIndex.get();
    }
    set themeIndex(newValue: number) {
        this.__themeIndex.set(newValue);
    }
    private t(): ThemeColors { return ThemeColors.getTheme(this.themeIndex); }
    aboutToAppear(): void {
        const now = new Date();
        const dl = new Date(now.getTime() + 24 * 60 * 60 * 1000);
        const m = dl.getMonth() + 1;
        const d = dl.getDate();
        this.deadlineDateStr = dl.getFullYear().toString() + '-' +
            (m < 10 ? '0' : '') + m.toString() + '-' + (d < 10 ? '0' : '') + d.toString();
    }
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
        this.TitleField.bind(this)();
        this.CourseNameField.bind(this)();
        this.TimeEstimateField.bind(this)();
        this.DeadlineField.bind(this)();
        this.PriorityRow.bind(this)();
        this.DescriptionField.bind(this)();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.errorMessage.length > 0) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.ErrorBanner.bind(this)();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        this.SubmitButton.bind(this)();
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
            Text.create('添加作业');
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
            Button.createWithLabel('取消');
            Button.fontSize(14);
            Button.type(ButtonType.Capsule);
            Button.backgroundColor(this.t().border);
            Button.fontColor(this.t().textSecondary);
            Button.onClick(() => { router.back(); });
        }, Button);
        Button.pop();
        Row.pop();
    }
    TitleField(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.margin({ bottom: 16 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('作业标题 *');
            Text.fontSize(13);
            Text.fontColor(this.t().textSecondary);
            Text.alignSelf(ItemAlign.Start);
            Text.margin({ bottom: 8 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TextInput.create({ placeholder: '输入作业名称' });
            TextInput.width('100%');
            TextInput.height(48);
            TextInput.fontSize(15);
            TextInput.borderRadius(10);
            TextInput.backgroundColor(this.t().inputBg);
            TextInput.onChange((value: string) => { this.title = value; });
        }, TextInput);
        Column.pop();
    }
    CourseNameField(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.margin({ bottom: 16 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('所属课程');
            Text.fontSize(13);
            Text.fontColor(this.t().textSecondary);
            Text.alignSelf(ItemAlign.Start);
            Text.margin({ bottom: 8 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TextInput.create({ placeholder: '输入课程名称' });
            TextInput.width('100%');
            TextInput.height(48);
            TextInput.fontSize(15);
            TextInput.borderRadius(10);
            TextInput.backgroundColor(this.t().inputBg);
            TextInput.onChange((value: string) => { this.courseName = value; });
        }, TextInput);
        Column.pop();
    }
    TimeEstimateField(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.margin({ bottom: 16 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('预计完成时间 *');
            Text.fontSize(13);
            Text.fontColor(this.t().textSecondary);
            Text.alignSelf(ItemAlign.Start);
            Text.margin({ bottom: 8 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TextInput.create({ placeholder: '小时' });
            TextInput.width('40%');
            TextInput.height(48);
            TextInput.fontSize(15);
            TextInput.borderRadius(10);
            TextInput.backgroundColor(this.t().inputBg);
            TextInput.type(InputType.Number);
            TextInput.onChange((value: string) => { this.estimatedHoursStr = value; });
        }, TextInput);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('小时');
            Text.fontSize(14);
            Text.fontColor(this.t().textHint);
            Text.margin({ left: 8, right: 16 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TextInput.create({ placeholder: '分钟' });
            TextInput.width('40%');
            TextInput.height(48);
            TextInput.fontSize(15);
            TextInput.borderRadius(10);
            TextInput.backgroundColor(this.t().inputBg);
            TextInput.type(InputType.Number);
            TextInput.onChange((value: string) => { this.estimatedMinutesStr = value; });
        }, TextInput);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('分钟');
            Text.fontSize(14);
            Text.fontColor(this.t().textHint);
            Text.margin({ left: 8 });
        }, Text);
        Text.pop();
        Row.pop();
        Column.pop();
    }
    DeadlineField(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.margin({ bottom: 16 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('截止时间 *');
            Text.fontSize(13);
            Text.fontColor(this.t().textSecondary);
            Text.alignSelf(ItemAlign.Start);
            Text.margin({ bottom: 8 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TextInput.create({ placeholder: 'YYYY-MM-DD' });
            TextInput.width('50%');
            TextInput.height(48);
            TextInput.fontSize(15);
            TextInput.borderRadius(10);
            TextInput.backgroundColor(this.t().inputBg);
            TextInput.onChange((value: string) => { this.deadlineDateStr = value; });
        }, TextInput);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TextInput.create({ placeholder: 'HH:MM' });
            TextInput.width('35%');
            TextInput.height(48);
            TextInput.fontSize(15);
            TextInput.borderRadius(10);
            TextInput.backgroundColor(this.t().inputBg);
            TextInput.margin({ left: 8 });
            TextInput.onChange((value: string) => { this.deadlineTimeStr = value; });
        }, TextInput);
        Row.pop();
        Column.pop();
    }
    PriorityRow(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.margin({ bottom: 16 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('优先级');
            Text.fontSize(13);
            Text.fontColor(this.t().textSecondary);
            Text.alignSelf(ItemAlign.Start);
            Text.margin({ bottom: 8 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = (_item, index: number) => {
                const label = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(label);
                    Text.fontSize(13);
                    Text.fontColor(this.priority === index ? '#FFFFFF' : this.t().textSecondary);
                    Text.backgroundColor(this.priority === index ?
                        (index === 2 ? this.t().danger : index === 1 ? this.t().warning : this.t().success) : this.t().border);
                    Text.borderRadius(8);
                    Text.padding({ left: 20, right: 20, top: 8, bottom: 8 });
                    Text.margin({ right: index < 2 ? 8 : 0 });
                    Text.onClick(() => { this.priority = index; });
                }, Text);
                Text.pop();
            };
            this.forEachUpdateFunction(elmtId, ['普通', '重要', '紧急'], forEachItemGenFunction, undefined, true, false);
        }, ForEach);
        ForEach.pop();
        Row.pop();
        Column.pop();
    }
    DescriptionField(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.margin({ bottom: 24 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('备注');
            Text.fontSize(13);
            Text.fontColor(this.t().textSecondary);
            Text.alignSelf(ItemAlign.Start);
            Text.margin({ bottom: 8 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TextArea.create({ placeholder: '添加备注信息...' });
            TextArea.width('100%');
            TextArea.height(80);
            TextArea.fontSize(14);
            TextArea.borderRadius(10);
            TextArea.backgroundColor(this.t().inputBg);
            TextArea.onChange((value: string) => { this.description = value; });
        }, TextArea);
        Column.pop();
    }
    ErrorBanner(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.errorMessage);
            Text.fontSize(12);
            Text.fontColor(this.t().danger);
            Text.backgroundColor(this.t().dangerLight);
            Text.borderRadius(8);
            Text.padding(12);
            Text.width('100%');
            Text.margin({ bottom: 12 });
        }, Text);
        Text.pop();
    }
    SubmitButton(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('添加作业');
            Button.width('100%');
            Button.height(52);
            Button.fontSize(17);
            Button.fontWeight(FontWeight.Medium);
            Button.fontColor('#FFFFFF');
            Button.backgroundColor(this.title.length > 0 ? this.t().primary : this.t().border);
            Button.borderRadius(14);
            Button.enabled(this.title.length > 0);
            Button.onClick(() => { this.submitHomework(); });
        }, Button);
        Button.pop();
    }
    private parseNumber(str: string): number {
        const trimmed = str.trim();
        if (trimmed.length === 0)
            return -1;
        const n = Number(trimmed);
        if (n !== n)
            return -1;
        return n;
    }
    private submitHomework(): void {
        this.errorMessage = '';
        if (this.title.length === 0) {
            this.errorMessage = '请输入作业标题';
            return;
        }
        const hours = this.parseNumber(this.estimatedHoursStr);
        const minutes = this.parseNumber(this.estimatedMinutesStr);
        if (hours < 0 && minutes < 0) {
            this.errorMessage = '请输入有效的预计时间';
            return;
        }
        const totalMinutes = (hours > 0 ? hours * 60 : 0) + (minutes > 0 ? minutes : 0);
        if (totalMinutes <= 0) {
            this.errorMessage = '预计时间必须大于 0';
            return;
        }
        const dateStr = this.deadlineDateStr.trim();
        const timeStr = this.deadlineTimeStr.trim();
        if (dateStr.length === 0) {
            this.errorMessage = '请输入截止日期（格式 YYYY-MM-DD）';
            return;
        }
        const fullStr = dateStr + 'T' + (timeStr.length > 0 ? timeStr : '23:59') + ':00';
        const dl = Number(new Date(fullStr).getTime());
        if (dl <= 0) {
            this.errorMessage = '日期格式不正确，请使用 YYYY-MM-DD';
            return;
        }
        const hw = new Homework();
        hw.title = this.title;
        hw.courseName = this.courseName;
        hw.description = this.description;
        hw.estimatedMinutes = totalMinutes;
        hw.priority = this.priority;
        hw.deadline = dl;
        homeworkController.addHomework(hw);
        router.back();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "InputHomeworkPage";
    }
}
registerNamedRoute(() => new InputHomeworkPage(undefined, {}), "", { bundleName: "com.studymanager.app", moduleName: "entry", pagePath: "pages/InputHomeworkPage", pageFullPath: "entry/src/main/ets/pages/InputHomeworkPage", integratedHsp: "false", moduleType: "followWithHap" });
