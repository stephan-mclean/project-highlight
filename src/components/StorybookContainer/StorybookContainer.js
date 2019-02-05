import React, { Fragment } from "react";
import { GlobalStyle } from "../../theme/GlobalStyle";

export default ({ children }) => (
  <Fragment>
    <GlobalStyle />
    {children}
  </Fragment>
);
