import Renderable from '../Renderable';
import { dch } from '../dch';
import { IResultData } from '../../interfaces/IResultData';
import { GlobalConstants } from '../../../GlobalConstants';
import { musicPlayer } from '../../services/SingleMusicPlayer';
import './AudiocallStatisticPage.scss';

export class AudiocallStatisticPage extends Renderable {
  resultData: IResultData[];

  resultContainer: HTMLElement;

  date: string;

  statisticContainer: HTMLElement;

  title: HTMLElement;

  score: HTMLElement;

  constructor(resultData: IResultData[], answerChain: number) {
    super();
    this.resultData = resultData;
    this.title = dch('h3', ['word-container--title'], 'results');
    const correctAnswers = this.resultData.filter((item) => item.isCorrect);
    this.score = dch('div', ['word-container--subtitle'], `${correctAnswers.length}/${this.resultData.length}`);
    this.statisticContainer = dch('p', ['result-text'], `The longest answer Chain - ${answerChain}`);
    this.resultContainer = dch('div', ['result-container']);
    this.rootNode = dch('div', ['result-page'], '', this.title, this.score, this.resultContainer);
    // this.rootNode.append(new Menu().getElement());
    this.date = this.formatDate(new Date());
    resultData.forEach((item) => {
      const audioWordData = `${GlobalConstants.DEFAULT_API_URL}/${item.questionData.audio}`;
      const playAudioBtn = dch('button', ['result-audio-btn']);
      playAudioBtn.onclick = () => {
        this.playAudio(audioWordData);
      };
      const word = dch('p', ['word-container--item'], `${item.questionData.word}`);
      const wordTranslate = dch('p', ['word-container_item'], `${item.questionData.wordTranslate}`);
      const wordResult = dch('p', ['word-container_item'], `${item.isCorrect ? 'true' : 'false'}`);
      const wordContainer = dch('div', ['result-word-container']);
      wordContainer.append(playAudioBtn, word, wordTranslate, wordResult);
      this.resultContainer.append(wordContainer, this.statisticContainer);
    });
  }

  playAudio = (audio: string) => {
    musicPlayer.setPlayList([audio]);
    musicPlayer.play()
      .catch(() => {});
  };

  formatDate = (date: Date) => date.toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
  });
}
