import {
  createRouter,
} from '@exponent/ex-navigation';

import HomeScreen from '../screens/HomeScreen';
import AddFood from '../screens/AddFood';
import ExpandView from '../screens/ExpandedView';
import RootNavigation from './RootNavigation';
import Map from '../components/mapComponent';
import Desc from '../components/descComponent';
import Image from '../components/imageComponent';
import Price from '../components/priceCard';
import Food from '../components/foodDetails';

export default createRouter(() => ({
  home: () => HomeScreen,
  addFood: () => AddFood,
  rootNavigation: () => RootNavigation,
  map: () => Map,
	description: () => Desc,
	image: () => Image,
	expandView: () => ExpandView,
	price: () => Price,
	food: () => Food,
}));

