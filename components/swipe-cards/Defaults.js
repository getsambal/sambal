import React from 'react';
import {
  StyleSheet, 
  Text, 
  View, 
  Image
} from 'react-native';

class NoMoreCards extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <Text style={styles.noMoreCardsText}>No more cards</Text>
      </View>
    )
  }
}

export default {
  NoMoreCards: NoMoreCards
}

const styles = StyleSheet.create({
  noMoreCardsText: {
    fontSize: 22,
  }
})
