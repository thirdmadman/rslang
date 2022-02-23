import { AbstractController } from './AbstractController';
import { AuthorizationPage } from '../views/auth/AuthorizationPage';
import { GlobalConstants } from '../../GlobalConstants';
import { Menu } from '../views/menu/Menu';
import { musicPlayer2 } from '../services/SingleMusicPlayer2';

export class AuthController extends AbstractController {
  resolve(path: string) {
    const currentTrack = musicPlayer2.getCurrentPlayingTrack();
    if (!currentTrack || currentTrack.indexOf(GlobalConstants.AUTH_MUSIC_NAME) < 0) {
      musicPlayer2.setVolume(0.8);
      musicPlayer2.setPlayList([`${GlobalConstants.MUSIC_PATH + GlobalConstants.AUTH_MUSIC_NAME}`], true);
      musicPlayer2.play().catch(() => {});
    }

    this.rootNode.innerHTML = '';
    this.rootNode.append(new Menu().getElement());
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
