import React from "react";
import { storiesOf } from "@storybook/react";
import { ThemeProvider } from "styled-components";
import Theme from "../../theme/Theme";
import StoryContainer from "../StorybookContainer/StorybookContainer";
import Annotater from "./Annotater";

const stories = storiesOf("Components", module);
stories.add("Annotater", () => {
  const annotations = [];
  return (
    <ThemeProvider theme={Theme.main}>
      <StoryContainer>
        <Annotater
          onAddAnnotation={annotation => annotations.push(annotation)}
          currentAnnotations={annotations}
        >
          Some text to annotateSome text to annotateSome text to annotateSome
          text to annotateSome text to annotateSome text to annotateSome text to
          annotateSome text to annotate Some text to annotateSome text to
          annotateSome text to annotateSome text to annotateSome text to
          annotateSome text to annotateSome text to annotateSome text to
          annotate Some text to annotateSome text to annotateSome text to
          annotateSome text to annotateSome text to annotateSome text to
          annotateSome text to annotateSome text to annotate Some text to
          annotateSome text to annotateSome text to annotateSome text to
          annotateSome text to annotateSome text to annotateSome text to
          annotateSome text to annotate
        </Annotater>
      </StoryContainer>
    </ThemeProvider>
  );
});
