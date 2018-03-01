import React, { Component } from 'react';
import {createStore, applyMiddleware} from 'redux';
import { Provider } from 'react-redux'

import './App.css';
import Reboot from 'material-ui/Reboot';
import { Login, Kiosk } from './pages';
import { reducers } from './reducer';
import Grid from 'material-ui/Grid';
import SyncReduxClient from './lib/redux-share-client';

let reduxShare = new SyncReduxClient('ws://localhost:2000', { debug : true});
let store = createStore(
  reducers, // your reducers, as usual
  applyMiddleware( reduxShare.getReduxMiddleware() )
);

// This action starts the connection to the server.
store.dispatch({type:"@@SYNC-CONNECT-SERVER-START"});

let style = {
  'backgroundColor': `rgb(3, 86, 109)`,
  width: '100%',
  height: '100%',
  position: 'fixed',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  alignContent: 'center'
}

class App extends Component {
  render() {
    let page = this.state ? this.state.page : '';

    let currentPageComponent = <Login/>;

    switch (page) {
      case "login":
        currentPageComponent = <Login/>;
      case "test":
      default:
    }

    return (
      <Provider store={store}>
        <div className="App">
          <Reboot/>
          <Grid container className="kiosk-container" style={style}>
            {currentPageComponent}
          </Grid>
        </div>
      </Provider>
    );
  }
}

export default App;
