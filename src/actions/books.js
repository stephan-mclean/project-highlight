import { GET_BOOKS, GET_BOOKS_LOADING, GET_BOOKS_FAILED } from "./types";
import { authRef, booksRef } from "../firebase";
import toast, { UNDO_CATEGORIES } from "../components/Toast/Toast";
import { addBook } from "./";

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

export const removeBook = book => dispatch => {
  const onUndo = () => {
    const bookToAdd = { ...book };
    delete bookToAdd.id;
    dispatch(addBook(bookToAdd));
  };

  booksRef
    .doc(book.id)
    .delete()
    .then(() =>
      toast.undo("Book deleted", {}, UNDO_CATEGORIES.bookRemoved, onUndo)
    );
};

export const removeBooks = books => dispatch => {
  books.forEach(book => dispatch(removeBook(book)));
};
