import {
  SEARCH_BOOKS,
  SEARCH_BOOKS_LOADING,
  SEARCH_BOOKS_ERROR
} from "./types";
import {
  GBOOKS_API_BASE_URL,
  GBOOKS_VOLUME_PATH,
  searchAuthorParam
} from "../constants";

export const searchBooks = params => dispatch => {
  dispatch({ type: SEARCH_BOOKS_LOADING });

  let searchURL = GBOOKS_API_BASE_URL + GBOOKS_VOLUME_PATH + "?q=";
  const authorParam = searchAuthorParam(params.author);
  searchURL += authorParam;

  fetch(searchURL)
    .then(response => response.json())
    .then(data => dispatch({ type: SEARCH_BOOKS, payload: data.items }))
    .catch(error => {
      console.error(error);
      dispatch({ type: SEARCH_BOOKS_ERROR });
    });
};
