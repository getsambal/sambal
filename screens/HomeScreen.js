import React from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';

// TODO: Change text to Pacifico
import { MonoText } from '../components/StyledText';
import Layout from '../constants/Layout.js';
import Tinder from './Cards.js';

export default class HomeScreen extends React.Component {
  static route = {
    navigationBar: {
      title: 'Sambal',
      visible: true,
    },
  }

  render() {
    return (
      <View style={styles.container}>
        <Tinder style={{flex:1}}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    width: Layout.window.width,
    height: 400,
  },
});
