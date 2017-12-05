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

import globStyles from '../../GlobalStyles';

export default class CartListItem extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      textValue: 1
    };
  }

  decrement(){
    this.setState({textValue: this.state.textValue - 1});
  }

  increment(){
      this.setState({textValue: this.state.textValue + 1});
  }

  renderChangeProductCount() {
    return (
      <View style={{flex: 1, flexDirection: 'row',  justifyContent: 'center'}}>
        <TouchableHighlight style={styles.addButton} onPress={() => this.increment()}>
          <Text> + </Text>
        </TouchableHighlight>
        <TextInput
          style = {styles.textInput}
          editable = {false}
          value = {this.state.textValue.toString()}
        />
        <TouchableHighlight
          style={styles.addButton}
          onPress={() => this.decrement()}>
          <Text> - </Text>
        </TouchableHighlight>
      </View>
    );
  };

  renderAddButton() {
    return (
      <TouchableHighlight
        style={styles.addButton}
        onPress={() => {
          if (this.props.addButtonPressed !== null) {
            this.props.addButtonPressed(this.props.id)
          }
        }}>
        <Text> Добавить </Text>
      </TouchableHighlight>
    );
  }

  renderActionBlock() {
    if (this.props.isShowAddButton) {
      return this.renderAddButton()
    } else {
      return this.renderChangeProductCount()
    }
  }

  render() {
    return (
      <View style={globStyles.listItem}>
        <View style={{flex: 1.4, flexDirection: 'row'}}>
          <Image
            source={require('../../images/item.png')}
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
    marginTop: 10,
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
  textInput: {
    width: 40,
    height: 30,
    alignSelf: 'flex-end',
    marginBottom: 10,
    marginRight: 10,
    textAlign: 'center',
  },
})
