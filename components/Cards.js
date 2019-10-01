import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  Platform,
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';

import { withNavigation } from 'react-navigation';

import Router from '../navigation/Router';
import Colors from '../constants/Colors';
import SwipeCards from './swipe-cards';
import Cards from '../assets/fixtures/CardsData.json';

class Card extends React.Component {
  render() {
    return (
      <TouchableOpacity style={styles.card} onPress={this.props.gotoCardDetail}>
        <Image style={styles.thumbnail} source={{ uri: this.props.image }} />
        <Text style={styles.text}>{this.props.name}</Text>
        <Text style={styles.restaurant}>Restaurant Z</Text>

        <View style={{ flexDirection: 'row' }}>
          <View style={{ flexDirection: 'column' }}>
            <LinearGradient
              colors={['#F8964E', '#F8AE50']}
              style={styles.recommend}
            >
              <Text style={styles.recommend_text}>1.5K</Text>
              <View>
                <Text style={styles.rec_desc}>Recommend</Text>
                <Text style={styles.rec_desc}>This Card!</Text>
              </View>
            </LinearGradient>
          </View>
          <Text style={styles.distance}>200M away</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

class NoMoreCards extends React.Component {
  render() {
    return (
      <View style={styles.noMoreCards}>
        <Text>No more cards</Text>
      </View>
    );
  }
}

@withNavigation
export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: Cards,
      outOfCards: false,
    };
  }

  handleYup = card => {
    console.log('yup');
  };

  handleNope = card => {
    console.log('nope');
  };

  cardRemoved = index => {
    console.log(`The index is ${index}`);
    let CARD_REFRESH_LIMIT = 3;
    if (this.state.cards.length - index <= CARD_REFRESH_LIMIT + 1) {
      // console.log(`There are only ${this.state.cards.length - index - 1} cards left.`);
      if (!this.state.outOfCards) {
        this.setState({
          cards: this.state.cards,
        });
      }
    }
  };

  _gotoCardDetail = () => {
    this.props.navigation.navigate('expandView');
  };

  _gotoAddFood = () => {
    this.props.navigation.navigate('addFood');
  };

  render() {
    return (
      <SwipeCards
        addFood={this._gotoAddFood}
        style={styles.swipeCard}
        cards={this.state.cards}
        loop={true}
        renderCard={cardData => (
          <Card {...cardData} gotoCardDetail={this._gotoCardDetail} />
        )}
        showYup={false}
        showNope={false}
        handleYup={this.handleYup}
        handleNope={this.handleNope}
        cardRemoved={this.cardRemoved}
      />
    );
  }
}

let { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  swipeCard: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: 'white',
    borderWidth: 0,
    paddingBottom: 10,
    height: height - 190,
  },
  thumbnail: {
    flex: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: 330,
    height: height - 350,
    resizeMode: 'cover',
  },
  text: {
    fontSize: 26,
    color: '#754b33',
    paddingTop: 10,
    marginLeft: 20,
    fontWeight: '400',
  },
  restaurant: {
    fontSize: 18,
    color: '#754b33',
    paddingTop: 0,
    marginLeft: 20,
  },

  recommend: {
    borderRadius: 10,
    borderColor: Colors.primary,
    backgroundColor: Colors.primary,
    height: 40,
    width: 140,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 20,
    marginTop: 5,
  },
  recommend_text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 10,
    backgroundColor: 'transparent',
  },
  rec_desc: {
    fontSize: 10,
    color: 'white',
    backgroundColor: 'transparent',
    paddingHorizontal: 6,
  },
  distance: {
    paddingTop: 10,
    paddingLeft: 40,
    fontSize: 20,
    color: '#754b33',
  },
});
