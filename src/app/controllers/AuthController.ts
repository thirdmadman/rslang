import { AbstractController } from './AbstractController';
import { AuthorizationPage } from '../views/auth/AuthorizationPage';
import { GlobalConstants } from '../../GlobalConstants';
import { Menu } from '../views/menu/Menu';
import { musicPlayer2 } from '../services/SingleMusicPlayer2';

export class AuthController extends AbstractController {
  resolve(path: string) {
    const currentTrack = musicPlayer2.getCurrentPlayingTrack();
    if (!currentTrack || currentTrack.indexOf(GlobalConstants.AUTH_MUSIC_NAME) < 0) {
      musicPlayer2.setVolume(0.2);
      musicPlayer2.setPlayList([`${GlobalConstants.MUSIC_PATH + GlobalConstants.AUTH_MUSIC_NAME}`], true);
      musicPlayer2.play().catch(() => {});
    }

    this.rootNode.innerHTML = '';
    this.rootNode.append(new Menu().getElement());
    this.rootNode.append(new AuthorizationPage(path).getElement());
  }
}
