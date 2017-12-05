import 'react-native';
import React from 'react';
import { shallow, mount, render } from 'enzyme';
import 'jsdom-global/register';
import "isomorphic-fetch"
import PropTypes from 'prop-types';
import sinon from 'sinon';
import MainScreen from '../screens/MainSection/Main';
import MainStackNavigator from '../screens/MainSection/MainStackNav';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

describe('Testing Main components:', () => {

  it('renders correctly', () => {
    const tree = renderer.create(
      <MainScreen />
      ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render again', () => {
      const wrapper = shallow(
          <MainScreen />
      );
          console.log(wrapper.debug());
      expect(wrapper).toMatchSnapshot();
  });


  // it('Test TextInput default state', () => {
  //    const wrapper = shallow(<CartListItem />);
  //    expect((wrapper.find('TextInput')).node.props.value).toEqual('1');
  //  });
  //
  // it('render shown buttons', () => {
  //   const wrapper = shallow(<CartListItem />);
  //   //console.log(wrapper.debug());
  //   expect((wrapper.find('TouchableHighlight')).length).toEqual(2);
  // });
  //
  // it('renders as expected', () => {
  //   const wrapper = shallow(
  //     <CartListItem textValue={1} />
  //   );
  //   //console.log(wrapper.debug());
  //   expect(wrapper).toMatchSnapshot();
  //   wrapper.setProps(renderer: { textValue: 2 });
  //   expect(wrapper).toMatchSnapshot();
  // });

});

describe('Testing MainStackNavigator components:', () => {


  it('renders correctly', () => {
    const tree = renderer.create(
      <MainStackNavigator />
      ).toJSON();
    expect(tree).toMatchSnapshot();
  });



  // it('should render again', () => {
  //     const wrapper = shallow(
  //         <MainStackNavigator />
  //     );
  //         console.log(wrapper.debug());
  //     expect(wrapper).toMatchSnapshot();
  // });
});
