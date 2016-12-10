import React, {Component} from 'react';
import { Text, View } from 'react-native';

import { BoldText, RegularText } from './StyledText';
import Layouts from '../constants/Layout';
const Layout = Layouts.window;

export default class PriceCard extends Component{
	render(){
		return(
			<View style={{flex:1, backgroundColor: '#FAFAFA', paddingBottom: 10}}>

				<View style={{height: 50, backgroundColor: '#fff'}}>
				
	        <BoldText style={{margin: 5, fontSize: 18, color: '#424242',}}>
            {this.props.details.name}
          </BoldText>

          <RegularText style={{marginTop: -2, marginLeft: 10, fontSize: 16, color: '#9E9E9E',}}>
            at {this.props.details.restaurant}
          </RegularText>
				</View>

			</View>
		)
	}
}