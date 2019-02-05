import React from "react";
import { storiesOf } from "@storybook/react";
import { ThemeProvider } from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Theme from "../../theme/Theme";
import StoryContainer from "../StorybookContainer/StorybookContainer";
import Button from "../Button/Button";

const stories = storiesOf("Components", module);
stories.add("Toast", () => (
  <ThemeProvider theme={Theme.main}>
    <StoryContainer>
      <Button onClick={() => toast("Test", { autoClose: false })}>
        Show toast
      </Button>

      <ToastContainer />
    </StoryContainer>
  </ThemeProvider>
));
