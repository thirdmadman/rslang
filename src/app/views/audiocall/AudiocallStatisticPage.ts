import Renderable from '../Renderable';
import { dch } from '../dch';
import { IResultData } from '../../interfaces/IResultData';
import { GlobalConstants } from '../../../GlobalConstants';
import { musicPlayer } from '../../services/SingleMusicPlayer';
import './AudiocallStatisticPage.scss';
import { TokenProvider } from '../../services/TokenProvider';
import { UserWordService } from '../../services/UserWordService';

export class AudiocallStatisticPage extends Renderable {
  resultData: IResultData[];

  resultContainer: HTMLElement;

  date: string;

  statisticContainer: HTMLElement;

  title: HTMLElement;

  correctWordsContainer: HTMLElement;

  inCorrectWordsContainer: HTMLElement;

  constructor(resultData: IResultData[], answerChain: number) {
    super();
    this.resultData = resultData;
    this.title = dch('h3', ['word-container--title'], 'results');
    const rightResult = this.resultData.filter((el) => el.isCorrect).length;
    const wrongResult = this.resultData.length - rightResult;
    const rightCount = dch('div', ['result-words--title', 'count'], `${rightResult}`);
    const wrongCount = dch('div', ['result-words--title', 'count'], `${wrongResult}`);
    const rightTitle = dch('div', ['result-words--title'], 'correct');
    const wrongTitle = dch('div', ['result-words--title'], 'incorrect');
    const rightTitleContainer = dch('div', ['title-container'], '', rightTitle, rightCount);
    const wrongTitleContainer = dch('div', ['title-container'], '', wrongTitle, wrongCount);
    this.correctWordsContainer = dch('div', ['result-words-container'], '');
    this.inCorrectWordsContainer = dch('div', ['result-words-container'], '');
    this.resultData.forEach((item) => {
      const userId = TokenProvider.getUserId();

      if (userId && !TokenProvider.checkIsExpired()) {
        UserWordService.setWordStatistic(userId, item.questionData.id, item.isCorrect)
          .catch((e) => console.error(e));
      }
      
      const word = dch(
        'p',
        ['button-word--text-item'],
        `${item.questionData.wordTranslate}`,
      );
      const wordTranslate = dch(
        'p',
        ['button-word--text-item'],
        `${item.questionData.word}`,
      );
      const buttonWordText = dch(
        'div',
        ['button-word--text'],
        '',
        word,
        wordTranslate,
      );
      const buttonWordAudio = dch(
        'button',
        ['button-word--audio-btn'],
      );
      const audioWordData = `${GlobalConstants.DEFAULT_API_URL}/${item.questionData.audio}`;
      buttonWordAudio.onclick = () => {
        this.playAudio(audioWordData);
      };
      const buttonWord = dch('div', ['button-word'], '', buttonWordText, buttonWordAudio);

      if (item.isCorrect) {
        this.correctWordsContainer.append(buttonWord);
      } else {
        this.inCorrectWordsContainer.append(buttonWord);
      }
    });

    this.statisticContainer = dch('p', ['result-text'], `The longest answer Chain - ${answerChain}`);
    this.resultContainer = dch('div', ['result-container']);
    this.rootNode = dch(
      'div',
      ['result-page'],
      '',
      this.title,
      rightTitleContainer,
      this.correctWordsContainer,
      wrongTitleContainer,
      this.inCorrectWordsContainer,
    );
    this.date = this.formatDate(new Date());
  }

  playAudio = (audio: string) => {
    musicPlayer.setPlayList([audio]);
    musicPlayer.play()
      .catch((e) => console.error(e));
  };

  formatDate = (date: Date) => date.toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
  });
}
