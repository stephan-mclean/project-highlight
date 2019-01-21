import React from "react";
import { storiesOf } from "@storybook/react";
import { ThemeProvider } from "styled-components";
import Theme from "../../theme/Theme";
import Picker from "./Picker";

const stories = storiesOf("Components", module);
stories.add("Picker", () => (
  <ThemeProvider theme={Theme.main}>
    <div>
      <Picker label="Picker" onClick={() => console.log("picker clicked")} />
    </div>
  </ThemeProvider>
));
