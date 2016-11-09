import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {
  Font,
} from 'exponent';

import Cards from '../components/Cards.js';
import Layout from '../constants/Layout.js';

export default class HomeScreen extends React.Component {
  static route = {
    navigationBar: {
      title: 'Sambal',
      titleStyle: [Font.style('pacifico'), {fontSize: 22}],
      visible: true,
    },
  }

  render() {
    return (
        <Cards/>
    );
  }
}

const styles = StyleSheet.create({

});