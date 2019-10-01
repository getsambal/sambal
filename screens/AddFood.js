import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
  Slider,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { FontAwesome } from '@expo/vector-icons';
import FloatLabelTextInput from 'react-native-floating-label-text-input';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import PopupDialog, {
  DialogTitle,
  SlideAnimation,
} from 'react-native-popup-dialog';

import Debug from '../components/Debug';

import Layout from '../constants/Layout.js';
import Colors from '../constants/Colors.js';

const slideAnimation = new SlideAnimation({ slideFrom: 'bottom' });

export default class AddFood extends React.Component {
  static route = {
    navigationBar: {
      title: 'Add Food',
    },
  };

  constructor(props) {
    super(props);
    this.state = {
      price: 0,
      animating: false,
      photo: require('../assets/images/placeholder.png'),
      isDialogVisible: false,
    };
    this.getPermissionAsync = this.getPermissionAsync.bind(this);
  }

  changeValue = (key, data) => {
    this.setState({ [key]: data });
  };

  openCamera = async () => {
    let result = await ImagePicker.launchCameraAsync({})
      .then(photo => {
        if (!photo.cancelled) {
          this.setState({ photo: photo.uri, photoType: 'uri' });
          this.setState({ isDialogVisible: false });
          this.uploadToImgur(photo.uri);
        } else {
          null;
        }
      })
      .catch(error => alert(error.message));
  };
  componentDidMount() {
    this.getPermissionAsync();
  }
  getPermissionAsync = async () => {
    console.log('GETTING PERMISSION');
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  };

  openGallery = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({})
      .then(photo => {
        if (!photo.cancelled) {
          this.setState({ photo: photo.uri, photoType: 'uri' });
          this.setState({ isDialogVisible: false });
          this.uploadToImgur(photo.uri);
        } else {
          null;
        }
      })
      .catch(error => alert(error.message));
  };

  uploadToImgur = async photo => {
    this.setState({ animating: true });

    const formData = new FormData();
    formData.append('image', {
      uri: photo,
      type: 'image/jpeg',
    });

    // Temporary KOMAS api key
    let response = await fetch('https://api.imgur.com/3/image', {
      method: 'post',
      headers: {
        Authorization: 'Client-ID f0f6fe6cfc4142a',
        'Content-Type': 'multipart/form-data',
      },
      body: formData,
    })
      .then(response => {
        let responseJson = response.json();
        let x = response;
        x = JSON.parse(x._bodyText);
        console.log(x.data.link);
        this.setState({ animating: false, photoLink: x.data.link });
      })
      .catch(err => {
        // console.log(err)
      });
  };

  renderImage = type => {
    if (type == 'uri')
      return <Image style={styles.image} source={{ uri: this.state.photo }} />;
    else return <Image style={styles.image} source={this.state.photo} />;
  };

  render() {
    return (
      <View>
        <KeyboardAwareScrollView contentContainerStyle={styles.container}>
          <Debug state={this.state} />
          <View style={styles.imageContainer}>
            {this.renderImage(this.state.photoType)}
            <LinearGradient
              colors={['#F8964E', '#F8AE50']}
              style={styles.camera}
            >
              <TouchableOpacity
                onPress={() => {
                  this.setState({ isDialogVisible: true });
                }}
              >
                <FontAwesome
                  name="camera"
                  size={32}
                  color="white"
                  style={styles.iconCamera}
                />
              </TouchableOpacity>
            </LinearGradient>
          </View>
          <View style={styles.formContainer}>
            <View style={styles.form}>
              <FloatLabelTextInput
                placeholder={'Food Name'}
                underlineColorAndroid="transparent"
                onChangeTextValue={e => this.changeValue('foodName', e)}
              />
            </View>
            <View style={styles.form}>
              <FloatLabelTextInput
                placeholder={'Restaurant Name'}
                underlineColorAndroid="transparent"
                onChangeTextValue={e => this.changeValue('restaurantName', e)}
              />
            </View>
            <View style={styles.slider}>
              <Text style={styles.sliderText}>
                Average Price Per Person - RM{this.state.price}
              </Text>
              <Slider
                step={10}
                maximumValue={500}
                onValueChange={e => this.changeValue('price', e)}
              />
            </View>
            <View style={styles.locationContainer}>
              <FontAwesome
                name="location-arrow"
                size={32}
                color="grey"
                style={styles.iconLocation}
              />
              <View style={styles.formLocation}>
                <FloatLabelTextInput
                  placeholder={'Location'}
                  underlineColorAndroid="transparent"
                  onChangeTextValue={e => this.changeValue('location', e)}
                />
              </View>
            </View>
          </View>
          <LinearGradient colors={['#F8964E', '#F8AE50']} style={styles.submit}>
            <TouchableOpacity onPress={this._onPressButton}>
              <Text style={styles.submitText}>Submit</Text>
            </TouchableOpacity>
          </LinearGradient>
        </KeyboardAwareScrollView>
        <PopupDialog
          onTouchOutside={() => this.setState({ isDialogVisible: false })}
          width={300}
          height={200}
          dialogStyle={styles.shadow}
          haveOverlay={true}
          visible={this.state.isDialogVisible}
          dialogTitle={<DialogTitle title="Select Picture" />}
          ref={popupDialog => {
            this.popupDialog = popupDialog;
          }}
          dialogAnimation={slideAnimation}
        >
          <View style={styles.modalContainer}>
            <TouchableOpacity
              style={styles.modalTextContainer}
              onPress={this.openCamera}
            >
              <Text style={styles.modalText}>Capture Image</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalTextContainer}
              onPress={this.openGallery}
            >
              <Text style={styles.modalText}>Photo Gallery</Text>
            </TouchableOpacity>
          </View>
        </PopupDialog>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  centering: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  shadow: {
    borderWidth: StyleSheet.hairline,
    borderColor: '#F5F5F5',
    marginTop: -80,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: 0 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
      },
      android: {
        elevation: 1,
      },
    }),
  },
  container: {
    alignItems: 'center',
  },
  form: {
    width: Layout.window.width - 20,
    marginLeft: -15,
  },
  imageContainer: {
    flexDirection: 'column',
  },
  image: {
    width: Layout.window.width,
    height: 300,
    resizeMode: 'cover',
  },
  camera: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignSelf: 'flex-end',
    marginTop: -30,
    marginRight: 14,
  },
  iconCamera: {
    alignSelf: 'center',
    backgroundColor: 'transparent',
  },
  formContainer: {
    marginBottom: 5,
  },
  slider: {
    marginVertical: 10,
    ...Platform.select({
      ios: {
        marginHorizontal: 2,
      },
      android: {},
    }),
  },
  sliderText: {
    color: 'grey',
    marginVertical: 5,
  },
  locationContainer: {
    flexDirection: 'row',
    width: 100,
  },
  iconLocation: {
    alignSelf: 'center',
    marginTop: 6,
  },
  formLocation: {
    width: Layout.window.width - 60,
  },
  submit: {
    margin: 10,
    width: Layout.window.width - 30,
    padding: 18,
    borderRadius: 5,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
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
    backgroundColor: 'transparent',
  },
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalTextContainer: {
    flex: 1,
    width: 300,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalText: {
    fontSize: 15,
  },
});
