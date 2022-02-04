import { AbstractController } from './AbstractController';

export class VocabularyController extends AbstractController {
  resolve(path: string) {
    this.rootNode.innerHTML = `VocabularyController - ${path}`;
  }
}
