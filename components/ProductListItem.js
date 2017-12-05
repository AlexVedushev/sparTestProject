import React, { Component, PureComponent } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  TouchableHighlight,
  TextInput,
  Modal,
} from 'react-native';

import globStyles from '../GlobalStyles';

export default class ProductListItem extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      productCount: props.productCount ? props.productCount : 0 };
  }

  componentWillUpdate() {
      let count = this.props.productCount != undefined ? this.props.productCount : this.state.productCount

      if (count != this.state.productCount) {
        this.setState({productCount: count})
      }
  }

  componentDidUpdate() {
    let count = this.props.productCount != undefined ? this.props.productCount : this.state.productCount

    if (count != this.state.productCount) {
      this.setState({productCount: count})
    }
  }

  decrement(){
    if (this.props.decrementPressed) {
      this.props.decrementPressed(this.props.id)
    }
  }

  increment(){
      if (this.props.incrementPressed) {
        this.props.incrementPressed(this.props.id)
      }
  }

  addButtonTouched() {
    this.props.addButtonPressed(this.props.id)
  }

  renderChangeProductCount() {
    return (
      <View style={{flex: 0.45, flexDirection: 'row',  justifyContent: 'center', paddingRight: 5}}>
        <TouchableHighlight style={styles.changeCountButton} onPress={() => this.decrement()}>
          <Text> - </Text>
        </TouchableHighlight>
        <TextInput
          style = {styles.textInput}
          editable = {false}
          value = {this.state.productCount.toString()}
        />
        <TouchableHighlight
          style={styles.changeCountButton}
          onPress={() => this.increment()}>
          <Text> + </Text>
        </TouchableHighlight>
      </View>
    );
  };

  renderAddButton() {
    return (
      <TouchableHighlight
        style={styles.addButton}
        onPress={() => {this.addButtonTouched()}}
      >
        <Text> Добавить </Text>
      </TouchableHighlight>
    );
  }

  renderActionBlock() {
    if (this.state.productCount == 0) {
      return this.renderAddButton()
    } else {
      return this.renderChangeProductCount()
    }
  }

  render() {
    return (
      <View style={styles.listItem}>
        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
          <Image
            source={this.props.imageSource}
            style={styles.image}
          />
          <Text style={styles.itemText}>{this.props.title}</Text>
        </View>
          {this.renderActionBlock()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    marginTop: 10,
    marginBottom: 10,
    height: 60,
    width: 80,
  },
  itemText: {
    flex: 1,
    marginLeft: 10,
    marginTop: 0,
    fontSize: 14,
    // backgroundColor: 'red'
  },
  addButton: {
    width: 100,
    height: 40,
    borderColor: 'gray',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginBottom: 10,
    marginRight: 10,
  },
  changeCountButton: {
    width: 30,
    height: 30,
    borderColor: 'gray',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginBottom: 10,
    marginRight: 10,
  },
  textInput: {
    width: 20,
    height: 30,
    alignSelf: 'flex-end',
    marginBottom: 10,
    marginRight: 10,
    textAlign: 'center',
  },
  listItem: {
    flex: 1,
    flexDirection: 'row',
    height: 80,
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
})
