import React, { Component } from 'react';
import { View, Text } from 'react-native';

import { Components } from 'exponent';

import Layouts from '../constants/Layout';
const Layout = Layouts.window;

export default class mapComponent extends Component{


	render(){
		return(
			<View style={{flex: 1}}>
				<Components.MapView
	        style={{height: Layout.height/5, marginTop: 10}}
	        initialRegion={{
	          latitude: 37.78825,
	          longitude: -122.4324,
	          latitudeDelta: 0.0922,
	          longitudeDelta: 0.0421,
	        }}
	      />
      </View>
		)
	}
}