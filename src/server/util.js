// @flow

function observeStore(store : Object, onChange : (Object) => void ): Object {
  let currentState;

  function handleChange() {
    let nextState = store.getState();
    if (nextState !== currentState) {
      currentState = nextState;
      onChange(currentState);
    }
  }

  const unsubscribe = store.subscribe(handleChange);
  handleChange();
  return unsubscribe;
}

export { observeStore };