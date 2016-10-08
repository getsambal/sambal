/* Gratefully copied from https://github.com/brentvatne/react-native-animated-demo-tinder */
'use strict';

import React, { Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Animated,
    PanResponder,
    Image,
    TouchableOpacity,
    Dimensions,
    Modal
} from 'react-native';

import { FontAwesome } from '@exponent/vector-icons';

import clamp from 'clamp';
import Defaults from './Defaults.js';

const SWIPE_THRESHOLD = 120;

class SwipeCards extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pan: new Animated.ValueXY(),
      enter: new Animated.Value(0.5),
      card: this.props.cards[0],
      modalVisible: false
    }

    this.setModalVisible = this.setModalVisible.bind(this);
  }

  // Set modal
  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  _goToNextCard() {
    let currentCardIdx = this.props.cards.indexOf(this.state.card);
    let newIdx = currentCardIdx + 1;

    // Checks to see if last card.
    // If props.loop=true, will start again from the first card.
    let card = newIdx > this.props.cards.length - 1
      ? this.props.loop ? this.props.cards[0] : null
      : this.props.cards[newIdx];

    this.setState({
      card: card
    });
  }

  _goToPreviousCard() {
    let currentCardIdx = this.props.cards.indexOf(this.state.card);
    let newIdx = currentCardIdx - 1;

    // Checks to see if last card.
    // If props.loop=true, will start again from the first card.
    let card = newIdx < 0
      ? this.props.cards[0] : this.props.cards[newIdx];

    this.setState({
      card: card
    });
  }

  componentDidMount() {
    this._animateEntrance();
  }

  _animateEntrance() {
    Animated.spring(
      this.state.enter,
      { toValue: 1, friction: 8 }
    ).start();
  }

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onMoveShouldSetResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: () => true,

      onPanResponderGrant: (e, gestureState) => {
        this.state.pan.setOffset({x: this.state.pan.x._value, y: this.state.pan.y._value});
        this.state.pan.setValue({x: 0, y: 0});
      },

      onPanResponderMove: Animated.event([
        null, {dx: this.state.pan.x, dy: this.state.pan.y},
      ]),

      onPanResponderRelease: (e, {vx, vy}) => {
        this.state.pan.flattenOffset();
        let velocity;

        if (vx >= 0) {
          velocity = clamp(vx, 3, 5);
        } else if (vx < 0) {
          velocity = clamp(vx * -1, 3, 5) * -1;
        }

        if (Math.abs(this.state.pan.x._value) > SWIPE_THRESHOLD) {

          this.state.pan.x._value > 0
            ? this.props.handleYup(this.state.card)
            : this.props.handleNope(this.state.card)

          this.props.cardRemoved
            ? this.props.cardRemoved(this.props.cards.indexOf(this.state.card))
            : null

          Animated.decay(this.state.pan, {
            velocity: {x: velocity, y: vy},
            deceleration: 0.98
          }).start(this._resetState.bind(this))
        } else {
          Animated.spring(this.state.pan, {
            toValue: {x: 0, y: 0},
            friction: 4
          }).start()
        }
      }
    })
  }

  _resetState() {
    this.state.pan.setValue({x: 0, y: 0});
    this.state.enter.setValue(0);
    this._goToNextCard();
    this._animateEntrance();
  }
  
  _previousState() {
    this.state.pan.setValue({x: 0, y: 0});
    this.state.enter.setValue(0);
    this._goToPreviousCard();
    this._animateEntrance();
  }

  renderNoMoreCards() {
    if (this.props.renderNoMoreCards)
      return this.props.renderNoMoreCards();

    return (
      <Defaults.NoMoreCards />
    )
  }

  renderCard(cardData) {
    return this.props.renderCard(cardData)
  }

// Back button
  _backButton() {
    this._previousState();
  }

//Yup(Like) button
  _yupButton() {
    // this.props.handleRight(this.state.card);
    this.props.cardRemoved
      ? this.props.cardRemoved(this.props.cards.indexOf(this.state.card))
      : null;
    Animated.timing(this.state.pan, {
      toValue: {x: 1000, y: 0},
    }).start(this._resetState.bind(this));
  }

//Nope button
  _nopeButton() {
    // this.props.handleLeft(this.state.card);
    this.props.cardRemoved
      ? this.props.cardRemoved(this.props.cards.indexOf(this.state.card))
      : null;
    Animated.timing(this.state.pan, {
      toValue: {x: -1000, y: 0},
    }).start(this._resetState.bind(this));
  }

