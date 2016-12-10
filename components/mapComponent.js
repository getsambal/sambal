import React, { Component } from 'react';
import { View, Text, Platform, TouchableNativeFeedback, StyleSheet } from 'react-native';

import { Components } from 'exponent';
const { MapView } = Components;
import Layouts from '../constants/Layout';
import { MaterialIcons } from '@exponent/vector-icons';
import { RegularText } from './StyledText';


const _latlang = {
	latlang: {
		"latitude": 3.121709,
		"longitude": 101.7372493
	}
}


export default class mapComponent extends Component{


	render(){
		return(
			<View style={styles.Container}>
				
				<MapView
	        style={styles.MapView}
	        loadingBackgroundColor="#f9f5ed"
        	loadingEnabled={false}
        	cacheEnabled={Platform.OS === 'android'}
	        initialRegion={{
	          latitude: 3.195455,
	          longitude: 101.743030,
	          latitudeDelta: 0.003,
	          longitudeDelta: 0.003,
	        }}
	      >
		      <MapView.Marker
	          coordinate={{latitude: 3.195455, longitude: 101.743030}}
	          title="Aeon Big"
	        />
        </MapView>
        <TouchableNativeFeedback onPress={this.props.onPress}>
          <View style={styles.AddressContainer}>
            <View style={styles.AddressSubContainer}>
              <RegularText style={styles.AddressText}>
                Aeon Big, 53300
              </RegularText>

              <RegularText style={styles.CityText}>
                wangsa maju
              </RegularText>
            </View>

            <MaterialIcons name="chevron-right" size={30} color="#b8c3c9" />
          </View>
        </TouchableNativeFeedback>
      </View>
		)
	}
}

const styles = StyleSheet.create({

	Container: {
		flex: 1,
		backgroundColor: '#fff',
	},
	AddressContainer:{
		paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
	},
	AddressSubContainer: {
		flex: 1,
    paddingHorizontal: 12,
	},
	MapView: {
		height: Layouts.window.height/5, 
		marginTop: 10,
	},
	AddressText: {
		fontSize: 13,
    color: '#424242',
	},
	CityText: {
		fontSize: 12,
    marginTop: -1,
    color: '#9E9E9E',
	}

})