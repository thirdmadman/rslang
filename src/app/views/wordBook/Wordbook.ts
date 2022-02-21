import { GlobalConstants } from '../../../GlobalConstants';
import { IPaginatedArray } from '../../interfaces/IPaginatedArray';
import { IWord } from '../../interfaces/IWord';
import { PathBus } from '../../services/PathBus';
import { dch } from '../dch';
import Renderable from '../Renderable';
import { CardsField } from './cardsField/CardsField';
import { LevelNavigation } from './levelNavigation/LevelNavigation';

export class Wordbook extends Renderable {
  private data: IPaginatedArray<IWord>;

  constructor(data: IPaginatedArray<IWord>) {
    super();
    this.rootNode = dch('div', ['wordbook']);
    this.data = data;
    const prevButton = dch('button', ['pagination-button', 'prev'], 'prev');
    prevButton.onclick = () => this.changePage('prev');
    const nextButton = dch('button', ['pagination-button', 'next'], 'next');
    nextButton.onclick = () => this.changePage('next');
    const paginationNum = dch(
      'div',
      ['pagination-text'],
      `${data.currentPage + 1}/${GlobalConstants.NUMBER_OF_PAGES}`,
    );
    const pagination = dch('div', ['pagination'], '', prevButton, paginationNum, nextButton);

    const cardField = new CardsField(data);
    const levelNavigation = new LevelNavigation(data);

    this.rootNode.append(levelNavigation.getElement(), pagination, cardField.getElement());
  }

  changePage(btn: string) {
    if (this.data.currentPage < 0) {
      this.data.currentPage = 0;
    } else if (this.data.currentPage > GlobalConstants.NUMBER_OF_PAGES) {
      this.data.currentPage = GlobalConstants.NUMBER_OF_PAGES;
    }
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
}
