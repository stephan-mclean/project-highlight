import { GET_CURRENT_USER } from "./types";
import { authRef } from "../firebase";

export const getCurrentUser = () => dispatch => {
  authRef.onAuthStateChanged(user => {
    console.log("auth state changed", user);
    if (user) {
      dispatch({
        type: GET_CURRENT_USER,
        payload: user
      });
    } else {
      dispatch({
        type: GET_CURRENT_USER,
        payload: null
      });
    }
  });
};

// Temporary for development.
export const doLogin = () => () => {
  authRef.signInAnonymously();
};
