import React from "react";
import { storiesOf } from "@storybook/react";
import { ThemeProvider } from "styled-components";
import Theme from "../../theme/Theme";
import Input from "./Input";

const stories = storiesOf("Components", module);
stories.add("Input", () => (
  <ThemeProvider theme={Theme.main}>
    <div>
      <Input label="Input" placeholder="Placeholder" />
    </div>
  </ThemeProvider>
));
