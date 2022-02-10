import { GlobalConstants } from '../../GlobalConstants';
import { IAuth } from '../interfaces/IAuth';
import { ICreatedUser } from '../interfaces/ICreatedUser';
import { IUser } from '../interfaces/IUser';
import { axiosIntance } from './axiosIntance';

export class UserService {
  /**
   * This method uses token
   */
  static getUserById(id: string) {
    return axiosIntance()
      .get(`${GlobalConstants.API_ENDPOINT_USERS}/${id}`)
      .then((res) => res.data as IUser);
  }

  static createUser(email: string, password: string, name: string = email) {
    return axiosIntance(true)
      .post(`${GlobalConstants.API_ENDPOINT_USERS}`, {
        name,
        email,
        password,
      })
      .then((res) => res.data as ICreatedUser);
  }

  /**
   * This method uses token
   */
  static updateUser(email: string, password: string, id: string) {
    return axiosIntance()
      .put(`${GlobalConstants.API_ENDPOINT_USERS}/${id}`, {
        email,
        password,
      })
      .then((res) => res.data as IUser);
  }

  /**
   * This method uses token
   */
  static deleteUser(id: string) {
    return axiosIntance().delete(`${GlobalConstants.API_ENDPOINT_USERS}/${id}`);
  }

  /**
   * This method uses token
   */
  static refreshUserToken(id: string) {
    return axiosIntance()
      .get(`${GlobalConstants.API_ENDPOINT_USERS}/${id}/tokens`)
      .then((res) => res.data as IAuth);
  }
}
