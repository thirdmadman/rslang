import { dch } from '../../dch';
import { IWord } from '../../../interfaces/IWord';
import { Card } from './card/Card';
import Renderable from '../../Renderable';
import { IPaginatedArray } from '../../../interfaces/IPaginatedArray';
import './CardsField.scss';
import { PathBus } from '../../../services/PathBus';
import { GlobalConstants } from '../../../../GlobalConstants';
import { TokenProvider } from '../../../services/TokenProvider';
import { UserWordService } from '../../../services/UserWordService';
import { IWordAdanced } from '../../../interfaces/IWordAdvanced';

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
      `${this.data.currentPage + 1}/${GlobalConstants.NUMBER_OF_PAGES}`,
    );
    const pagination = dch('div', ['pagination'], '', this.prevButton, this.pagenationNum, nextButton);
    this.rootNode = dch('div', ['cards-container'], '', pagination);

    const userId = TokenProvider.getUserId();
    let advancedWords = this.data.array.map((word) => ({ word } as IWordAdanced));
    if (userId && !TokenProvider.checkIsExpired()) {
      UserWordService.getAllWordsByUserId(userId).then((wordsData) => {
        advancedWords = this.data.array.map((word) => {
          const userWordFound = wordsData.find((userWord) => userWord.wordId === word.id);
          if (userWordFound) {
            return {
              word,
              userData: userWordFound,
            } as IWordAdanced;
          }
          return {
            word,
          } as IWordAdanced;
        });
        this.addCards(advancedWords);
      }).catch((e) => console.error(e));
    } else {
      this.addCards(advancedWords);
    }
  }

  addCards(arrayWords: Array<IWordAdanced>) {
    arrayWords.forEach((el) => {
      const card = new Card(el);
      this.rootNode.append(card.getElement());
    });
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
    this.pagenationNum.innerHTML = `${this.data.currentPage}/${GlobalConstants.NUMBER_OF_PAGES - 1}`;
  }
}
