import { NEW_ENABLEMENT } from './actions'


export function reducers(state = {count : 0}, action) {
  switch (action.type) {
    case NEW_ENABLEMENT:
      return Object.assign({}, state, { count : state.count + 1 });

    // Client side only reducer
    case "@@SERVER-INIT-STATE":
      return Object.assign(({}, action.state || {count : 0}));

    default:
  }

  return Object.assign({}, state);
}

