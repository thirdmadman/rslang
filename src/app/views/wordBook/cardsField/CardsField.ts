import { Control } from '../../../services/control';
import { IWord } from '../../../interfaces/IWord';
import { Card } from './card/Card';

export class CardField extends Control {
  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', 'cards-container');
  }

  addCards(cards: IWord[]) {
    cards.forEach((el) => {
      const card = new Card(this.node, el);
      return card;
    });
  }
}
