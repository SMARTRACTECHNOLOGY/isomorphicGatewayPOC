import { createStore,applyMiddleware } from 'redux';
import ReduxShareServer from './redux-share-server';
import BarcodeReader from './barcode/BarcodeReader';

let pouchDB = require('./db');

var url = require('url')
  , server = require('http').createServer()
  , express = require('express')
  , app = express()
  , port = 2000;


function observeStore(store, onChange) {
  let currentState;

  function handleChange() {
    let nextState = store.getState();
    if (nextState !== currentState) {
      currentState = nextState;
      onChange(currentState);
    }
  }

  let unsubscribe = store.subscribe(handleChange);
  handleChange();
  return unsubscribe;
}


const defaultCardsForDemostration = [{
  imageUrl: "https://www.adidas.com/dis/dw/image/v2/aaqx_prd/on/demandware.static/-/Sites-adidas-products/en_US/dw24d21a41/zoom/CQ2128_01_standard.jpg?sh=840&strip=false&sw=840",
  name: "Adidas busenitz",
  enablement: {
    total: 200,
    completed: 20
  }
},
  {
    imageUrl: "https://www.adidas.com/dis/dw/image/v2/aaqx_prd/on/demandware.static/-/Sites-adidas-products/en_US/dw3c05e2f0/zoom/DA9165_01_standard.jpg?sh=840&strip=false&sw=840",
    name: "ULTRABOOST SHOES",
    enablement: {
      total: 300,
      completed: 5
    }
  }, {
    imageUrl: "https://www.adidas.com/dis/dw/image/v2/aaqx_prd/on/demandware.static/-/Sites-adidas-products/en_US/dwd7f20e28/zoom/AH2219_01_standard.jpg?sh=840&strip=false&sw=840",
    name: "HARDEN VOL. 2 SHOES",
    enablement: {
      total: 150,
      completed: 0
    }
  }, {
    imageUrl: "https://www.adidas.com/dis/dw/image/v2/aaqx_prd/on/demandware.static/-/Sites-adidas-products/en_US/dw3b495bc6/zoom/AQ0352_01_standard.jpg?sh=840&strip=false&sw=840",
    name: "SUPERSTAR WHITE ",
    enablement: {
      total: 200,
      completed: 20
    }
  }];

function reducers(state, action) {
  switch (action.type) {
    case "PAGE" :{
      switch(action.page) {
        case "LANDING":
          let cards = state.cards || action.cards || defaultCardsForDemostration;
          return Object.assign({}, state, { page : action.page, cards : cards });

        case "PROCESS_DETAIL":
          let card = action.card;
          return Object.assign({}, state, { page : action.page, currentCard : card });

        case "PROCESS_LIST" :
          return Object.assign({}, state, {page : action.page, nfcStatus : false, qrStatus: false, barCodeStatus: false});

        default:
          return Object.assign({}, state, { page : action.page });
      }
      break;
    }

    case "NFC_SCANNED" :
      let nfcStatus = state.nfcStatus;
      return Object.assign({}, state, { nfcStatus : !nfcStatus });
      break;

    case "QR_SCANNED" :
      let qrStatus = state.qrStatus;
      return Object.assign({}, state, { qrStatus : !qrStatus });
      break;

    case "BARCODE_SCANNED" :
      let barCodeStatus = state.barCodeStatus;
      return Object.assign({}, state, { barCodeStatus : !barCodeStatus });
      break;

    case "SUBMIT_ENABLEMENT_DATA" :
      return Object.assign({}, state, {page : "SUCCESS"});
      break;

    default:
  }

  return Object.assign({}, state);
}


//start the sockets etc.
var shareServer = new ReduxShareServer(server,{
	debug:true,
	broadcastMode:true
});

//create the store.
var store = createStore(reducers, null,applyMiddleware( shareServer.getReduxMiddleware()));


//observe if all 3 types ticked, then trigger another action to show successful message
observeStore(store,  (currentState) => {
  if(currentState.nfcStatus && currentState.qrStatus && currentState.barCodeStatus && currentState.page === 'PROCESS_LIST') {
    setTimeout(()=> {
      store.dispatch({type: "SUBMIT_ENABLEMENT_DATA", data: "SAMPLE DATA, just for demo purpose"});
    }, 1000);

    //TODO: Save data to couchDB in here.

    pouchDB.put({
      _id: 'ENABLEMENT_' + new Date().getTime(),
      data : "sample data",
      timeStamp : new Date().toISOString()
    }).then(()=>{
      console.log("success uploading the data!");
    })
      .catch(error=>{
        console.error(error);
      });
  }
});

//bind redux server and express
app.use('/redux',shareServer.getExpressMiddleware());

//bind http and express
server.on('request', app);

store.dispatch({type:"@@SERVER-LISTEN-START"});

server.listen(port, function () { 
	console.log('GET http://localhost:'+server.address().port+'/redux/state to view the state');
	console.log('POST http://localhost:'+server.address().port+'/redux/action to post an action to all clients');
	console.log('curl -H "Content-Type: application/json" -X POST -d \'{"type":"my-action"}\'  http://localhost:'+server.address().port+'/redux/action');
});

var barcodeReader = new BarcodeReader(store);
barcodeReader.run();

process.on('SIGINT', function() {
  console.log( "\nGracefully shutting down from SIGINT (Ctrl-C)" );
  // some other closing procedures go here
  barcodeReader.shutDown();
  process.exit(1);
});