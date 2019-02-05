import React from "react";
import { storiesOf } from "@storybook/react";
import { State, Store } from "@sambego/storybook-state";
import { ThemeProvider } from "styled-components";
import Theme from "../../theme/Theme";
import FileInput from "./FileInput";
import StoryContainer from "../StorybookContainer/StorybookContainer";

const store = new Store({
  inputOneVal: null
});

const stories = storiesOf("Components", module);
stories.add("File Input", () => {
  const onInputOneChange = value => store.set({ inputOneVal: value });

  return (
    <ThemeProvider theme={Theme.main}>
      <StoryContainer>
        <State store={store}>
          {state => [
            <FileInput
              label="File Input"
              accept=".txt"
              input={{ value: state.inputOneVal, onChange: onInputOneChange }}
            />
          ]}
        </State>
      </StoryContainer>
    </ThemeProvider>
  );
});
