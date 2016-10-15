import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';

import Layouts from '../constants/Layout';
const Layout = Layouts.window;

export default class imageComponent extends Component{
	render(){
		return(
			<View>
				<Image 
					style={{height: Layout.height/3}}
          source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}
				/>
			</View>
		)
	}

}