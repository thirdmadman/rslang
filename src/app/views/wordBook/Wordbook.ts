import { GlobalConstants } from '../../../GlobalConstants';
import { IPaginatedArray } from '../../interfaces/IPaginatedArray';
import { IWord } from '../../interfaces/IWord';
import { PathBus } from '../../services/PathBus';
import { dch } from '../dch';
import Renderable from '../Renderable';
import { CardsContainer } from './cardsContainer/CardsContainer';
import './Wordbook.scss';

export class Wordbook extends Renderable {
  private data: IPaginatedArray<IWord>;

  constructor(data: IPaginatedArray<IWord>) {
    super();
    this.rootNode = dch('div', ['wordbook']);
    this.data = data;

    const pageTitle = dch('div', ['wordbook__title'], 'Their memories');

    const prevPageButton = dch('button', ['pagination__button', 'pagination__button_prev']);
    prevPageButton.onclick = () => this.changePage('prev');
    const nextPageButton = dch('button', ['pagination__button', 'pagination__button_next']);
    nextPageButton.onclick = () => this.changePage('next');
    const paginationPageText = dch(
      'div',
      ['pagination__text'],
      `Page number ${data.currentPage + 1}/${GlobalConstants.NUMBER_OF_PAGES}`,
    );
    const paginationPage = dch('div', ['pagination'], '', prevPageButton, paginationPageText, nextPageButton);

    const prevLevelButton = dch('button', ['pagination__button', 'pagination__button_prev']);
    prevLevelButton.onclick = () => this.changeLevel('prev');
    const nextLevelButton = dch('button', ['pagination__button', 'pagination__button_next']);
    nextLevelButton.onclick = () => this.changeLevel('next');
    const paginationLevelText = dch(
      'div',
      ['pagination__text'],
      `Depth level ${data.currentGroup + 1}/${GlobalConstants.NUMBER_OF_GROUP_NO_AUTH_USER}`,
    );
    const paginationLevel = dch('div', ['pagination'], '', prevLevelButton, paginationLevelText, nextLevelButton);

    const cardsContainer = new CardsContainer(data);

    const navigationContainer = dch('div', ['navigation-container']);
    navigationContainer.append(paginationLevel, paginationPage);

    this.rootNode.append(pageTitle, navigationContainer, cardsContainer.getElement());
  }

  changePage(btn: string) {
    if (btn === 'prev') {
      if (this.data.currentPage > 0) this.data.currentPage--;
      PathBus.setCurrentPath(
        `${GlobalConstants.ROUTE_WORDBOOK}/${this.data.currentGroup + 1}/${this.data.currentPage + 1}`,
      );
    }

    if (btn === 'next') {
      if (this.data.currentPage < GlobalConstants.NUMBER_OF_PAGES - 1) this.data.currentPage++;
      PathBus.setCurrentPath(
        `${GlobalConstants.ROUTE_WORDBOOK}/${this.data.currentGroup + 1}/${this.data.currentPage + 1}`,
      );
    }
  }

  changeLevel(btn: string) {
    if (btn === 'prev') {
      if (this.data.currentGroup > 0) this.data.currentGroup--;
      PathBus.setCurrentPath(
        `${GlobalConstants.ROUTE_WORDBOOK}/${this.data.currentGroup + 1}/${this.data.currentPage + 1}`,
      );
    }

    if (btn === 'next') {
      if (this.data.currentGroup < GlobalConstants.NUMBER_OF_GROUP_NO_AUTH_USER - 1) this.data.currentGroup++;
      PathBus.setCurrentPath(
        `${GlobalConstants.ROUTE_WORDBOOK}/${this.data.currentGroup + 1}/${this.data.currentPage + 1}`,
      );
    }
  }
}
