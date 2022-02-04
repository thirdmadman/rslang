import { AbstractController } from './AbstractController';

export class WordbookController extends AbstractController {
  resolve(path: string) {
    this.rootNode.innerHTML = `WordbookController - ${path}`;
  }
}
