import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import auth from "./auth";
import books from "./books";
import entries from "./entries";

export default combineReducers({
  auth,
  books,
  entries,
  form: formReducer
});
