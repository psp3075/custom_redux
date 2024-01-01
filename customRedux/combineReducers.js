function combineReducers(reducers) {
  //{users:()=>{}, videos:()=>{}}
  // ['users','videos']
  const reducerKeys = Object.keys(reducers);
  const finalReducers = {};

  for (let i = 0; i < reducerKeys.length; i++) {
    const key = reducerKeys[i];
    const reducer = reducers[key];

    if (typeof reducer === "undefined") {
      console.log(`no reducer provided for key - ${key}`);
    }

    if (typeof reducer === "function") {
      finalReducers[key] = reducer;
    }
  }
  const finalReducerKeys = Object.keys(finalReducers);

  let shapeAssertionError;

  try {
    finalReducerKeys.forEach((reducerKey) => {
      const reducer = finalReducers[reducerKey];
      const initialState = reducer(undefined, {
        type: "INIT_ACTION",
      });

      if (typeof initialState === "undefined") {
        throw new Error("initial state error");
      }
    });
  } catch (e) {
    shapeAssertionError = e;
  }
  return function combined(state, action) {
    const nextState = {};

    if (shapeAssertionError) {
      throw shapeAssertionError;
    }

    if (!finalReducerKeys.length) {
      console.log(
        "Store does not have a valid reducer. Please make sure the argument passed to combineReducers is an object whose values are reducers."
      );
    }

    for (let i = 0; i < finalReducerKeys.length; i++) {
      const key = finalReducerKeys[i]; //users
      const reducer = reducers[key]; //()=>{}
      const previousStateForKey = state[key]; //state['users']
      const nextStateForKey = reducer(previousStateForKey, action); //users(state.users, action)

      if (typeof nextStateForKey === "undefined") {
        throw new Error(
          `Given action ${action.type} returned undefined for reducer ${key} `
        );
      }
      //nextState['users']= nextStateForKey => users(state.users,action)

      nextState[key] = nextStateForKey;
    }

    return nextState;
  };
}

module.exports = combineReducers;
