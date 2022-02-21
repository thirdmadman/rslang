import { IWordAdanced } from '../../../../interfaces/IWordAdvanced';
import { GlobalConstants } from '../../../../../GlobalConstants';
import { dch } from '../../../dch';
import Renderable from '../../../Renderable';
import { musicPlayer } from '../../../../services/SingleMusicPlayer';
import { TokenProvider } from '../../../../services/TokenProvider';
import { UserWordService } from '../../../../services/UserWordService';
import './Card.scss';

export class Card extends Renderable {
  data: IWordAdanced;

  buttonSetDifficultyState: HTMLElement;

  buttonSetLearnedState: HTMLElement;

  private isWordDifficult = false;

  private isWordLearned = false;

  constructor(data: IWordAdanced) {
    super();
    this.data = data;
    const userId = TokenProvider.getUserId();
    this.rootNode = dch('div', ['word-card']);

    const image = dch('img', ['word-card__image']);
    image.setAttribute('src', `${GlobalConstants.DEFAULT_API_URL}/${this.data.word.image}`);
    image.setAttribute('alt', this.data.word.word);
    const imageContainer = dch('div', ['word-card__image-container']);

    const buttonShowEngDescription = dch('button', ['word-card__button-vertical', 'word-card__button-vertical_show']);
    const textWordEnglish = dch('div', ['word-card__word-english'], this.data.word.word);
    const textWordTranscription = dch('div', ['word-card__word-transcription'], this.data.word.transcription);
    const textContainer = dch('div', ['word-card__text-container']);

    const buttonPlayWordAudio = dch('button', ['word-card__play-word']);
    buttonPlayWordAudio.onclick = () => {
      musicPlayer.setPlayList([`${GlobalConstants.DEFAULT_API_URL}/${this.data.word.audio}`]);
      musicPlayer.setVolume(0.7);
      musicPlayer.play().catch((e) => console.error(e));
    };

    const engDescriptionContainer = dch('div', [
      'word-card__eng-description-container',
      'word-card__eng-description-container_hidden',
    ]);
    const ruDescriptionContainer = dch('div', [
      'word-card__ru-description-container',
      'word-card__ru-description-container_hidden',
    ]);

    const buttonShowRuDescription = dch('button', ['word-card__button-vertical', 'word-card__button-vertical_show']);
    buttonShowRuDescription.onclick = () => {
      ruDescriptionContainer.classList.remove('word-card__ru-description-container_hidden');
    };

    const buttonHideEngDescription = dch('button', ['word-card__button-vertical', 'word-card__button-vertical_hide']);
    buttonHideEngDescription.onclick = () => {
      engDescriptionContainer.classList.add('word-card__eng-description-container_hidden');
    };
    buttonShowEngDescription.onclick = () => {
      engDescriptionContainer.classList.remove('word-card__eng-description-container_hidden');
    };

    const textWordEngMeaning = dch('div', ['word-card__text-eng-meaning']);
    textWordEngMeaning.append(dch('p', [], this.data.word.textMeaning));
    const buttonPlayFullAudio = dch('button', ['word-card__play-full-word']);
    const textWordEngExample = dch('div', ['word-card__text-eng-example']);
    textWordEngExample.append(dch('p', [], this.data.word.textExample));

    buttonPlayFullAudio.onclick = () => {
      musicPlayer.setVolume(0.7);
      musicPlayer.setPlayList([
        `${GlobalConstants.DEFAULT_API_URL}/${this.data.word.audio}`,
        `${GlobalConstants.DEFAULT_API_URL}/${this.data.word.audioMeaning}`,
        `${GlobalConstants.DEFAULT_API_URL}/${this.data.word.audioExample}`,
      ]);
      musicPlayer.play().catch(() => {});
    };

    engDescriptionContainer.append(
      buttonHideEngDescription,
      textWordEngMeaning,
      buttonPlayFullAudio,
      textWordEngExample,
      buttonShowRuDescription,
    );

    const buttonHideRuDescription = dch('button', ['word-card__button-vertical', 'word-card__button-vertical_hide']);
    buttonHideRuDescription.onclick = () => {
      ruDescriptionContainer.classList.add('word-card__ru-description-container_hidden');
    };

    const textWordRu = dch('div', ['word-card__text-ru-word'], this.data.word.wordTranslate);

    const textWordRuMeaning = dch('div', ['word-card__text-ru-meaning']);
    textWordRuMeaning.append(dch('p', [], this.data.word.textMeaningTranslate));
    const textWordRuExample = dch('div', ['word-card__text-ru-example']);
    textWordRuExample.append(dch('p', [], this.data.word.textExampleTranslate));

    ruDescriptionContainer.append(buttonHideRuDescription, textWordRu, textWordRuMeaning, textWordRuExample);

    textContainer.append(buttonShowEngDescription, textWordEnglish, textWordTranscription);
    imageContainer.append(image);
    this.rootNode.append(
      imageContainer,
      textContainer,
      buttonPlayWordAudio,
      engDescriptionContainer,
      ruDescriptionContainer,
    );

    this.buttonSetDifficultyState = dch('button', ['word-card__button-difficulty']);
    this.buttonSetDifficultyState.onclick = () => this.buttonToggleDifficultyHandler();

    this.buttonSetLearnedState = dch('button', ['word-card__button-learned']);
    this.buttonSetLearnedState.onclick = () => this.buttonToggleLearnedHandler();

    if (userId) {
      if (this.data.userData) {
        if (this.data.userData.difficulty && this.data.userData.difficulty !== 'normal') {
          this.isWordDifficult = true;
          this.buttonSetDifficultyState.classList.add('word-card__button-difficulty_true');
        }

        if (this.data.userData.optional && this.data.userData.optional.isLearned) {
          this.isWordLearned = true;
          this.buttonSetLearnedState.classList.add('word-card__button-learned_true');

          const resultText = `${this.data.userData.optional.successCounter}/
          ${this.data.userData.optional.successCounter + this.data.userData.optional.successCounter}`;

          const gamesResultContainer = dch('div', ['word-card__games-result'], resultText);
          imageContainer.append(gamesResultContainer);
        }
      }
      imageContainer.append(this.buttonSetDifficultyState, this.buttonSetLearnedState);
    }
  }

