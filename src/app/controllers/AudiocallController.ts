import { AbstractController } from './AbstractController';

export class AudiocallController extends AbstractController {
  resolve(path: string) {
    this.rootNode.innerHTML = `AudiocallController - ${path}`;
  }
}
