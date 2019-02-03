import {
  NEW_BOOK_LOADING,
  NEW_BOOK_PUBLISHED,
  NEW_BOOK_ERROR,
  RESET_NEW_BOOK
} from "../actions";

const defaultState = {};

export default (state = defaultState, action) => {
  switch (action.type) {
    case NEW_BOOK_LOADING:
      return { newBookLoading: true };
    case NEW_BOOK_ERROR:
      return { newBookError: true, newBookLoading: false };
    case NEW_BOOK_PUBLISHED:
      return {
        newBookError: false,
        newBookLoading: false,
        bookAdded: action.payload
      };
    case RESET_NEW_BOOK:
      return { ...defaultState };
    default:
      return state;
  }
};
