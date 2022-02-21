import { AbstractController } from './AbstractController';
import { WordService } from '../services/WordService';
import { Wordbook } from '../views/wordBook/Wordbook';

export class WordbookController extends AbstractController {
  resolve(path: string) {
    this.rootNode.innerHTML = '';
    const currentPage = +path.split('/')[2];
    const currentGroup = +path.split('/')[1];
    WordService.getWordsByGroupAndPage(currentGroup - 1, currentPage - 1).then((data) => {
      this.rootNode.append(new Wordbook(data).getElement());
    }).catch((e) => console.error(e));
  }
}
