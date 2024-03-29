// const { combineReducers } = require("redux");
const { combineReducers } = require("./customRedux");
const { createStore } = require("./customRedux");
const videos = require("./reducers/videos.js");
const users = require("./reducers/users.js");

const initialState = {
  videos: {
    data: [
      {
        id: 1,
        title: "Flat Array question",
        link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat",
      },
    ],
  },
};

/**
 * {
 * users : {data:[]} => users(state['users], action) => previous state or updatedState
 * videos : {data:[]} => videos(state['videos], action) => previous state or updatedState
 * }
 *
 * combineReducers()=>function => function(state,action)
 *
 * rootReducer(state, action){
 * iterate over individual reducers
 * pass state+action as argument
 * return the updated or previous individual state slices
 *
 * ACTION => ADD_VIDEO
 * users(state["users"],action)=> previousState
 * videos(state["videos"],action)=> updatedState
 *
 * return {
 * users,  //previousState
 * videos //updatedState
 * }
 * }
 */
const rootReducer = combineReducers({
  videos,
  users,
});

//createStore(reducer,preloadedState,enhancer)
const store = createStore(rootReducer, initialState);
/**
 * {
 * getState,
 * subscribe,
 * dispatch
 * }
 *
 */

//to checkthe initial value of your store
console.log("==========>first call store.getState\n", store.getState());

//to watch store changes
store.subscribe(() => {
  console.log("listener called");
});

//to watch store changes
// store.subscribe(console.log("listener called"));

//to trigger store changes
store.dispatch({
  type: "ADD_VIDEO",
  payload: {
    id: 2,
    title: "DOM API question",
    link: "https://developer.mozilla.org/en-US/docs/Web/API/HTML_DOM_API",
  },
});

console.log("==========>second call\n", store.getState());

store.dispatch({
  type: "ADD_VIDEO",
  payload: {
    id: 3,
    title: "Prototype question",
    link: "https://developer.mozilla.org/en-US/docs/Glossary/Prototype",
  },
});

console.log("==========>third call", store.getState());
