import { IWord } from '../../../../interfaces/IWord';
import { GlobalConstants } from '../../../../../GlobalConstants';
import { dch } from '../../../dch';
import Renderable from '../../../Renderable';
import './Card.scss';
import { TokenProvider } from '../../../../services/TokenProvider';
import { UserWordService } from '../../../../services/UserWordService';

export class Card extends Renderable {
  data: IWord;

  difficultyButton: HTMLElement;

  buttonAddWordToStudied: HTMLElement;

  userId: string | null;

  constructor(data: IWord) {
    super();
    this.data = data;
    this.userId = TokenProvider.getUserId();
    const image = dch('img', ['card-mage']);
    image.setAttribute('src', `${GlobalConstants.DEFAULT_API_URL}/${data.image}`);
    image.setAttribute('alt', 'image');

    const imageContainer = dch('div', ['card-image-container'], '', image);
    const textContainer = dch('div', ['discription-container']);
    this.rootNode = dch('div', ['card'], '', imageContainer, textContainer);
    const audioWord = new Audio(`${GlobalConstants.DEFAULT_API_URL}/${data.audio}`);
    const audioMeaning = new Audio(`${GlobalConstants.DEFAULT_API_URL}/${data.audioMeaning}`);
    const audioExample = new Audio(`${GlobalConstants.DEFAULT_API_URL}/${data.audioExample}`);

    const word = dch('h3', ['word-title'], data.word);
    const transcription = dch('span', ['word-subtitle'], data.transcription);
    const wordTranslate = dch('span', ['word-subtitle'], data.wordTranslate);
    const audioButton = dch('button', ['word-btn'], 'play');
    audioButton.onclick = async () => {
      await audioMeaning.play();
      await audioWord.play();
      await audioExample.play();
    };

    const textMeaning = dch('p', ['card-text'], data.textMeaning);
    const textMeaningTranslate = dch('p', ['card-text'], data.textMeaningTranslate);
    const textExample = dch('p', ['card-text'], data.textExample);
    const textExampleTranslate = dch('p', ['card-text'], data.textExampleTranslate);
    textContainer.append(
      word,
      transcription,
      wordTranslate,
      audioButton,
      textMeaning,
      textMeaningTranslate,
      textExample,
      textExampleTranslate,
    );

    if (this.userId) {
      UserWordService.getUserWordById(this.userId, data.id).then((wordData) => {
        if (wordData) {
          this.difficultyButton.innerText = (wordData.difficulty === 'normal')
            ? 'простое' : 'сложное';
          this.difficultyButton.addEventListener('click', () => {
            this.toggleWordDifficulty(data.id);
          });
        }
      }).catch(() => {
        this.difficultyButton.innerText = 'сложное';
        this.difficultyButton.addEventListener('click', () => {
          if (this.userId) {
            UserWordService.setWorDifficultById(this.userId, data.id)
              .catch(() => {});
            this.difficultyButton.innerText = 'простое';
          }
        });
      });
    }

    this.difficultyButton = dch(
      'button',
      ['word-btn'],
    );
    this.difficultyButton.addEventListener('click', () => {
      this.toggleWordDifficulty(data.id);
    });
    this.buttonAddWordToStudied = dch('button', ['word-btn'], 'изученное');

    if (!TokenProvider.checkIsExpired()) {
      textContainer.append(this.difficultyButton, this.buttonAddWordToStudied);
    }
  }

  toggleWordDifficulty(id: string) {
    if (this.userId) {
      UserWordService.getUserWordById(this.userId, id).then((wordData) => {
        if (wordData.difficulty === 'hard' && this.userId) {
          UserWordService.setWordNormalById(this.userId, id)
            .catch(() => {});
          this.difficultyButton.innerText = 'простое';
        } else if (wordData.difficulty === 'normal' && this.userId) {
          UserWordService.setWorDifficultById(this.userId, id)
            .catch(() => {});
          this.difficultyButton.innerText = 'сложное';
        }
      }).catch(() => {
      });
    }
  }
}
