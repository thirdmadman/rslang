import { AbstractController } from './AbstractController';
import { Wordbook } from '../views/wordBook/WordBook';

export class WordbookController extends AbstractController {
  resolve(path: string) {
    const wordBook = new Wordbook();
    this.rootNode.append(wordBook.node);
  }
}
