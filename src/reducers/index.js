import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import auth from "./auth";
import books from "./books";

export default combineReducers({
  auth,
  books,
  form: formReducer
});
