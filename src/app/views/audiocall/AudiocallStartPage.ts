import { dch } from '../dch';
import Renderable from '../Renderable';
import { GlobalConstants } from '../../../GlobalConstants';
import { AudiocallGameField } from './AudiocallGameField';
import { WordService } from '../../services/WordService';
import { IWord } from '../../interfaces/IWord';
import { IAudiocallAnswer } from '../../interfaces/IAudiocallAnswer';
import { IAudiocallQuestionArary } from '../../interfaces/IAudiocallQuestionArary';
import { IAudiocallQuestion } from '../../interfaces/IAudiocallQuestion';

export class AudiocallStartPage extends Renderable {
  gameDescription: HTMLElement;

  startButton: HTMLElement;

  group: number | undefined;

  page: number | undefined;

  arrayAnswers: IAudiocallAnswer[];

  answersCount: number;

  pages: number;

  constructor(group?: number, page?: number) {
    super();
    this.group = group;
    this.page = page;
    this.arrayAnswers = [];
    this.answersCount = 4;
    this.pages = GlobalConstants.NUMBER_OF_PAGES;
    this.gameDescription = dch('div', [], 'описание игры');
    this.startButton = dch('button', [], 'start');

    this.rootNode = dch('div', [], '', this.gameDescription, this.startButton);
    if (!this.group && !this.page) {
      const countLevel = GlobalConstants.NUMBER_OF_GROUP_NO_AUTH_USER;
      for (let i = 1; i <= countLevel; i++) {
        const levelBtn = dch('button', ['level_button'], `${i}`);
        this.rootNode.append(levelBtn);
        levelBtn.addEventListener('click', () => {
          Array.from(Array(this.pages).keys())
            .map((pagecount) => WordService.getWordsByGroupAndPage(i, pagecount)
              .then((result) => this.createQuestionData(result.array))
              .catch(() => {}));
        });
      }
    } else if (this.group && this.page) {
      WordService.getWordsByGroupAndPage(this.group, this.page).then((wordData) => {
        this.createQuestionData(wordData.array);
      }).catch(() => {});
    }
  }

  startGame(questionArrayData: IAudiocallQuestionArary) {
    const gameField = new AudiocallGameField(questionArrayData);
    this.rootNode.innerHTML = '';
    this.rootNode.append(gameField.getElement());
  }

  createAnswers = (array: IWord[], count: number, currentQuestion: IWord) => {
    const shuffleArray = array.filter((item) => item.id !== currentQuestion.id).sort(() => Math.random() - 0.5);
    const answersDataArray = [...shuffleArray.slice(0, count)];
    const result = answersDataArray.map((item) => {
      const answerData = {
        wordData: item,
        isCorrect: false,
      } as IAudiocallAnswer;
      return answerData;
    });
    return result;
  };

  createQuestionData(array: IWord[]) {
    const questionsArray = array.map((item) => {
      this.arrayAnswers = this.createAnswers(array, this.answersCount, item);
      const quesytionData = {
        wordData: item,
        isCorrect: true,
      } as IAudiocallAnswer;
      const question = {
        wordData: item,
        variants: [...this.arrayAnswers, quesytionData],
        isCorrectVariant: true,
      } as IAudiocallQuestion;
      return question;
    });
    const questionData = {
      questions: questionsArray,
      currentQuestion: 0,
    } as IAudiocallQuestionArary;
    this.startButton.addEventListener('click', () => {
      this.startGame(questionData);
    });
  }
}
