import { AsyncStorage } from 'react-native';

export default class BasketManager {
  constructor() {
    this.basket = [],
    this.basketUpdateSubscribers = []
  }

  keyBasket = 'basket'

  subscribeToUpdated(subscribe) {
    this.basketUpdateSubscribers.push(subscribe)
  }

  getBasket(callBack) {
    AsyncStorage.getItem(this.keyBasket, (err, resStr) => {
      if (err != null || resStr == null) {
          callBack([])
          return;
      } else {
        let jsonObj = JSON.parse(resStr)
        var resList = []

        for (var i = 0; i < jsonObj.length; i++) {
            if (jsonObj[i].count != undefined && jsonObj[i].productID != undefined) {
              resList.push(jsonObj[i])
            }
        }

        AsyncStorage.setItem(this.keyBasket, JSON.stringify(resList), (err) => {

        })
        this.basket = resList
        callBack(Array.isArray(resList) ? resList : [])
      }
    })
  }

  saveBasket(basket, callBack) {
    this.basket = basket

    AsyncStorage.setItem(this.keyBasket, JSON.stringify(basket), (err) => {
        callBack(err)
    })
  }

  _basketUpdated() {
    for (var i = 0; i < this.basketUpdateSubscribers.length; i++) {
      let subscribe = this.basketUpdateSubscribers[i]
      subscribe(this.basket)
    }
    // if (this.basketUpdated != undefined) {
    //     this.basketUpdated(this.basket)
    // }
  }

  clearBasket() {
    this.saveBasket([], (err) => {
      this._basketUpdated()
    })
  }

  addProductItemToBasket(id, callBack) {
    this.getBasket((prList) => {
      var isPrNotFound = true;

      for(var i = 0; i < prList.length; i++) {
        if (prList[i].productID == id) {
          isPrNotFound = false
          prList[i].count++
          let count = prList[i].count

          this.saveBasket(prList, (err) => {
            callBack(err, count)
            this._basketUpdated()
          })
          break;
        }
      }

      if (isPrNotFound) {
        const product = {productID: id, count: 1}
        prList.push(product)

        this.saveBasket(prList, (err) => {
          callBack(err, product.count)
          this._basketUpdated()
        })
      }
    })
  }

  removeProductItemFromBasket(id, callBack) {
    this.getBasket((prList) => {
      var isPrNotFound = true;
      var basketList = prList

      let index = basketList.findIndex((element, index, array) => {
        return element.productID == id
      })
      var prCount = 0

      if (index != -1) {
        if (basketList[index].count <= 1) {
          basketList.splice(index, 1)
        } else {
          basketList[index].count--
          prCount = basketList[index].count
        }
      }

      this.saveBasket(basketList, (err) => {
        callBack(err, prCount)
        this._basketUpdated()
      })
    })
  }

  getCountProduct(id, callBack) {
    this.getBasket((prList) => {
      var isPrNotFound = true;

      for(var i = 0; i < prList.length; i++) {
        if (prList[i].productID == id) {
          callBack(prList[i].count)
          break;
        }
      }
      callBack(0)
    })
  }
}

export const basketManager = new BasketManager();
