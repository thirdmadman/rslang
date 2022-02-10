import { dch } from '../../dch';
import { IWord } from '../../../interfaces/IWord';
import { Card } from './card/Card';
import Renderable from '../../Renderable';
import { IPaginatedArray } from '../../../interfaces/IPaginatedArray';
import './CardsField.scss';
import { PathBus } from '../../../services/PathBus';
import { GlobalConstants } from '../../../../GlobalConstants';

export class CardsField extends Renderable {
  data: IPaginatedArray<IWord>;

  pagenationNum: HTMLElement;

  prevButton: HTMLElement;

  constructor(data: IPaginatedArray<IWord>) {
    super();
    this.data = data;
    this.prevButton = dch('button', ['pagination-button', 'prev'], 'prev');
    this.prevButton.onclick = () => this.changePage('prev');
    const nextButton = dch('button', ['pagination-button', 'next'], 'next');
    nextButton.onclick = () => this.changePage('next');
    this.pagenationNum = dch(
      'div',
      ['pagination-text'],
      `${this.data.currentPage}/${GlobalConstants.NUMBER_OF_PAGES - 1}`,
    );
    const pagenation = dch('div', ['pagination'], '', this.prevButton, this.pagenationNum, nextButton);
    this.rootNode = dch('div', ['cards-container'], '', pagenation);
    this.addCards(this.data.array);
  }

  addCards(arrayWords: IWord[]) {
    arrayWords.forEach((el) => {
      const card = new Card(el, { isButtonVisible: true });
      this.rootNode.append(card.getElement());
    });
  }

  changePage(btn: string) {
    if (this.data.currentPage < 1) {
      this.data.currentPage = 1;
    } else if (this.data.currentPage > GlobalConstants.NUMBER_OF_PAGES) {
      this.data.currentPage = GlobalConstants.NUMBER_OF_PAGES;
    }
    if (btn === 'prev') {
      if (this.data.currentPage > 0) this.data.currentPage--;
      PathBus.setCurrentPath(
        `${GlobalConstants.ROUTE_WORDBOOK}/${this.data.currentGroup}/${this.data.currentPage}`,
      );
    }

    if (btn === 'next') {
      if (this.data.currentPage < GlobalConstants.NUMBER_OF_PAGES - 1) this.data.currentPage++;
      this.updateCardField(this.data);
      PathBus.setCurrentPath(
        `${GlobalConstants.ROUTE_WORDBOOK}/${this.data.currentGroup}/${this.data.currentPage}`,
      );
    }
    this.pagenationNum.innerHTML = `${this.data.currentPage}/${GlobalConstants.NUMBER_OF_PAGES - 1}`;
  }

  updateCardField: (data: IPaginatedArray<IWord>) => void = () => {};
}
