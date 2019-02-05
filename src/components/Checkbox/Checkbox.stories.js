import React from "react";
import { storiesOf } from "@storybook/react";
import { State, Store } from "@sambego/storybook-state";
import { ThemeProvider } from "styled-components";
import Theme from "../../theme/Theme";
import Checkbox from "./Checkbox";

const store = new Store({
  inputOneVal: false
});

const stories = storiesOf("Components", module);
stories.add("Checkbox", () => {
  const onInputOneChange = e => {
    store.set({ inputOneVal: e.target.checked });
  };

  return (
    <ThemeProvider theme={Theme.main}>
      <State store={store}>
        {state => [
          <Checkbox
            label="Checkbox"
            input={{
              value: state.inputOneVal,
              onChange: onInputOneChange
            }}
          />
        ]}
      </State>
    </ThemeProvider>
  );
});
