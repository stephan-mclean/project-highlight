import {
  GET_ENTRIES,
  GET_ENTRIES_LOADING,
  GET_ENTRIES_ERROR
} from "../actions";

const defaultState = {
  list: null
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case GET_ENTRIES:
      return { loading: false, error: false, list: action.payload };
    case GET_ENTRIES_LOADING:
      return { loading: true, error: false, list: null };
    case GET_ENTRIES_ERROR:
      return { loading: false, error: true, list: null };
    default:
      return state;
  }
};
