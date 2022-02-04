import { AbstractController } from './AbstractController';

export class MainController extends AbstractController {
  resolve() {
    this.rootNode.innerHTML = 'MainController';
  }
}
