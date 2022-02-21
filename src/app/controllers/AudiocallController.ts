import { AbstractController } from './AbstractController';
import { AudiocallStartPage } from '../views/audiocall/AudiocallStartPage';
import { Menu } from '../views/menu/Menu';

export class AudiocallController extends AbstractController {
  resolve(path: string) {
    this.rootNode.innerHTML = '';
    this.rootNode.append(new Menu().getElement());
    const currentPage = +path.split('/')[2] || 1;
    const currentGroup = +path.split('/')[1] || 1;

    if (!path) {
      const startPage = new AudiocallStartPage();
      this.rootNode.append(startPage.getElement());
    } else {
      const startPage = new AudiocallStartPage(currentGroup, currentPage);

      this.rootNode.append(startPage.getElement());
    }
  }
}
