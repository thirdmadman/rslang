import { GlobalConstants } from '../../../GlobalConstants';
import { PathBus } from '../../services/PathBus';
import { TokenProvider } from '../../services/TokenProvider';
import { dch } from '../dch';
import Renderable from '../Renderable';
import './Menu.scss';

const menuData = [
  {
    title: 'Their memories',
    path: GlobalConstants.ROUTE_WORDBOOK,
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

  navigation: HTMLElement;

  navigationList: HTMLElement;

  logoContainer: HTMLElement;

  closeBtn: HTMLElement;

  constructor() {
    super();
    this.name = dch('div', ['app-name'], 'Forgotten Words');
    this.logoContainer = dch('div', ['logo-container']);
    this.navigationList = dch('ul', ['nav-menu--list']);
    const currentPath = PathBus.getCurrentPath();
    const isUserAuth = Boolean(TokenProvider.getToken()) && !TokenProvider.checkIsExpired();
    menuData.forEach((item) => {
      const link = dch('a', ['nav-menu--link'], `${item.title}`) as HTMLAnchorElement;
      link.href = `#${item.path}`;
      const list = dch('li', ['nav-menu--item'], '', link);

      if (currentPath.indexOf(item.path) === 0) {
        list.classList.add('nav-menu--item-active');
      }

      if (currentPath.indexOf(GlobalConstants.ROUTE_WORDBOOK) === 0) {
        const currentGroup = Number(currentPath.split('/')[2]);
        const currentPage = Number(currentPath.split('/')[3]);

        const setNewHref = (path: string, group: number, page: number) => {
          if (group && page) {
            link.href = `#${path}/${group}/${page}`;
          }
        };

        if (item.path === GlobalConstants.ROUTE_AUDIOCALL) {
          setNewHref(item.path, currentGroup, currentPage);
        } else if (item.path === GlobalConstants.ROUTE_SPRINT) {
          setNewHref(item.path, currentGroup, currentPage);
        }
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

    const buttonBurgerMenu = dch('button', ['burger-menu-button']);
    buttonBurgerMenu.onclick = () => {
      this.main.classList.remove('main-hidden');
      buttonBurgerMenu.classList.add('burger-menu-button-hidden');
    };

    this.closeBtn = dch('button', ['close-button']);
    this.closeBtn.onclick = () => {
      this.main.classList.add('main-hidden');
      buttonBurgerMenu.classList.remove('burger-menu-button-hidden');
    };

    this.main = dch('div', ['main', 'main-hidden'], '', this.appNameContainer, this.navigationContainer, this.closeBtn);
    this.rootNode = dch('div', ['menu'], '', this.main, buttonBurgerMenu);
  }
}
