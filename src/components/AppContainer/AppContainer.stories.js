import React from "react";
import { storiesOf } from "@storybook/react";
import { ThemeProvider } from "styled-components";
import Theme from "../../theme/Theme";
import AppContainer from "./AppContainer";
import StoryContainer from "../StorybookContainer/StorybookContainer";

const stories = storiesOf("Components", module);
stories.add("App Container", () => (
  <ThemeProvider theme={Theme.main}>
    <StoryContainer>
      <AppContainer>
        <div>HEADER HERE</div>
        <div>BODY HERE</div>
        <div>FOOTER HERE</div>
      </AppContainer>
    </StoryContainer>
  </ThemeProvider>
));
