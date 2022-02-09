import { AbstractController } from './AbstractController';
import { CardField } from '../views/wordBook/cardsField/CardsField';
import { WordService } from '../services/WordService';
// import { IPaginatedArray } from '../interfaces/IPaginatedArray';
// import { IWord } from '../interfaces/IWord';
// import { GlobalConstants } from '../../GlobalConstants';
// import { PathBus } from '../services/PathBus';
// import { dch } from '../views/dch';

export class WordbookController extends AbstractController {
  resolve(path: string) {
    this.rootNode.innerHTML = `WordbookController - ${path}`;
    const currentPage = +path.split('/')[2];
    const currentGroup = +path.split('/')[1];
    WordService.getWordsByGroupAndPage(currentGroup, currentPage).then((data) => {
      const cardField = new CardField(data);
      console.log(data);
      this.rootNode.append(cardField.getElement());
    }).catch(() => {});
  }
}
