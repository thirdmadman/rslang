import { GlobalConstants } from '../../GlobalConstants';
import { IUserSetting } from '../interfaces/IUserSetting';
import { axiosIntance } from './axiosIntance';

export class UserSettingService {
  /**
   * This method uses token
   */
  static getUserSettingById(id: string) {
    return axiosIntance()
      .get(`${GlobalConstants.API_ENDPOINT_USERS}/${id}/settings`)
      .then((res) => res.data as IUserSetting);
  }

  /**
   * This method uses token
   */
  static updateUserSettingById(id: string, statisticsData: IUserSetting) {
    return axiosIntance()
      .put(`${GlobalConstants.API_ENDPOINT_USERS}/${id}/settings`, statisticsData)
      .then((res) => res.data as IUserSetting);
  }
}
