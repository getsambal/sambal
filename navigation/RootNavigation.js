import React, {
  PropTypes
} from 'react';
import {
  DeviceEventEmitter,
  StyleSheet,
  View,
} from 'react-native';
import {
  StackNavigation,
  TabNavigation,
  TabNavigationItem,
  NavigationStyles
} from '@exponent/ex-navigation';
import {
  FontAwesome,
} from '@exponent/vector-icons';

import Colors from '../constants/Colors';
import Router from '../navigation/Router';

export default class RootNavigation extends React.Component {

  render() {
    return (
      <StackNavigation 
        initialRoute={Router.getRoute('home')}
        defaultRouteConfig={{
          styles: NavigationStyles.SlideHorizontal,
          navigationBar: {
            backgroundColor: Colors.primary,
            tintColor: '#fff',
          },
        }} 
      />
    );
  }

  _renderIcon(name, isSelected) {
    return (
      <FontAwesome
        name={name}
        size={32}
        color={isSelected ? Colors.tabIconSelected : Colors.tabIconDefault}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  selectedTab: {
    color: Colors.tabIconSelected,
  },
});
