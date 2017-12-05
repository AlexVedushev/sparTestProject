import React, { PureComponent } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
} from 'react-native';

class MyListItem extends React.PureComponent {
  _onPress = () => {
    this.props.onPressItem(this.props.id, this.props.title)
  };

  render() {
    const cellColor = this.props.selected ? "white" : "white"; // for indicate select cell
    return (
      // <TouchableOpacity ref={this.props.generateTestHook(`ItemList.${this.props.title}`)} onPress={this._onPress}>
      <TouchableOpacity  onPress={this._onPress}>
        <View style = {{backgroundColor: cellColor, height: 40, justifyContent: 'center'}}>
          <Text style = {styles.cellTextStyle}>
            {this.props.title}
          </Text>
        </View>
        <View style = {styles.cellSeparatorStyle}/>
      </TouchableOpacity>
    );
  }
}

export default class SingleSelectList extends React.PureComponent {
  state = {selectedId: ''};

  _keyExtractor = (item, index) => item.id;

  _onPressItem = (id, name) => {
    this.setState({selectedId: id});
    this.props.onPressCellWithId(id, name);
  };

  _renderItem = ({item}) => (
    <MyListItem
      id={item.id}
      onPressItem={this._onPressItem}
      selected={this.state.selectedId == item.id}
      title={item.title}
    />
  );

  render() {
    return (
      <FlatList
        automaticallyAdjustContentInsets={false}
        data={this.props.data}
        extraData={this.state}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderItem}
      />
    );
  }
}

const styles = StyleSheet.create({
  cellTextStyle: {
    paddingLeft: 10,
  },
  cellSeparatorStyle: {
    paddingLeft: 0,
    paddingRight: 0,
    paddingBottom: 0,
    height: 1,
    backgroundColor: 'black'
  },
  red: {
    backgroundColor: 'red',
  },
});
