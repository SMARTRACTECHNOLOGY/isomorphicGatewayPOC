import React, { Component } from 'react';
import {createStore, applyMiddleware} from 'redux';
import {connect, Provider} from 'react-redux'

import './App.css';
import Reboot from 'material-ui/Reboot';
import { PageRouter } from './pages';
import { reducers } from './reducer';
import SyncReduxClient from './lib/redux-share-client';

const location = window.location.hostname;

let reduxShare = new SyncReduxClient('ws://'+location+':2000', { debug : true});
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
          <PageRouter/>
        </div>
      </Provider>
    );
  }
}

export default App;

