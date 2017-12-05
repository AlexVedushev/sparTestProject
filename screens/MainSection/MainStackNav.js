import React, { Component } from 'react';
import {StackNavigator} from 'react-navigation';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';

import MainScreen from './Main';
import ItemDetail from '../ItemDetailScreen/ItemDetail';
import GlobalStyles from '../../GlobalStyles';

const MainStackNavigatorConst = StackNavigator({
  MainScreen: { screen: MainScreen },
  ItemDetail: { screen: ItemDetail },
});


export default class MainStackNavigator extends React.Component {

  static navigationOptions = {
    tabBarLabel: 'Главный экран',
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require('../../images/home.png')}
        style={[GlobalStyles.tabBarIcon, {tintColor: tintColor}]}
      />
    )
  };

  render() {
    return (
      <MainStackNavigatorConst/>
    );
  }
}
