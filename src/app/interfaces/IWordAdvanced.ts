import { IUserWord } from './IUserWord';
import { IWord } from './IWord';

export interface IWordAdanced {
  word: IWord;
  userData?: IUserWord;
}
