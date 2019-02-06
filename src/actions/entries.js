import React from "react";
import { GET_ENTRIES, GET_ENTRIES_ERROR, GET_ENTRIES_LOADING } from "./types";
import { publishEntry } from "./newentry";
import { authRef, entriesRef } from "../firebase";
import toast, { UndoButton } from "../components/Toast/Toast";

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

  entriesRef
    .doc(entry.id)
    .delete()
    .then(() => {
      toast.success("Entry deleted", {
        closeButton: <UndoButton onUndo={onUndo} />
      });
    });
};
