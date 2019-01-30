import {
  SEARCH_BOOKS,
  SEARCH_BOOKS_LOADING,
  SEARCH_BOOKS_ERROR
} from "../actions";

const defaultState = {
  results: null
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case SEARCH_BOOKS:
      return { loading: false, error: false, results: action.payload };
    case SEARCH_BOOKS_LOADING:
      return { loading: true, error: false, results: null };
    case SEARCH_BOOKS_ERROR:
      return { loading: false, error: true, results: null };
    default:
      return state;
  }
};
