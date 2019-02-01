import { UPDATE_NEW_ENTRY } from "../actions";

const defaultState = {
  notes: "",
  book: {}
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case UPDATE_NEW_ENTRY:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
