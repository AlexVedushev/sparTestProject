import React, { Component, PureComponent } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  TouchableHighlight,
  Button,
} from 'react-native';

import globStyles from '../../GlobalStyles';
import ProductListItem from '../../components/ProductListItem';
import ItemDetailModel from './ItemDetailModel';

export default class ItemScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {productList: []};
    this.screenModel = new ItemDetailModel()
  }

  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params !== undefined ? navigation.state.params.categoryName : 'Товар'
  });

  componentDidMount() {
    const { params } = this.props.navigation.state;

    this.screenModel.dataSourceUpdated = (dataList) => {
      this.updateDataSource(dataList)
    }

    this.screenModel.getProducDatatListBySectionId(params.categoryId, (list) => {
      this.setState({productList: list})
    })
  }

  updateDataSource(prList) {
    this.setState({productList: prList})
  }

  decrementProductPressed(id) {
    this.screenModel.removeFromBasket(id, (prList) => {
      console.log(this.state);
      console.log(prList);
      this.setState({productList: prList})
    })
  }

  incrementProductPressed(id) {
    this.screenModel.addToBasket(id, (prList) => {
      console.log(this.state);
      console.log(prList);
      this.setState({productList: prList})
    })
  }

  renderItem = ({item}) => (
    <ProductListItem
      id={item.id}
      title = {item.title}
      addButtonPressed={(id) => {this.incrementProductPressed(id)} }
      incrementPressed = {(id) => {this.incrementProductPressed(id)}}
      decrementPressed = {(id) => {this.decrementProductPressed(id)}}
      imageSource = {item.imageURL == null ? require('../../images/not_image.png') : {uri: item.imageURL}}
      productCount = {item.count}
    />
  );

  render() {
    const { params } = this.props.navigation.state;
    return (
      <View style={styles.container}>
        <FlatList style={globStyles.list}
          extraData = {this.state.productList}
          keyExtractor = {item => item.id}
          data={this.state.productList}
          renderItem={this.renderItem}
        />
      </View>
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
  titleText: {
    fontSize: 20,
    textAlign: 'center',
    margin: 30,
    marginBottom: 10,
    color: 'black',
  },
});
