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

  currentGroup: number;

  currentPage: number | undefined;

  arrayWordsToQuestion: IWord[];

  arrayAnswers: IAudiocallAnswer[];

  arrayQuestions: IWord[];

  constructor(group?: number, page?: number) {
    super();
    this.group = group;
    this.page = page;
    this.currentGroup = 1;
    this.currentPage = undefined;
    this.arrayAnswers = [];
    this.arrayQuestions = [];
    const answersCount = 4;
    console.log(this.group, this.page);
    this.arrayWordsToQuestion = [];
    this.gameDescription = dch('div', [], 'описание игры');
    this.startButton = dch('button', [], 'start');

    this.rootNode = dch('div', [], '', this.gameDescription, this.startButton);
    if (!this.group && !this.page) {
      const countLevel = GlobalConstants.NUMBER_OF_GROUP_NO_AUTH_USER;
      for (let i = 1; i <= countLevel; i++) {
        const levelBtn = dch('button', ['level_button'], `${i}`);
        this.rootNode.append(levelBtn);
        levelBtn.addEventListener('click', () => { this.changeLevel(i); });
      }
    } else if (this.group && this.page) {
      this.currentGroup = this.group;
      this.currentPage = this.page;
      WordService.getWordsByGroupAndPage(this.currentGroup, this.currentPage).then((wordData) => {
        this.arrayWordsToQuestion = wordData.array;
        const questionsArray = this.arrayWordsToQuestion.map((item) => {
          this.arrayAnswers = this.createAnswers(this.arrayWordsToQuestion, answersCount, item);
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
        console.log(questionData);
        this.startButton.addEventListener('click', () => {
          this.startGame(questionData);
        });
      }).catch(() => {});
    }
  }

  changeLevel(level: number) {
    this.currentGroup = level;
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
}
