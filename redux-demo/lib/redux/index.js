export function createStore(reducer) {
  let state = reducer(undefined, { type: "@@redux/init" });
  const listeners = [];
  function getState() {
    return state;
  }

  /**
   * Dispatch action
   * 1. call reducer with action and get the new state
   * 2. save the new state
   * 3. invoke all listeners
   */
  function dispatch(action) {
    // 1. call reducer with action and get the new state
    const newState = reducer(state, action);
    // 2. save the new state
    state = newState;
    // 3. call all listeners
    listeners.forEach((listener) => listener());
  }

  function subscribe(listener) {
    listeners.push(listener);
  }
  return {
    getState,
    dispatch,
    subscribe,
  };
}

export function combineReducers(reducers) {
  return (state, action) => {};
}
