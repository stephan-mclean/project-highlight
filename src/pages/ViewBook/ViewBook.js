import React, { Fragment } from "react";

export const ViewBook = ({ match }) => (
  <Fragment>BOOK {match.params.bookId}</Fragment>
);
