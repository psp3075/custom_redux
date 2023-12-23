const createStore = (reducer, preloadedState) => {
  let state = preloadedState;
  const listeners = [];

  const getState = () => state;

  const subscribe = (listener) => {
    if (typeof listener !== "function") {
      throw new Error("store listeners should be functions");
    }
    listeners.push(listener);
    console.log("subscribe called");
    return function unsubscribe() {
      const index = listeners.indexOf(listener);
      listeners.splice(index);
    };
  };

  const dispatch = () => {};

  return {
    getState,
    subscribe,
    dispatch,
  };
};

module.exports = createStore;
