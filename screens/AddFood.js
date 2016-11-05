import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Platform
} from 'react-native';

import Layout from '../constants/Layout.js';
import Colors from '../constants/Colors.js';

import { FontAwesome } from '@exponent/vector-icons';
import FloatLabelTextInput from 'react-native-floating-label-text-input';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default class AddFood extends React.Component {
  static route = {
    navigationBar: {
      title: 'Add Food',
    },
  }

  constructor(props) {
    super(props);
    this.state = {};
  };

  render() {
    return (
      <KeyboardAwareScrollView contentContainerStyle={styles.container}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={{uri: 'https://unsplash.it/500/500'}} />
          <TouchableOpacity style={styles.camera}>
            <FontAwesome name="camera" size={32} color="white" style={styles.iconCamera}/>
          </TouchableOpacity>
        </View>
        <View>
          <View style={styles.form}>
            <FloatLabelTextInput
              placeholder={"Food Name"}
              underlineColorAndroid='transparent'
            />
          </View>
          <View style={styles.form}>
            <FloatLabelTextInput
              placeholder={"Restaurant Name"}
              underlineColorAndroid='transparent'
            />
          </View>
          <View style={styles.form}>
            <FloatLabelTextInput
              placeholder={"Comments"}
              underlineColorAndroid='transparent'
            />
          </View>
          <View style={styles.locationContainer}>
            <FontAwesome name="location-arrow" size={32} color="grey" style={styles.iconLocation}/>
            <View style={styles.formLocation}>
              <FloatLabelTextInput
                placeholder={"Location"}
                underlineColorAndroid='transparent'
              />
            </View>
          </View>
        </View>
        <TouchableOpacity style={styles.submit} onPress={this._onPressButton}>
          <Text style={styles.submitText}>Submit</Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  form: {
    width: Layout.window.width - 20,
    marginLeft: -15
  },

  image: {
    width: Layout.window.width,
    height: 300,
    resizeMode: 'cover'
  },
  camera: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignSelf: 'flex-end',
    marginTop: -30
  },
  iconCamera: {
    alignSelf: 'center',
    backgroundColor: 'transparent',
  },
  locationContainer: {
    flexDirection: 'row',
    width: 100,
  },
  iconLocation: {
    alignSelf: 'center',
    marginTop: 6
  },
  formLocation: {
    width: Layout.window.width - 80,
  },
  submit: {
    margin: 10,
    width: Layout.window.width - 20,
    padding: 18,
    backgroundColor: Colors.primary,
    borderRadius: 5,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: {height: -3},
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 4,
      },
    }),
  }, 
  submitText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 22,
  }
});
