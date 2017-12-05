import {basketManager} from '../../Managers/BasketManager';
import {prManager} from '../../Managers/ProductManager';

export default class BasketScreenModel {
  constructor() {
    this.basketList = [],
    this.upadateDataModelList = function(resList){}

    basketManager.subscribeToUpdated((basket) => {
      this.basketDataUpdated(basket)
    })
    // basketManager.basketUpdated = (basket) => {
    //   this.basketDataUpdated(basket)
    // }
  }

  basketDataUpdated(basketList) {
    this.basketList = basketList

    const allProductList = prManager.getProductListFromLocalStorage()

    if (allProductList.length == 0) {
      prManager.getDataFromServerCallBack = (list) => {
        this.receiveProductFromServer(list)
      }
    } else {
      this.dataModelFormatter(basketList, allProductList, (dataList) => {
        if (this.dataSourceUpdated != undefined) {
          this.dataSourceUpdated(dataList)
        }
      })
    }
  }

  clearBasket() {
    basketManager.clearBasket()
  }

  addToBasket(id, callBack) {
    let basketList = this.basketList.map((element) => {
      element.count = element.productID == id ? element.count + 1 : element.count;
      return element
    })
    this.basketList = basketList
    basketManager.addProductItemToBasket(id, (err, count) => {
      console.log(this.basketList);
      callBack(this.basketList)
    })
  }

  removeOneItemProductFromBasket(id, callBack) {
    var isNeedDeletePr = false
    let basketList = this.basketList

    let index =  this.basketList.findIndex((element, index, array) => {
      return element.productID == id
    })

    if (basketList[index].count <= 1) {
      basketList.splice(index, 1)
    } else {
      basketList[index].count--
    }
    this.basketList = basketList

    basketManager.removeProductItemFromBasket(id, (err, count) => {
      callBack(this.basketList)
    })
  }

  getScreenDataList(callBack) {
    basketManager.getBasket((basketList) => {
      this.basketList = basketList
      const allProductList = prManager.getProductListFromLocalStorage()

      if (allProductList.length == 0) {
        prManager.getDataFromServerCallBack = (list) => {
          this.receiveProductFromServer(list)
        }
      } else {
        this.dataModelFormatter(basketList, allProductList, callBack)
      }
    })
  }

  receiveProductFromServer(productList) {
    // const ttt = (productList) => {
    //   this.dataModelFormatter(this.basketList, productList, (resList) => {
    //     this.upadateDataModelList(resList)
    //   })
    // }
    // ttt(productList)
    this.dataModelFormatter(this.basketList, productList, (resList) => {
      this.upadateDataModelList(resList)
    })
  }

  dataModelFormatter(basketList, productList, callBack) {
    let prList = productList.filter((element) => {
      return this.isPrIdContainsInBasketList(element.product_id, basketList)
    })
    const resList = prList.map((item) => {
      return this.convertProductItemInBasketScreenData(item, basketList)
    })
    callBack(resList)
  }

  convertProductItemInBasketScreenData(item, basket) {
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

  isPrIdContainsInBasketList(id, basketList) {
    let index = basketList.findIndex((element, index, array) => {
      return element.productID == id
    })
    return index != -1
  }
}