//Share button
  _shareButton() {
    // this.props.handleLeft(this.state.card);
    // this.props.cardRemoved
    //   ? this.props.cardRemoved(this.props.cards.indexOf(this.state.card))
    //   : null;
    // Animated.timing(this.state.pan, {
    //   toValue: {x: -1000, y: 0},
    // }).start(this._resetState.bind(this));
  }

  render() {
    let { pan, enter, } = this.state;

    let [translateX, translateY] = [pan.x, pan.y];

    let rotate = pan.x.interpolate({inputRange: [-200, 0, 200], outputRange: ["-30deg", "0deg", "30deg"]});
    let opacity = pan.x.interpolate({inputRange: [-200, 0, 200], outputRange: [0.5, 1, 0.5]});
    let scale = enter;

    let animatedCardstyles = {transform: [{translateX}, {translateY}, {rotate}, {scale}], opacity};

    let yupOpacity = pan.x.interpolate({inputRange: [0, 150], outputRange: [0, 1]});
    let yupScale = pan.x.interpolate({inputRange: [0, 150], outputRange: [0.5, 1], extrapolate: 'clamp'});
    let animatedYupStyles = {transform: [{scale: yupScale}], opacity: yupOpacity}

    let nopeOpacity = pan.x.interpolate({inputRange: [-150, 0], outputRange: [1, 0]});
    let nopeScale = pan.x.interpolate({inputRange: [-150, 0], outputRange: [1, 0.5], extrapolate: 'clamp'});
    let animatedNopeStyles = {transform: [{scale: nopeScale}], opacity: nopeOpacity}

    return (
      <View style={styles.container}>
        {/* 
          this is weird ass JSX comments,
          will re-implement modal style add food 
          once i have completed it in screen based solution
        */}
        {/* <AddFood modalState={this.state.modalVisible} modalVisible={this.setModalVisible} /> */}
        { this.state.card
            ? (
            <Animated.View style={[styles.card, animatedCardstyles]} {...this._panResponder.panHandlers}>
              {this.renderCard(this.state.card)}
            </Animated.View>
            )
            : this.renderNoMoreCards() }


        { this.props.showNope
          ? (
            <Animated.View style={[styles.nope, animatedNopeStyles]}>
              <Text style={styles.nopeText}>LATER</Text>
            </Animated.View>
            )
          : null
        }

        { this.props.showYup
          ? (
            <Animated.View style={[styles.yup, animatedYupStyles]}>
              <Text style={styles.yupText}>COLLECT</Text>
            </Animated.View>
          )
          : null }
      <View style={styles.buttonFooterContainer}>
	      <TouchableOpacity onPress={this._backButton.bind(this)} style={styles.buttonBack}><Text style={styles.buttonTextBack}><FontAwesome name="undo" size={30} color="#fff" /></Text></TouchableOpacity>
 	      <TouchableOpacity onPress={this._nopeButton.bind(this)} style={styles.buttonNope}><Text style={styles.buttonTextNope}><FontAwesome name="remove" size={30} color="#fff" /></Text></TouchableOpacity>
	      <TouchableOpacity onPress={this._yupButton.bind(this)} style={styles.buttonYup}><Text style={styles.buttonTextYup}><FontAwesome name="star" size={30} color="#fff" /></Text></TouchableOpacity>
        <TouchableOpacity 
          onPress={() => {
            this.props.navigator.push({name: 'AddFood'})
          }} 
          style={styles.buttonShare}
        >
          <Text style={styles.buttonTextShare}><FontAwesome name="plus" size={30} color="#fff" /></Text>
        </TouchableOpacity>
	    </View>
      </View>
    );
  }
}

SwipeCards.propTypes = {
  cards: React.PropTypes.array,
  renderCard: React.PropTypes.func,
  loop: React.PropTypes.bool,
  renderNoMoreCards: React.PropTypes.func,
  showYup: React.PropTypes.bool,
  showNope: React.PropTypes.bool,
  handleYup: React.PropTypes.func,
  handleNope: React.PropTypes.func
};

SwipeCards.defaultProps = {
  loop: false,
  showYup: true,
  showNope: true
};

const {width, height, scale} = Dimensions.get("window"),
  vw = width / 100,
  vh = height / 100,
  vmin = Math.min(vw, vh),
  vmax = Math.max(vw, vh);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  card: {
    top: 20,
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  yup: {
    borderColor: '#4CAF50',
    borderWidth: 4,
    position: 'absolute',
    padding: 20,
    top: 100,
    borderRadius: 5,
    right: 20,
  },
  yupText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#4CAF50',
    backgroundColor: 'transparent',
  },
  nope: {
    borderColor: '#DD2C00',
    borderWidth: 4,
    position: 'absolute',
    top: 100,
    padding: 20,
    borderRadius: 5,
    left: 20,
  },
  nopeText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#DD2C00',
    backgroundColor: 'transparent',
  },
  buttonFooterContainer: {
    flexDirection: 'row',
    width: 90 * vw,
    height: 10 * vh,
    marginLeft: 5 * vmin,
    marginRight: 8 * vmin,
    justifyContent: 'space-around',
    position: 'absolute',
    bottom: 4 * vh,
  },
  buttonBack: {
    width: 21 * vw,
    height: 12 * vh,
    borderWidth: 2.3 * vmin,
    borderRadius: 10 * vmin,
    borderColor: 'white',
    // backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 25,
    marginTop: 5,
  },
  buttonTextBack: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  buttonYup: {
    width: 21 * vw,
    height: 12 * vh,
    borderWidth: 2.3 * vmin,
    borderRadius: 10 * vmin,
    borderColor: 'white',
    // backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
  },
  buttonTextYup: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  buttonNope: {
    width: 21 * vw,
    height: 12 * vh,
    borderWidth: 2.3 * vmin,
    borderRadius: 10 * vmin,
    borderColor: 'white',
    // backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
  },
  buttonTextNope: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  buttonShare: {
    width: 21 * vw,
    height: 12 * vh,
    borderWidth: 2.3 * vmin,
    borderRadius: 10 * vmin,
    borderColor: 'white',
    // backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 25,
    marginTop: 5,
  },
  buttonTextShare: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',

  }
});

export default SwipeCards
