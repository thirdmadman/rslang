import { Menu } from '../views/menu/Menu';
import { AbstractController } from './AbstractController';

export class StatisticsController extends AbstractController {
  resolve(path: string) {
    this.rootNode.innerHTML = `StatisticsController - ${path}`;
    this.rootNode.append(new Menu().getElement());
  }
}
