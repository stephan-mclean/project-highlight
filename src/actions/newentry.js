import {
  UPDATE_DRAFT_ENTRY,
  PUBLISH_NEW_ENTRY,
  PUBLISH_NEW_ENTRY_LOADING,
  PUBLISH_NEW_ENTRY_ERROR
} from "./types";
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
      createdDate: new Date()
    })
    .then(docRef => dispatch({ type: PUBLISH_NEW_ENTRY }))
    .catch(() => dispatch({ type: PUBLISH_NEW_ENTRY_ERROR }));
};
