import React from 'react';
import { StyleSheet, Platform } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Colors from '../constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';

import HomeScreen from '../screens/HomeScreen';
import AddFood from '../screens/AddFood';
import ExpandView from '../screens/ExpandedView';
// import RootNavigation from './RootNavigation'
import Map from '../components/mapComponent';
import Desc from '../components/descComponent';
import Image from '../components/imageComponent';
import Price from '../components/Cards';
import Food from '../components/FoodDetails';

const AppNavigator = createStackNavigator(
  {
    home: {
      screen: HomeScreen,
    },
    addFood: {
      screen: AddFood,
    },
    map: {
      screen: Map,
    },
    description: {
      screen: Desc,
    },
    image: {
      screen: Image,
    },
    expandView: {
      screen: ExpandView,
    },
    price: {
      screen: Price,
    },
    food: {
      screen: Food,
    },
  },
  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    },
    header: props => <GradientHeader {...props} />,
    headerStyle: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
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
  }
);

const GradientHeader = props => (
  <View style={{ backgroundColor: '#eee' }}>
    <LinearGradient
      colors={['#F8964E', '#F8AE50']}
      style={[StyleSheet.absoluteFill, { height: Header.HEIGHT }]}
    >
      <Header {...props} />
    </LinearGradient>
  </View>
);

export default createAppContainer(AppNavigator);
