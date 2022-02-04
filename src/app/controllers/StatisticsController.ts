import { AbstractController } from './AbstractController';

export class StatisticsController extends AbstractController {
  resolve(path: string) {
    this.rootNode.innerHTML = `StatisticsController - ${path}`;
  }
}
