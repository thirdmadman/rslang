import { AbstractController } from './AbstractController';
import { AuthorizationForm } from '../views/auth/AuthorizationForm';

export class AuthController extends AbstractController {
  resolve(path: string) {
    const currentPage = +path.split('/').length;
    this.rootNode.innerHTML = `AuthController - ${path} ${currentPage}`;
    const authForm = new AuthorizationForm('login');
    this.rootNode.append(authForm.getElement());
  }
}
