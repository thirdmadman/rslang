import { AbstractController } from './AbstractController';
import { CardField } from '../views/wordBook/cardsField/CardsField';
import { WordService } from '../services/WordService';
// import { dch } from '../views/dch';

export class WordbookController extends AbstractController {
  resolve(path: string) {
    this.rootNode.innerHTML = `WordbookController - ${path}`;

    WordService.getWordsByGroupAndPage(1, 1).then((data) => {
      const cardField = new CardField(data);
      this.rootNode.append(cardField.getElement());
    }).catch(() => {});
  }
}
