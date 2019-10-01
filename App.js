import React from 'react';
import { AppLoading } from 'expo';
import {
  AppRegistry,
  Platform,
  StatusBar,
  StyleSheet,
  View,
  Text,
} from 'react-native';
import cacheAssetsAsync from './utilities/cacheAssetsAsync';
import Router from './navigation/Router';

class App extends React.Component {
  state = {
    isAppReady: false,
  };

  async _loadAssetsAsync() {
    try {
      await cacheAssetsAsync({
        images: [
          require('./assets/images/exponent-wordmark.png'),
          require('./assets/images/placeholder.png'),
        ],
        fonts: [
          {
            'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
          },
          { pacifico: require('./assets/fonts/Pacifico.ttf') },
        ],
      });
    } catch (e) {
      console.warn(
        `There was an error caching assets (see: App.js), perhaps due to a network timeout, so we skipped caching. Reload the app to try again.`
      );
    }
  }

  render() {
    if (!this.state.isAppReady)
      return (
        <AppLoading
          startAsync={this._loadAssetsAsync}
          onFinish={() => this.setState({ isAppReady: true })}
          onError={console.warn}
        />
      );
    return (
      <React.Fragment>
        {Platform.OS === 'ios' && <StatusBar barStyle="light-content" />}
        {Platform.OS === 'android' && <View style={styles.statusBarUnderlay} />}
        <Router />
      </React.Fragment>
    );
  }
}

const styles = StyleSheet.create({
  statusBarUnderlay: {
    height: 24,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
});

export default App;
