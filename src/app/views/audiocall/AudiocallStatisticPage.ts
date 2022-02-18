import Renderable from '../Renderable';
import { dch } from '../dch';
import { IAudiocallResultData } from '../../interfaces/IAudiocallResultData';
import { GlobalConstants } from '../../../GlobalConstants';
import { musicPlayer2 } from '../../services/SingleMusicPlayer2';
import { AudiocallService } from '../../services/audiocallService';

export class AudiocallStatisticPage extends Renderable {
  resultData: IAudiocallResultData[];

  resultContainer: HTMLElement;

  date: string;

  statisticContainer: HTMLElement;

  constructor(resultData: IAudiocallResultData[], answerChain: number) {
    super();
    this.resultData = resultData;
    console.log(answerChain);
    this.statisticContainer = dch('p', [], `The longest answer Chain - ${answerChain}`);
    this.resultContainer = dch('div', ['result-container']);
    this.rootNode = dch('div', ['result-page'], '', this.resultContainer);
    this.date = AudiocallService.formatDate(new Date());
    resultData.forEach((item) => {
      const auduoWordData = `${GlobalConstants.DEFAULT_API_URL}/${item.questionData.audio}`;
      const playAudioBtn = dch('button', [], 'play');
      playAudioBtn.onclick = () => {
        this.playAudio(auduoWordData);
      };
      const word = dch('p', ['word-container_item'], `${item.questionData.word}`);
      const wordTranslate = dch('p', ['word-container_item'], `${item.questionData.wordTranslate}`);
      const worResult = dch('p', ['word-container_item'], `${item.isCorrect ? 'true' : 'false'}`);
      const wordContainer = dch('div', ['word-container']);
      wordContainer.append(playAudioBtn, word, wordTranslate, worResult);
      this.resultContainer.append(wordContainer, this.statisticContainer);
    });
  }

  playAudio = (audio: string) => {
    musicPlayer2.setPlayList([audio]);
    musicPlayer2.play()
      .catch(() => {});
  };
}
