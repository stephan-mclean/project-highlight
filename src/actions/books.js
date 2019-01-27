import { GET_BOOKS, GET_BOOKS_LOADING, GET_BOOKS_FAILED } from "./types";
import { authRef, dbRef } from "../firebase";

export const getBooks = () => dispatch => {
  dispatch({ type: GET_BOOKS_LOADING });

  const currentUser = authRef.currentUser;
  const booksRef = dbRef.collection("books");

  const query = booksRef.where("creator", "==", currentUser.uid);
  query.onSnapshot(
    snapshot => {
      const result = [];
      snapshot.forEach(doc => {
        result.push({
          id: doc.id,
          ...doc.data()
        });
      });

      dispatch({
        type: GET_BOOKS,
        payload: result
      });
    },
    error => {
      console.error(error);
      dispatch({ type: GET_BOOKS_FAILED });
    }
  );
};
