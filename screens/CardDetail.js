import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default class CardDetails extends React.Component {
  static route = {
    navigationBar: {
      title: 'Card Details',
      visible: true,
    },
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Card Details</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
