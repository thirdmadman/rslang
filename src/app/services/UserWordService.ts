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
          optional: {},
        } as IUserWordData);
      }
      return this.updateUserWord(id, wordId, data);
    });
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
  static setWorNarmalById(id: string, wordId: string) {
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
