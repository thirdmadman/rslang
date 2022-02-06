import { Control } from '../../services/control';
import { CardField } from './cardsField/CardsField';
import { WordService } from '../../services/WordService';

export class Wordbook extends Control {
  cardField: CardField;

  constructor() {
    super(null, 'div', 'wordbook');
    this.cardField = new CardField(this.node);
    this.getAllCards(1, 1);
  }

  getAllCards(group: number, page: number) {
    WordService.getWordsByGroupAndPage(group, page).then(((data) => this.cardField.addCards(data)
    )).catch(() => {});
  }
}
