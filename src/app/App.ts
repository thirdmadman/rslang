import { GlobalConstants } from '../GlobalConstants';
import { AudiocallController } from './controllers/AudiocallController';
import { AuthController } from './controllers/AuthController';
import { MainController } from './controllers/MainController';
import { SprintController } from './controllers/SprintController';
import { StatisticsController } from './controllers/StatisticsController';
import { VocabularyController } from './controllers/VocabularyController';
import { WordbookController } from './controllers/WordbookController';
import { PathBus } from './services/PathBus';
import { Router } from './services/Router';

export class App {
  private rootNode = document.body;

  private router = new Router();

  constructor() {
    this.rootNode = document.getElementsByClassName('app')[0] as HTMLElement;
    if (!this.rootNode) {
      this.rootNode = document.createElement('div');
      this.rootNode.classList.add('app');
    }
    document.body.append(this.rootNode);
  }

  run() {
    const mainController = new MainController(this.rootNode);
    const authController = new AuthController(this.rootNode);
    const wordbookController = new WordbookController(this.rootNode);
    const audiocallController = new AudiocallController(this.rootNode);
    const sprintController = new SprintController(this.rootNode);
    const vocabularyController = new VocabularyController(this.rootNode);
    const statisticsController = new StatisticsController(this.rootNode);

    this.router.addRoute(GlobalConstants.ROUTE_MAIN, () => mainController.resolve());
    this.router.addRoute(GlobalConstants.ROUTE_AUTH, (path: string) => authController.resolve(path));
    this.router.addRoute(GlobalConstants.ROUTE_WORDBOOK, (path: string) => wordbookController.resolve(path));
    this.router.addRoute(GlobalConstants.ROUTE_AUDIOCALL, (path: string) => audiocallController.resolve(path));
    this.router.addRoute(GlobalConstants.ROUTE_SPRINT, (path: string) => sprintController.resolve(path));
    this.router.addRoute(GlobalConstants.ROUTE_VOCABULARY, (path: string) => vocabularyController.resolve(path));
    this.router.addRoute(GlobalConstants.ROUTE_STATISTICS, (path: string) => statisticsController.resolve(path));

    if (!PathBus.getRealCurrentPath() || PathBus.getRealCurrentPath() === '') {
      PathBus.setCurrentPath(GlobalConstants.ROUTE_WORDBOOK);
    } else {
      PathBus.setCurrentPath(PathBus.getRealCurrentPath());
    }
  }
}
