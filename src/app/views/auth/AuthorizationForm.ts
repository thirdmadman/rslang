import { dch } from '../dch';
import Renderable from '../Renderable';

export class AuthorizationForm extends Renderable {
  form: HTMLElement;

  emailInput: HTMLElement;

  passwordInput: HTMLElement;

  loginButton: HTMLElement;

  registerButton: HTMLElement;

  nameInput: HTMLElement;

  constructor(param: string) {
    super();
    this.form = dch('form', ['auth-form'], '');
    this.emailInput = dch('input', ['auth-form_input']);
    this.emailInput.setAttribute('type', 'email');
    this.emailInput.setAttribute('id', `${param}Email`);
    this.emailInput.setAttribute('placeholder', 'e-mail');
    this.passwordInput = dch('input', ['auth-form_input']);
    this.passwordInput.setAttribute('type', 'password');
    this.passwordInput.setAttribute('id', `${param}Password`);
    this.passwordInput.setAttribute('placeholder', 'password');
    this.loginButton = dch('button', ['auth-form_button'], 'Войти');
    this.loginButton.setAttribute('type', 'submit');
    this.registerButton = dch('button', ['auth-form_button'], 'Зарегистрироваться');
    this.registerButton.setAttribute('type', 'submit');
    this.nameInput = dch('input', ['auth-form_input']);
    this.nameInput.setAttribute('type', 'username');
    this.nameInput.setAttribute('id', `${param}Name`);
    this.nameInput.setAttribute('placeholder', 'username');
    if (param === 'register') {
      this.form.append(this.nameInput, this.emailInput, this.passwordInput, this.registerButton);
    } else {
      this.form.append(this.emailInput, this.passwordInput, this.loginButton);
    }
    this.rootNode = dch('div', ['auth-container'], '', this.form);
  }
}
