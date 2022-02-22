import { dch } from '../dch';
import Renderable from '../Renderable';
import { GlobalConstants } from '../../../GlobalConstants';
import { IAudiocallAnswer } from '../../interfaces/IAudiocallAnswer';
import './AudiocallStartPage.scss';

export class AudiocallStartPage extends Renderable {
  gameDescription: HTMLElement;

  startButton: HTMLElement;

  group: number;

  page: number;

  arrayAnswers: IAudiocallAnswer[];

  title: HTMLElement;

  mainContainer: HTMLElement;

  buttonsContainer: HTMLElement;

  titleContainer: HTMLElement;

  buttonContainerText: HTMLElement;

  levelBtnContainer: HTMLElement;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onStartGame = (group: number, page: number) => {};

  constructor(group: number, page: number) {
    super();
    this.group = group;
    this.page = page;
    this.arrayAnswers = [];
    this.title = dch('h2', ['audiocall-page--title'], 'audio decoding');
    this.titleContainer = dch('div', ['audiocall-page--title-container'], '', this.title);
    this.gameDescription = dch(
      'div',
      ['audiocall-page--text'],
      `Record of vice will be played.
    Make a match between what is said and what is written.`,
    );

    this.startButton = dch('button', ['audiocall-page--button'], 'Start decoding');
    this.buttonContainerText = dch('p', ['button-container--text'], 'Choose your level of depth');
    this.levelBtnContainer = dch('div', ['level-button-container']);
    this.buttonsContainer = dch(
      'div',
      ['button-container'],
      '',
      this.buttonContainerText,
      this.levelBtnContainer,
      this.startButton,
    );
    this.mainContainer = dch('div', ['audiocall-page--main'], '', this.titleContainer, this.gameDescription);
    this.rootNode = dch('div', ['audiocall-page'], '', this.mainContainer, this.buttonsContainer);

    const getRandomInt = (min: number, max: number) => {
      const minAggregated = Math.ceil(min);
      const maxAggregated = Math.floor(max);
      return Math.floor(Math.random() * (maxAggregated - minAggregated + 1)) + minAggregated;
    };

    if (this.group < 0 && this.page < 0) {
      this.group = 0;
      this.page = 0;

      for (let i = 0; i < GlobalConstants.NUMBER_OF_GROUP_NO_AUTH_USER; i++) {
        const levelBtn = dch('button', ['level-button'], `${i + 1}`);
        this.levelBtnContainer.append(levelBtn);

        levelBtn.addEventListener('click', () => {
          this.group = i;
          this.page = getRandomInt(0, GlobalConstants.NUMBER_OF_PAGES - 1);

          Array.from(this.levelBtnContainer.children).forEach((node) => node.classList.remove('level-button-active'));

          levelBtn.classList.add('level-button-active');
        });
      }
    }

    this.startButton.addEventListener('click', () => {
      this.onStartGame(this.group, this.page);
    });
  }
}
