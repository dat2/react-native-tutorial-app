/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import Root from './shared/containers/Root';
import configureStore from './shared/store/configureStore';

const store = configureStore();

class MovieLister extends Component {
  render() {
    return (
      <Root store={store} />
    );
  }
}

AppRegistry.registerComponent('MovieLister', () => MovieLister);
