import { GET_BOOKS } from "./types";

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
  dispatch({
    type: GET_BOOKS,
    payload: testData
  });
};
