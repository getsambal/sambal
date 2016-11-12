import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {
  Font,
  Components
} from 'exponent';

import Cards from '../components/Cards.js';
import Layout from '../constants/Layout.js';
import Colors from '../constants/Colors';

export default class HomeScreen extends React.Component {
  static route = {
    navigationBar: {
      title: 'Sambal',
      titleStyle: [Font.style('pacifico'), {fontSize: 22}],
      visible: false,
    },
  }

  render() {
    return (
      <Components.LinearGradient 
        colors={['#FE8730', '#F8AE50']}
        style={styles.container}>
        <Cards/>
      </Components.LinearGradient>
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