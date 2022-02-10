import { dch } from '../../dch';
import { IWord } from '../../../interfaces/IWord';
import Renderable from '../../Renderable';
import { IPaginatedArray } from '../../../interfaces/IPaginatedArray';
import { PathBus } from '../../../services/PathBus';
import { GlobalConstants } from '../../../../GlobalConstants';

export class LevelNavigation extends Renderable {
  data: IPaginatedArray<IWord>;

  constructor(data: IPaginatedArray<IWord>) {
    super();
    this.data = data;
    this.rootNode = dch('div', ['level_navigation'], '');
    const btnCount = 6;
    for (let i = 1; i <= btnCount; i++) {
      const levelBtn = dch('button', ['level_button'], `${i}`);
      // levelBtn.dataset.level = `${i}`;
      this.rootNode.append(levelBtn);
      levelBtn.addEventListener('click', () => { this.changeLevel(i); });
    }
  }

  changeLevel(level: number) {
    this.data.currentGroup = level;
    PathBus.setCurrentPath(
      `${GlobalConstants.ROUTE_WORDBOOK}/${this.data.currentGroup}/${this.data.currentPage}`,
    );
  }
}
