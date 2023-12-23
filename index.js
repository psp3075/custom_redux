// const { createStore } = require("redux");
const { createStore } = require("./customRedux");
const videos = require("./reducers/videos");

const initialState = {
  data: [
    {
      id: 1,
      title: "Flat Array question",
      link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat",
    },
  ],
};

//createStore(reducer,preloadedState,enhancer)
const store = createStore(videos, initialState);
/**
 * {
 * getState,
 * subscribe,
 * dispatch
 * }
 *
 */

//to checkthe initial value of your store
console.log("first call store.getState\n", store.getState());

//to watch store changes
store.subscribe(() => {
  console.log("listener called");
});

//to trigger store changes
store.dispatch({
  type: "ADD_VIDEO",
  payload: {
    id: 2,
    title: "DOM API question",
    link: "https://developer.mozilla.org/en-US/docs/Web/API/HTML_DOM_API",
  },
});

//console.log("second call", store.getState())

store.dispatch({
  type: "ADD_VIDEO",
  payload: {
    id: 3,
    title: "Prototype question",
    link: "https://developer.mozilla.org/en-US/docs/Glossary/Prototype",
  },
});

//console.log("third call", store.getState())
