import React from "react";
import { storiesOf } from "@storybook/react";
import { ThemeProvider } from "styled-components";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Theme from "../../theme/Theme";
import StoryContainer from "../StorybookContainer/StorybookContainer";
import Button, { LINK_TYPE } from "../Button/Button";
import toast from "./Toast";

const UndoButton = ({ closeToast }) => (
  <Button onClick={closeToast} buttonType={LINK_TYPE}>
    Undo
  </Button>
);

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
            closeButton: <UndoButton />,
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
