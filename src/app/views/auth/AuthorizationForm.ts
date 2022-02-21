import { dch } from '../dch';
import Renderable from '../Renderable';
import { PathBus } from '../../services/PathBus';
import { SigninService } from '../../services/SigninService';
import { UserService } from '../../services/UserService';
import { GlobalConstants } from '../../../GlobalConstants';
import './AuthorizationForm.scss';

export class AuthorizationForm extends Renderable {
  emailInput: HTMLInputElement;

  passwordInput: HTMLInputElement;

  signinButton: HTMLElement;

  registerButton: HTMLElement;

  nameInput: HTMLInputElement;

  errorMessage: HTMLElement;

  authContainer: HTMLElement;

  mainTitleContainer: HTMLElement;

  mainTitleSignin: HTMLElement;

  emailInputContainer: HTMLElement;

  passwordInputContainer: HTMLElement;

  emailInputTitle: HTMLElement;

  passwordInputTitle: HTMLElement;

  text: HTMLElement;

  toRegisterButton: HTMLElement;

  param: string;

  mainTitleRegistration: HTMLElement;

  nameInputTitle: HTMLElement;

  nameInputContainer: HTMLElement;

  constructor(param: string, redirectPage?: string) {
    super();
    this.param = param;
    this.mainTitleSignin = dch('div', ['auth-container--title'], 'Identity recognizing');
    this.mainTitleRegistration = dch('div', ['auth-container--title'], 'Identity creation');
    this.mainTitleContainer = dch('div', ['auth-container--title-container'], '');
    this.nameInput = dch('input', ['auth-form--input']) as HTMLInputElement;
    this.nameInput.setAttribute('type', 'username');
    this.nameInput.setAttribute('placeholder', 'any-name');
    this.nameInputTitle = dch('h2', ['auth-form--title'], 'UID');
    this.nameInputContainer = dch(
      'div',
      ['auth-form_input-container'],
      '',
      this.nameInput,
    );
    this.emailInput = dch('input', ['auth-form--input']) as HTMLInputElement;
    this.emailInputTitle = dch('h2', ['auth-form--title'], 'E-mail');
    this.emailInputContainer = dch(
      'div',
      ['auth-form_input-container'],
      '',
      this.emailInput,
    );
    this.emailInput.setAttribute('type', 'email');
    this.emailInput.setAttribute('placeholder', 'notfound@syntax.error');
    this.passwordInput = dch('input', ['auth-form--input']) as HTMLInputElement;
    this.passwordInput.setAttribute('type', 'password');
    this.passwordInput.setAttribute('placeholder', '*****');
    this.passwordInputTitle = dch('h2', ['auth-form--title'], 'Secret');
    this.passwordInputContainer = dch(
      'div',
      ['auth-form_input-container'],
      '',
      this.passwordInput,
    );
    this.signinButton = dch('button', ['auth-form--button'], 'Start sync');
    this.signinButton.setAttribute('type', 'submit');
    this.signinButton.addEventListener('click', () => {
      this.signIn(redirectPage);
    });
    this.text = dch('h3', ['auth-form--text'], 'or');
    this.toRegisterButton = dch('button', ['auth-form--button'], 'create new');
    this.registerButton = dch('button', ['auth-form--button'], 'create new');
    this.registerButton.setAttribute('type', 'submit');
    this.registerButton.addEventListener('click', () => {
      const emailValue = this.emailInput.value;
      const passwordValue = this.passwordInput.value;
      const nameValue = this.nameInput.value;
      this.registerUser(emailValue, passwordValue, nameValue);
    });

    this.errorMessage = dch('p', ['auth-form--text', 'error-text'], 'Something went wrong. Try again');
    this.authContainer = dch('div', ['auth-container'], '', this.mainTitleContainer, this.emailInputContainer);
    this.rootNode = dch('div', ['auth-page']);
    if (this.param === 'register') {
      this.mainTitleContainer.append(this.mainTitleRegistration);
      this.authContainer.append(
        this.mainTitleContainer,
        this.nameInputTitle,
        this.nameInputContainer,
        this.emailInputTitle,
        this.emailInputContainer,
        this.passwordInputTitle,
        this.passwordInputContainer,
        this.registerButton,
      );
      this.rootNode.append(this.mainTitleContainer, this.authContainer);
    } else {
      this.mainTitleContainer.append(this.mainTitleSignin);
      this.authContainer.append(
        this.mainTitleContainer,
        this.emailInputTitle,
        this.emailInputContainer,
        this.passwordInputTitle,
        this.passwordInputContainer,
        this.signinButton,
        this.text,
      );
      this.rootNode.append(this.mainTitleContainer, this.authContainer);
    }
  }

  registerUser(email: string, password: string, userName?: string) {
    UserService.createUser(email, password, userName).then(() => {
      this.signIn();
    })
      .catch((error) => {
        console.error(error);
        this.authContainer.append(this.errorMessage);
      });
  }

  signIn(page: string = GlobalConstants.ROUTE_MAIN) {
    const emailValue = this.emailInput.value;
    const passwordValue = this.passwordInput.value;
    SigninService.auth(emailValue, passwordValue).then(() => {
      if (page) {
        PathBus.setCurrentPath(`${page}`);
      }
    }).catch((error) => {
      console.error(error);
      this.rootNode.append(this.errorMessage);
    });
  }
}
