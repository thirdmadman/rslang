import { IAudiocallResultData } from '../../interfaces/IAudiocallResultData';
import { TokenProvider } from '../../services/TokenProvider';
import { UserWordService } from '../../services/UserWordService';
import { dch } from '../dch';
import Renderable from '../Renderable';
import { SprintQuestion } from './SprintQuestion';
import { ISprintQuestionData } from '../../interfaces/ISprintQuestionData';
import { SprintStatisticPage } from './SprintStatisticPage';

export class SprintGameField extends Renderable {
  page: number | undefined;

  data: ISprintQuestionData[];

  result: IAudiocallResultData[];

  answerChain: number;

  maxAnswerChain: number;

  userId: string | null;

  startQuestion: number;

  constructor(questionArrayData: ISprintQuestionData[]) {
    super();
    this.data = questionArrayData;
    this.answerChain = 0;
    this.maxAnswerChain = 1;
    this.result = [];
    this.userId = TokenProvider.getUserId();
    this.rootNode = dch('div', ['gamefield-container'], '');
    this.startQuestion = 0;

    this.gameCycle(this.data, this.startQuestion);
  }

  gameCycle(questionArray: ISprintQuestionData[], index: number) {
    if (index >= questionArray.length) {
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

  onFinish = (result: IAudiocallResultData[], answerChain: number) => {
    this.rootNode.innerHTML = '';
    const resultPage = new SprintStatisticPage(result, answerChain);
    this.rootNode.append(resultPage.getElement());
  };
}
