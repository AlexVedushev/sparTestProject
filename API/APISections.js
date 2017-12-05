import {APIPath} from './APIPath';

export default class  APISections {
  constructor() {

  }
// callBack(isError, response)

  static getSections(callBack) {
    return fetch(APIPath.sections)
      .then((response) => response.json())
      .then((responseJson) => {
        callBack(null, responseJson)
      })
      .catch((error) => {
        callBack(error, null)
        console.error(error);
      });
  }
}
