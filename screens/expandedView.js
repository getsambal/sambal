import React, { Component } from 'react';
import { View, Text, ScrollView, Animated, } from 'react-native';

import Map from '../components/mapComponent';
import Desc from '../components/descComponent';
import Image from '../components/imageComponent';

export default class expandedView extends Component{
  state = {
    scrollY: new Animated.Value(0),
  }

	render(){
		let { scrollY } = this.state;
		return(
			<View style={{flex:1, backgroundColor: '#FAFAFA'}}>
				<Image />
				<Animated.ScrollView>
					<Map />
					<Desc />
					<Desc />
				</Animated.ScrollView>
			</View>
		)
	}
}
