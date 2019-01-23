import { GET_CURRENT_USER } from "../actions";

const defaultState = { currentUser: null };

export default (state = defaultState, action) => {
  switch (action.type) {
    case GET_CURRENT_USER:
      return { ...state, currentUser: action.payload };
    default:
      return state;
  }
};
