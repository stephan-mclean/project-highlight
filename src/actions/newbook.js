import { authRef, booksRef } from "../firebase";
import {
  NEW_BOOK_LOADING,
  NEW_BOOK_PUBLISHED,
  NEW_BOOK_ERROR,
  RESET_NEW_BOOK
} from "./types";
import toast from "../components/Toast/Toast";

export const addBook = book => dispatch => {
  dispatch({ type: NEW_BOOK_LOADING });

  const currentUser = authRef.currentUser;
  booksRef
    .add({
      creator: currentUser.uid,
      numEntries: 0,
      ...book
    })
    .then(docRef => {
      dispatch({
        type: NEW_BOOK_PUBLISHED,
        payload: { id: docRef.id, ...book }
      });
    })
    .catch(err => {
      console.error(err);
      dispatch({ type: NEW_BOOK_ERROR });
      toast.danger("Failed to add the book. Please retry.");
    });
};

export const resetNewBook = () => dispatch => {
  dispatch({ type: RESET_NEW_BOOK });
};
