import { IWord } from '../../../../interfaces/IWord';
import { GlobalConstants } from '../../../../../GlobalConstants';
import { dch } from '../../../dch';
import Renderable from '../../../Renderable';
import './card.scss';

interface IButtonVisible {
  isButtonVisible: boolean;
}

export class Card extends Renderable {
  data: IWord;

  constructor(data: IWord, buttonVisible: IButtonVisible) {
    super();
    this.data = data;
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

    if (buttonVisible.isButtonVisible) {
      const dificcultyButton = dch('button', ['word-btn'], 'сложное');
      const studyButton = dch('button', ['word-btn'], 'изученное');
      textContainer.append(dificcultyButton, studyButton);
    }
  }
}
