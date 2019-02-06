import React from "react";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CloseButton = ({ closeToast }) => (
  <FontAwesomeIcon icon="times" onClick={closeToast} />
);

export default {
  POSITION: toast.POSITION,
  basic(content, options) {
    return toast(content, {
      className: "default-toast",
      progressClassName: "default-toast-progress",
      closeButton: <CloseButton />,
      ...options
    });
  },

  success(content, options) {
    return toast.success(content, {
      className: "success-toast",
      progressClassName: "success-toast-progress",
      closeButton: <CloseButton />,
      ...options
    });
  },

  danger(content, options) {
    return toast.error(content, {
      className: "danger-toast",
      progressClassName: "danger-toast-progress",
      closeButton: <CloseButton />,
      ...options
    });
  }
};
