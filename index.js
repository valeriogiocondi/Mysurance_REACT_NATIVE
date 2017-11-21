import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { addNavigationHelpers } from 'react-navigation';
import { Provider, connect } from 'react-redux'
import { createStore } from 'redux'

import allReducers, { AppNavigator } from './js/reducers'


class App extends React.Component {

  render() {
    return (
      <AppNavigator navigation={ addNavigationHelpers({
        dispatch: this.props.dispatch,
        state: this.props.nav,
      })} />
    );
  }
}

const mapStateToProps = (state) => ({

  nav: state.nav
});

const AppWithNavigationState = connect(mapStateToProps)(App);

const store = createStore(allReducers);

class Root extends React.Component {

  render() {
    return (
      <Provider store={store}>
        <AppWithNavigationState />
      </Provider>
    );
  }
}

AppRegistry.registerComponent('MysuranceApp', () => Root);
