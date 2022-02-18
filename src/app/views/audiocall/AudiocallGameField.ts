import { dch } from '../dch';
import Renderable from '../Renderable';
import { IAudiocallQuestionArary } from '../../interfaces/IAudiocallQuestionArary';
import { AudiocallQuestion } from './AudiocallQuestion';
import { IAudiocallQuestion } from '../../interfaces/IAudiocallQuestion';
import './AudiocallGameField.scss';
import { IAudiocallResultData } from '../../interfaces/IAudiocallResultData';
import { AudiocallStatisticPage } from './AudiocallStatisticPage';

export class AudiocallGameField extends Renderable {
  page: number | undefined;

  data: IAudiocallQuestionArary;

  result: IAudiocallResultData[];

  answerChain: number;

  maxAnswerChain: number;

  constructor(qiestionArrayData: IAudiocallQuestionArary) {
    super();
    this.data = qiestionArrayData;
    this.answerChain = 0;
    this.maxAnswerChain = 1;
    this.result = [];

    this.rootNode = dch('div', ['gamefield-container'], '');

    this.gameCycle(this.data.questions, this.data.currentQuestion);
  }

  gameCycle(questionArray: IAudiocallQuestion[], index: number) {
    if (index >= questionArray.length) {
      this.onFinish(this.result, this.maxAnswerChain);
    }
    const cardQuestion = new AudiocallQuestion(this.data.questions[index]);
    this.rootNode.append(cardQuestion.getElement());
    cardQuestion.onAnswer = (questionData, isCorrect) => {
      if (isCorrect) {
        this.answerChain += 1;
        if (this.answerChain > this.maxAnswerChain) {
          this.maxAnswerChain = this.answerChain;
        }
      } else if (!isCorrect) {
        this.answerChain = 0;
      }
      cardQuestion.destroy();
      this.result.push({ questionData, isCorrect });
      this.gameCycle(questionArray, index + 1);
    };
  }

  onFinish = (result: IAudiocallResultData[], answerChain: number) => {
    const resultPage = new AudiocallStatisticPage(result, answerChain);
    this.rootNode.append(resultPage.getElement());
  };
}
