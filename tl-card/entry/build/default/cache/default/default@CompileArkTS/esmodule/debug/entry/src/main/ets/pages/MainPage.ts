if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface MainPage_Params {
    mode?: number;
    cards?: DrawResult[];
    drawn?: boolean;
    animating?: boolean;
    showCard?: number;
}
import router from "@ohos:router";
import { tarotController } from "@bundle:com.tlcard.app/entry/ets/controller/TarotController";
import type { DrawResult } from "@bundle:com.tlcard.app/entry/ets/controller/TarotController";
class MainPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__mode = new ObservedPropertySimplePU(0, this, "mode");
        this.__cards = new ObservedPropertyObjectPU([], this, "cards");
        this.__drawn = new ObservedPropertySimplePU(false, this, "drawn");
        this.__animating = new ObservedPropertySimplePU(false, this, "animating");
        this.__showCard = new ObservedPropertySimplePU(-1, this, "showCard");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: MainPage_Params) {
        if (params.mode !== undefined) {
            this.mode = params.mode;
        }
        if (params.cards !== undefined) {
            this.cards = params.cards;
        }
        if (params.drawn !== undefined) {
            this.drawn = params.drawn;
        }
        if (params.animating !== undefined) {
            this.animating = params.animating;
        }
        if (params.showCard !== undefined) {
            this.showCard = params.showCard;
        }
    }
    updateStateVars(params: MainPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__mode.purgeDependencyOnElmtId(rmElmtId);
        this.__cards.purgeDependencyOnElmtId(rmElmtId);
        this.__drawn.purgeDependencyOnElmtId(rmElmtId);
        this.__animating.purgeDependencyOnElmtId(rmElmtId);
        this.__showCard.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__mode.aboutToBeDeleted();
        this.__cards.aboutToBeDeleted();
        this.__drawn.aboutToBeDeleted();
        this.__animating.aboutToBeDeleted();
        this.__showCard.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __mode: ObservedPropertySimplePU<number>;
    get mode() {
        return this.__mode.get();
    }
    set mode(newValue: number) {
        this.__mode.set(newValue);
    }
    private __cards: ObservedPropertyObjectPU<DrawResult[]>;
    get cards() {
        return this.__cards.get();
    }
    set cards(newValue: DrawResult[]) {
        this.__cards.set(newValue);
    }
    private __drawn: ObservedPropertySimplePU<boolean>;
    get drawn() {
        return this.__drawn.get();
    }
    set drawn(newValue: boolean) {
        this.__drawn.set(newValue);
    }
    private __animating: ObservedPropertySimplePU<boolean>;
    get animating() {
        return this.__animating.get();
    }
    set animating(newValue: boolean) {
        this.__animating.set(newValue);
    }
    private __showCard: ObservedPropertySimplePU<number>;
    get showCard() {
        return this.__showCard.get();
    }
    set showCard(newValue: number) {
        this.__showCard.set(newValue);
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.height('100%');
            Column.backgroundColor('#1A0A2E');
        }, Column);
        this.TitleBar.bind(this)();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (!this.drawn) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.DrawArea.bind(this)();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.ResultOverview.bind(this)();
                });
            }
        }, If);
        If.pop();
        Column.pop();
    }
    TitleBar(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.height(64);
            Row.padding({ left: 20, right: 20 });
            Row.backgroundColor('#2D1B4E');
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('塔 罗 牌');
            Text.fontSize(22);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#E8D5B7');
            Text.letterSpacing(6);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
        }, Blank);
        Blank.pop();
        Row.pop();
    }
    DrawArea(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.layoutWeight(1);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
        }, Blank);
        Blank.pop();
        this.MysticSymbol.bind(this)();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
        }, Blank);
        Blank.pop();
        this.ModeSelector.bind(this)();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('抽取塔罗牌');
            Button.width('70%');
            Button.height(56);
            Button.fontSize(18);
            Button.fontWeight(FontWeight.Medium);
            Button.fontColor('#1A0A2E');
            Button.backgroundColor('#E8D5B7');
            Button.borderRadius(28);
            Button.onClick(() => { this.performDraw(); });
            Button.shadow({ radius: 20, color: '#E8D5B740' });
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.mode === 0 ? '单张 · 核心启示' : '三张 · 过去/现在/未来');
            Text.fontSize(13);
            Text.fontColor('#B8A0D0');
            Text.margin({ top: 16 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
        }, Blank);
        Blank.pop();
        Column.pop();
    }
    MysticSymbol(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.margin({ top: 40 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('★');
            Context.animation({ duration: 2000, curve: Curve.EaseInOut, playMode: PlayMode.AlternateReverse, iterations: -1 });
            Text.fontSize(48);
            Text.fontColor('#D4AF37');
            Context.animation(null);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('THE TAROT');
            Text.fontSize(28);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#D4AF37');
            Text.letterSpacing(8);
            Text.margin({ top: 12 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('命运之轮 · 随心而转');
            Text.fontSize(14);
            Text.fontColor('#9B8EC0');
            Text.margin({ top: 8 });
            Text.letterSpacing(4);
        }, Text);
        Text.pop();
        Column.pop();
    }
    ModeSelector(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.margin({ bottom: 30 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('单张抽牌');
            Button.fontSize(15);
            Button.backgroundColor(this.mode === 0 ? '#D4AF37' : '#3A2560');
            Button.fontColor(this.mode === 0 ? '#1A0A2E' : '#C8B8E0');
            Button.borderRadius(12);
            Button.height(44);
            Button.onClick(() => { this.mode = 0; });
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('三张牌阵');
            Button.fontSize(15);
            Button.backgroundColor(this.mode === 1 ? '#D4AF37' : '#3A2560');
            Button.fontColor(this.mode === 1 ? '#1A0A2E' : '#C8B8E0');
            Button.borderRadius(12);
            Button.height(44);
            Button.margin({ left: 16 });
            Button.onClick(() => { this.mode = 1; });
        }, Button);
        Button.pop();
        Row.pop();
    }
    ResultOverview(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.layoutWeight(1);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('你的牌阵');
            Text.fontSize(20);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#E8D5B7');
            Text.letterSpacing(4);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.mode === 0) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.SingleCardDisplay.bind(this)();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.ThreeCardDisplay.bind(this)();
                });
            }
        }, If);
        If.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.margin({ top: 20 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('重新抽牌');
            Button.fontSize(14);
            Button.height(44);
            Button.backgroundColor('#3A2560');
            Button.fontColor('#C8B8E0');
            Button.borderRadius(12);
            Button.onClick(() => { this.drawn = false; this.cards = []; });
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('查看解读');
            Button.fontSize(14);
            Button.height(44);
            Button.backgroundColor('#D4AF37');
            Button.fontColor('#1A0A2E');
            Button.borderRadius(12);
            Button.margin({ left: 16 });
            Button.onClick(() => {
                router.pushUrl({ url: 'pages/ResultPage' });
            });
        }, Button);
        Button.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
        }, Blank);
        Blank.pop();
        Column.pop();
    }
    SingleCardDisplay(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.onClick(() => { this.showCard = 0; });
        }, Column);
        this.CardFrame.bind(this)(this.cards[0]);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.cards[0].position);
            Text.fontSize(14);
            Text.fontColor('#D4AF37');
            Text.margin({ top: 16 });
            Text.letterSpacing(4);
        }, Text);
        Text.pop();
        Column.pop();
    }
    ThreeCardDisplay(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.justifyContent(FlexAlign.Center);
            Row.width('100%');
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = (_item, idx: number) => {
                const r = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create();
                    Column.margin({ left: idx === 0 ? 0 : 8, right: idx === 2 ? 0 : 8 });
                }, Column);
                this.CardFrame.bind(this)(r);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(r.position);
                    Text.fontSize(12);
                    Text.fontColor('#D4AF37');
                    Text.margin({ top: 8 });
                    Text.letterSpacing(2);
                }, Text);
                Text.pop();
                Column.pop();
            };
            this.forEachUpdateFunction(elmtId, this.cards, forEachItemGenFunction, (r: DrawResult, idx: number) => idx.toString(), true, true);
        }, ForEach);
        ForEach.pop();
        Row.pop();
    }
    CardFrame(r: DrawResult, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Context.animation({ duration: 500, curve: Curve.EaseOut });
            Column.width(100);
            Column.height(140);
            Column.borderRadius(12);
            Column.backgroundColor('#2D1B4E');
            Column.border({ width: 1, color: '#D4AF3750' });
            Column.justifyContent(FlexAlign.Center);
            Column.shadow({ radius: 10, color: '#D4AF3720' });
            Context.animation(null);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(r.isReversed ? '▽' : '△');
            Text.fontSize(14);
            Text.fontColor(r.isReversed ? '#FF6B6B' : '#D4AF37');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(r.card.name);
            Text.fontSize(13);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#E8D5B7');
            Text.margin({ top: 4 });
            Text.maxLines(1);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(r.card.nameEn);
            Text.fontSize(10);
            Text.fontColor('#9B8EC0');
            Text.margin({ top: 2 });
            Text.maxLines(1);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(r.getOrientation());
            Text.fontSize(10);
            Text.fontColor(r.isReversed ? '#FF6B6B' : '#D4AF37');
            Text.margin({ top: 4 });
        }, Text);
        Text.pop();
        Column.pop();
    }
    private performDraw(): void {
        this.animating = true;
        if (this.mode === 0) {
            this.cards = [tarotController.drawSingle()];
        }
        else {
            this.cards = tarotController.drawThree();
        }
        this.animating = false;
        this.drawn = true;
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "MainPage";
    }
}
registerNamedRoute(() => new MainPage(undefined, {}), "", { bundleName: "com.tlcard.app", moduleName: "entry", pagePath: "pages/MainPage", pageFullPath: "entry/src/main/ets/pages/MainPage", integratedHsp: "false", moduleType: "followWithHap" });
