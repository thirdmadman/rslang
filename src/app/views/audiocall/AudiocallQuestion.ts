import { dch } from '../dch';
import Renderable from '../Renderable';
import { IAudiocallQuestion } from '../../interfaces/IAudiocallQuestion';
import { GlobalConstants } from '../../../GlobalConstants';
import { musicPlayer } from '../../services/SingleMusicPlayer';
import { IWord } from '../../interfaces/IWord';
import './AudiocallQuestion.scss';

export class AudiocallQuestion extends Renderable {
  questionData: IAudiocallQuestion;

  audioWord: string;

  playAudioButton: HTMLElement;

  title: HTMLElement;

  answersContainer: HTMLElement;

  constructor(questionData: IAudiocallQuestion) {
    super();
    this.questionData = questionData;
    this.title = dch('h3', ['word-container--title'], 'In progress');
    this.audioWord = `${GlobalConstants.DEFAULT_API_URL}/${this.questionData.wordData.audio}`;
    this.playAudio(this.audioWord);
    this.answersContainer = dch('div', ['game-btn-container']);
    this.playAudioButton = dch('button', ['audio-btn']);
    this.playAudioButton.onclick = () => {
      this.playAudio(this.audioWord);
    };
    this.rootNode = dch('div', ['word-container'], '', this.title, this.playAudioButton, this.answersContainer);
    this.questionData.variants.sort(() => Math.random() - 0.5)
      .forEach((answer) => {
        const answerBtn = dch('button', ['game-btn'], answer.wordData.wordTranslate);
        this.answersContainer.append(answerBtn);
        answerBtn.onclick = () => {
          this.onAnswer(this.questionData.wordData, answer.isCorrect);
        };
      });
    document.addEventListener('keyup', this.handlerKey);
  }

  playAudio = (audio: string) => {
    musicPlayer.setPlayList([audio]);
    musicPlayer.play()
      .catch((e) => console.error(e));
  };

  destroy() {
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
