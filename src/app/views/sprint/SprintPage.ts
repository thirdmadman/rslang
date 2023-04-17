/* eslint-disable class-methods-use-this */
import { IWord } from '../../interfaces/IWord';
import { WordService } from '../../services/WordService';
import Renderable from '../Renderable';
import { IResultData } from '../../interfaces/IResultData';
import { SprintStartPage } from './SprintStartPage';
import { SprintGameField } from './SprintGameField';
import { IGameQuestionArray } from '../../interfaces/IGameQuestionArray';
import { SprintStatisticPage } from './SprintStatisticPage';
import { IGameAnswer } from '../../interfaces/IGameAnswer';
import { IGameQuestion } from '../../interfaces/IGameQuestion';

export class SprintPage extends Renderable {
  constructor(group: number, page: number) {
    super();
    const startPage = new SprintStartPage(group - 1, page - 1);
    const gameField = new SprintGameField();
    startPage.onStartGame = (selectedGroup: number, selectedPage: number) => {
      WordService.getWordsByGroupAndPage(selectedGroup, selectedPage)
        .then((wordData) => {
          const questionsData = {
            questions: this.createQuestions(wordData.array),
            currentQuestion: 0,
          } as IGameQuestionArray;

          this.rootNode.innerHTML = '';
          gameField.setQuestionsArray(questionsData);
          gameField.startGame();
          this.rootNode.append(gameField.getElement());
        })
        .catch((e) => console.error(e));
    };

    gameField.onFinish = (result: IResultData[], answerChain: number) => {
      this.rootNode.innerHTML = '';
      const resultPage = new SprintStatisticPage(result, answerChain);
      this.rootNode.append(resultPage.getElement());
    };

    this.rootNode = startPage.getElement();
  }

  createVariantForAnswer = (wordsArray: Array<IWord>, currentWord: IWord) => {
    const onlyDifferentWords = wordsArray.filter((word) => word.id !== currentWord.id);
    const shuffledAndCutArray = [...onlyDifferentWords].sort(() => Math.random() - 0.5).slice(0, 1);
    const variant = [currentWord, ...shuffledAndCutArray].sort(() => Math.random() - 0.5).slice(0, 1).map((word) => ({
      wordData: word,
      isCorrect: word.id === currentWord.id,
    } as IGameAnswer));
    return variant;
  };

  createQuestions = (wordsArray: Array<IWord>) => {
    const result = wordsArray.map(
      (word) => ({
        wordData: word,
        variants: this.createVariantForAnswer(wordsArray, word),
      } as IGameQuestion),
    );

    return result.sort(() => Math.random() - 0.5);
  };
}
