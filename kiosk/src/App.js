import React, { Component } from 'react';
import {createStore, applyMiddleware} from 'redux';
import { Provider } from 'react-redux'

import logo from './logo.svg';
import './App.css';
import Reboot from 'material-ui/Reboot';
import Kiosk from './kiosk';
import { reducers } from './reducer';

import SyncReduxClient from './lib/redux-share-client';

let reduxShare = new SyncReduxClient('ws://localhost:2000', { debug : true});
let store = createStore(
  reducers, // your reducers, as usual
  applyMiddleware( reduxShare.getReduxMiddleware() )
);

// This action starts the connection to the server.
store.dispatch({type:"@@SYNC-CONNECT-SERVER-START"});

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Reboot/>
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to React</h1>
          </header>

          <Kiosk/>
        </div>
      </Provider>
    );
  }
}

export default App;
