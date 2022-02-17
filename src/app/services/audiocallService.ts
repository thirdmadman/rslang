import { IWord } from '../interfaces/IWord';

export class AudiocallService {
  static getRandomElement(array: IWord[], count: number) {
    const shuffledArray = array.sort(() => 0.5 - Math.random());
    const result = shuffledArray.slice(0, count);
    return result;
  }

  static formatDate = (date: Date) => date.toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
  });
}
