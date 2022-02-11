import { AbstractController } from './AbstractController';
import { AuthorizationPage } from '../views/auth/AuthorizationPage';
import { dch } from '../views/dch';
import { GlobalConstants } from '../../GlobalConstants';

export class AuthController extends AbstractController {
  resolve(path: string) {
    this.rootNode.innerHTML = `AuthController - ${path}`;
    const currentPath = path.split('/');
    const redirectPage = path.split('?path=');
    if (!path) { this.rootNode.append(new AuthorizationPage().getElement()); }
    if (currentPath[1] === 'expired?path=') {
      const expiredMessage = dch('p', [], ' Сеанс пользователя истек, пожалуйста, войдите в систему');
      this.rootNode.append(expiredMessage, new AuthorizationPage(redirectPage[1]).getElement());
    }
    if (redirectPage[0] === '/expired') {
      const expiredMessage = dch('p', [], ' Сеанс пользователя истек, пожалуйста, войдите в систему');
      this.rootNode.append(expiredMessage, new AuthorizationPage(GlobalConstants.ROUTE_MAIN).getElement());
    }
  }
}
