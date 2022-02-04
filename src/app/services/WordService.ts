import axios from 'axios';
import { GlobalConstants } from '../../GlobalConstants';
import { IWord } from '../interfaces/IWord';

export class WordService {
  static getWordsByGroupAndPage(group: number, page: number) {
    return axios
      .get(`${GlobalConstants.DEFAULT_API_URL}${GlobalConstants.API_ENDPOINT_WORDS}`, {
        params: {
          group,
          page,
        },
      })
      .then((res) => res.data as Array<IWord>);
  }

  static getWordsById(id: string) {
    return axios
      .get(`${GlobalConstants.DEFAULT_API_URL}${GlobalConstants.API_ENDPOINT_WORDS}/${id}`)
      .then((res) => res.data as IWord);
  }
}
