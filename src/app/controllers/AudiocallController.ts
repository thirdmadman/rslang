import { AbstractController } from './AbstractController';
import { Menu } from '../views/menu/Menu';
import { AudiocallPage } from '../views/audiocall/AudiocallPage';

export class AudiocallController extends AbstractController {
  resolve(path: string) {
    this.rootNode.innerHTML = '';
    this.rootNode.append(new Menu().getElement());

    const currentGroup = Number(path.split('/')[1]) || -1;
    const currentPage = Number(path.split('/')[2]) || -1;

    this.rootNode.append(new AudiocallPage(currentGroup, currentPage).getElement());
  }
}
