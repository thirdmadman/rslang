import { AbstractController } from './AbstractController';

export class SprintController extends AbstractController {
  resolve(path: string) {
    this.rootNode.innerHTML = `SprintController - ${path}`;
  }
}
