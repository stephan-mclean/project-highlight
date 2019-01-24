import { GET_CURRENT_USER } from "./types";

export const getCurrentUser = () => dispatch => {
  dispatch({
    type: GET_CURRENT_USER,
    payload: { username: "username" }
  });
};
