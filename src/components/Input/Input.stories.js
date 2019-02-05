import React from "react";
import { storiesOf } from "@storybook/react";
import { State, Store } from "@sambego/storybook-state";
import { ThemeProvider } from "styled-components";
import Theme from "../../theme/Theme";
import Input from "./Input";
import StoryContainer from "../StorybookContainer/StorybookContainer";

const store = new Store({
  inputOneVal: ""
});

const stories = storiesOf("Components", module);
stories.add("Input", () => {
  const onInputOneChange = e => store.set({ inputOneVal: e.target.value });

  return (
    <ThemeProvider theme={Theme.main}>
      <StoryContainer>
        <State store={store}>
          {state => [
            <Input
              label="Input"
              placeholder="Placeholder"
              input={{ value: state.inputOneVal, onChange: onInputOneChange }}
            />
          ]}
        </State>
      </StoryContainer>
    </ThemeProvider>
  );
});
