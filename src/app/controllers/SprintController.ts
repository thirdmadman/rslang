import { AbstractController } from './AbstractController';
import { Menu } from '../views/menu/Menu';
import { SprintPage } from '../views/sprint/SprintPage';

export class SprintController extends AbstractController {
  resolve(path: string) {
    this.rootNode.innerHTML = '';
    this.rootNode.append(new Menu().getElement());

    const currentGroup = Number(path.split('/')[1]) || -1;
    const currentPage = Number(path.split('/')[2]) || -1;

    this.rootNode.append(new SprintPage(currentGroup, currentPage).getElement());
  }
}
