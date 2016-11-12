import React, {
  PropTypes
} from 'react';
import {
  DeviceEventEmitter,
  StyleSheet,
  View,
  Platform
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
  Components
} from 'exponent';

import Colors from '../constants/Colors';
import Router from '../navigation/Router';

export default class RootNavigation extends React.Component {

  render() {
    return (
      <StackNavigation 
        initialRoute={Router.getRoute('home')}
        defaultRouteConfig={{
          styles: NavigationStyles.Fade,
          navigationBar: {
            tintColor: '#fff',
            renderBackground: (props) => 
              <View style={[{width: window.width }]}>
                <Components.LinearGradient
                  colors={['#F8964E', '#F8AE50']} 
                  style={styles.navbar}
                />
              </View>,
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
  navbar: {
    position: 'absolute', 
    left: 0, 
    right: 0, 
    top: 0, 
    height: 64,
    ...Platform.select({
      ios: {
        height: 64,
      },
      android: {
        height: 96,
      },
    }),
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  selectedTab: {
    color: Colors.tabIconSelected,
  },
});
