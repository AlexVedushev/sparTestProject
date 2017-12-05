import 'react-native';
import React from 'react';
import {basketManager} from '../Managers/BasketManager';
import {prManager} from '../Managers/ProductManager';


// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

this.basketList = [],
this.upadateDataModelList = function(resList){}
basketManager.basketUpdated = (basket) => {
  this.basketDataUpdated(basket)
}

describe('Testing BascketManager functions:', () => {
  test('default basketList is empty', () => {
      expect(this.basketList.length).toEqual(0);
  });
});
