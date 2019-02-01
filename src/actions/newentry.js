import { UPDATE_NEW_ENTRY } from "./types";

export const updateNewEntry = entryData => dispatch => {
  dispatch({
    type: UPDATE_NEW_ENTRY,
    payload: entryData
  });
};
