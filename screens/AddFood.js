import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default class AddFood extends React.Component {
  static route = {
    navigationBar: {
      title: 'Card Details',
      visible: true,
    },
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Add Food</Text>
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
