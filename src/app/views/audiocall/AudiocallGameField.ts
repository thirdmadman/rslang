import { dch } from '../dch';
import Renderable from '../Renderable';
import { IAudiocallQuestionArray } from '../../interfaces/IAudiocallQuestionArray';
import { AudiocallQuestion } from './AudiocallQuestion';
import { IAudiocallQuestion } from '../../interfaces/IAudiocallQuestion';
import './AudiocallGameField.scss';
import { IResultData } from '../../interfaces/IResultData';
import { AudiocallStatisticPage } from './AudiocallStatisticPage';
import { TokenProvider } from '../../services/TokenProvider';
import { UserWordService } from '../../services/UserWordService';

export class AudiocallGameField extends Renderable {
  page: number | undefined;

  data: IAudiocallQuestionArray;

  result: IResultData[];

  answerChain: number;

  maxAnswerChain: number;

  userId: string | null;

  startQuestion: number;

  title: HTMLElement;

  constructor(questionArrayData: IAudiocallQuestionArray) {
    super();
    this.data = questionArrayData;
    this.answerChain = 0;
    this.maxAnswerChain = 1;
    this.result = [];
    this.userId = TokenProvider.getUserId();
    this.title = dch('h2', ['audiocall-page--title'], 'Audio decoding');
    this.rootNode = dch('div', ['gamefield-container'], '', this.title);
    this.startQuestion = 0;
    this.gameCycle(this.data.questions, this.startQuestion);
  }

  gameCycle(questionArray: IAudiocallQuestion[], index: number) {
    if (index >= questionArray.length) {
      this.onFinish(this.result, this.maxAnswerChain);
      return;
    }
    const cardQuestion = new AudiocallQuestion(this.data.questions[index]);
    this.rootNode.append(cardQuestion.getElement());
    cardQuestion.onAnswer = (questionData, isCorrect) => {
      if (isCorrect) {
        if (this.userId && !TokenProvider.checkIsExpired()) {
          UserWordService.setWordStatistic(this.userId, questionData.id, isCorrect)
            .catch((e) => console.error(e));
        }
        this.answerChain += 1;
        if (this.answerChain > this.maxAnswerChain) {
          this.maxAnswerChain = this.answerChain;
        }
      } else if (!isCorrect) {
        if (this.userId && !TokenProvider.checkIsExpired()) {
          UserWordService.setWordStatistic(this.userId, questionData.id, isCorrect)
            .catch((e) => console.error(e));
        }
        this.answerChain = 0;
      }
      cardQuestion.destroy();
      this.result.push({ questionData, isCorrect });
      this.gameCycle(questionArray, index + 1);
    };
  }

  onFinish = (result: IResultData[], answerChain: number) => {
    this.rootNode.innerHTML = '';
    const resultPage = new AudiocallStatisticPage(result, answerChain);
    this.rootNode.append(resultPage.getElement());
  };
}
