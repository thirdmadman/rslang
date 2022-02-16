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

  constructor(qiestionArrayData: IAudiocallQuestionArary) {
    super();
    this.data = qiestionArrayData;
    this.answerChain = 0;
    this.result = [];

    console.log(qiestionArrayData);

    this.rootNode = dch('div', ['gamefield-container'], '');

    this.gameCycle(this.data.questions, this.data.currentQuestion);
  }

  gameCycle(questionArray: IAudiocallQuestion[], index: number) {
    if (index >= questionArray.length) {
      this.onFinish(this.result);
    }
    const cardQuestion = new AudiocallQuestion(this.data.questions[index]);
    this.rootNode.append(cardQuestion.getElement());
    cardQuestion.onAnswer = (questionData, isCorrect) => {
      if (isCorrect) {
        this.answerChain += 1;
      } else if (!isCorrect) {
        this.answerChain = 0;
      }
      cardQuestion.destroy();
      this.result.push({ questionData, isCorrect });
      this.data.currentQuestion++;
      console.log(this.data.currentQuestion);
      this.gameCycle(questionArray, index + 1);
    };
  }

  onFinish = (result: IAudiocallResultData[]) => {
    const resultPage = new AudiocallStatisticPage(result);
    this.rootNode.append(resultPage.getElement());
  };
}
