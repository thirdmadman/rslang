/* eslint-disable class-methods-use-this */
import { dch } from '../dch';
import Renderable from '../Renderable';
import { GlobalConstants } from '../../../GlobalConstants';
import { musicPlayer } from '../../services/SingleMusicPlayer';
import { IWord } from '../../interfaces/IWord';
import './AudiocallQuestion.scss';
import { IGameQuestion } from '../../interfaces/IGameQuestion';

export class AudiocallQuestion extends Renderable {
  private questionData: IGameQuestion;

  private audioWord: string;

  private playAudioButton: HTMLElement;

  private title: HTMLElement;

  private answersContainer: HTMLElement;

  constructor(questionData: IGameQuestion) {
    super();

    this.questionData = questionData;
    this.title = dch('h3', ['word-container--title'], 'In progress');
    this.audioWord = `${GlobalConstants.DEFAULT_API_URL}/${this.questionData.wordData.audio}`;
    this.playAudio(this.audioWord);
    this.answersContainer = dch('div', ['game-btn-container']);

    const questionText = dch('div', ['word-container--question-text'], 'Choose correct one');

    this.playAudioButton = dch('button', ['audio-btn']);
    this.playAudioButton.onclick = () => {
      this.playAudio(this.audioWord);
    };

    this.rootNode = dch(
      'div',
      ['word-container'],
      '',
      this.title,
      this.playAudioButton,
      questionText,
      this.answersContainer,
    );

    this.questionData.variants.sort(() => Math.random() - 0.5)
      .forEach((answer, index) => {
        const answerBtnNum = dch('div', ['button-answer--count'], `${index + 1}`);
        const answerBtn = dch('div', ['button-answer--text'], answer.wordData.wordTranslate);
        const answerBtnContainer = dch('div', ['button-answer'], '', answerBtn, answerBtnNum);
        this.answersContainer.append(answerBtnContainer);
        answerBtn.onclick = () => {
          this.onAnswer(this.questionData.wordData, answer.isCorrect);
        };
      });
    document.addEventListener('keyup', this.handlerKey);
  }

  private playAudio = (audio: string) => {
    musicPlayer.setPlayList([audio]);
    musicPlayer.play()
      .catch((e) => console.error(e));
  };

  destroy() {
    document.removeEventListener('keyup', this.handlerKey);
    this.rootNode.remove();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onAnswer = (questionData: IWord, isCorrect: boolean) => {};

  handlerKey = (event: KeyboardEvent) => {
    if (event.code === 'Digit1') {
      this.onAnswer(this.questionData.wordData, this.questionData.variants[0].isCorrect);
      document.removeEventListener('keyup', this.handlerKey);
    } else if (event.code === 'Digit2') {
      this.onAnswer(this.questionData.wordData, this.questionData.variants[1].isCorrect);
      document.removeEventListener('keyup', this.handlerKey);
    } else if (event.code === 'Digit3') {
      this.onAnswer(this.questionData.wordData, this.questionData.variants[2].isCorrect);
      document.removeEventListener('keyup', this.handlerKey);
    } else if (event.code === 'Digit4') {
      this.onAnswer(this.questionData.wordData, this.questionData.variants[3].isCorrect);
      document.removeEventListener('keyup', this.handlerKey);
    }
  };
}
