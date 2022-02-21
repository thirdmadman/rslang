import { GlobalConstants } from '../../../GlobalConstants';
import { dch } from '../dch';
import Renderable from '../Renderable';
import './Menu.scss';

const menuData = [
  {
    title: 'Their memories',
    path: `${GlobalConstants.ROUTE_WORDBOOK}/1/1`,
  },
  {
    title: 'Audio decoding',
    path: GlobalConstants.ROUTE_AUDIOCALL,
  },
  {
    title: 'Meaning resolving',
    path: GlobalConstants.ROUTE_SPRINT,
  },
  {
    title: 'Identity Recognizing',
    path: GlobalConstants.ROUTE_AUTH,
  },
  {
    title: 'Ancestors',
    path: GlobalConstants.ROUTE_MAIN,
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
    menuData.forEach((item) => {
      const link = dch('a', ['nav-menu--link'], `${item.title}`) as HTMLAnchorElement;
      link.href = `#${item.path}`;
      const list = dch('li', ['nav-menu--item'], '', link);
      this.navigationList.append(list);
    });
    this.navigation = dch('nav', ['nav-menu'], '', this.navigationList);
    this.appNameContainer = dch('div', ['app-name-container'], '', this.name);
    this.navigationContainer = dch('div', ['navigation-container'], '', this.logoContainer, this.navigation);
    this.closeBtn = dch('button', ['close-button']);
    this.closeBtn.onclick = () => {
      this.cancel();
    };
    this.main = dch('div', ['main'], '', this.appNameContainer, this.navigationContainer);
    this.rootNode = dch('div', ['menu'], '', this.main, this.closeBtn);
  }

  cancel = () => {
    this.rootNode.remove();
  };
}
