const USERS_ACTIONS = {
  ADD_USER: "ADD_USER",
};

function users(
  state = {
    data: [],
  },
  action
) {
  switch (action.type) {
    case USERS_ACTIONS.ADD_USER:
      return {
        ...state,
        data: [...state.data, action.payload],
      };
    default:
      return state;
  }
}

module.exports = users;
