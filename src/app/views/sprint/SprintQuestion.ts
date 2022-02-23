import { dch } from '../dch';
import Renderable from '../Renderable';
import { IWord } from '../../interfaces/IWord';
import { IGameQuestion } from '../../interfaces/IGameQuestion';

export class SprintQuestion extends Renderable {
  private questionData: IGameQuestion;

  private rightBtn: HTMLElement;

  private wrongBtn: HTMLElement;

  constructor(questionData: IGameQuestion) {
    super();

    this.questionData = questionData;
    const questionText = dch('h3', ['game-question--question-text'], 'Is correct match?');
    const assumptionContainer = dch('div', ['assumption']);

    const wordOriginal = dch('div', ['assumption--original'], this.questionData.wordData.word);
    const wordSeparator = dch('div', ['assumption--separator']);
    const wordQuestion = dch('div', ['assumption--question'], this.questionData.variants[0].wordData.wordTranslate);

    assumptionContainer.append(wordOriginal, wordSeparator, wordQuestion);

    this.rightBtn = dch('button', ['question-container_btn'], 'true');
    this.rightBtn.onclick = () => {
      this.onAnswer(this.questionData.wordData, this.questionData.variants[0].isCorrect === true);
    };
    this.wrongBtn = dch('button', ['question-container_btn'], 'false');
    this.wrongBtn.onclick = () => {
      this.onAnswer(this.questionData.wordData, this.questionData.variants[0].isCorrect === false);
    };
    const btnContainer = dch('div', ['game-btn-container'], '', this.rightBtn, this.wrongBtn);

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
