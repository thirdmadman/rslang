import { AbstractController } from './AbstractController';
import { SprintStartPage } from '../views/sprint/SprintStartPage';

export class SprintController extends AbstractController {
  resolve(path: string) {
    this.rootNode.innerHTML = '';
    const currentPage = +path.split('/')[2] || 1;
    const currentGroup = +path.split('/')[1] || 1;

    if (!path) {
      const startPage = new SprintStartPage();
      this.rootNode.append(startPage.getElement());
    } else {
      const startPage = new SprintStartPage(currentGroup, currentPage);

      this.rootNode.append(startPage.getElement());
    }
  }
}
