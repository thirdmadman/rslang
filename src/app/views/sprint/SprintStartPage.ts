import { dch } from '../dch';
import Renderable from '../Renderable';
import { GlobalConstants } from '../../../GlobalConstants';
import { IGameAnswer } from '../../interfaces/IGameAnswer';

export class SprintStartPage extends Renderable {
  gameDescription: HTMLElement;

  startButton: HTMLElement;

  group: number;

  page: number;

  arrayAnswers: IGameAnswer[];

  title: HTMLElement;

  mainContainer: HTMLElement;

  buttonsContainer: HTMLElement;

  titleContainer: HTMLElement;

  buttonContainerText: HTMLElement;

  levelBtnContainer: HTMLElement;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onStartGame = (group: number, page: number) => {};

  constructor(group: number, page: number) {
    super();
    this.group = group;
    this.page = page;
    this.arrayAnswers = [];
    this.title = dch('h2', ['sprint-page--title'], 'MEANING RESOLVING');
    this.titleContainer = dch('div', ['sprint-page--title-container'], '', this.title);
    this.gameDescription = dch(
      'div',
      ['sprint-page--text'],
      `Your time is limited.
      Make decisions - is it correct match of word meaning.`,
    );

    this.startButton = dch('button', ['audiocall-page--button'], 'START RESOLVING');
    this.startButton.addEventListener('click', () => {
      this.onStartGame(this.group, this.page);
    });

    this.buttonsContainer = dch('div', ['button-container']);
    this.buttonContainerText = dch('p', ['button-container--text'], 'Choose your level of depth');
    this.levelBtnContainer = dch('div', ['level-button-container']);

    const getRandomInt = (min: number, max: number) => {
      const minAggregated = Math.ceil(min);
      const maxAggregated = Math.floor(max);
      return Math.floor(Math.random() * (maxAggregated - minAggregated + 1)) + minAggregated;
    };

    if (this.group < 0 && this.page < 0) {
      this.group = 0;
      this.page = 0;

      for (let i = 0; i < GlobalConstants.NUMBER_OF_GROUP_NO_AUTH_USER; i++) {
        const levelBtn = dch('button', ['level-button'], `${i + 1}`);
        this.levelBtnContainer.append(levelBtn);

        levelBtn.addEventListener('click', () => {
          this.group = i;
          this.page = getRandomInt(0, GlobalConstants.NUMBER_OF_PAGES - 1);

          Array.from(this.levelBtnContainer.children).forEach((node) => node.classList.remove('level-button-active'));

          levelBtn.classList.add('level-button-active');
        });
      }

      this.buttonsContainer.append(
        this.buttonContainerText,
        this.levelBtnContainer,
      );
    }

    this.buttonsContainer.append(
      this.startButton,
    );

    this.mainContainer = dch('div', ['audiocall-page--main'], '', this.titleContainer, this.gameDescription);
    this.rootNode = dch('div', ['audiocall-page'], '', this.mainContainer, this.buttonsContainer);
  }
}

//
// import { dch } from '../dch';
// import Renderable from '../Renderable';
// import { GlobalConstants } from '../../../GlobalConstants';
// import { WordService } from '../../services/WordService';
// import { IWord } from '../../interfaces/IWord';
// import { SprintGameField } from './SprintGameField';
// import { ISprintQuestionData } from '../../interfaces/ISprintQuestionData';

// export class SprintStartPage extends Renderable {
//   group: number | undefined;

//   page: number | undefined;

//   gameDescription: HTMLElement;

//   pages: number;

//   startButton: HTMLElement;

//   constructor(group?: number, page?: number) {
//     super();
//     this.group = group;
//     this.page = page;
//     this.pages = GlobalConstants.NUMBER_OF_PAGES;
//     this.startButton = dch('button', [], 'start');
//     this.gameDescription = dch('div', [], 'About game');
//     this.rootNode = dch('div', [], '', this.gameDescription, this.startButton);

//     if (!this.group && !this.page) {
//       const countLevel = GlobalConstants.NUMBER_OF_GROUP_NO_AUTH_USER;
//       for (let i = 1; i <= countLevel; i++) {
//         const levelBtn = dch('button', ['level_button'], `${i}`);
//         this.rootNode.append(levelBtn);
//         levelBtn.addEventListener('click', () => {
//           Array.from(Array(this.pages).keys())
//             .map((pageCount) => WordService.getWordsByGroupAndPage((i - 1), pageCount)
//               .then((result) => {
//                 this.createQuestionData(result.array);
//               })
//               .catch((e) => console.error(e)));
//         });
//       }
//     } else if (this.group && this.page) {
//       WordService.getWordsByGroupAndPage(this.group - 1, this.page - 1).then((wordData) => {
//         this.createQuestionData(wordData.array);
//       }).catch((e) => console.error(e));
//     }
//   }

//   createAnswer = (array: IWord[], index: number, answerVariant: boolean) => {
//     if (answerVariant) {
//       return array[index].wordTranslate;
//     }
//     const randomInteger: number = Math.floor(Math.random() * array.length);
//     const indexTranslate = (randomInteger === index)
//       ? Math.floor(Math.random() * array.length) : randomInteger;

//     return array[indexTranslate].wordTranslate;
//   };

//   createQuestionData = (array: IWord[]) => {
//     const shuffledArray = array.sort(() => Math.random() - 0.5);
//     const questionsArray = shuffledArray.map((item, index) => {
//       const answerVariant = !!Math.round(Math.random());

//       const translate = this.createAnswer(shuffledArray, index, answerVariant);

//       return {
//         word: item,
//         translate,
//         isCorrect: answerVariant,
//       } as ISprintQuestionData;
//     });
//     this.startButton.addEventListener('click', () => {
//       this.startGame(questionsArray);
//     });
//   };

//   startGame(questionArrayData: ISprintQuestionData[]) {
//     const gameField = new SprintGameField(questionArrayData);
//     this.rootNode.innerHTML = '';
//     this.rootNode.append(gameField.getElement());
//   }
// }
