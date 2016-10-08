import React from 'react'; 
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
} from 'react-native';

import SwipeCards from './react-native-swipe-cards';

import Colors from '../constants/Colors';

let Card = React.createClass({
  
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => this.props.navigator.push({name: 'Profile'})}  style={styles.card}>
          <Image style={styles.thumbnail} source={{uri: this.props.image}}  />
          <Text style={styles.text}>{this.props.name}</Text>
          <Text style={styles.restaurant}>ABC Restaurant</Text>

          <View style={{flexDirection: 'row'}}>

            <View style={{flexDirection: 'column'}}>
              <View style={styles.recommend}>
                <Text style={styles.recommend_text}>1.5K</Text>
                <Text style={[styles.rec_desc, {marginTop: -30}]}>Recommend</Text>
                <Text style={styles.rec_desc}>This Card!</Text>
              </View>
              
            </View>

            <Text style={styles.distance}>200M away</Text>

          </View>
          
        </TouchableOpacity>
      </View>
    )
  }
})

let NoMoreCards = React.createClass({
  render() {
    return (
      <View style={styles.noMoreCards}>
        <Text>No more cards</Text>
      </View>
    )
  }
})

const Cards = [
  {name: 'Wantan Mee', image: 'https://demwvw9lpu8ak.cloudfront.net/attachments/7a060023616d7110399598caa60b016673149de8/store/fill/800/500/7a9fbb97f075b585a6af04216fa305fe140972a9dc53d7a6b2d8f9f17a67/featured_image.jpg'},
  {name: 'NASI LEMAK', image: 'https://storybookstorage.s3.amazonaws.com/items/images/000/134/326/original/english.jpg'},
  {name: 'CHEE CHEONG FUN', image: 'http://www.rasamalaysia.com/uploaded_images/cheongfun.jpg'},
  {name: 'ROTI CANAI', image: 'http://www.templeofthai.com/images/asian-food-life/Malaysia-Roti-Canai-960x640.jpg'},
  {name: 'CHILLI PAN MEE', image: 'http://www.chillipanmee.com/wp-content/uploads/2010/02/chilli-pan-mee-4.jpg'},
  {name: 'SUSHI', image: 'http://az616578.vo.msecnd.net/files/2016/05/27/635999646476505798-1665549773_SUSHI%20COVER.jpg'},
  {name: 'SATAY', image: 'http://www.healthxchange.com.sg/healthyliving/DietandNutrition/PublishingImages/Satay-Not-Just-a-Sinful-Indulgence-Pic.jpg'},
  {name: 'MEE CURRY', image: 'http://www.halfhourmeals.com/image/recipe/easy-peasy-curry-mee_large.jpg'},
  {name: 'CHICKEN RICE', image: 'http://steamykitchen.com/wp-content/uploads/2009/08/hainanese-chicken-86.jpg'},
]

const Cards2 = [
  {name: '10', image: 'https://media.giphy.com/media/12b3E4U9aSndxC/giphy.gif'},
  {name: '11', image: 'https://media4.giphy.com/media/6csVEPEmHWhWg/200.gif'},
  {name: '12', image: 'https://media4.giphy.com/media/AA69fOAMCPa4o/200.gif'},
  {name: '13', image: 'https://media.giphy.com/media/OVHFny0I7njuU/giphy.gif'},
]

const Cards3 = [
  {name: '14', image: 'https://media.giphy.com/media/12b3E4U9aSndxC/giphy.gif'},
  {name: '15', image: 'https://media4.giphy.com/media/6csVEPEmHWhWg/200.gif'},
  {name: '16', image: 'https://media4.giphy.com/media/AA69fOAMCPa4o/200.gif'},
  {name: '17', image: 'https://media.giphy.com/media/OVHFny0I7njuU/giphy.gif'},
]

export default React.createClass({
  getInitialState() {
    return {
      cards: Cards,
      outOfCards: false
    }
  },
  handleYup (card) {
    console.log("yup")
  },
  handleNope (card) {
    console.log("nope")
  },
  cardRemoved (index) {
    console.log(`The index is ${index}`);

    let CARD_REFRESH_LIMIT = 3

    if (this.state.cards.length - index <= CARD_REFRESH_LIMIT + 1) {
      console.log(`There are only ${this.state.cards.length - index - 1} cards left.`);

      if (!this.state.outOfCards) {
        console.log(`Adding ${Cards2.length} more cards`)

        this.setState({
          cards: this.state.cards.concat(Cards2),
          outOfCards: true
        })
      }

      if (!this.state.outOfCards) {
        console.log(`Adding ${Cards3.length} more cards`)

        this.setState({
          cards: this.state.cards.concat(Cards3),
          outOfCards: true
        })
      }

    }

  },
  render() {
    let titleConfig = { title: 'Sambal', tintColor: 'white', style : "fontFamily: 'Roboto Light'" };
    return (
      <View style={styles.container}>
            <View style={styles.container}>
              <SwipeCards
                navigator={this.props.navigator}
                style={styles.flexCenter}

                cards={this.state.cards}
                loop={true}

                renderCard={(cardData) => <Card {...cardData} /> }
                renderNoMoreCards={() => <NoMoreCards />}
                showYup={false}
                showNope={false}

                handleYup={this.handleYup}
                handleNope={this.handleNope}
                cardRemoved={this.cardRemoved}
              />
          </View>
      </View>
    )
  }
})

const styles = StyleSheet.create({
  card: {
    flex: 1,
    // alignItems: 'center',
    borderRadius: 5,
    overflow: 'hidden',
    // borderColor: 'white',
    backgroundColor: 'white',
    borderWidth: 0,
    elevation: 1,
    paddingBottom: 10,
  },
  
  thumbnail: {
    flex: 1,
    borderRadius: 5,
    width: 330,
    height: 350,
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
  noMoreCards: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flexCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  recommend: {
    // alignItems: 'center',
    borderRadius: 10,
    borderColor: Colors.primary,
    backgroundColor: Colors.primary,
    borderWidth: 0,
    height: 40,
    width: 140,
    marginLeft: 15,
    marginTop: 5,
  },
  recommend_text: {
    fontSize: 24,
    color: 'white',
    paddingTop: 3,
    marginLeft: 10,
  },
  distance: {
    paddingTop: 10, paddingLeft: 40,
    fontSize: 20,
    color: '#754b33',
  },
  rec_desc: {
    paddingLeft: 70, fontSize: 10, color: 'white',
  },

})

