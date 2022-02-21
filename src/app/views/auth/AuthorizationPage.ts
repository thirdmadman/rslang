import Renderable from '../Renderable';
import { dch } from '../dch';
import { AuthorizationForm } from './AuthorizationForm';
import { PathBus } from '../../services/PathBus';
import { GlobalConstants } from '../../../GlobalConstants';
import './AuthorizationPage.scss';

export class AuthorizationPage extends Renderable {
  cancelButton: HTMLElement;

  transitionToRegisterButton: HTMLElement;

  formContainer: HTMLElement;

  loginForm: HTMLElement;

  registrationForm: HTMLElement;

  constructor(redirectPage?: string) {
    super();
    this.loginForm = new AuthorizationForm('login', redirectPage).getElement();
    this.formContainer = dch('div', ['form-container'], '', this.loginForm);
    this.registrationForm = new AuthorizationForm('register').getElement();
    this.cancelButton = dch('button', ['auth-form--button'], 'cancel');
    this.cancelButton.onclick = () => {
      this.cancel(redirectPage);
    };
    this.transitionToRegisterButton = dch('button', ['auth-form--button'], 'create new');
    this.transitionToRegisterButton.addEventListener('click', () => {
      this.rootNode.innerHTML = '';
      this.rootNode.append(this.registrationForm, this.cancelButton);
    });
    this.rootNode = dch(
      'div',
      ['auth-container'],
      '',
      this.formContainer,
      this.transitionToRegisterButton,
    );
  }

  cancel = (page: string = GlobalConstants.ROUTE_MAIN) => {
    if (page) {
      PathBus.setCurrentPath(`${page}`);
    }
  };
}
