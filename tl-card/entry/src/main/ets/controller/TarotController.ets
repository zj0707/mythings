import { TarotCard, TarotDeck } from '../model/TarotData';

export class DrawResult {
  card: TarotCard = new TarotCard(0, '', '', 0, '', '', '', '');
  isReversed: boolean = false;
  position: string = '';

  constructor(card: TarotCard, isReversed: boolean, position: string) {
    this.card = card; this.isReversed = isReversed; this.position = position;
  }

  getInterpretation(): string {
    if (this.isReversed) return this.card.reversed;
    return this.card.upright;
  }

  getOrientation(): string {
    if (this.isReversed) return '逆位';
    return '正位';
  }
}

export class TarotController {
  private deck: TarotCard[] = [];
  private usedIds: number[] = [];
  lastDrawResults: DrawResult[] = [];

  constructor() { this.deck = TarotDeck.load(); }

  shuffle(): void { this.usedIds = []; }

  drawSingle(): DrawResult {
    this.shuffle();
    const idx = this.randomIndex();
    const card = this.deck[idx];
    const reversed = Math.random() < 0.5;
    this.usedIds.push(idx);
    const r = new DrawResult(card, reversed, '核心启示');
    this.lastDrawResults = [r];
    return r;
  }

  drawThree(): DrawResult[] {
    this.shuffle();
    const results: DrawResult[] = [];
    const positions: string[] = ['过去', '现在', '未来'];
    for (let i = 0; i < 3; i++) {
      let idx = this.randomIndex();
      while (this.usedIds.indexOf(idx) >= 0) {
        idx = this.randomIndex();
      }
      const card = this.deck[idx];
      const reversed = Math.random() < 0.5;
      this.usedIds.push(idx);
      results.push(new DrawResult(card, reversed, positions[i]));
    }
    this.lastDrawResults = results;
    return results;
  }

  private randomIndex(): number {
    const n = this.deck.length;
    const r = Math.random() * n;
    return Math.floor(r);
  }

  getCardById(id: number): TarotCard | null {
    for (let i = 0; i < this.deck.length; i++) {
      if (this.deck[i].id === id) return this.deck[i];
    }
    return null;
  }
}

export const tarotController = new TarotController();
