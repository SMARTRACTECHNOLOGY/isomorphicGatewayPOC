import {NEW_ENABLEMENT} from './actions'
import { isClient } from "./env";

const defaultCardsForDemostration = [
  {
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
    name: "SUPERSTAR WHITE",
    enablement: {
      total: 200,
      completed: 20
    }
  }];

export default function reducers(state = {count: 0}, action) {
  switch (action.type) {
    case "PAGE" : {
      switch (action.page) {
        case "LANDING":
          let cards = state.cards || action.cards || defaultCardsForDemostration;
          return Object.assign({}, state, {page: action.page, cards: cards});

        case "PROCESS_DETAIL":
          let card = action.card;
          return Object.assign({}, state, {page: action.page, currentCard: card});

        case "PROCESS_LIST" :
          return Object.assign({}, state, {page: action.page, nfcStatus: false, qrStatus: false, barCodeStatus: false});

        default:
          return Object.assign({}, state, {page: action.page});
      }
    }

    case "NFC_SCANNED" :
      let nfcStatus = state.nfcStatus;
      return Object.assign({}, state, {nfcStatus: !nfcStatus});

    case "QR_SCANNED" :
      let qrStatus = state.qrStatus;
      return Object.assign({}, state, {qrStatus: !qrStatus});

    case "BARCODE_SCANNED" :
      let barCodeStatus = state.barCodeStatus;
      return Object.assign({}, state, {barCodeStatus: !barCodeStatus});


    case "SUBMIT_ENABLEMENT_DATA" :
      return Object.assign({}, state, {page: "SUCCESS", nfcStatus: false, qrStatus: false, barCodeStatus: false});

    // Client side only reducer
    case "@@SERVER-INIT-STATE":
      if(isClient) {
        return Object.assign(({}, action.state || {count: 0}));
      } else {
        break;
      }

    default:
  }

  return Object.assign({}, state);
}
