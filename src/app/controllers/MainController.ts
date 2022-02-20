import { AbstractController } from './AbstractController';
import { Menu } from '../views/menu/Menu';

export class MainController extends AbstractController {
  resolve() {
    // this.rootNode.innerHTML = 'MainController';
    const menu = new Menu();
    this.rootNode.append(menu.getElement());
  }
}
