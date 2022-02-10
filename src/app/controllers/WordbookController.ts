import { AbstractController } from './AbstractController';
import { CardField } from '../views/wordBook/cardsField/CardsField';
import { WordService } from '../services/WordService';
import { LevelNavigation } from '../views/wordBook/levelNavigation/LevelNavigation';

export class WordbookController extends AbstractController {
  resolve(path: string) {
    this.rootNode.innerHTML = `WordbookController - ${path}`;
    const currentPage = +path.split('/')[2];
    const currentGroup = +path.split('/')[1];
    WordService.getWordsByGroupAndPage(currentGroup, currentPage).then((data) => {
      const cardField = new CardField(data);
      const levelNavigation = new LevelNavigation(data);
      this.rootNode.append(cardField.getElement(), levelNavigation.getElement());
    }).catch(() => {});
  }
}
