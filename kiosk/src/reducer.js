import { NEW_ENABLEMENT } from './actions'

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
    name: "SUPERSTAR WHITE",
    enablement: {
      total: 200,
      completed: 20
    }
  }];

export function reducers(state = {count : 0}, action) {
  switch (action.type) {
    case "NEW_ENABLEMENT":
      return Object.assign({}, state, { count : (state.count || 0) + 1 });

    case "PAGE" :{
      switch(action.page) {
        case "LANDING":
          let cards = state.cards || action.cards || defaultCardsForDemostration;
          return Object.assign({}, state, { page : action.page, cards : cards });
        default:
          return Object.assign({}, state, { page : action.page });
      }
    }

    // Client side only reducer
    case "@@SERVER-INIT-STATE":
      return Object.assign(({}, action.state || {count : 0}));

    default:
  }

  return Object.assign({}, state);
}

