import React, { Component } from 'react';
import {createStore, applyMiddleware} from 'redux';
import {connect, Provider} from 'react-redux'
import './App.css';
import CssBaseline from 'material-ui/CssBaseline';
import { PageRouter } from './pages/index';
import reducers from '../shared/reducer';
import SyncReduxClient from './lib/redux-share-client';

const reduxShare = new SyncReduxClient('ws://' + window.location.hostname + ':2000', { debug : true});

const store = createStore(
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
          <CssBaseline/>
          <PageRouter/>
        </div>
      </Provider>
    );
  }
}

export default App;

