import { GET_BOOKS } from "./types";
import { authRef, dbRef } from "../firebase";

const testData = [
  {
    coverSrc: "https://via.placeholder.com/128x198",
    numEntries: 0
  },
  {
    coverSrc: "https://via.placeholder.com/128x198",
    numEntries: 5
  },
  {
    coverSrc: "https://via.placeholder.com/128x198",
    numEntries: 1
  }
];

export const getBooks = () => dispatch => {
  const currentUser = authRef.currentUser;
  const booksRef = dbRef.collection("books");

  const query = booksRef.where("creator", "==", currentUser.uid);
  query.onSnapshot(
    snapshot => {
      const result = [];
      snapshot.forEach(doc => {
        result.push(doc.data());
      });

      dispatch({
        type: GET_BOOKS,
        payload: result
      });
    },
    error => console.error(error)
  );
};
