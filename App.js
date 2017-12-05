/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { TabNavigator, StackNavigator} from 'react-navigation';
import {
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';

// import MainScreen from './screens/Main';
import BasketScreen from './screens/BasketScreen/BasketScreen';
import MainStackNavigator from './screens/MainSection/MainStackNav';

const TabNavigation = TabNavigator({
  MainStackNavigator: {
    screen: MainStackNavigator,
  },
  CartScreen: {
    screen: StackNavigator({
      BasketScreen: {
        screen: BasketScreen
      },
    }),
  },
}, {
  tabBarPosition: 'bottom',
  animationEnabled: true,
  tabBarOptions: {
    activeTintColor: '#e91e63',
    style: {
      borderTopWidth: 1,
      borderTopColor: 'grey',
      height: 50
    },
  },
});

export default class App extends Component<{}> {

  render() {
    return (
      <TabNavigation/>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  tabBar: {
    height: 200
  },
  headerTitle: {
      alignSelf: 'center'
  },
});
