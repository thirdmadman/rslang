import Renderable from '../Renderable';
import { dch } from '../dch';
import { IAudiocallResultData } from '../../interfaces/IAudiocallResultData';
import { GlobalConstants } from '../../../GlobalConstants';
import { musicPlayer } from '../../services/SingleMusicPlayer';
import { PathBus } from '../../services/PathBus';

export class AudiocallStatisticPage extends Renderable {
  resultData: IAudiocallResultData[];

  resultContainer: HTMLElement;

  date: string;

  statisticContainer: HTMLElement;

  playAgainButton: HTMLElement;

  constructor(resultData: IAudiocallResultData[], answerChain: number) {
    super();
    this.resultData = resultData;
    this.statisticContainer = dch('p', [], `The longest answer Chain - ${answerChain}`);
    this.resultContainer = dch('div', ['result-container']);
    this.playAgainButton = dch('button', ['result-container_btn'], 'play again');
    this.playAgainButton.onclick = () => {
      PathBus.setCurrentPath(PathBus.getCurrentPath());
    };
    this.rootNode = dch('div', ['result-page'], '', this.resultContainer, this.playAgainButton);
    this.date = this.formatDate(new Date());
    resultData.forEach((item) => {
      const audioWordData = `${GlobalConstants.DEFAULT_API_URL}/${item.questionData.audio}`;
      const playAudioBtn = dch('button', [], 'play');
      playAudioBtn.onclick = () => {
        this.playAudio(audioWordData);
      };
      const word = dch('p', ['word-container_item'], `${item.questionData.word}`);
      const wordTranslate = dch('p', ['word-container_item'], `${item.questionData.wordTranslate}`);
      const wordResult = dch('p', ['word-container_item'], `${item.isCorrect ? 'true' : 'false'}`);
      const wordContainer = dch('div', ['word-container']);
      wordContainer.append(playAudioBtn, word, wordTranslate, wordResult);
      this.resultContainer.append(wordContainer, this.statisticContainer);
    });
  }

  playAudio = (audio: string) => {
    musicPlayer.setPlayList([audio]);
    musicPlayer.play()
      .catch(() => {});
  };

  formatDate = (date: Date) => date.toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
  });
}
