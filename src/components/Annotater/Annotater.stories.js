import React from "react";
import { storiesOf } from "@storybook/react";
import { ThemeProvider } from "styled-components";
import Theme from "../../theme/Theme";
import StoryContainer from "../StorybookContainer/StorybookContainer";
import Annotater from "./Annotater";

const stories = storiesOf("Components", module);
stories.add("Annotater", () => {
  const annotations = [];
  const annotationText =
    "Some text to annotateSome text to annotateSome text to annotateSometext to annotateSome text to annotateSome text to annotateSome text to";
  return (
    <ThemeProvider theme={Theme.main}>
      <StoryContainer>
        <Annotater
          onAddAnnotation={annotation => annotations.push(annotation)}
          currentAnnotations={annotations}
          text={annotationText}
        />
      </StoryContainer>
    </ThemeProvider>
  );
});
