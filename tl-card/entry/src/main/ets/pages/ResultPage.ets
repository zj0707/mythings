import { router } from '@kit.ArkUI';
import { tarotController, DrawResult } from '../controller/TarotController';

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

@Entry
@Component
struct ResultPage {
  @State cards: DisplayCard[] = [];
  @State selectedIndex: number = 0;

  aboutToAppear(): void {
    const arr: DrawResult[] = tarotController.lastDrawResults;
    if (arr.length === 0) { router.back(); return; }
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

  build() {
    Column() {
      this.TitleBar()
      this.CardTabs()
      Scroll() {
        Column() {
          this.InterpretationContent()
        }.padding(20)
      }.layoutWeight(1)
    }
    .width('100%').height('100%').backgroundColor('#1A0A2E')
  }

  @Builder TitleBar() {
    Row() {
      Button('← 返回').fontSize(14).type(ButtonType.Capsule)
        .backgroundColor('#3A2560').fontColor('#C8B8E0')
        .onClick(() => { router.back() })
      Blank()
      Text('牌面解读').fontSize(18).fontWeight(FontWeight.Bold)
        .fontColor('#E8D5B7').letterSpacing(4)
      Blank()
      Text('').width(60)
    }
    .width('100%').height(56).padding({ left: 16, right: 16 })
    .backgroundColor('#2D1B4E')
  }

  @Builder CardTabs() {
    Row() {
      ForEach(this.cards, (c: DisplayCard, idx: number) => {
        Column() {
          Text(c.cardName).fontSize(15)
            .fontWeight(this.selectedIndex === idx ? FontWeight.Bold : FontWeight.Normal)
            .fontColor(this.selectedIndex === idx ? '#D4AF37' : '#8B7BB0').maxLines(1)
          Text(c.position).fontSize(11)
            .fontColor(this.selectedIndex === idx ? '#E8D5B7' : '#6B5B90').margin({ top: 4 })
        }
        .padding({ top: 8, bottom: 8 }).layoutWeight(1)
        .border({ width: { bottom: this.selectedIndex === idx ? 2 : 0 }, color: '#D4AF37' })
        .onClick(() => { this.selectedIndex = idx })
      }, (c: DisplayCard, idx: number) => idx.toString())
    }
    .width('100%').backgroundColor('#2D1B4E')
  }

  @Builder InterpretationContent() {
    Column() {
      this.OrientationRow()
      Text(this.cards[this.selectedIndex].cardName).fontSize(32).fontWeight(FontWeight.Bold)
        .fontColor('#E8D5B7').margin({ bottom: 4 })
      Text(this.cards[this.selectedIndex].nameEn).fontSize(14).fontColor('#9B8EC0')
        .margin({ bottom: 20 }).letterSpacing(2)

      Text('关键词').fontSize(14).fontWeight(FontWeight.Bold)
        .fontColor('#D4AF37').margin({ bottom: 8 })
      Text(this.cards[this.selectedIndex].keywords).fontSize(15).fontColor('#C8B8E0')
        .lineHeight(22).margin({ bottom: 24 })

      Text('详细解读').fontSize(14).fontWeight(FontWeight.Bold)
        .fontColor('#D4AF37').margin({ bottom: 8 })
      Text(this.cards[this.selectedIndex].interpretation).fontSize(14).fontColor('#C8B8E0')
        .lineHeight(24).letterSpacing(1)

      this.WisdomBox()
    }
    .width('100%')
  }

  @Builder OrientationRow() {
    Row() {
      Text(this.cards[this.selectedIndex].isReversed ? '逆位 ▽' : '正位 △').fontSize(14)
        .fontColor(this.cards[this.selectedIndex].isReversed ? '#FF6B6B' : '#D4AF37')
        .backgroundColor(this.cards[this.selectedIndex].isReversed ? '#FF6B6B20' : '#D4AF3720')
        .borderRadius(8).padding({ left: 12, right: 12, top: 4, bottom: 4 })
      Blank()
      Text(this.cards[this.selectedIndex].element + '元素').fontSize(12).fontColor('#9B8EC0')
        .backgroundColor('#3A2560').borderRadius(8)
        .padding({ left: 10, right: 10, top: 4, bottom: 4 })
    }.width('100%').margin({ bottom: 16 })
  }

  @Builder WisdomBox() {
    Column() {
      Text('塔罗启示').fontSize(13).fontWeight(FontWeight.Bold)
        .fontColor('#D4AF37').margin({ bottom: 8 })
      Text(this.getWisdom(this.cards[this.selectedIndex])).fontSize(13)
        .fontColor('#B8A0D0').lineHeight(22).fontStyle(FontStyle.Italic)
    }
    .width('100%').backgroundColor('#2D1B4E').borderRadius(14)
    .padding(18).margin({ top: 24 })
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
}
