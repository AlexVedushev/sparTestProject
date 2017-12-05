import 'react-native';
import React from 'react';
import { shallow, mount, render } from 'enzyme';
import 'jsdom-global/register';
import PropTypes from 'prop-types';
import sinon from 'sinon';
import CartListItem from '../screens/BasketScreen/CartListItem';
import { NativeModules } from 'react-native';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

describe('Testing CartListItem components:', () => {

  it('renders correctly', () => {
    const tree = renderer.create(
      <CartListItem />
      ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render again', () => {
      const wrapper = shallow(
          <CartListItem />
      );
      expect(wrapper).toMatchSnapshot();
  });

  it('Test TextInput default state', () => {
     const wrapper = shallow(<CartListItem />);
     expect((wrapper.find('TextInput')).node.props.value).toEqual('1');
   });

  it('render shown buttons', () => {
    const wrapper = shallow(<CartListItem />);
    //console.log(wrapper.debug());
    expect((wrapper.find('TouchableHighlight')).length).toEqual(2);
  });

  test('increment pressed', () => {
    component = shallow(<CartListItem />);
    incrementBtn = component.find('TouchableHighlight').first();
    incrementBtn.simulate('press');
    textInput = component.find('TextInput');
    expect(textInput.props().value).toEqual("2");
  });

  test('increment pressed', () => {
    component = shallow(<CartListItem />);
    incrementBtn = component.find('TouchableHighlight').first();
    incrementBtn.simulate('press');
    textInput = component.find('TextInput');
    expect(textInput.props().value).toEqual("2");
  });

  test('decrement pressed', () => {
    component = shallow(<CartListItem />);
    incrementBtn = component.find('TouchableHighlight').last();
    incrementBtn.simulate('press');
    textInput = component.find('TextInput');
    expect(textInput.props().value).toEqual("0");
  });

  test('decrement to negative number', () => {
    component = shallow(<CartListItem />);
    incrementBtn = component.find('TouchableHighlight').last();
    for (i = 0; i < 1; i++) {
      incrementBtn.simulate('press');
    }
    incrementBtn.simulate('press');
    textInput = component.find('TextInput');
    expect(textInput.props().value).toEqual("0");
  });
});
