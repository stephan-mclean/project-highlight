import React from "react";
import { storiesOf } from "@storybook/react";
import { ThemeProvider } from "styled-components";
import Theme from "../../theme/Theme";
import StoryContainer from "../StorybookContainer/StorybookContainer";
import Annotater from "./Annotater";

const stories = storiesOf("Components", module);
stories.add("Annotater", () => (
  <ThemeProvider theme={Theme.main}>
    <StoryContainer>
      <Annotater>
        Some text to annotateSome text to annotateSome text to annotateSome text
        to annotateSome text to annotateSome text to annotateSome text to
        annotateSome text to annotate Some text to annotateSome text to
        annotateSome text to annotateSome text to annotateSome text to
        annotateSome text to annotateSome text to annotateSome text to annotate
        Some text to annotateSome text to annotateSome text to annotateSome text
        to annotateSome text to annotateSome text to annotateSome text to
        annotateSome text to annotate Some text to annotateSome text to
        annotateSome text to annotateSome text to annotateSome text to
        annotateSome text to annotateSome text to annotateSome text to annotate
      </Annotater>
    </StoryContainer>
  </ThemeProvider>
));
