import { AbstractController } from './AbstractController';

export class AuthController extends AbstractController {
  resolve() {
    this.rootNode.innerHTML = 'AuthController';
  }
}
