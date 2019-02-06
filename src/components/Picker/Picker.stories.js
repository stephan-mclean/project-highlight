import React from "react";
import { storiesOf } from "@storybook/react";
import { ThemeProvider } from "styled-components";
import Theme from "../../theme/Theme";
import Picker from "./Picker";
import StoryContainer from "../StorybookContainer/StorybookContainer";

const stories = storiesOf("Components", module);
stories.add("Picker", () => (
  <ThemeProvider theme={Theme.main}>
    <StoryContainer>
      <Picker label="Picker" onClick={() => console.log("picker clicked")} />
    </StoryContainer>
  </ThemeProvider>
));
