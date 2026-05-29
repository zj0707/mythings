import { router } from '@kit.ArkUI';
import { tarotController, DrawResult } from '../controller/TarotController';

@Entry
@Component
struct MainPage {
  @State mode: number = 0;
  @State cards: DrawResult[] = [];
  @State drawn: boolean = false;
  @State animating: boolean = false;
  @State showCard: number = -1;

  build() {
    Column() {
      this.TitleBar()
      if (!this.drawn) {
        this.DrawArea()
      } else {
        this.ResultOverview()
      }
    }
    .width('100%').height('100%')
    .backgroundColor('#1A0A2E')
  }

  @Builder TitleBar() {
    Row() {
      Text('塔 罗 牌').fontSize(22).fontWeight(FontWeight.Bold)
        .fontColor('#E8D5B7').letterSpacing(6)
      Blank()
    }
    .width('100%').height(64).padding({ left: 20, right: 20 })
    .backgroundColor('#2D1B4E')
  }

  @Builder DrawArea() {
    Column() {
      Blank()
      this.MysticSymbol()
      Blank()
      this.ModeSelector()
      Blank()
      Button('抽取塔罗牌')
        .width('70%').height(56).fontSize(18).fontWeight(FontWeight.Medium)
        .fontColor('#1A0A2E').backgroundColor('#E8D5B7').borderRadius(28)
        .onClick(() => { this.performDraw() })
        .shadow({ radius: 20, color: '#E8D5B740' })
      Text(this.mode === 0 ? '单张 · 核心启示' : '三张 · 过去/现在/未来')
        .fontSize(13).fontColor('#B8A0D0').margin({ top: 16 })
      Blank()
    }
    .width('100%').layoutWeight(1)
  }

  @Builder MysticSymbol() {
    Column() {
      Text('★').fontSize(48).fontColor('#D4AF37')
        .animation({ duration: 2000, curve: Curve.EaseInOut, playMode: PlayMode.AlternateReverse, iterations: -1 })
      Text('THE TAROT').fontSize(28).fontWeight(FontWeight.Bold)
        .fontColor('#D4AF37').letterSpacing(8).margin({ top: 12 })
      Text('命运之轮 · 随心而转').fontSize(14).fontColor('#9B8EC0')
        .margin({ top: 8 }).letterSpacing(4)
    }
    .margin({ top: 40 })
  }

  @Builder ModeSelector() {
    Row() {
      Button('单张抽牌').fontSize(15)
        .backgroundColor(this.mode === 0 ? '#D4AF37' : '#3A2560')
        .fontColor(this.mode === 0 ? '#1A0A2E' : '#C8B8E0')
        .borderRadius(12).height(44)
        .onClick(() => { this.mode = 0 })
      Button('三张牌阵').fontSize(15)
        .backgroundColor(this.mode === 1 ? '#D4AF37' : '#3A2560')
        .fontColor(this.mode === 1 ? '#1A0A2E' : '#C8B8E0')
        .borderRadius(12).height(44).margin({ left: 16 })
        .onClick(() => { this.mode = 1 })
    }
    .margin({ bottom: 30 })
  }

  @Builder ResultOverview() {
    Column() {
      Blank()
      Text('你的牌阵').fontSize(20).fontWeight(FontWeight.Bold)
        .fontColor('#E8D5B7').letterSpacing(4)
      Blank()
      if (this.mode === 0) {
        this.SingleCardDisplay()
      } else {
        this.ThreeCardDisplay()
      }
      Blank()
      Row() {
        Button('重新抽牌').fontSize(14).height(44)
          .backgroundColor('#3A2560').fontColor('#C8B8E0').borderRadius(12)
          .onClick(() => { this.drawn = false; this.cards = [] })
        Button('查看解读').fontSize(14).height(44)
          .backgroundColor('#D4AF37').fontColor('#1A0A2E').borderRadius(12)
          .margin({ left: 16 })
          .onClick(() => {
            router.pushUrl({ url: 'pages/ResultPage' });
          })
      }
      .margin({ top: 20 })
      Blank()
    }
    .width('100%').layoutWeight(1)
  }

  @Builder SingleCardDisplay() {
    Column() {
      this.CardFrame(this.cards[0])
      Text(this.cards[0].position).fontSize(14).fontColor('#D4AF37')
        .margin({ top: 16 }).letterSpacing(4)
    }
    .onClick(() => { this.showCard = 0 })
  }

  @Builder ThreeCardDisplay() {
    Row() {
      ForEach(this.cards, (r: DrawResult, idx: number) => {
        Column() {
          this.CardFrame(r)
          Text(r.position).fontSize(12).fontColor('#D4AF37')
            .margin({ top: 8 }).letterSpacing(2)
        }
        .margin({ left: idx === 0 ? 0 : 8, right: idx === 2 ? 0 : 8 })
      }, (r: DrawResult, idx: number) => idx.toString())
    }
    .justifyContent(FlexAlign.Center).width('100%')
  }

  @Builder CardFrame(r: DrawResult) {
    Column() {
      Text(r.isReversed ? '▽' : '△').fontSize(14)
        .fontColor(r.isReversed ? '#FF6B6B' : '#D4AF37')
      Text(r.card.name).fontSize(13).fontWeight(FontWeight.Bold)
        .fontColor('#E8D5B7').margin({ top: 4 }).maxLines(1)
      Text(r.card.nameEn).fontSize(10).fontColor('#9B8EC0')
        .margin({ top: 2 }).maxLines(1)
      Text(r.getOrientation()).fontSize(10)
        .fontColor(r.isReversed ? '#FF6B6B' : '#D4AF37')
        .margin({ top: 4 })
    }
    .width(100).height(140).borderRadius(12)
    .backgroundColor('#2D1B4E')
    .border({ width: 1, color: '#D4AF3750' })
    .justifyContent(FlexAlign.Center)
    .shadow({ radius: 10, color: '#D4AF3720' })
    .animation({ duration: 500, curve: Curve.EaseOut })
  }

  private performDraw(): void {
    this.animating = true;
    if (this.mode === 0) {
      this.cards = [tarotController.drawSingle()];
    } else {
      this.cards = tarotController.drawThree();
    }
    this.animating = false;
    this.drawn = true;
  }
}
