import React from "react";
import { storiesOf } from "@storybook/react";
import { State, Store } from "@sambego/storybook-state";
import { ThemeProvider } from "styled-components";
import Theme from "../../theme/Theme";
import Select from "./Select";

const store = new Store({
  selectOneVal: ""
});

const stories = storiesOf("Components", module);
stories.add("Select", () => {
  const onSelectOneChange = val => store.set({ selectOneVal: val });

  return (
    <ThemeProvider theme={Theme.main}>
      <State store={store}>
        {state => [
          <Select
            label="Select"
            options={["One", "Two"]}
            input={{ value: state.selectOneVal, onChange: onSelectOneChange }}
          />
        ]}
      </State>
    </ThemeProvider>
  );
});
