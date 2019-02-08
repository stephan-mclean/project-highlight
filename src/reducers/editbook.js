import { EDIT_BOOK, EDIT_BOOK_PUBLISHED, EDIT_BOOK_ERROR } from "../actions";

const defaultState = {};

export default (state = defaultState, action) => {
  switch (action.type) {
    case EDIT_BOOK:
      return { editBookLoading: true };
    case EDIT_BOOK_ERROR:
      return { editBookError: true, editBookLoading: false };
    case EDIT_BOOK_PUBLISHED:
      return {
        editBookError: false,
        editBookLoading: false,
        editBookPublished: true
      };
    default:
      return state;
  }
};
