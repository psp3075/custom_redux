const createStore = (reducer, preloadedState) => {
  if (typeof reducer !== "function") {
    throw new Error("Reducer must be a function");
  }

  let state = preloadedState;
  let dispatching = false;
  const listeners = [];

  const getState = () => {
    if (dispatching) {
      throw new Error("cannot call getState while dispatching");
    }
    return state;
  };

  const subscribe = (listener) => {
    if (typeof listener !== "function") {
      throw new Error("store listeners should be functions");
    }
    if (dispatching) {
      throw new Error("cannot call subscribe while dispatching");
    }

    listeners.push(listener);
    console.log("subscribe called");
    return function unsubscribe() {
      if (dispatching) {
        throw new Error("cannot call unsubscribe while dispatching");
      }

      const index = listeners.indexOf(listener);
      listeners.splice(index);
    };
  };

  //trigger store changes, dispatch actions
  const dispatch = (action) => {
    if (typeof action !== "object") {
      throw new Error("An action should be a object");
    }

    if (typeof action.type === "undefined") {
      throw new Error("Actions should have a type");
    }

    if (dispatching) {
      throw new Error("cannot call unsubscribe while dispatching");
    }
    /**
     * {type:"ADD_VIDEO",payload:{...}}
     *
     * {
     * videos:{data:[]}--> videos()
     * users:{data:[]}--> users()
     * }
     */
    dispatching = true;

    try {
      state = reducer(state, action);
    } finally {
      dispatching = false;
    }
    listeners.forEach((listener) => listener());

    return action;
  };

  dispatch({
    type: "INIT_ACTION",
  });
  return {
    getState,
    subscribe,
    dispatch,
  };
};

module.exports = createStore;
