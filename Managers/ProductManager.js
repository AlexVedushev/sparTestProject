import APIProduct from '../API/APIProduct';
import { AsyncStorage } from 'react-native';

export default class ProductManager {
  constructor() {
    this.productList = [],
    this.getDataFromServerCallBack = function(){};
  }

  keyProducts = 'products'

  getProductsFromServer(callBack) {
    APIProduct.getProducts((error, response) => {
      if (response == null || response.length == 0) {
        callBack(error, response)
        return;
      }
      const resList =  response.map((element) => {
        return {
          product_id: element.product_id,
          product_name: element.product_name,
          images: element.images,
          parent_section_id: element.parent_section_id
        }
      })
      this.productList = resList
      callBack(error, resList)
      this.getDataFromServerCallBack(resList)
      // AsyncStorage.setItem(this.keyProducts, JSON.stringify(resList), (err) => {
      //   callBack(error, response)
      // });
    });
  }

  getProductListFromLocalStorage() {
    return this.productList;
    // this.getProductsFromServer((err, list) => {
    //   if (err != null || list == null) {
    //     callBack([])
    //     return;
    //   }
    //   callBack(resList)
    // })

    // AsyncStorage.getItem(this.keyProducts, (err, resStr) => {
    //   if (err != null) {
    //       callBack([])
    //       return;
    //     }
    //
    //   let resList = JSON.parse(resStr)
    //   callBack(resList)
    // })
  }

  getProductsByCategoryId(id, callBack) {
    let prList = this.productList.filter((item) => {
      return item.parent_section_id == parseInt(id)
    })
    callBack(prList)

    // APIProduct.getProducts((error, response) => {
    //   if (response == null || response == null) {
    //     callBack(error, [])
    //     return;
    //   }
    //
    //   let resList = response
    //   let productList = resList.filter((item) => {
    //     return item.parent_section_id == parseInt(id)
    //   })
    //   callBack(productList)
    // });
    // AsyncStorage.getItem(this.keyProducts, (err, resStr) => {
    //   if (err != null || resStr == null) {
    //       callBack([])
    //       return;
    //     }
    //
    //   let resList = JSON.parse(resStr)
    //   let productList = resList.filter((item) => {
    //     return item.parent_section_id == parseInt(id)
    //   })
    //   callBack(productList)
    // })
  }
}

export const prManager = new ProductManager();
