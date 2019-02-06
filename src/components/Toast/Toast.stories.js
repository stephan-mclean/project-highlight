import React from "react";
import { storiesOf } from "@storybook/react";
import { ThemeProvider } from "styled-components";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Theme from "../../theme/Theme";
import StoryContainer from "../StorybookContainer/StorybookContainer";
import Button from "../Button/Button";
import toast, { UndoButton } from "./Toast";

const stories = storiesOf("Components", module);
stories.add("Toast", () => (
  <ThemeProvider theme={Theme.main}>
    <StoryContainer>
      <Button
        onClick={() =>
          toast.basic("Default", { autoClose: false, closeButton: false })
        }
      >
        Default
      </Button>
      <Button onClick={() => toast.success("Success")}>Success</Button>
      <Button onClick={() => toast.danger("Danger")}>Danger</Button>

      <Button
        onClick={() =>
          toast.danger("Danger", {
            closeButton: <UndoButton onUndo={() => console.log("undo")} />,
            autoClose: false
          })
        }
      >
        Undo
      </Button>
      <ToastContainer />
    </StoryContainer>
  </ThemeProvider>
));
