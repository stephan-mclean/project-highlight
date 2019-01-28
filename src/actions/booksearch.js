import {
  SEARCH_BOOKS,
  SEARCH_BOOKS_LOADING,
  SEARCH_BOOKS_ERROR
} from "./types";
import {
  GBOOKS_API_BASE_URL,
  GBOOKS_VOLUME_PATH,
  searchAuthorParam,
  searchTitleParam,
  searchISBNParam
} from "../constants";

export const searchBooks = params => dispatch => {
  dispatch({ type: SEARCH_BOOKS_LOADING });

  let searchURL = GBOOKS_API_BASE_URL + GBOOKS_VOLUME_PATH + "?q=";
  const authorParam = searchAuthorParam(params.author);
  const titleParam = searchTitleParam(params.title);
  const isbnParam = searchISBNParam(params.isbn);
  searchURL += authorParam + titleParam + isbnParam;

  fetch(searchURL)
    .then(response => response.json())
    .then(data => {
      const results = data.items.map(result => {
        const { volumeInfo } = result;
        const { title, subtitle, description } = volumeInfo;
        return {
          gBooksID: result.id,
          title: title || "",
          subtitle: subtitle || "",
          description: description || "",
          coverSrc: volumeInfo.imageLinks ? volumeInfo.imageLinks.thumbnail : ""
        };
      });

      dispatch({ type: SEARCH_BOOKS, payload: results });
    })
    .catch(error => {
      console.error(error);
      dispatch({ type: SEARCH_BOOKS_ERROR });
    });
};
