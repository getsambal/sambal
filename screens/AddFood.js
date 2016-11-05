import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  TextInput
} from 'react-native';

import { Ionicons } from '@exponent/vector-icons';

export default class AddFood extends React.Component {
  static route = {
    navigationBar: {
      title: 'Add Food',
    },
  }

  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Text></Text>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
