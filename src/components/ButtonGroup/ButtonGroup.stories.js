import React from "react";
import { storiesOf } from "@storybook/react";
import { ThemeProvider } from "styled-components";
import Theme from "../../theme/Theme";
import ButtonGroup from "./ButtonGroup";
import Button from "../Button/Button";

const stories = storiesOf("Components", module);
stories.add("Button Group", () => (
  <ThemeProvider theme={Theme.main}>
    <div>
      <ButtonGroup right>
        <ButtonGroup.Item>
          <Button>Button</Button>
        </ButtonGroup.Item>
        <ButtonGroup.Item>
          <Button>Button</Button>
        </ButtonGroup.Item>
      </ButtonGroup>
    </div>
  </ThemeProvider>
));
