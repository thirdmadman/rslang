import { IAudiocallResultData } from '../../interfaces/IAudiocallResultData';
import { TokenProvider } from '../../services/TokenProvider';
import { UserWordService } from '../../services/UserWordService';
import { dch } from '../dch';
import Renderable from '../Renderable';
import { SprintQuestion } from './SprintQuestion';
import { ISprintQuestionData } from '../../interfaces/ISprintQuestionData';
import { SprintStatisticPage } from './SprintStatisticPage';
import { GlobalConstants } from '../../../GlobalConstants';

export class SprintGameField extends Renderable {
  page: number | undefined;

  data: ISprintQuestionData[];

  result: IAudiocallResultData[];

  answerChain: number;

  maxAnswerChain: number;

  userId: string | null;

  startQuestion: number;

  gameTime: number;

  currentTime: number;

  timerContainer: HTMLElement;

  constructor(questionArrayData: ISprintQuestionData[]) {
    super();
    this.data = questionArrayData;
    this.answerChain = 0;
    this.maxAnswerChain = 1;
    this.result = [];
    this.userId = TokenProvider.getUserId();
    this.startQuestion = 0;
    this.gameTime = GlobalConstants.GAME_TIME;
    this.currentTime = this.gameTime;
    this.timerContainer = dch('div', []);
    this.rootNode = dch('div', ['gamefield-container'], '');
    this.showTime();
    this.gameCycle(this.data, this.startQuestion);
  }

  gameCycle(questionArray: ISprintQuestionData[], index: number) {
    this.rootNode.append(this.timerContainer);
    if (index >= questionArray.length) {
      this.currentTime = 0;
      this.onFinish(this.result, this.maxAnswerChain);
      return;
    }
    const cardQuestion = new SprintQuestion(questionArray[index]);
    this.rootNode.append(cardQuestion.getElement());
    cardQuestion.onAnswer = (questionData, answer) => {
      if (questionData.isCorrect === answer) {
        if (this.userId && !TokenProvider.checkIsExpired()) {
          UserWordService.setWordStatistic(this.userId, questionData.word.id, questionData.isCorrect)
            .catch(() => {});
        }
        this.answerChain += 1;
        if (this.answerChain > this.maxAnswerChain) {
          this.maxAnswerChain = this.answerChain;
        }
        this.result.push({
          questionData: questionData.word,
          isCorrect: true,
        } as IAudiocallResultData);
      } else if (questionData.isCorrect !== answer) {
        if (this.userId && !TokenProvider.checkIsExpired()) {
          UserWordService.setWordStatistic(this.userId, questionData.word.id, questionData.isCorrect)
            .catch(() => {});
        }
        this.answerChain = 0;
        this.result.push({
          questionData: questionData.word,
          isCorrect: false,
        });
      }
      cardQuestion.destroy();
      this.gameCycle(questionArray, index + 1);
    };
  }

  showTime() {
    const changeTime = setInterval(() => {
      this.currentTime--;
      this.timerContainer.innerText = `${this.currentTime}`;
      if (this.currentTime === 0) {
        clearInterval(changeTime);
        this.onFinish(this.result, this.maxAnswerChain);
      }
    }, 1000);
  }

  onFinish = (result: IAudiocallResultData[], answerChain: number) => {
    this.rootNode.innerHTML = '';
    if (!this.result.length) {
      this.result.push({
        questionData: this.data[0].word,
        isCorrect: false,
      });
    }
    const resultPage = new SprintStatisticPage(result, answerChain);
    this.rootNode.append(resultPage.getElement());
  };
}
