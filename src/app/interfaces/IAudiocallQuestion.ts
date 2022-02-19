import { IAudiocallAnswer } from './IAudiocallAnswer';
import { IWord } from './IWord';

export interface IAudiocallQuestion {
  wordData: IWord,
  variants: IAudiocallAnswer[],
}
