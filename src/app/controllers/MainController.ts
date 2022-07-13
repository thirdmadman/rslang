import { Menu } from '../views/menu/Menu';
import { AbstractController } from './AbstractController';

export class MainController extends AbstractController {
  resolve() {
    this.rootNode.innerHTML = 'MainController';
    this.rootNode.append(new Menu().getElement());
  }
}
