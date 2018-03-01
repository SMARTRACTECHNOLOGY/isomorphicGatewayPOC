// import { NEW_ENABLEMENT } from './actions'


export function reducers(state = {count : 0}, action) {
  switch (action.type) {
    case "NEW_ENABLEMENT":
      return Object.assign({}, state, { count : state.count + 1 });

    // Share Server Commands
    case "@@SERVER-INIT-STATE":
      return Object.assign(({}, action.state));
  }

  return Object.assign({}, state);
}

