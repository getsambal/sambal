import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

import * as Font from 'expo-font';
import { LinearGradient } from 'expo-linear-gradient';

import Cards from '../components/Cards.js';
import Colors from '../constants/Colors';

export default class HomeScreen extends React.Component {
  render() {
    console.log('Inside render');
    return (
      <LinearGradient colors={['#FE8730', '#F8AE50']} style={styles.container}>
        <Cards />
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
    paddingTop: 24,
  },
});
