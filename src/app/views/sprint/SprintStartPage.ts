import { dch } from '../dch';
import Renderable from '../Renderable';
import { GlobalConstants } from '../../../GlobalConstants';
import { WordService } from '../../services/WordService';
import { IWord } from '../../interfaces/IWord';
import { SprintGameField } from './SprintGameField';
import { ISprintQuestionData } from '../../interfaces/ISprintQuestionData';

export class SprintStartPage extends Renderable {
  group: number | undefined;

  page: number | undefined;

  gameDescription: HTMLElement;

  pages: number;

  startButton: HTMLElement;

  constructor(group?: number, page?: number) {
    super();
    this.group = group;
    this.page = page;
    this.pages = GlobalConstants.NUMBER_OF_PAGES;
    this.startButton = dch('button', [], 'start');
    this.gameDescription = dch('div', [], 'About game');
    this.rootNode = dch('div', [], '', this.gameDescription, this.startButton);

    if (!this.group && !this.page) {
      const countLevel = GlobalConstants.NUMBER_OF_GROUP_NO_AUTH_USER;
      for (let i = 1; i <= countLevel; i++) {
        const levelBtn = dch('button', ['level_button'], `${i}`);
        this.rootNode.append(levelBtn);
        levelBtn.addEventListener('click', () => {
          Array.from(Array(this.pages).keys())
            .map((pageCount) => WordService.getWordsByGroupAndPage((i - 1), pageCount)
              .then((result) => {
                this.createQuestionData(result.array);
              })
              .catch((e) => console.error(e)));
        });
      }
    } else if (this.group && this.page) {
      WordService.getWordsByGroupAndPage(this.group - 1, this.page - 1).then((wordData) => {
        this.createQuestionData(wordData.array);
      }).catch((e) => console.error(e));
    }
  }

  createAnswer = (array: IWord[], index: number, answerVariant: boolean) => {
    if (answerVariant) {
      return array[index].wordTranslate;
    }
    const randomInteger: number = Math.floor(Math.random() * array.length);
    const indexTranslate = (randomInteger === index)
      ? Math.floor(Math.random() * array.length) : randomInteger;

    return array[indexTranslate].wordTranslate;
  };

  createQuestionData = (array: IWord[]) => {
    const shuffledArray = array.sort(() => Math.random() - 0.5);
    const questionsArray = shuffledArray.map((item, index) => {
      const answerVariant = !!Math.round(Math.random());

      const translate = this.createAnswer(shuffledArray, index, answerVariant);

      return {
        word: item,
        translate,
        isCorrect: answerVariant,
      } as ISprintQuestionData;
    });
    this.startButton.addEventListener('click', () => {
      this.startGame(questionsArray);
    });
  };

  startGame(questionArrayData: ISprintQuestionData[]) {
    const gameField = new SprintGameField(questionArrayData);
    this.rootNode.innerHTML = '';
    this.rootNode.append(gameField.getElement());
  }
}
