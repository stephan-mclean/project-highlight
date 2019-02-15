import { GET_CURRENT_USER } from "./types";
import { authRef, authVarRef } from "../firebase";

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

export const logOut = () => () => {
  authRef.signOut();
};

export const signUpWithEmailAndPass = (email, password) => () => {
  authRef.createUserWithEmailAndPassword(email, password);
};

export const logInWithEmailAndPass = (email, password) => () => {
  authRef.signInWithEmailAndPassword(email, password);
};

export const signInWithGoogle = () => () => {
  const googleProvider = new authVarRef.GoogleAuthProvider();
  authRef.signInWithPopup(googleProvider);
};

export const signInWithFacebook = () => () => {
  const fbProvider = new authVarRef.FacebookAuthProvider();
  authRef.signInWithPopup(fbProvider);
};
