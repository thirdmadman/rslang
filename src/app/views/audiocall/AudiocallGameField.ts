import { dch } from '../dch';
import Renderable from '../Renderable';
import { AudiocallQuestion } from './AudiocallQuestion';
import { IResultData } from '../../interfaces/IResultData';
import { IGameQuestionArray } from '../../interfaces/IGameQuestionArray';
import { IGameQuestion } from '../../interfaces/IGameQuestion';

import './AudiocallGameField.scss';

export class AudiocallGameField extends Renderable {
  private questionsArray: IGameQuestionArray | null = null;

  private result: Array<IResultData> = [];

  private answerChain = 0;

  private maxAnswerChain = 0;

  private title: HTMLElement;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onFinish = (result: IResultData[], answerChain: number) => {};

  constructor() {
    super();

    this.title = dch('h2', ['audiocall-page--title'], 'Audio decoding');
    this.rootNode = dch('div', ['gamefield-container'], '', this.title);
  }

  setQuestionsArray(questionsArray: IGameQuestionArray) {
    this.questionsArray = questionsArray;
    this.answerChain = 0;
    this.maxAnswerChain = 1;
    this.result = [];
  }

  startGame() {
    if (!this.questionsArray) {
      return;
    }

    this.answerChain = 0;
    this.maxAnswerChain = 1;
    this.result = [];

    this.renderCard(this.questionsArray.questions[this.questionsArray.currentQuestion]);
  }

  nextQuestion() {
    if (!this.questionsArray) {
      return;
    }

    if (this.questionsArray.questions.length > this.questionsArray.currentQuestion + 1) {
      this.questionsArray.currentQuestion += 1;
      this.renderCard(this.questionsArray.questions[this.questionsArray.currentQuestion]);
    } else {
      this.onFinish(this.result, this.maxAnswerChain);
    }
  }

  renderCard(question: IGameQuestion) {
    const cardQuestion = new AudiocallQuestion(question);
    cardQuestion.onAnswer = (questionData, isCorrect) => {
      this.result.push({ questionData, isCorrect });
      cardQuestion.destroy();
      this.nextQuestion();

      if (!isCorrect) {
        this.answerChain = 0;
        return;
      }

      this.answerChain += 1;
      if (this.answerChain > this.maxAnswerChain) {
        this.maxAnswerChain = this.answerChain;
      }
    };

    this.rootNode.append(cardQuestion.getElement());
  }
}
