import { IAudiocallQuestion } from './IAudiocallQuestion';

export interface IAudiocallQuestionArray {
  questions: Array<IAudiocallQuestion>,
  currentQuestion: number,
}
