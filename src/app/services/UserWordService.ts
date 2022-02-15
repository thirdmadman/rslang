import { GlobalConstants } from '../../GlobalConstants';
import { IUserWord } from '../interfaces/IUserWord';
import { IUserWordData } from '../interfaces/IUserWordData';
import { axiosIntance } from './axiosIntance';

export class UserWordService {
  /**
   * This method uses token
   */
  static getAllWordsByUserId(id: string) {
    return axiosIntance()
      .get(`${GlobalConstants.API_ENDPOINT_USERS}/${id}/words`)
      .then((res) => res.data as Array<IUserWord>);
  }

  /**
   * This method uses token
   */
  static getUserWordById(id: string, wordId: string) {
    return axiosIntance()
      .get(`${GlobalConstants.API_ENDPOINT_USERS}/${id}/words/${wordId}`)
      .then((res) => res.data as IUserWord);
  }

  /**
   * This method uses token
   */
  static createUserWord(id: string, wordId: string, userWordData: IUserWordData) {
    return axiosIntance()
      .post(`${GlobalConstants.API_ENDPOINT_USERS}/${id}/words/${wordId}`, userWordData)
      .then((res) => res.data as IUserWord);
  }

  /**
   * This method uses token
   */
  private static setWorDifficultyById(id: string, wordId: string, difficulty: string) {
    const getWord = this.getAllWordsByUserId(id).then((data) => {
      const wordData = data.find((word) => word.wordId === wordId);
      if (wordData) {
        return {
          difficulty,
          optional: { ...wordData.optional },
        } as IUserWordData;
      }
      return null;
    });

    return getWord.then((data) => {
      if (!data) {
        return UserWordService.createUserWord(id, wordId, {
          difficulty,
          optional: {
            successCounter: 0,
            failCounter: 0,
            isLearned: false,
          },
        } as IUserWordData);
      }
      return this.updateUserWord(id, wordId, data);
    });
  }

  /**
   * This method uses token
   */
  private static setWordLearnedState(id: string, wordId: string, isLearned: boolean) {
    const getWord = this.getAllWordsByUserId(id).then((data) => {
      const wordData = data.find((word) => word.wordId === wordId);
      if (wordData) {
        return {
          difficulty: wordData.difficulty,
          optional: { ...wordData.optional },
        } as IUserWordData;
      }
      return null;
    });

    return getWord.then((data) => {
      if (!data) {
        return UserWordService.createUserWord(id, wordId, {
          difficulty: 'normal',
          optional: {
            successCounter: 0,
            failCounter: 0,
            isLearned,
          },
        } as IUserWordData);
      }
      return this.updateUserWord(id, wordId, data);
    });
  }

  /**
   * This method uses token
   */
  static setWordLearned(id: string, wordId: string) {
    return this.setWordLearnedState(id, wordId, true);
  }

  /**
   * This method uses token
   */
  static removeWordFromLearned(id: string, wordId: string) {
    return this.setWordLearnedState(id, wordId, false);
  }

  /**
   * This method uses token
   */
  static setWorDifficultById(id: string, wordId: string) {
    return this.setWorDifficultyById(id, wordId, 'hard');
  }

  /**
   * This method uses token
   */
  static setWordNormalById(id: string, wordId: string) {
    return this.setWorDifficultyById(id, wordId, 'normal');
  }

  /**
   * This method uses token
   */
  static updateUserWord(id: string, wordId: string, userWordData: IUserWordData) {
    return axiosIntance()
      .put(`${GlobalConstants.API_ENDPOINT_USERS}/${id}/words/${wordId}`, userWordData)
      .then((res) => res.data as IUserWord);
  }

  /**
   * This method uses token
   */
  static deleteUser(id: string, wordId: string) {
    return axiosIntance().delete(`${GlobalConstants.API_ENDPOINT_USERS}/${id}/words/${wordId}`);
  }
}
