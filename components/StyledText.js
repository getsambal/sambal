import React from 'react';
import { StyleSheet, Text } from 'react-native';

export class RegularText extends React.Component {
  render() {
    return <Text {...this.props} style={[this.props.style, styles.regular]} />;
  }
}

export class LightText extends React.Component {
  render() {
    return <Text {...this.props} style={[this.props.style, styles.light]} />;
  }
}

export class BoldText extends React.Component {
  render() {
    return <Text {...this.props} style={[this.props.style, styles.bold]} />;
  }
}

const styles = StyleSheet.create({
  regular: {
    // fontFamily: 'OpenSans',
    // Todo
  },
  light: {
    // fontFamily: 'OpenSans-Light',
    // Todo
  },
  bold: {
    // fontFamily: 'OpenSans-Bold',
  },
});
