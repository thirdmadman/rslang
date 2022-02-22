import { AudiocallStatisticPage } from './AudiocallStatisticPage';
import { IAudiocallAnswer } from '../../interfaces/IAudiocallAnswer';
import { IAudiocallQuestion } from '../../interfaces/IAudiocallQuestion';
import { IAudiocallQuestionArray } from '../../interfaces/IAudiocallQuestionArray';
import { IWord } from '../../interfaces/IWord';
import { WordService } from '../../services/WordService';
import Renderable from '../Renderable';
import { AudiocallGameField } from './AudiocallGameField';
import { AudiocallStartPage } from './AudiocallStartPage';
import { IResultData } from '../../interfaces/IResultData';

export class AudiocallPage extends Renderable {
  constructor(group: number, page: number) {
    super();
    const startPage = new AudiocallStartPage(group - 1, page - 1);
    const gameField = new AudiocallGameField();

    startPage.onStartGame = (selectedGroup: number, selectedPage: number) => {
      WordService.getWordsByGroupAndPage(selectedGroup, selectedPage)
        .then((wordData) => {
          const questionsData = {
            questions: this.createQuestions(wordData.array),
            currentQuestion: 0,
          } as IAudiocallQuestionArray;

          this.rootNode.innerHTML = '';
          gameField.setQuestionsArray(questionsData);
          gameField.startGame();
          this.rootNode.append(gameField.getElement());
        })
        .catch((e) => console.error(e));
    };

    gameField.onFinish = (result: IResultData[], answerChain: number) => {
      this.rootNode.innerHTML = '';
      const resultPage = new AudiocallStatisticPage(result, answerChain);
      this.rootNode.append(resultPage.getElement());
    };

    this.rootNode = startPage.getElement();
  }

  createVariantsForAnswer = (wordsArray: Array<IWord>, count: number, currentWord: IWord) => {
    const onlyDifferentWords = wordsArray.filter((word) => word.id !== currentWord.id);

    const shuffledAndCutArray = [...onlyDifferentWords].sort(() => Math.random() - 0.5).slice(0, count - 1);

    const incorrectVariants = shuffledAndCutArray.map((word) => ({
      wordData: word,
      isCorrect: false,
    } as IAudiocallAnswer));

    const correctVariant = {
      wordData: currentWord,
      isCorrect: true,
    } as IAudiocallAnswer;

    return incorrectVariants.concat(correctVariant).sort(() => Math.random() - 0.5);
  };

  createQuestions = (wordsArray: Array<IWord>) => {
    const result = wordsArray.map(
      (word) => ({
        wordData: word,
        variants: this.createVariantsForAnswer(wordsArray, 4, word),
      } as IAudiocallQuestion),
    );

    return result.sort(() => Math.random() - 0.5);
  };
}
