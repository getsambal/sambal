import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Card, ListItem, Button } from 'react-native-elements';

import Layouts from '../constants/Layout';
const Layout = Layouts.window;

let desc = "This is food description";

export default class descComponent extends Component{
	render(){
		return(
				<View style={{flex:1, backgroundColor: '#FAFAFA'}}>
					<Text style={{fontSize: 16, fontWeight: '500', margin: 5}}>Description</Text>
					<View style={{height: Layout.height/6, backgroundColor: '#fff'}}>
						<Text style={{margin: 5, fontSize: 14}}>
							{this.props.desc}
						</Text>
					</View>
				</View>


		)
	}
}