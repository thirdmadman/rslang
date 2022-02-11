import Renderable from '../Renderable';
import { dch } from '../dch';
import { AuthorizationForm } from './AuthorizationForm';

export class AuthorizationPage extends Renderable {
  transitionToLoginButton: HTMLElement;

  transitionToRegisterButton: HTMLElement;

  formContainer: HTMLElement;

  loginForm: HTMLElement;

  registrationForm: HTMLElement;

  constructor(redirectPage?: string) {
    super();
    this.loginForm = new AuthorizationForm('login', redirectPage).getElement();
    this.formContainer = dch('div', ['form-container'], '', this.loginForm);
    this.registrationForm = new AuthorizationForm('register', redirectPage).getElement();
    this.transitionToLoginButton = dch('button', ['auth-button'], 'Войти');
    this.transitionToLoginButton.addEventListener('click', () => {
      this.registrationForm.remove();
      this.formContainer.append(this.loginForm);
    });
    this.transitionToRegisterButton = dch('button', ['auth-button'], 'Регистрация');
    this.transitionToRegisterButton.addEventListener('click', () => {
      this.loginForm.remove();
      this.rootNode.append(this.registrationForm);
    });

    this.rootNode = dch(
      'div',
      ['auth-container'],
      '',
      this.transitionToLoginButton,
      this.transitionToRegisterButton,
      this.formContainer,
    );
  }
}
