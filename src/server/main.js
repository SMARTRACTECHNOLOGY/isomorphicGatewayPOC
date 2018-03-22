/* eslint-disable no-console */
// @flow

import { createStore, applyMiddleware } from 'redux';
import ReduxShareServer from './redux-share-server';
import BarcodeReader from './barcode/BarcodeReader';
import reducers from '../shared/reducer';
import { observeStore } from './util';

const pouchDB = require('./db');

const server = require('http').createServer();
const express = require('express');

const app = express();
const port = 2000; // we can make port number configurable if required.

app.use(express.static('public'));

// start the sockets etc.
const shareServer = new ReduxShareServer(server, {
  debug: true,
  broadcastMode: true,
});

// create the store.
const store = createStore(reducers, applyMiddleware(shareServer.getReduxMiddleware()));


// observe if all 3 types ticked, then trigger another action to show successful message
observeStore(store, (currentState) => {
  if (currentState.nfcStatus && currentState.qrStatus && currentState.barCodeStatus && currentState.page === 'PROCESS_LIST') {
    setTimeout(() => {
      store.dispatch({ type: 'SUBMIT_ENABLEMENT_DATA', data: 'SAMPLE DATA, just for demo purpose' });
    }, 1000);

    // TODO: Save data to couchDB in here.

    pouchDB.put({
      _id: `ENABLEMENT_${new Date().getTime()}`,
      data: 'sample data',
      timeStamp: new Date().toISOString(),
    }).then(() => {
      console.log('success uploading the data!');
    })
      .catch((error) => {
        console.error(error);
      });
  }
});

// bind redux server and express
app.use('/redux', shareServer.getExpressMiddleware());

// bind http and express
server.on('request', app);

store.dispatch({ type: '@@SERVER-LISTEN-START' });

server.listen(port, () => {
  console.log(`GET http://localhost:${server.address().port}/redux/state to view the state`);
  console.log(`POST http://localhost:${server.address().port}/redux/action to post an action to all clients`);
  console.log(`curl -H "Content-Type: application/json" -X POST -d '{"type":"my-action"}'  http://localhost:${server.address().port}/redux/action`);
});

const barcodeReader = new BarcodeReader(store);
barcodeReader.run();

process.on('SIGINT', () => {
  console.log('\nGracefully shutting down from SIGINT (Ctrl-C)');
  // some other closing procedures go here
  barcodeReader.shutDown();
  process.exit(1);
});
