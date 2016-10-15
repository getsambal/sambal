import {
  createRouter,
} from '@exponent/ex-navigation';

import HomeScreen from '../screens/HomeScreen';
import CardDetail from '../screens/CardDetail';
import AddFood from '../screens/AddFood';
import expand from '../screens/expandedView';
import RootNavigation from './RootNavigation';
import Map from '../components/mapComponent';
import Desc from '../components/descComponent';
import Image from '../components/imageComponent';


export default createRouter(() => ({
  home: () => HomeScreen,
  cardDetail: () => CardDetail,
  addFood: () => AddFood,
  rootNavigation: () => RootNavigation,
  map: () => Map,
	description: () => Desc,
	image: () => Image,
	expand: () => expand,
}));
