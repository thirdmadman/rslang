import { AbstractController } from './AbstractController';
import { AuthorizationPage } from '../views/auth/AuthorizationPage';
import { GlobalConstants } from '../../GlobalConstants';

export class AuthController extends AbstractController {
  resolve(path: string) {
    const currentPath = path.split('/');
    const redirectPage = path.split('?path=');
    if (!path) {
      this.rootNode.append(new AuthorizationPage().getElement());
    }
    if (path === '/expired') {
      this.rootNode.append(new AuthorizationPage(GlobalConstants.ROUTE_MAIN).getElement());
    }
    if (currentPath[1] === 'expired?path=') {
      this.rootNode.append(new AuthorizationPage(redirectPage[1]).getElement());
    }
  }
}
