import APISections from '../API/APISections';
import { AsyncStorage } from 'react-native';

export default class SectionManager {
  constructor() {

  }

  static keySections = 'sections'

  static getSectionsFromServer(callBack) {
    APISections.getSections((error, response) => {
      if (response == null || response.length == 0) {
        callBack(error, response)
        return;
      }
      const resList =  response.map((element) => {
        return {
          id: element.id,
          name: element.name
        }
      })
      AsyncStorage.setItem(this.keySections, JSON.stringify(resList), (err) => {
        callBack(error, response)
      });
    });
  }

  static getSectionsFromLocalStorage(callBack) {
    AsyncStorage.getItem(this.keySections, (err, result) => {
      if (err != null) {
        return;
      }
      callBack(JSON.parse(result))
    });
  }
}
