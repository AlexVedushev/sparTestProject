// import ProductManager from '../../Managers/ProductManager';
import {prManager} from '../../Managers/ProductManager';
import {basketManager} from '../../Managers/BasketManager';

export default class ItemDetailModel {
  constructor() {
    this.ptoductList = []

    basketManager.subscribeToUpdated((basket) => {
      this.basketDataUpdated(basket)
    })
  }

  basketDataUpdated(basket) {
    prManager.getProductsByCategoryId(this.categoryId, (list) => {
      let prList = list.map((item) => {
        return this.convertProductObjToData(item, basket)
      })
      this.productList = prList
      this.updateScreenDataSource()
    })
  }

  updateScreenDataSource() {
    if (this.dataSourceUpdated != undefined) {
      this.dataSourceUpdated(this.productList)
    }
  }

  getProducDatatListBySectionId(id, callBack) {
    this.categoryId = id
    prManager.getProductsByCategoryId(id, (list) => {
      basketManager.getBasket((basket) => {
        let prList = list.map((item) => {
          return this.convertProductObjToData(item, basket)
        })
        this.productList = prList
        callBack(prList)
      })
    })
  }

  addToBasket(id, callBack) {
    let productList = this.productList.map((element) => {
      element.count = element.id == id ? element.count + 1 : element.count;
      return element
    })
    this.productList = productList
    basketManager.addProductItemToBasket(id, (err, count) => {
      callBack(this.productList)
    })
  }

  removeFromBasket(id, callBack) {
    let productList = this.productList.map((element) => {
      element.count = element.id == id ? (element.count - 1 < 0 ? 0 : element.count - 1) : element.count;
      return element
    })
    this.productList = productList

    basketManager.removeProductItemFromBasket(id, (err, count) => {
      callBack(this.productList)
    })
  }

  convertProductObjToData(item, basket) {
    const index = basket.findIndex((element, index, array) => {
      return element.productID == item.product_id
    })
    const countItem = index == -1 ? 0 : basket[index].count

    return {
      title: item.product_name,
      id: item.product_id,
      imageURL: item.images != null ? item.images.thumbnail : null,
      count: countItem
    }
  }


  isPrime(element, index, array) {
    var start = 2;
    while (start <= Math.sqrt(element)) {
      if (element % start++ < 1) {
        return false;
      }
    }
    return element > 1;
  }
}
