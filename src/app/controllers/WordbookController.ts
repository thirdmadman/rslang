import { AbstractController } from './AbstractController';
import { WordService } from '../services/WordService';
import { Wordbook } from '../views/wordBook/Wordbook';
import { GlobalConstants } from '../../GlobalConstants';

export class WordbookController extends AbstractController {
  resolve(path: string) {
    this.rootNode.innerHTML = '';
    let currentPage = +path.split('/')[2];
    let currentGroup = +path.split('/')[1];

    if (currentPage < 1) {
      currentPage = 1;
    } else if (currentPage > GlobalConstants.NUMBER_OF_PAGES) {
      currentPage = GlobalConstants.NUMBER_OF_PAGES;
    }

    if (currentGroup < 1) {
      currentGroup = 1;
    } else if (currentGroup > GlobalConstants.NUMBER_OF_GROUP_NO_AUTH_USER) {
      currentGroup = GlobalConstants.NUMBER_OF_GROUP_NO_AUTH_USER;
    }

    WordService.getWordsByGroupAndPage(currentGroup - 1, currentPage - 1).then((data) => {
      this.rootNode.append(new Wordbook(data).getElement());
    }).catch((e) => console.error(e));
  }
}
