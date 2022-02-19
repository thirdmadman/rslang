import { IWordAdanced } from '../../../../interfaces/IWordAdvanced';
import { GlobalConstants } from '../../../../../GlobalConstants';
import { dch } from '../../../dch';
import Renderable from '../../../Renderable';
import './Card.scss';
import { TokenProvider } from '../../../../services/TokenProvider';
import { UserWordService } from '../../../../services/UserWordService';
import { musicPlayer } from '../../../../services/SingleMusicPlayer';

export class Card extends Renderable {
  data: IWordAdanced;

  difficultyButton: HTMLElement;

  buttonSetLearnedState: HTMLElement;

  private isWordDifficult = false;

  private isWordLearned = false;

  constructor(data: IWordAdanced) {
    super();
    this.data = data;
    const userId = TokenProvider.getUserId();
    const image = dch('img', ['card-mage']);
    image.setAttribute('src', `${GlobalConstants.DEFAULT_API_URL}/${this.data.word.image}`);
    image.setAttribute('alt', 'image');

    const imageContainer = dch('div', ['card-image-container'], '', image);
    const textContainer = dch('div', ['discription-container']);
    this.rootNode = dch('div', ['card'], '', imageContainer, textContainer);
    const audioWord = `${GlobalConstants.DEFAULT_API_URL}/${this.data.word.audio}`;
    const audioMeaning = `${GlobalConstants.DEFAULT_API_URL}/${this.data.word.audioMeaning}`;
    const audioExample = `${GlobalConstants.DEFAULT_API_URL}/${this.data.word.audioExample}`;

    const word = dch('h3', ['word-title'], this.data.word.word);
    const transcription = dch('span', ['word-subtitle'], this.data.word.transcription);
    const wordTranslate = dch('span', ['word-subtitle'], this.data.word.wordTranslate);
    const audioButton = dch('button', ['word-btn'], 'play');
    audioButton.onclick = () => {
      musicPlayer.setPlayList([audioWord, audioMeaning, audioExample]);
      musicPlayer.play().catch(() => {});
    };

    const textMeaning = dch('p', ['card-text'], this.data.word.textMeaning);
    const textMeaningTranslate = dch('p', ['card-text'], this.data.word.textMeaningTranslate);
    const textExample = dch('p', ['card-text'], this.data.word.textExample);
    const textExampleTranslate = dch('p', ['card-text'], this.data.word.textExampleTranslate);
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
    this.difficultyButton = dch('button', ['word-btn']);
    this.difficultyButton.innerText = 'Add to "difficult"';
    this.difficultyButton.onclick = () => this.buttonToggleDifficultyHandler();

    this.buttonSetLearnedState = dch('button', ['word-btn']);
    this.buttonSetLearnedState.innerText = 'Add to "learned"';
    this.buttonSetLearnedState.onclick = () => this.buttonToggleLearnedHandler();

    if (userId) {
      if (this.data.userData) {
        if (this.data.userData.difficulty !== 'normal') {
          this.isWordDifficult = true;
          this.difficultyButton.innerText = 'Remove from "difficult"';
        }

        if (this.data.userData.optional.isLearned) {
          this.isWordLearned = true;
          this.buttonSetLearnedState.innerText = 'Remove from "learned"';
        }
        const gamesResultContainer = dch('div', ['gamesResult-container'], `
     ${this.data.userData.optional.successCounter}/
     ${this.data.userData.optional.successCounter + this.data.userData.optional.successCounter}`);
        this.rootNode.append(gamesResultContainer);
      }
      textContainer.append(this.difficultyButton, this.buttonSetLearnedState);
    }
  }

  private buttonToggleDifficultyHandler() {
    const userId = TokenProvider.getUserId();
    if (!userId) {
      return;
    }
    if (!this.isWordDifficult) {
      UserWordService.setWorDifficultById(userId, this.data.word.id).then((userWord) => {
        if (userWord) {
          this.isWordDifficult = true;
          this.difficultyButton.innerText = 'Remove from "difficult"';
        }
      }).catch(() => {});
    } else {
      UserWordService.setWordNormalById(userId, this.data.word.id).then((userWord) => {
        if (userWord) {
          this.isWordDifficult = false;
          this.difficultyButton.innerText = 'Add to "difficult"';
        }
      }).catch(() => {});
    }
  }

  private buttonToggleLearnedHandler() {
    const userId = TokenProvider.getUserId();
    if (!userId) {
      return;
    }
    if (!this.isWordLearned) {
      UserWordService.addWordLearnedById(userId, this.data.word.id).then((userWord) => {
        if (userWord) {
          this.isWordLearned = true;
          this.buttonSetLearnedState.innerText = 'Remove from "learned"';
        }
      }).catch(() => {});
    } else {
      UserWordService.removeWordFromLearnedById(userId, this.data.word.id).then((userWord) => {
        if (userWord) {
          this.isWordLearned = false;
          this.buttonSetLearnedState.innerText = 'Add to "learned"';
        }
      }).catch(() => {});
    }
  }
}
