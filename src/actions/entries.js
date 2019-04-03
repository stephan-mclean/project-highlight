import { GET_ENTRIES, GET_ENTRIES_ERROR, GET_ENTRIES_LOADING } from "./types";
import { publishEntry } from "./newentry";
import { authRef, entriesRef } from "../firebase";
import toast, {
  UNDO_CATEGORIES,
  RETRY_CATEGORIES
} from "../components/Toast/Toast";

export const getEntries = () => dispatch => {
  dispatch({ type: GET_ENTRIES_LOADING });

  const currentUser = authRef.currentUser;
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

export const removeEntry = entry => dispatch => {
  const onUndo = () => {
    const entryToAdd = { ...entry };
    delete entryToAdd.id;

    dispatch(publishEntry(entryToAdd));
  };

  const doDelete = () => {
    entriesRef
      .doc(entry.id)
      .delete()
      .then(
        () => {
          toast.undo("Entry deleted", {}, UNDO_CATEGORIES.entryRemoved, onUndo);
        },
        error => {
          console.error(error);
          toast.retry(
            "Failed to remove entry.",
            {},
            RETRY_CATEGORIES.entryRemovalFailed,
            doDelete
          );
        }
      );
  };

  doDelete();
};
