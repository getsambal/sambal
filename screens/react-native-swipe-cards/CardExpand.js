/* Card expand screen */

'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  WebView
} from 'react-native';

import NavigationBar from 'react-native-navbar';
import Colors from '../../styles/Colors';
// import BackButton from './shared/backButton';
// import ProfileButton from './shared/profileButton';

import { globals } from '../../styles';

class CardExpand extends Component {
  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.uploaded_by}>
          <Text style={styles.uploaded_by_text}>Upload by{'\n'}Meng Hong</Text>
        </View>
        <View style={styles.image}>
          <Image
            source={require('./img/mixedrice.jpg')}
          />
        </View>
        
        <View style={styles.textbox}>
          <Text style={styles.title_text}>Mixed Rice</Text>
          <Text style={styles.description_text}>
            Chang Cheng Restaurant (Petaling Jaya)
          </Text>
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    // justifyContent: 'flex-start',
    // alignItems: 'flex-start',
    backgroundColor: '#F5FCFF',
    zIndex: 1,
  },
  image: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: -150,
  },
  textbox: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',

  },
  uploaded_by: {
    padding: 10,
    zIndex: 10
  },
  uploaded_by_text: {
    textAlign: 'left',
    fontSize: 30,
  },
  title_text: {
    fontSize: 30,
    fontWeight: 'bold',
    // margin: 10,
    paddingLeft: 15
  },
  description_text: {
    fontSize: 18,
    paddingLeft: 15,
    paddingRight: 15,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

export default CardExpand;