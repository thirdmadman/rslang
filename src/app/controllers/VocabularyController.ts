import { Menu } from '../views/menu/Menu';
import { AbstractController } from './AbstractController';

export class VocabularyController extends AbstractController {
  resolve(path: string) {
    this.rootNode.innerHTML = `VocabularyController - ${path}`;
    this.rootNode.append(new Menu().getElement());
  }
}
