import { GET_ENTRIES } from "../actions";

const defaultState = {
  loading: false,
  error: false,
  list: null
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case GET_ENTRIES:
      return { loading: false, error: false, list: action.payload };
    default:
      return state;
  }
};
