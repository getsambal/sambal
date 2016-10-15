import {
  createRouter,
} from '@exponent/ex-navigation';

// import HomeScreen from '../screens/HomeScreen';
import RootNavigation from './RootNavigation';

import HomeScreen from '../screens/FoodDetailsScreen';

export default createRouter(() => ({
  home: () => HomeScreen,
  rootNavigation: () => RootNavigation,
}));
