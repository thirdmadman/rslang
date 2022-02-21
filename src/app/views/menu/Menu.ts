import { GlobalConstants } from '../../../GlobalConstants';
import { PathBus } from '../../services/PathBus';
import { TokenProvider } from '../../services/TokenProvider';
import { dch } from '../dch';
import Renderable from '../Renderable';
import './Menu.scss';

const menuData = [
  {
    title: 'Their memories',
    path: `${GlobalConstants.ROUTE_WORDBOOK}/1/1`,
    isAuthNeeded: false,
  },
  {
    title: 'Audio decoding',
    path: GlobalConstants.ROUTE_AUDIOCALL,
    isAuthNeeded: false,
  },
  {
    title: 'Meaning resolving',
    path: GlobalConstants.ROUTE_SPRINT,
    isAuthNeeded: false,
  },
  {
    title: 'Diary',
    path: GlobalConstants.ROUTE_STATISTICS,
    isAuthNeeded: true,
  },
  {
    title: 'Identity Recognizing',
    path: GlobalConstants.ROUTE_AUTH,
    isAuthNeeded: false,
  },
  {
    title: 'Our memories',
    path: GlobalConstants.ROUTE_VOCABULARY,
    isAuthNeeded: true,
  },
  {
    title: 'Ancestors',
    path: GlobalConstants.ROUTE_MAIN,
    isAuthNeeded: false,
  },
];

export class Menu extends Renderable {
  appNameContainer: HTMLElement;

  navigationContainer: HTMLElement;

  name: HTMLElement;

  main: HTMLElement;

  nameText: HTMLElement;

  navigation: HTMLElement;

  navigationList: HTMLElement;

  logoContainer: HTMLElement;

  closeBtn: HTMLElement;

  constructor() {
    super();
    this.nameText = dch('div', ['app-name--text'], 'Forgotten Words');
    this.name = dch('div', ['app-name'], '', this.nameText);
    this.logoContainer = dch('div', ['logo-container']);
    this.navigationList = dch('ul', ['nav-menu--list']);
    const currentPath = PathBus.getCurrentPath();
    const isUserAuth = Boolean(TokenProvider.getToken());
    menuData.forEach((item) => {
      const link = dch('a', ['nav-menu--link'], `${item.title}`) as HTMLAnchorElement;
      link.href = `#${item.path}`;
      const list = dch('li', ['nav-menu--item'], '', link);
      if (currentPath.indexOf(item.path) === 0) {
        list.classList.add('nav-menu--item-active');
        link.classList.add('nav-menu--link-active');
      }
      if (item.isAuthNeeded) {
        if (isUserAuth) {
          this.navigationList.append(list);
        }
      } else {
        this.navigationList.append(list);
      }
    });
    this.navigation = dch('nav', ['nav-menu'], '', this.navigationList);
    this.appNameContainer = dch('div', ['app-name-container'], '', this.name);
    this.navigationContainer = dch('div', ['navigation-container'], '', this.logoContainer, this.navigation);
    this.closeBtn = dch('button', ['close-button']);
    this.closeBtn.onclick = () => {
      this.cancel();
    };
    this.main = dch('div', ['menu-main'], '', this.appNameContainer, this.navigationContainer);
    this.rootNode = dch('div', ['menu'], '', this.main, this.closeBtn);
  }

  cancel = () => {
    this.rootNode.remove();
  };
}
