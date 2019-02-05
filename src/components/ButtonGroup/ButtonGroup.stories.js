import React from "react";
import { storiesOf } from "@storybook/react";
import { ThemeProvider } from "styled-components";
import Theme from "../../theme/Theme";
import ButtonGroup from "./ButtonGroup";
import Button from "../Button/Button";
import StoryContainer from "../StorybookContainer/StorybookContainer";

const stories = storiesOf("Components", module);
stories.add("Button Group", () => (
  <ThemeProvider theme={Theme.main}>
    <StoryContainer>
      <ButtonGroup right>
        <ButtonGroup.Item>
          <Button>Button</Button>
        </ButtonGroup.Item>
        <ButtonGroup.Item>
          <Button>Button</Button>
        </ButtonGroup.Item>
      </ButtonGroup>
    </StoryContainer>
  </ThemeProvider>
));