  private buttonToggleDifficultyHandler() {
    const userId = TokenProvider.getUserId();
    if (!userId) {
      return;
    }
    if (!this.isWordDifficult) {
      UserWordService.setWorDifficultById(userId, this.data.word.id)
        .then((userWord) => {
          if (userWord) {
            this.isWordDifficult = true;
            this.buttonSetDifficultyState.classList.add('word-card__button-difficulty_true');
          }
        })
        .catch(() => {});
    } else {
      UserWordService.setWordNormalById(userId, this.data.word.id)
        .then((userWord) => {
          if (userWord) {
            this.isWordDifficult = false;
            this.buttonSetDifficultyState.classList.remove('word-card__button-difficulty_true');
          }
        })
        .catch(() => {});
    }
  }

  private buttonToggleLearnedHandler() {
    const userId = TokenProvider.getUserId();
    if (!userId) {
      return;
    }
    if (!this.isWordLearned) {
      UserWordService.addWordLearnedById(userId, this.data.word.id)
        .then((userWord) => {
          if (userWord) {
            this.isWordLearned = true;
            this.buttonSetLearnedState.classList.add('word-card__button-learned_true');
          }
        })
        .catch(() => {});
    } else {
      UserWordService.removeWordFromLearnedById(userId, this.data.word.id)
        .then((userWord) => {
          if (userWord) {
            this.isWordLearned = false;
            this.buttonSetLearnedState.classList.remove('word-card__button-learned_true');
          }
        })
        .catch(() => {});
    }
  }
}
