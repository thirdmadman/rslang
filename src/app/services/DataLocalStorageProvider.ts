import { IConfigs } from '../interfaces/IConfigs';

class DataLocalStorageProvider {
  static localStorageItemName = 'christmas-task';

  public static setData(data: IConfigs) {
    localStorage.setItem(DataLocalStorageProvider.localStorageItemName, JSON.stringify(data));
  }

  public static isNotEmpty() {
    const localStorageData = localStorage.getItem(DataLocalStorageProvider.localStorageItemName);
    return localStorageData && localStorageData[0] === '{';
  }

  public static destroy() {
    localStorage.removeItem(DataLocalStorageProvider.localStorageItemName);
  }

  public static getData(): IConfigs | null {
    const data = localStorage.getItem(DataLocalStorageProvider.localStorageItemName);
    let localStorageKeysNumber = 0;
    let dataIConfigs = null;
    if (data) {
      dataIConfigs = JSON.parse(data) as IConfigs;
      localStorageKeysNumber = Object.keys(dataIConfigs).length;
    }

    if (DataLocalStorageProvider.isNotEmpty()) {
      if (localStorageKeysNumber > 0) {
        return dataIConfigs;
      }
    } else {
      const genaratedData = DataLocalStorageProvider.generateData();
      DataLocalStorageProvider.setData(genaratedData);
      return genaratedData;
    }
    return null;
  }

  private static generateData() {
    const gameConfigs = {
      isExists: false,
    };
    return gameConfigs as IConfigs;
  }
}

export default DataLocalStorageProvider;
