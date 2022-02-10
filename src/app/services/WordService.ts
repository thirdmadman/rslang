import axios from 'axios';
import { GlobalConstants } from '../../GlobalConstants';
import { IPaginatedArray } from '../interfaces/IPaginatedArray';
import { IWord } from '../interfaces/IWord';
import { axiosIntance } from './axiosIntance';

export class WordService {
  static getWordsByGroupAndPage(group: number, page: number) {
    return axiosIntance(true)
      .get(`${GlobalConstants.DEFAULT_API_URL}${GlobalConstants.API_ENDPOINT_WORDS}`, {
        params: {
          group,
          page,
        },
      })
      .then((res) => {
        const paginatedArray = {
          array: res.data as Array<IWord>,
          pageSize: 20,
          currentGroup: group,
          currentPage: page,
          size: -1,
        } as IPaginatedArray<IWord>;
        return paginatedArray;
      });
  }

  static getWordsById(id: string) {
    return axiosIntance(true)
      .get(`${GlobalConstants.DEFAULT_API_URL}${GlobalConstants.API_ENDPOINT_WORDS}/${id}`)
      .then((res) => res.data as IWord);
  }
}
