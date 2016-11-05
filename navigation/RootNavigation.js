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
          styles: NavigationStyles.SlideHorizontal,
          navigationBar: {
            tintColor: '#fff',
            renderBackground: (props) => 
              <View style={[{width: window.width }]}>
                <Components.LinearGradient
                  colors={['#F8964E', '#F8AE50']} 
                  start={[0.1,0.9]}
                  style={{position: 'absolute', left: 0, right: 0, top: 0, height: 64 }}
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
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  selectedTab: {
    color: Colors.tabIconSelected,
  },
});
