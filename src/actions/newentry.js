import {
  UPDATE_DRAFT_ENTRY,
  PUBLISH_NEW_ENTRY,
  PUBLISH_NEW_ENTRY_LOADING,
  PUBLISH_NEW_ENTRY_ERROR,
  RESET_DRAFT_ENTRY
} from "./types";
import toast from "../components/Toast/Toast";
import { authRef, dbRef } from "../firebase";

export const updateNewEntry = entryData => dispatch => {
  dispatch({
    type: UPDATE_DRAFT_ENTRY,
    payload: entryData
  });
};

export const publishEntry = entry => dispatch => {
  dispatch({ type: PUBLISH_NEW_ENTRY_LOADING });

  const currentUser = authRef.currentUser;
  const entriesRef = dbRef.collection("entries");

  entriesRef
    .add({
      ...entry,
      creator: currentUser.uid,
      createdDate: entry.createdDate ? new Date(entry.createdDate) : new Date()
    })
    .then(() => dispatch({ type: PUBLISH_NEW_ENTRY }))
    .catch(() => {
      dispatch({ type: PUBLISH_NEW_ENTRY_ERROR });
      toast.danger("Failed to add entry. Please retry.");
    });
};

export const resetDraftEntry = () => dispatch => {
  dispatch({ type: RESET_DRAFT_ENTRY });
};
