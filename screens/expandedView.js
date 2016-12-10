import React, { Component } from 'react';
import { View, Text, ScrollView, Animated, StyleSheet, Platform, Linking} from 'react-native';

import Map from '../components/mapComponent';
import Desc from '../components/descComponent';
import Image from '../components/imageComponent';
import Layout from '../constants/Layout';
import Price from '../components/priceCard';
import Food from '../components/foodDetails';

import {
  NavigationBar,
} from '@exponent/ex-navigation';
import {
  MaterialIcons,
} from '@exponent/vector-icons';
import Exponent, {
  Components,
} from 'exponent';

const data = {
	data_: {
		"image": 'https://img.grouponcdn.com/seocms/swZZyUMNMcZ84TUGjiQLLq/malaysian-food_hero-600x390.jpg',
		"desc": 'Food desc...',
    "price": 'RM 4.50 - 6.00',
    "name": 'Nasi Lemak',
    "restaurant": 'Nasi Lemak Sedap',
	}
}

export default class expandedView extends Component{

  state = {
    scrollY: new Animated.Value(0),
    address: 'Aeon Big',
    postalCode: '53300',
    city: 'wangsa maju',
  }

  _handlePressDirections = () => {
    let {
      address,
      postalCode,
      city,
    } = this.state;

    let daddr = encodeURIComponent(`${address} ${postalCode}, ${city}`);

    if (Platform.OS === 'ios') {
      Linking.openURL(`http://maps.apple.com/?daddr=${daddr}`);
    } else {
      Linking.openURL(`http://maps.google.com/?daddr=${daddr}`);
    }
  }

	render(){
		let { scrollY } = this.state;
		return(
			<View style={{flex:1, backgroundColor: '#FAFAFA'}}>
				<View style={{flex: 1, marginTop: -70}}>
					{this._renderHeroHeader()}

					<Animated.ScrollView
						scrollEventThrottle={16}
						style={StyleSheet.absoluteFill}
						onScroll={Animated.event(
	              [{ nativeEvent: { contentOffset: { y: scrollY } } }],
	              { useNativeDriver: true }
	            )}>

						<View style={{width: Layout.window.width, height: 370, backgroundColor: 'transparent',}} />

						<View style={{paddingBottom: 20, backgroundColor: '#FAFAFA', minHeight: Layout.window.height - 370}}>
              <Food details={data.data_}/>
							<Map onPress={this._handlePressDirections}/>
              <Price price={data.data_.price}/>
							<Desc desc={data.data_.desc}/>
						</View>

					</Animated.ScrollView>
				</View>
			</View>
		)
	}

  _renderHeroHeader() {
    let { scrollY } = this.state;

    let logoScale = scrollY.interpolate({
      inputRange: [-150, 0, 150],
      outputRange: [1.5, 1, 1],
    });

    let logoTranslateY = scrollY.interpolate({
      inputRange: [-150, 0, 150],
      outputRange: [40, 0, -40],
    });

    let logoOpacity = scrollY.interpolate({
      inputRange: [-150, 0, 200, 400],
      outputRange: [1, 1, 0.2, 0.2],
    });

    let heroBackgroundTranslateY = scrollY.interpolate({
      inputRange: [-1, 0, 200, 201],
      outputRange: [0, 0, -400, -400],
    });

    let gradientTranslateY = scrollY.interpolate({
      inputRange: [-1, 0, 1],
      outputRange: [1, 0, -1],
    });

    return (
      <View>
        <Animated.View style={[styles.AnimatedView, {transform: [{translateY: heroBackgroundTranslateY}]}]} />

        <View style={styles.ImageContainerView}>
          <Animated.Image
            source={{uri: data.data_.image}}
            style={[styles.AnimatedImage, {transform: [{scale: logoScale}, {translateY: logoTranslateY}], opacity: logoOpacity}]}
            resizeMode="cover"
          />
          <Animated.View style={[styles.AnimatedViewGradient, {transform: [{translateY: gradientTranslateY}]}]}>
            <Components.LinearGradient
              colors={['transparent', 'rgba(0,0,0,0.07)']}
              style={styles.LinearGradient}
            />
          </Animated.View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({

  AnimatedView:{
    height: 370 + 250,
    backgroundColor: '#FAFAFA',
  },
  ImageContainerView:{
    position: 'absolute', 
    top: 0, 
    left: 0, 
    right: 0, 
    height: 370, 
    paddingTop: 15, 
    alignItems: 'center', 
    justifyContent: 'center',
  },
  AnimatedImage:{
    width: Layout.window.width, 
    height: Layout.window.height/2, 
    marginTop: 80,
  },
  AnimatedViewGradient:{
    position: 'absolute', 
    left: 0, 
    right: 0, 
    bottom: 0,  
  },
  LinearGradient: {
    width: Layout.window.width,
    height: 30 
  },

})
