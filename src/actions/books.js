import { GET_BOOKS, GET_BOOKS_LOADING, GET_BOOKS_FAILED } from "./types";
import { authRef, dbRef } from "../firebase";
const booksRef = dbRef.collection("books");

export const getBooks = () => dispatch => {
  dispatch({ type: GET_BOOKS_LOADING });

  const currentUser = authRef.currentUser;

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

export const addBook = book => dispatch => {
  console.log("add book", book);

  const currentUser = authRef.currentUser;
  booksRef
    .add({
      creator: currentUser.uid,
      numEntries: 0,
      ...book
    })
    .then(docRef => console.log("added book", docRef.id))
    .catch(err => console.error(err));
};
