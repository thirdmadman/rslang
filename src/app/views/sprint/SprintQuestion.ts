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
  }

  destroy() {
    this.rootNode.remove();
  }

  onAnswer = (questionData: ISprintQuestionData, answer: boolean) => {
    if (questionData.isCorrect === answer) {
      // some reaction
    }
    if (questionData.isCorrect !== answer) {
      // some reaction
    }
  };
}