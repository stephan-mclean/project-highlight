import { GET_BOOKS, GET_BOOKS_LOADING, GET_BOOKS_FAILED } from "../actions";

const defaultState = {
  list: null
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case GET_BOOKS:
      return { loading: false, error: false, list: action.payload };
    case GET_BOOKS_LOADING:
      return { loading: true, error: false, list: null };
    case GET_BOOKS_FAILED:
      return { loading: false, error: true, list: null };
    default:
      return state;
  }
};
