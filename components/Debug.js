import React from 'react';
import { Text } from 'react-native';

export default class Debug extends React.Component {
  render() {
    if (__DEV__) {
      return(
        <Text>{JSON.stringify(this.props.state)}</Text>
      )
    } else {
      return null;
    }
  }
}