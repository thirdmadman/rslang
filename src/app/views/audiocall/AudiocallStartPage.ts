import { dch } from '../dch';
import Renderable from '../Renderable';
import { GlobalConstants } from '../../../GlobalConstants';
import { AudiocallGameField } from './AudiocallGameField';
import { WordService } from '../../services/WordService';
import { IWord } from '../../interfaces/IWord';
import { IAudiocallAnswer } from '../../interfaces/IAudiocallAnswer';
import { IAudiocallQuestionArray } from '../../interfaces/IAudiocallQuestionArray';
import { IAudiocallQuestion } from '../../interfaces/IAudiocallQuestion';
import './AudiocallStartPage.scss';

export class AudiocallStartPage extends Renderable {
  gameDescription: HTMLElement;

  startButton: HTMLElement;

  group: number | undefined;

  page: number | undefined;

  arrayAnswers: IAudiocallAnswer[];

  answersCount: number;

  pages: number;

  title: HTMLElement;

  mainContainer: HTMLElement;

  buttonsContainer: HTMLElement;

  titleContainer: HTMLElement;

  buttonContainerText: HTMLElement;

  levelBtnContainer: HTMLElement;


  constructor(group?: number, page?: number) {
    super();
    this.group = group;
    this.page = page;
    this.arrayAnswers = [];
    this.answersCount = 4;
    this.pages = GlobalConstants.NUMBER_OF_PAGES;
    this.title = dch('h2', ['audiocall-page--title'], 'audio decoding');
    this.titleContainer = dch('div', ['audiocall-page--title-container'], '', this.title);
    this.gameDescription = dch(
      'div',
      ['audiocall-page--text'],
      `Record of vice will be played.
    Make a match between what is said and what is written.`,
    );

    this.startButton = dch('button', ['audiocall-page--button'], 'Start decoding');
    this.buttonContainerText = dch('p', ['button-container--text'], 'Choose your level of depth');
    this.levelBtnContainer = dch('div', ['level-button-container']);
    this.buttonsContainer = dch(
      'div',
      ['button-container'],
      '',
      this.buttonContainerText,
      this.levelBtnContainer,
      this.startButton,
    );
    this.mainContainer = dch(
      'div',
      ['audiocall-page--main'],
      '',
      this.titleContainer,
      this.gameDescription,
    );
    this.rootNode = dch(
      'div',
      ['audiocall-page'],
      '',
      this.mainContainer,
      this.buttonsContainer,
    );

    if (!this.group && !this.page) {
      const countLevel = GlobalConstants.NUMBER_OF_GROUP_NO_AUTH_USER;
      for (let i = 1; i <= countLevel; i++) {
        const levelBtn = dch('button', ['level-button'], `${i}`);
        this.levelBtnContainer.append(levelBtn);
        levelBtn.addEventListener('click', () => {
          Array.from(Array(this.pages).keys())
            .map((pageCount) => WordService.getWordsByGroupAndPage((i - 1), pageCount)
              .then((result) => this.createQuestionData(result.array))
              .catch(() => {}));
        });
      }
    } else if (this.group && this.page) {
      WordService.getWordsByGroupAndPage(this.group - 1, this.page - 1).then((wordData) => {
        this.createQuestionData(wordData.array);
      }).catch(() => {});
    }
    // this.rootNode.append(new Menu().getElement());
  }

  startGame(questionArrayData: IAudiocallQuestionArray) {
    const gameField = new AudiocallGameField(questionArrayData);
    this.rootNode.innerHTML = '';
    this.rootNode.append(gameField.getElement());
  }

  createAnswers = (array: IWord[], count: number, currentQuestion: IWord) => {
    const shuffleArray = array.filter((item) => item.id !== currentQuestion.id);
    shuffleArray.sort(() => Math.random() - 0.5);
    const answersDataArray = [...shuffleArray.slice(0, count - 1)];
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
    const questionsArray = array.sort(() => Math.random() - 0.5).map((item) => {
      this.arrayAnswers = this.createAnswers(array, this.answersCount, item);
      const questionData = {
        wordData: item,
        isCorrect: true,
      } as IAudiocallAnswer;
      const question = {
        wordData: item,
        variants: [...this.arrayAnswers, questionData],
        isCorrectVariant: true,
      } as IAudiocallQuestion;
      return question;
    });
    const questionData = {
      questions: questionsArray,
      currentQuestion: 0,
    } as IAudiocallQuestionArray;
    this.startButton.addEventListener('click', () => {
      this.startGame(questionData);
    });
  }
}
