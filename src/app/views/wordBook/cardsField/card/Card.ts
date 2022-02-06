/* eslint-disable max-len */
import { Control } from '../../../../services/control';
import { IWord } from '../../../../interfaces/IWord';
import { GlobalConstants } from '../../../../../GlobalConstants';

export class Card extends Control {
  data: IWord;

  imageContainer: Control;

  image: Control;

  textContainer: Control;

  word: Control;

  transcription: Control;

  wordTranslate: Control;

  audioButton: Control;

  audioWord: HTMLAudioElement;

  textMeaning: Control;

  textMeaningTranslate: Control;

  textExample: Control;

  textExampleTranslate: Control;

  constructor(parentNode: HTMLElement, data: IWord) {
    super(parentNode, 'div', 'word-card');
    this.data = data;
    this.audioWord = new Audio(`${GlobalConstants.DEFAULT_API_URL}/${data.audio}`);
    this.imageContainer = new Control(this.node, 'div', 'card-image-container');
    this.image = new Control(this.imageContainer.node, 'img', 'card-mage');
    this.image.node.setAttribute('src', `${GlobalConstants.DEFAULT_API_URL}/${data.image}`);
    this.image.node.setAttribute('alt', 'image');
    this.textContainer = new Control(this.node, 'div', 'discription-container');
    this.word = new Control(this.textContainer.node, 'h3', 'word-title', data.word);
    this.transcription = new Control(this.textContainer.node, 'span', 'word-subtitle', data.transcription);
    this.wordTranslate = new Control(this.textContainer.node, 'span', 'word-subtitle', data.wordTranslate);
    this.audioButton = new Control(this.textContainer.node, 'button', 'word-btn', 'play');

    this.audioButton.node.onclick = async () => this.playAudio();
    this.textMeaning = new Control(this.textContainer.node, 'p', 'card-text');
    this.textMeaning.node.innerHTML = data.textMeaning;
    this.textMeaningTranslate = new Control(this.textContainer.node, 'p', 'card-text', data.textMeaningTranslate);
    this.textExample = new Control(this.textContainer.node, 'p', 'card-text');
    this.textExample.node.innerHTML = data.textExample;
    this.textExampleTranslate = new Control(this.textContainer.node, 'p', 'card-text', data.textExampleTranslate);
  }

  async playAudio() {
    await this.audioWord.play();
  }
}
