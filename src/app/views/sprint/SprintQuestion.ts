/* eslint-disable class-methods-use-this */
import { dch } from '../dch';
import Renderable from '../Renderable';
import { IWord } from '../../interfaces/IWord';
import { IGameQuestion } from '../../interfaces/IGameQuestion';
import './SprintQuestion.scss';

export class SprintQuestion extends Renderable {
  private questionData: IGameQuestion;

  private rightBtn: HTMLElement;

  private wrongBtn: HTMLElement;

  constructor(questionData: IGameQuestion) {
    super();

    this.questionData = questionData;
    const questionText = dch('h3', ['game-question--question-text'], 'Is correct match?');
    const assumptionContainer = dch('div', ['assumption']);

    const wordOriginal = dch('div', ['assumption--text'], this.questionData.wordData.word);
    const wordSeparator = dch('div', ['assumption--separator']);
    const wordQuestion = dch('div', ['assumption--text'], this.questionData.variants[0].wordData.wordTranslate);

    assumptionContainer.append(wordOriginal, wordSeparator, wordQuestion);
    const rightBtnNum = dch('div', ['question-container_count'], '1');
    this.rightBtn = dch('button', ['question-container_text'], 'true');
    const rightBtnContainer = dch('div', ['question-container_btn'], '', this.rightBtn, rightBtnNum);
    this.rightBtn.onclick = () => {
      this.onAnswer(this.questionData.wordData, this.questionData.variants[0].isCorrect === true);
    };
    const wrongBtnNum = dch('div', ['question-container_count'], '2');
    this.wrongBtn = dch('button', ['question-container_text'], 'false');
    const wrongBtnContainer = dch('div', ['question-container_btn'], '', this.wrongBtn, wrongBtnNum);
    this.wrongBtn.onclick = () => {
      this.onAnswer(this.questionData.wordData, this.questionData.variants[0].isCorrect === false);
    };
    const btnContainer = dch('div', ['game-btn-container'], '', rightBtnContainer, wrongBtnContainer);

    this.rootNode = dch('div', ['game-question'], '', assumptionContainer, questionText, btnContainer);
    document.addEventListener('keyup', this.handlerKey);
  }

  destroy() {
    document.removeEventListener('keyup', this.handlerKey);
    this.rootNode.remove();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onAnswer = (questionData: IWord, isCorrect: boolean) => {};

  handlerKey = (event: KeyboardEvent) => {
    if (event.code === 'Digit1') {
      this.rightBtn.click();
      document.removeEventListener('keyup', this.handlerKey);
    } else if (event.code === 'Digit2') {
      this.wrongBtn.click();
      document.removeEventListener('keyup', this.handlerKey);
    }
  };
}
