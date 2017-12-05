import {APIPath} from './APIPath';

export default class  APIProducts {
  constructor() {

  }
// callBack(isError, response)

  static getProducts(callBack) {
    return fetch(APIPath.products)
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
