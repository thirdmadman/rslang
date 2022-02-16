import { IAudiocallQuestion } from './IAudiocallQuestion';

export interface IAudiocallQuestionArary {
  questions: Array<IAudiocallQuestion>,
  currentQuestion: number,
}
