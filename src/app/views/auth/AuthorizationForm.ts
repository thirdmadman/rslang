import { dch } from '../dch';
import Renderable from '../Renderable';
import { PathBus } from '../../services/PathBus';
import { SigninService } from '../../services/SigninService';
import { UserService } from '../../services/UserService';

export class AuthorizationForm extends Renderable {
  form: HTMLElement;

  emailInput: HTMLInputElement;

  passwordInput: HTMLInputElement;

  signinButton: HTMLElement;

  registerButton: HTMLElement;

  nameInput: HTMLInputElement;

  errorMessage: HTMLElement;

  constructor(param: string, redirectPage?: string) {
    super();
    this.form = dch('form', ['auth-form'], '');
    this.emailInput = dch('input', ['auth-form_input']) as HTMLInputElement;
    this.emailInput.setAttribute('type', 'email');
    this.emailInput.setAttribute('id', `${param}Email`);
    this.emailInput.setAttribute('placeholder', 'e-mail');
    this.passwordInput = dch('input', ['auth-form_input']) as HTMLInputElement;
    this.passwordInput.setAttribute('type', 'password');
    this.passwordInput.setAttribute('id', `${param}Password`);
    this.passwordInput.setAttribute('placeholder', 'password');
    this.signinButton = dch('button', ['auth-form_button'], 'Войти');
    this.signinButton.setAttribute('type', 'submit');
    this.signinButton.addEventListener('click', () => {
      this.signIn(redirectPage);
    });
    this.registerButton = dch('button', ['auth-form_button'], 'Зарегистрироваться');
    this.registerButton.setAttribute('type', 'submit');
    this.registerButton.addEventListener('click', () => {
      const emailValue = this.emailInput.value;
      const passwordValue = this.passwordInput.value;
      const nameValue = this.nameInput.value;
      this.registerUser(emailValue, passwordValue, nameValue, redirectPage);
    });
    this.nameInput = dch('input', ['auth-form_input']) as HTMLInputElement;
    this.nameInput.setAttribute('type', 'username');
    this.nameInput.setAttribute('id', `${param}Name`);
    this.nameInput.setAttribute('placeholder', 'username');
    this.errorMessage = dch('p', [], 'Что-то пошло не так. Попробуйте снова.');
    if (param === 'register') {
      this.form.append(this.nameInput, this.emailInput, this.passwordInput, this.registerButton);
    } else {
      this.form.append(this.emailInput, this.passwordInput, this.signinButton);
    }
    this.rootNode = dch('div', ['auth-form-container'], '', this.form);
  }

  registerUser(email: string, password: string, userName?: string, page?: string) {
    if (page) {
      UserService.createUser(email, password, userName).then(() => {
        this.signIn(page);
        PathBus.setCurrentPath(`${page}`);
      })
        .catch((error) => {
          console.error(error);
          this.rootNode.append(this.errorMessage);
        });
    }
  }

  signIn(page?: string) {
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
