import React from "react";
import { storiesOf } from "@storybook/react";
import { State, Store } from "@sambego/storybook-state";
import { ThemeProvider } from "styled-components";
import Theme from "../../theme/Theme";
import TextArea from "./TextArea";

const store = new Store({
  inputOneVal: ""
});

const stories = storiesOf("Components", module);
stories.add("TextArea", () => {
  const onInputOneChange = e => store.set({ inputOneVal: e.target.value });

  return (
    <ThemeProvider theme={Theme.main}>
      <State store={store}>
        {state => [
          <TextArea
            label="Text Area"
            placeholder="Placeholder"
            input={{ value: state.inputOneVal, onChange: onInputOneChange }}
          />
        ]}
      </State>
    </ThemeProvider>
  );
});
