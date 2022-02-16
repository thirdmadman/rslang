import { AbstractController } from './AbstractController';
import { AudiocallStartPage } from '../views/audiocall/AudiocallStartPage';

export class AudiocallController extends AbstractController {
  resolve(path: string) {
    this.rootNode.innerHTML = `AudiocallController - ${path}`;
    const currentPage = +path.split('/')[2] || 1;
    const currentGroup = +path.split('/')[1] || 1;

    if (!path) {
      const satartPage = new AudiocallStartPage();
      this.rootNode.append(satartPage.getElement());
    } else {
      const satartPage = new AudiocallStartPage(currentGroup, currentPage);

      this.rootNode.append(satartPage.getElement());
    }
  }
}
