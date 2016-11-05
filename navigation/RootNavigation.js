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
import {
  Font,
} from 'exponent';

import Colors from '../constants/Colors';
import Router from '../navigation/Router';

export default class RootNavigation extends React.Component {

  render() {
    return (
      <StackNavigation 
        initialRoute={Router.getRoute('expand')}
        defaultRouteConfig={{
          styles: NavigationStyles.SlideHorizontal,
          navigationBar: {
            backgroundColor: Colors.primary,
            tintColor: '#fff',
            titleStyle: [styles._titleStyle, Font.style('pacifico')]
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
  _titleStyle: {
    fontSize: 22
  }
});
