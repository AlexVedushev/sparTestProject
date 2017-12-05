import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  Image,
  FlatList,
  ActivityIndicator,
} from 'react-native';

import GlobalStyles from '../../GlobalStyles';
import SingleSelectList from '../../components/SingleSelectList';
import SectionManager from '../../Managers/SectionManager';
// import ProductManager from '../../Managers/ProductManager';
import {prManager} from '../../Managers/ProductManager';

export default class MainScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoadingSections: true,
      isLoadingProducts: true,
      dateList: []
    }
  }

  componentDidMount() {
    SectionManager.getSectionsFromServer((error, response) => {
      if (response.length == 0) {
        return;
      }
      var resList = [];

      for (var i = 0; i < response.length; i++) {
          resList.push({id: response[i].id.toString(), title: response[i].name})
      }
      this.setState({dateList: resList, isLoadingSections: false})
    });

    prManager.getProductsFromServer((err, response) => {
      this.setState({isLoadingProducts: false})
    })
  }

  static navigationOptions = {
    tabBarLabel: 'Главный экран',
    title: 'Категории',
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require('../../images/home.png')}
        style={[GlobalStyles.tabBarIcon, {tintColor: tintColor}]}
      />
    )
  };

  _onPressCellWithId = (id: string, categoryName: string) => {
    const { navigate } = this.props.navigation;
    navigate('ItemDetail', {categoryId: id, categoryName: categoryName});
  };

  renderAcivityIndicator() {
    return (
      <View style={{flex: 1, paddingTop: 20}}>
        <ActivityIndicator />
      </View>
    );
  }

  render() {
    if (this.state.isLoadingSections || this.state.isLoadingProducts) {
    // if (this.state.isLoadingSections ) {
      return this.renderAcivityIndicator()
    }

    return (
      <View style = {styles.container}>
        <View style = {styles.container2}>
          <SingleSelectList
            data={this.state.dateList}
            onPressCellWithId = {this._onPressCellWithId}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerTextStyle: {
    paddingLeft: 10,
    fontWeight: 'bold',
    fontSize: 20
  },
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  container1: {
    height: 100,
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: '#F5FCFF',
  },
  container2: {
    // flex: 0.8,
    backgroundColor: '#F5FCFF',
  },
});
