import { dch } from '../../dch';
import { IWord } from '../../../interfaces/IWord';
import { Card } from './card/Card';
import Renderable from '../../Renderable';
import { IPaginatedArray } from '../../../interfaces/IPaginatedArray';
import { TokenProvider } from '../../../services/TokenProvider';
import { UserWordService } from '../../../services/UserWordService';
import { IWordAdanced } from '../../../interfaces/IWordAdvanced';
import './CardsContainer.scss';

export class CardsContainer extends Renderable {
  data: IPaginatedArray<IWord>;

  constructor(data: IPaginatedArray<IWord>) {
    super();
    this.data = data;
    this.rootNode = dch('div', ['cards-container']);

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
}
