import { GET_ENTRIES, GET_ENTRIES_ERROR, GET_ENTRIES_LOADING } from "./types";
import { authRef, dbRef } from "../firebase";

export const getEntries = () => dispatch => {
  dispatch({ type: GET_ENTRIES_LOADING });

  const currentUser = authRef.currentUser;
  const entriesRef = dbRef.collection("entries");

  const query = entriesRef.where("creator", "==", currentUser.uid);
  query.onSnapshot(
    snapshot => {
      const result = [];
      snapshot.forEach(doc => {
        const entry = {
          id: doc.id,
          ...doc.data()
        };

        entry.createdDate = entry.createdDate.toDate().toLocaleDateString();

        result.push(entry);
      });

      dispatch({
        type: GET_ENTRIES,
        payload: result
      });
    },
    error => {
      console.error(error);
      dispatch({ type: GET_ENTRIES_ERROR });
    }
  );
};
