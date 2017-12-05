import React, { Component, PureComponent } from 'react';
import {StackNavigator} from 'react-navigation';
import {
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  TouchableHighlight,
  TextInput,
  Modal,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';


import ProductListItem from '../../components/ProductListItem'
import globStyles from '../../GlobalStyles';
import BasketScreenModel from './BasketScreenModel';


export default class BasketScreen extends React.Component {
  constructor(props) {
    super(props);
    this.screenModel = new BasketScreenModel()

    this.state = {
      isModalVisible : false,
      textValue: 1,
      data: []
    };
  }

  static navigationOptions = {
    tabBarLabel: 'Корзина',
    title: 'Корзина',
    tabBarOnPress: (arg) => {
                arg.jumpToIndex(arg.scene.index);
            },

    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require('../../images/cart.png')}
        style={[globStyles.tabBarIcon, {tintColor: tintColor}]}
      />
    ),
  };

  componentDidMount() {
    this.screenModel.dataSourceUpdated = (dataList) => {
      this.updateDataSource(dataList)
    }

    this.screenModel.upadateDataModelList = (list) => {
      this.updateDataSource(list)
    }
    this.data = this.screenModel.getScreenDataList((dataList) => {
      this.setState({data: dataList})
    })
  }

  updateDataSource(dataList) {
    this.setState({data: dataList})
  }

  showPopup(visible){
    this.setState({ isModalVisible: visible });
  }

  hidePopUp() {
    this.setState({ isModalVisible: false });
  }

  sendPressed() {
    this.screenModel.clearBasket()
    this.hidePopUp(!this.state.isModalVisible)
  }

  decrement(id){
    this.screenModel.removeOneItemProductFromBasket(id, () => {})
    // this.setState({textValue: this.state.textValue - 1});
  }

  increment(id){
    this.screenModel.addToBasket(id, () => {})
      // this.setState({textValue: this.state.textValue + 1});
  }

  renderItem = ({item}) => {
    return (
      <ProductListItem
        id={item.id}
        title = {item.title}
        // ref={this.props.generateTestHook(`BasketList.${item.title}`)}
        // addButtonPressed={(id) => {this.addButtonPressed(id)} }
        incrementPressed = {(id) => {this.increment(id)}}
        decrementPressed = {(id) => {this.decrement(id)}}
        isShowAddButton = {true}
        imageSource = {item.imageURL == null ? require('../../images/not_image.png') : {uri: item.imageURL}}
        productCount = {item.count}
      />
    );
  }

  renderPopUp() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style = {styles.modal}>
          <View style = {{flex: 0.1, flexDirection: 'row'}}>
            <Text style = {styles.label}>
                Телефон
            </Text>
            <TextInput style = {styles.text}
            numberOfLines = {1}
            onChangeText = {(text) => this.setState({text})}
            value = {this.state.phoneNumber}
            />
          </View>
          <View style = {{flex: 0.1, flexDirection: 'row'}}>
            <Text style = {styles.label}>
                Адрес
            </Text>
            <TextInput style = {styles.text}
            numberOfLines = {1}
            onChangeText = {(text) => this.setState({text})}
            value = {this.state.address}
            />
          </View>
          <View style = {{flex: 0.4, flexDirection: 'row'}}>
            <Text style = {styles.label}>
                Комментарий
            </Text>
            <TextInput style = {styles.text}
            multiline = {true}
            numberOfLines = {5}
            onChangeText = {(text) => this.setState({text})}
            value = {this.state.comment}
            />
          </View>
          <View style = {{flex: 0.2, flexDirection: 'row', justifyContent:'center', alignItems:'center'}}>
            <View style = {{flex: 0.9, flexDirection: "row", justifyContent: 'space-between'}}>
              <TouchableHighlight
                style={styles.formButton}
                onPress = {() => {
                this.hidePopUp(!this.state.isModalVisible)}}>
                <Text>Отмена</Text>
              </TouchableHighlight>
              <TouchableHighlight
                style={styles.formButton}
                onPress = {() => {
                this.sendPressed()}}>
                <Text>Отправить</Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  render() {
    const { params } = this.props.navigation.state;
    return (
      <View style={styles.container}>
        <FlatList style={globStyles.list}
          data={this.state.data}
          extraData = {this.state.data}
          keyExtractor = {item => item.id}
          renderItem={this.renderItem}
        />
        <TouchableHighlight
          style={styles.issueButton}
          onPress={() => this.showPopup(true)}>
          <Text> Оформить </Text>
        </TouchableHighlight>
           {this.state.isModalVisible ? this.renderPopUp() : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  titleText: {
    fontSize: 20,
    textAlign: 'center',
    margin: 30,
    marginBottom: 10,
    color: 'black',
  },
  issueButton: {
    width: 100,
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
    marginBottom: 20,
    marginRight: 20,
    //position: 'absolute',
    //bottom: 20,
    //right: 20,
  },
  formButton: {
    // width: 100,
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 0.45,
    flexDirection: 'column'
  },
  modal: {
    flex: 1,
    height: 400,
    width: 300,
    // alignItems: 'center',
    backgroundColor: '#add8e6',
    position: 'absolute',
    justifyContent: 'space-between',
    borderColor: 'black',
    borderWidth: 1
  },
  label: {
    color: '#3f2949',
    marginTop: 15,
    marginLeft: 20,
    flex: 0.5
  },
  text: {
    backgroundColor: '#ffffff',
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    borderColor: 'black',
    borderWidth: 1,
    alignItems: 'flex-start',
    flex: 0.5,
    padding: 5
  }

});
