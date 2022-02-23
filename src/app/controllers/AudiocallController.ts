import { AbstractController } from './AbstractController';
import { Menu } from '../views/menu/Menu';
import { AudiocallPage } from '../views/audiocall/AudiocallPage';
import { musicPlayer2 } from '../services/SingleMusicPlayer2';
import { GlobalConstants } from '../../GlobalConstants';

export class AudiocallController extends AbstractController {
  resolve(path: string) {
    const currentTrack = musicPlayer2.getCurrentPlayingTrack();
    if (!currentTrack || currentTrack.indexOf(GlobalConstants.AUDIOCALL_MUSIC_NAME) < 0) {
      musicPlayer2.setVolume(0.3);
      musicPlayer2.setPlayList([`${GlobalConstants.MUSIC_PATH + GlobalConstants.AUDIOCALL_MUSIC_NAME}`], true);
      musicPlayer2.play().catch(() => {});
    }

    this.rootNode.innerHTML = '';
    this.rootNode.append(new Menu().getElement());

    const currentGroup = Number(path.split('/')[1]) || -1;
    const currentPage = Number(path.split('/')[2]) || -1;

    this.rootNode.append(new AudiocallPage(currentGroup, currentPage).getElement());
  }
}
