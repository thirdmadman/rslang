import { IAuth } from '../interfaces/IAuth';
import DataLocalStorageProvider from './DataLocalStorageProvider';

export class TokenProvider {
  private static authData: IAuth;

  static getUserId() {
    if (this.checkIsAuthDataExists()) {
      return this.authData.userId;
    }
    return null;
  }

  private static checkIsAuthDataExists() {
    let result = false;
    if (this.authData) {
      result = true;
    } else {
      const configs = DataLocalStorageProvider.getData();
      if (configs?.authData) {
        this.authData = { ...configs.authData };
        result = true;
      }
    }
    return result;
  }

  static getToken() {
    if (this.checkIsAuthDataExists()) {
      return this.authData.token;
    }
    return null;
  }

  static setAuthData(data: IAuth) {
    const configs = DataLocalStorageProvider.getData();
    if (configs) {
      configs.authData = { ...data };
      DataLocalStorageProvider.setData(configs);
    }
    this.authData = { ...data };
  }

  static refreshToken() {
    throw new Error('Not implemented');
  }
}
