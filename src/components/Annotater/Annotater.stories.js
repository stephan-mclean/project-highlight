import React from "react";
import { storiesOf } from "@storybook/react";
import { ThemeProvider } from "styled-components";
import { State, Store } from "@sambego/storybook-state";
import Theme from "../../theme/Theme";
import StoryContainer from "../StorybookContainer/StorybookContainer";
import Annotater from "./Annotater";

const store = new Store({
  annotations: []
});

const stories = storiesOf("Components", module);
stories.add("Annotater", () => {
  const annotationText =
    "Some text to annotateSome text to annotateSome text to annotateSometext to annotateSome text to annotateSome text to annotateSome text to";
  return (
    <ThemeProvider theme={Theme.main}>
      <StoryContainer>
        <State store={store}>
          {state => [
            <Annotater
              updateAnnotations={newAnnotations => {
                store.set({ annotations: newAnnotations });
              }}
              currentAnnotations={state.annotations}
              text={annotationText}
            />
          ]}
        </State>
      </StoryContainer>
    </ThemeProvider>
  );
});
