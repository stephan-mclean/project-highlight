import React from "react";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button, { LINK_TYPE } from "../Button/Button";

const DefaultCloseButton = ({ closeToast }) => (
  <FontAwesomeIcon icon="times" onClick={closeToast} />
);

export const UndoButton = ({ closeToast, onUndo }) => {
  const handleClick = () => {
    onUndo();
    closeToast();
  };

  return (
    <Button type="button" buttonType={LINK_TYPE} onClick={handleClick}>
      Undo
    </Button>
  );
};

export default {
  POSITION: toast.POSITION,
  basic(content, options) {
    return toast(content, {
      className: "default-toast",
      progressClassName: "default-toast-progress",
      closeButton: <DefaultCloseButton />,
      ...options
    });
  },

  success(content, options) {
    return toast.success(content, {
      className: "success-toast",
      progressClassName: "success-toast-progress",
      closeButton: <DefaultCloseButton />,
      ...options
    });
  },

  danger(content, options) {
    return toast.error(content, {
      className: "danger-toast",
      progressClassName: "danger-toast-progress",
      closeButton: <DefaultCloseButton />,
      ...options
    });
  }
};
