import React, { Component } from 'react';
import { Provider } from 'react-redux';
import AppContainer from './AppContainer';

class Root extends Component {
  render() {
    const { store } = this.props;

    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );
  }
}

export default Root;
