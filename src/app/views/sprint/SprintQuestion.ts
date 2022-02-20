import { dch } from '../dch';
import Renderable from '../Renderable';
import { ISprintQuestionData } from '../../interfaces/ISprintQuestionData';

export class SprintQuestion extends Renderable {
  questionData: ISprintQuestionData;

  question: HTMLElement;

  translate: HTMLElement;

  questionContainer: HTMLElement;

  rightBtn: HTMLElement;

  wrongBtn: HTMLElement;

  btnContainer: HTMLElement;

  constructor(questionData: ISprintQuestionData) {
    super();
    this.questionData = questionData;
    this.question = dch('div', ['question'], `${questionData.word.word}`);
    this.translate = dch('div', ['translate'], `${questionData.translate}`);
    this.questionContainer = dch('div', ['question-container'], '', this.question, this.translate);
    this.rightBtn = dch('button', ['question-container_btn'], 'true');
    this.rightBtn.onclick = () => {
      this.onAnswer(this.questionData, true);
    };
    this.wrongBtn = dch('button', ['question-container_btn'], 'false');
    this.wrongBtn.onclick = () => {
      this.onAnswer(this.questionData, false);
    };
    this.btnContainer = dch('div', ['button-container'], '', this.wrongBtn, this.rightBtn);
    this.rootNode = dch('div', ['question-section'], '', this.questionContainer, this.btnContainer);
    document.addEventListener('keydown', this.handlerKey);
  }

  destroy() {
    this.rootNode.remove();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onAnswer = (questionData: ISprintQuestionData, answer: boolean) => {};

  handlerKey = (event: KeyboardEvent) => {
    if (event.code === 'ArrowLeft') {
      this.wrongBtn.click();
      document.removeEventListener('keydown', this.handlerKey);
    } else if (event.code === 'ArrowRight') {
      this.rightBtn.click();
      document.removeEventListener('keydown', this.handlerKey);
    }
  };
}
