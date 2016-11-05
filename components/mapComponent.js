import React, { Component } from 'react';
import { View, Text, Platform } from 'react-native';

import { Components } from 'exponent';
const { MapView } = Components;
import Layouts from '../constants/Layout';


const _latlang = {
	latlang: {
		"latitude": 3.121709,
		"longitude": 101.7372493
	}
}


export default class mapComponent extends Component{


	render(){
		return(
			<View style={{flex: 1}}>
				
				<MapView
	        style={{height: Layouts.window.height/5, marginTop: 10}}
	        loadingBackgroundColor="#f9f5ed"
        	loadingEnabled={false}
        	cacheEnabled={Platform.OS === 'android'}
	        initialRegion={{
	          latitude: _latlang.latlang.latitude,
	          longitude: _latlang.latlang.latitude,
	          latitudeDelta: 0.0922,
	          longitudeDelta: 0.0421,
	        }}
	      >
		      <MapView.Marker
	          coordinate={{latitude: _latlang.latlang.latitude, longitude: _latlang.latlang.longitude}}
	          title="Shamelin"
	        />
        </MapView>
      </View>
		)
	}
}