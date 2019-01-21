import React from "react";
import { storiesOf } from "@storybook/react";
import { ThemeProvider } from "styled-components";
import Theme from "../../theme/Theme";
import AppContainer from "./AppContainer";

const stories = storiesOf("Components", module);
stories.add("App Container", () => (
  <ThemeProvider theme={Theme.main}>
    <AppContainer>
      <div>HEADER HERE</div>
      <div>BODY HERE</div>
      <div>FOOTER HERE</div>
    </AppContainer>
  </ThemeProvider>
));
