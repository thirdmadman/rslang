import { dch } from '../dch';
import Renderable from '../Renderable';
import { IAudiocallQuestion } from '../../interfaces/IAudiocallQuestion';
import { GlobalConstants } from '../../../GlobalConstants';
import { musicPlayer } from '../../services/SingleMusicPlayer';
import { IWord } from '../../interfaces/IWord';

export class AudiocallQuestion extends Renderable {
  questionData: IAudiocallQuestion;

  audioWord: string;

  playAudioButton: HTMLElement;

  constructor(questionData: IAudiocallQuestion) {
    super();
    this.questionData = questionData;

    this.audioWord = `${GlobalConstants.DEFAULT_API_URL}/${this.questionData.wordData.audio}`;
    this.playAudio(this.audioWord);

    this.playAudioButton = dch('button', [], 'play');
    this.playAudioButton.onclick = () => {
      this.playAudio(this.audioWord);
    };
    this.rootNode = dch('div', ['word-container'], '', this.playAudioButton);
    this.questionData.variants.sort(() => Math.random() - 0.5)
      .forEach((answer) => {
        const answerBtn = dch('button', [], answer.wordData.wordTranslate);
        this.rootNode.append(answerBtn);
        answerBtn.onclick = () => {
          this.onAnswer(this.questionData.wordData, answer.isCorrect);
        };
      });
  }

  playAudio = (audio: string) => {
    musicPlayer.setPlayList([audio]);
    musicPlayer.play()
      .catch(() => {});
  };

  destroy() {
    this.rootNode.remove();
  }

  onAnswer = (questionData: IWord, isCorrect: boolean) => {
    if (isCorrect) {
      // some reaction
    } else {
      // some reaction
    }
  };
}
