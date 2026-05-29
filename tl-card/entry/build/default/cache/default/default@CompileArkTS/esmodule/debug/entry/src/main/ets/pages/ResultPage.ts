if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface ResultPage_Params {
    cards?: DisplayCard[];
    selectedIndex?: number;
}
import router from "@ohos:router";
import { tarotController } from "@bundle:com.tlcard.app/entry/ets/controller/TarotController";
import type { DrawResult } from "@bundle:com.tlcard.app/entry/ets/controller/TarotController";
class DisplayCard {
    cardName: string = '';
    nameEn: string = '';
    position: string = '';
    orientation: string = '';
    interpretation: string = '';
    keywords: string = '';
    element: string = '';
    isReversed: boolean = false;
}
class ResultPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__cards = new ObservedPropertyObjectPU([], this, "cards");
        this.__selectedIndex = new ObservedPropertySimplePU(0, this, "selectedIndex");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: ResultPage_Params) {
        if (params.cards !== undefined) {
            this.cards = params.cards;
        }
        if (params.selectedIndex !== undefined) {
            this.selectedIndex = params.selectedIndex;
        }
    }
    updateStateVars(params: ResultPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__cards.purgeDependencyOnElmtId(rmElmtId);
        this.__selectedIndex.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__cards.aboutToBeDeleted();
        this.__selectedIndex.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __cards: ObservedPropertyObjectPU<DisplayCard[]>;
    get cards() {
        return this.__cards.get();
    }
    set cards(newValue: DisplayCard[]) {
        this.__cards.set(newValue);
    }
    private __selectedIndex: ObservedPropertySimplePU<number>;
    get selectedIndex() {
        return this.__selectedIndex.get();
    }
    set selectedIndex(newValue: number) {
        this.__selectedIndex.set(newValue);
    }
    aboutToAppear(): void {
        const arr: DrawResult[] = tarotController.lastDrawResults;
        if (arr.length === 0) {
            router.back();
            return;
        }
        const list: DisplayCard[] = [];
        for (let i = 0; i < arr.length; i++) {
            const d = new DisplayCard();
            d.cardName = arr[i].card.name;
            d.nameEn = arr[i].card.nameEn;
            d.position = arr[i].position;
            d.orientation = arr[i].getOrientation();
            d.interpretation = arr[i].getInterpretation();
            d.keywords = arr[i].card.keywords;
            d.element = arr[i].card.element;
            d.isReversed = arr[i].isReversed;
            list.push(d);
        }
        this.cards = list;
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.height('100%');
            Column.backgroundColor('#1A0A2E');
        }, Column);
        this.TitleBar.bind(this)();
        this.CardTabs.bind(this)();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Scroll.create();
            Scroll.layoutWeight(1);
        }, Scroll);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.padding(20);
        }, Column);
        this.InterpretationContent.bind(this)();
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
            Row.backgroundColor('#2D1B4E');
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('← 返回');
            Button.fontSize(14);
            Button.type(ButtonType.Capsule);
            Button.backgroundColor('#3A2560');
            Button.fontColor('#C8B8E0');
            Button.onClick(() => { router.back(); });
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('牌面解读');
            Text.fontSize(18);
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
            Text.create('');
            Text.width(60);
        }, Text);
        Text.pop();
        Row.pop();
    }
    CardTabs(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.backgroundColor('#2D1B4E');
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = (_item, idx: number) => {
                const c = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create();
                    Column.padding({ top: 8, bottom: 8 });
                    Column.layoutWeight(1);
                    Column.border({ width: { bottom: this.selectedIndex === idx ? 2 : 0 }, color: '#D4AF37' });
                    Column.onClick(() => { this.selectedIndex = idx; });
                }, Column);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(c.cardName);
                    Text.fontSize(15);
                    Text.fontWeight(this.selectedIndex === idx ? FontWeight.Bold : FontWeight.Normal);
                    Text.fontColor(this.selectedIndex === idx ? '#D4AF37' : '#8B7BB0');
                    Text.maxLines(1);
                }, Text);
                Text.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(c.position);
                    Text.fontSize(11);
                    Text.fontColor(this.selectedIndex === idx ? '#E8D5B7' : '#6B5B90');
                    Text.margin({ top: 4 });
                }, Text);
                Text.pop();
                Column.pop();
            };
            this.forEachUpdateFunction(elmtId, this.cards, forEachItemGenFunction, (c: DisplayCard, idx: number) => idx.toString(), true, true);
        }, ForEach);
        ForEach.pop();
        Row.pop();
    }
    InterpretationContent(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
        }, Column);
        this.OrientationRow.bind(this)();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.cards[this.selectedIndex].cardName);
            Text.fontSize(32);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#E8D5B7');
            Text.margin({ bottom: 4 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.cards[this.selectedIndex].nameEn);
            Text.fontSize(14);
            Text.fontColor('#9B8EC0');
            Text.margin({ bottom: 20 });
            Text.letterSpacing(2);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('关键词');
            Text.fontSize(14);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#D4AF37');
            Text.margin({ bottom: 8 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.cards[this.selectedIndex].keywords);
            Text.fontSize(15);
            Text.fontColor('#C8B8E0');
            Text.lineHeight(22);
            Text.margin({ bottom: 24 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('详细解读');
            Text.fontSize(14);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#D4AF37');
            Text.margin({ bottom: 8 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.cards[this.selectedIndex].interpretation);
            Text.fontSize(14);
            Text.fontColor('#C8B8E0');
            Text.lineHeight(24);
            Text.letterSpacing(1);
        }, Text);
        Text.pop();
        this.WisdomBox.bind(this)();
        Column.pop();
    }
    OrientationRow(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.margin({ bottom: 16 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.cards[this.selectedIndex].isReversed ? '逆位 ▽' : '正位 △');
            Text.fontSize(14);
            Text.fontColor(this.cards[this.selectedIndex].isReversed ? '#FF6B6B' : '#D4AF37');
            Text.backgroundColor(this.cards[this.selectedIndex].isReversed ? '#FF6B6B20' : '#D4AF3720');
            Text.borderRadius(8);
            Text.padding({ left: 12, right: 12, top: 4, bottom: 4 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.cards[this.selectedIndex].element + '元素');
            Text.fontSize(12);
            Text.fontColor('#9B8EC0');
            Text.backgroundColor('#3A2560');
            Text.borderRadius(8);
            Text.padding({ left: 10, right: 10, top: 4, bottom: 4 });
        }, Text);
        Text.pop();
        Row.pop();
    }
    WisdomBox(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.backgroundColor('#2D1B4E');
            Column.borderRadius(14);
            Column.padding(18);
            Column.margin({ top: 24 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('塔罗启示');
            Text.fontSize(13);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#D4AF37');
            Text.margin({ bottom: 8 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.getWisdom(this.cards[this.selectedIndex]));
            Text.fontSize(13);
            Text.fontColor('#B8A0D0');
            Text.lineHeight(22);
            Text.fontStyle(FontStyle.Italic);
        }, Text);
        Text.pop();
        Column.pop();
    }
    private getWisdom(c: DisplayCard): string {
        const advices: string[] = [
            '相信你的直觉，它正在指引你走向正确的方向。',
            '此刻的困惑是成长的必经之路，接纳它，答案自会浮现。',
            '改变正在发生，放下对控制的执念，拥抱未知。',
            '你内心早已知道答案，现在需要的只是行动的勇气。'
        ];
        const idx = (c.cardName.length + (c.isReversed ? 1 : 0)) % advices.length;
        return advices[idx];
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "ResultPage";
    }
}
registerNamedRoute(() => new ResultPage(undefined, {}), "", { bundleName: "com.tlcard.app", moduleName: "entry", pagePath: "pages/ResultPage", pageFullPath: "entry/src/main/ets/pages/ResultPage", integratedHsp: "false", moduleType: "followWithHap" });
