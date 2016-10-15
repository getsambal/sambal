import {
  createRouter,
} from '@exponent/ex-navigation';

import HomeScreen from '../screens/HomeScreen';
import CardDetail from '../screens/CardDetail';
import AddFood from '../screens/AddFood';
import RootNavigation from './RootNavigation';

import HomeScreen from '../screens/FoodDetailsScreen';

export default createRouter(() => ({
  home: () => HomeScreen,
  cardDetail: () => CardDetail,
  addFood: () => AddFood,
  rootNavigation: () => RootNavigation,
}));
