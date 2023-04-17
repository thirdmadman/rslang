/* eslint-disable class-methods-use-this */
import { dch } from '../dch';
import Renderable from '../Renderable';
import { PathBus } from '../../services/PathBus';
import { SigninService } from '../../services/SigninService';
import { UserService } from '../../services/UserService';
import { GlobalConstants } from '../../../GlobalConstants';
import { TokenProvider } from '../../services/TokenProvider';
import './AuthorizationPage.scss';

export class AuthorizationPage extends Renderable {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onCreateButtonClick = () => {};

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onCancelButtonClick = () => {};

  private redirectPage = GlobalConstants.ROUTE_WORDBOOK;

  constructor(path: string) {
    super();
    this.rootNode = dch('div', ['auth-page']);

    const currentPath = path.split('/');
    const redirectPage = path.split('?path=')[1];

    if (currentPath[1] === 'expired?path=') {
      this.redirectPage = redirectPage;
    }

    this.showSignIn();
  }

  showSignIn() {
    this.rootNode.innerHTML = '';

    const mainTitleSignIn = dch('div', ['auth-page--title'], 'Identity recognizing');

    const inputGroupEmail = dch('div', ['auth-page--input-group']);
    const emailInputTitle = dch('div', ['auth-page--input-title'], 'E-mail');
    const emailInput = dch('input', ['auth-page--input']) as HTMLInputElement;
    emailInput.setAttribute('type', 'email');
    emailInput.setAttribute('placeholder', 'notfound@syntax.error');
    inputGroupEmail.append(emailInputTitle, emailInput);

    const inputGroupPassword = dch('div', ['auth-page--input-group', 'auth-page--input-group--last']);
    const passwordInputTitle = dch('div', ['auth-page--input-title'], 'Secret');
    const passwordInput = dch('input', ['auth-page--input']) as HTMLInputElement;
    passwordInput.setAttribute('type', 'password');
    passwordInput.setAttribute('placeholder', '*****');
    inputGroupPassword.append(passwordInputTitle, passwordInput);

    const signInButton = dch('button', ['auth-form--button'], 'Start sync');
    signInButton.onclick = () => {
      const emailValue = emailInput.value;
      const passwordValue = passwordInput.value;
      this.signIn(emailValue, passwordValue);
    };

    const text = dch('h3', ['auth-form--text'], 'or');

    const openRegisterButton = dch('button', ['auth-form--button'], 'CREATE NEW');
    openRegisterButton.onclick = () => {
      this.showRegister();
    };

    const exitButton = dch('button', ['auth-form--button'], 'STOP SYNC');
    exitButton.onclick = () => {
      this.signOut();
    };

    const pageContainer = dch('div', ['auth-page--container']);
    if (!TokenProvider.checkIsExpired()) {
      pageContainer.append(
        mainTitleSignIn,
        exitButton,
        text,
        openRegisterButton,
      );
    } else {
      pageContainer.append(
        mainTitleSignIn,
        inputGroupEmail,
        inputGroupPassword,
        signInButton,
        text,
        openRegisterButton,
      );
    }
    this.rootNode.append(pageContainer);
  }

  showRegister() {
    this.rootNode.innerHTML = '';

    const mainTitleRegistration = dch('div', ['auth-page--title'], 'Identity creation');

    const inputGroupName = dch('div', ['auth-page--input-group']);
    const nameInputTitle = dch('div', ['auth-page--input-title'], 'UID');
    const nameInput = dch('input', ['auth-page--input']) as HTMLInputElement;
    nameInput.setAttribute('type', 'username');
    nameInput.setAttribute('placeholder', 'any-name');
    inputGroupName.append(nameInputTitle, nameInput);

    const inputGroupEmail = dch('div', ['auth-page--input-group']);
    const emailInputTitle = dch('div', ['auth-page--input-title'], 'E-mail');
    const emailInput = dch('input', ['auth-page--input']) as HTMLInputElement;
    emailInput.setAttribute('type', 'email');
    emailInput.setAttribute('placeholder', 'notfound@syntax.error');
    inputGroupEmail.append(emailInputTitle, emailInput);

    const inputGroupPassword = dch('div', ['auth-page--input-group', 'auth-page--input-group--last']);
    const passwordInputTitle = dch('div', ['auth-page--input-title'], 'Secret');
    const passwordInput = dch('input', ['auth-page--input']) as HTMLInputElement;
    passwordInput.setAttribute('type', 'password');
    passwordInput.setAttribute('placeholder', '*****');
    inputGroupPassword.append(passwordInputTitle, passwordInput);

    const registerButton = dch('button', ['auth-form--button'], 'create new');
    registerButton.onclick = () => {
      const emailValue = emailInput.value;
      const passwordValue = passwordInput.value;
      const nameValue = nameInput.value;
      this.registerUser(emailValue, passwordValue, nameValue);
    };

    const text = dch('h3', ['auth-form--text'], 'or');

    const cancelButton = dch('button', ['auth-form--button'], 'Cancel');
    cancelButton.onclick = () => {
      this.showSignIn();
    };

    const pageContainer = dch('div', ['auth-page--container']);
    pageContainer.append(
      mainTitleRegistration,
      inputGroupName,
      inputGroupEmail,
      inputGroupPassword,
      registerButton,
      text,
      cancelButton,
    );

    this.rootNode.append(pageContainer);
  }

  registerUser(email: string, password: string, userName?: string) {
    UserService.createUser(email, password, userName)
      .then(() => {
        this.signIn(email, password);
      })
      .catch((error) => {
        console.error(error);
        // this.authContainer.append(this.errorMessage);
      });
  }

  signIn(email: string, password: string) {
    SigninService.auth(email, password)
      .then(() => {
        PathBus.setCurrentPath(`${this.redirectPage}`);
      })
      .catch((error) => {
        console.error(error);
        this.rootNode.append(String(error));
      });
  }

  signOut = () => {
    TokenProvider.clearAuthData();
    PathBus.setCurrentPath(PathBus.getCurrentPath());
  };
}
