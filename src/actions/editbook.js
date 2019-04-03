import { booksRef } from "../firebase";
import { EDIT_BOOK, EDIT_BOOK_PUBLISHED, EDIT_BOOK_ERROR } from "./types";
import toast from "../components/Toast/Toast";

export const editBook = book => dispatch => {
  dispatch({ type: EDIT_BOOK });

  const { id } = book;
  const bookToEdit = { ...book };
  delete bookToEdit.id;

  booksRef
    .doc(id)
    .set(bookToEdit)
    .then(() => dispatch({ type: EDIT_BOOK_PUBLISHED }))
    .catch(error => {
      console.error(error);
      dispatch({ type: EDIT_BOOK_ERROR });
      toast.danger("Failed to edit book. Please retry.");
    });
};
