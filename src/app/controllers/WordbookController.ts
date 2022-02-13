import { AbstractController } from './AbstractController';
import { CardsField } from '../views/wordBook/cardsField/CardsField';
import { WordService } from '../services/WordService';
import { LevelNavigation } from '../views/wordBook/levelNavigation/LevelNavigation';
import { TokenProvider } from '../services/TokenProvider';
import { PathBus } from '../services/PathBus';
import { GlobalConstants } from '../../GlobalConstants';

export class WordbookController extends AbstractController {
  resolve(path: string) {
    this.rootNode.innerHTML = `WordbookController - ${path}`;
    const currentPage = +path.split('/')[2];
    const currentGroup = +path.split('/')[1];
    WordService.getWordsByGroupAndPage(currentGroup - 1, currentPage - 1).then((data) => {
      const cardField = new CardsField(data);
      const levelNavigation = new LevelNavigation(data);
      this.rootNode.append(cardField.getElement(), levelNavigation.getElement());
      if (TokenProvider.checkIsExpired()) {
        this.rootNode.innerHTML = '';
        const currentPath = PathBus.getCurrentPath();
        PathBus.setCurrentPath(`${GlobalConstants.ROUTE_AUTH}/expired?path=${currentPath}`);
      }
    }).catch(() => {});
  }
}
