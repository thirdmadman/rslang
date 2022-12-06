import { dch } from '../dch';
import Renderable from '../Renderable';
import './Spinner.scss';

export class Spinner extends Renderable {
  constructor() {
    super();
    this.rootNode = dch('div', ['loading-spinner']);
    this.rootNode.append(dch('div', ['loading-spinner__spinner']));
  }
}
