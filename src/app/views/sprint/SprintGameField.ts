import { dch } from '../dch';
import Renderable from '../Renderable';
import { IResultData } from '../../interfaces/IResultData';
import { IGameQuestionArray } from '../../interfaces/IGameQuestionArray';
import { IGameQuestion } from '../../interfaces/IGameQuestion';
import { SprintQuestion } from './SprintQuestion';
import { GlobalConstants } from '../../../GlobalConstants';
import './SprintGameField.scss';

export class SprintGameField extends Renderable {
  private questionsArray: IGameQuestionArray | null = null;

  private result: Array<IResultData> = [];

  private answerChain = 0;

  private maxAnswerChain = 0;

  private title: HTMLElement;

  private timerText: HTMLElement;

  private currentTime = 0;

  private gameTimer = 0;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onFinish = (result: IResultData[], answerChain: number) => {};

  constructor() {
    super();

    this.title = dch('h2', ['sprint-page--title', 'sprint-page--title--in-game'], 'MEANING RESOLVING');
    const subTitle = dch('h3', ['sprint-page--sub-title'], 'In progress');
    this.timerText = dch('div', ['sprint-page--timer-text'], String(GlobalConstants.GAME_TIME));
    this.rootNode = dch('div', ['gamefield-container'], '', this.title, subTitle, this.timerText);
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
    this.currentTime = GlobalConstants.GAME_TIME;
    this.result = [];

    this.startTimer();

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
      clearInterval(this.gameTimer);
    }
  }

  renderCard(question: IGameQuestion) {
    const cardQuestion = new SprintQuestion(question);
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

  startTimer() {
    this.gameTimer = window.setInterval(() => {
      this.currentTime--;
      this.timerText.innerText = `${this.currentTime}`;
      if (this.currentTime === 0) {
        clearInterval(this.gameTimer);
        this.onFinish(this.result, this.maxAnswerChain);
      }
    }, 1000);
  }
}
