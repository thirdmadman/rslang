import { AbstractController } from './AbstractController';
import { WordService } from '../services/WordService';
import { Wordbook } from '../views/wordBook/Wordbook';
import { GlobalConstants } from '../../GlobalConstants';
import { Menu } from '../views/menu/Menu';
import { PathBus } from '../services/PathBus';
import { musicPlayer2 } from '../services/SingleMusicPlayer2';

export class WordbookController extends AbstractController {
  resolve(path: string) {
    const currentTrack = musicPlayer2.getCurrentPlayingTrack();
    if (!currentTrack || currentTrack.indexOf(GlobalConstants.WORDBOOK_MUSIC_NAME) < 0) {
      musicPlayer2.setVolume(0.09);
      musicPlayer2.setPlayList([`${GlobalConstants.MUSIC_PATH + GlobalConstants.WORDBOOK_MUSIC_NAME}`], true);
      musicPlayer2.play().catch(() => {});
    }

    this.rootNode.innerHTML = '';
    this.rootNode.append(new Menu().getElement());

    let currentGroup = Number(path.split('/')[1]);
    let currentPage = Number(path.split('/')[2]);

    if (!currentGroup || !currentPage) {
      PathBus.setCurrentPath(`${GlobalConstants.ROUTE_WORDBOOK}/1/1`);
      return;
    }

    if (currentPage < 1) {
      currentPage = 1;
    } else if (currentPage > GlobalConstants.NUMBER_OF_PAGES) {
      currentPage = GlobalConstants.NUMBER_OF_PAGES;
    }

    if (currentGroup < 1) {
      currentGroup = 1;
    } else if (currentGroup > GlobalConstants.NUMBER_OF_GROUP_NO_AUTH_USER) {
      currentGroup = GlobalConstants.NUMBER_OF_GROUP_NO_AUTH_USER;
    }

    WordService.getWordsByGroupAndPage(currentGroup - 1, currentPage - 1).then((data) => {
      this.rootNode.append(new Wordbook(data).getElement());
    }).catch((e) => console.error(e));
  }
}
