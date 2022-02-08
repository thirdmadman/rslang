import { dch } from '../../dch';
import { IWord } from '../../../interfaces/IWord';
import { Card } from './card/Card';
import Renderable from '../../Renderable';
// import { WordService } from '../../../services/WordService';
import { IPaginatedArray } from '../../../interfaces/IPaginatedArray';
import './CardField.scss';

export class CardField extends Renderable {
  constructor(data: IPaginatedArray<IWord>) {
    super();
    this.rootNode = dch('div', ['cards-container'], '');
    this.addCards(data.array);
  }

  addCards(arrayWords: IWord[]) {
    arrayWords.forEach((el) => {
      const card = new Card(el, { isButtonVisible: true });
      this.rootNode.append(card.getElement());
    });
  }
}
