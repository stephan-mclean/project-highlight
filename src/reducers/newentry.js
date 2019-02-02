import {
  UPDATE_DRAFT_ENTRY,
  PUBLISH_NEW_ENTRY,
  PUBLISH_NEW_ENTRY_LOADING,
  PUBLISH_NEW_ENTRY_ERROR,
  RESET_DRAFT_ENTRY
} from "../actions";

const defaultState = {
  notes: "",
  book: {}
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case UPDATE_DRAFT_ENTRY:
      return { ...state, ...action.payload };
    case PUBLISH_NEW_ENTRY_LOADING:
      return { ...state, publishLoading: true };
    case PUBLISH_NEW_ENTRY:
      return { ...state, publishLoading: false, publishedEntry: true };
    case PUBLISH_NEW_ENTRY_ERROR:
      return { ...state, publishLoading: false, publishError: true };
    case RESET_DRAFT_ENTRY:
      return { ...defaultState };
    default:
      return state;
  }
};
