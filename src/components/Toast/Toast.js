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

export const UNDO_CATEGORIES = {
  entryRemoved: {
    type: "ENTRY_REMOVED",
    multiDisplayName: "entries deleted."
  },
  bookRemoved: {
    type: "BOOK_REMOVED",
    multiDisplayName: "books deleted."
  }
};

// Category -> {toastId, onUndo}
const undoCallbacks = new Map();

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
  },
  undo(content, options, category, onUndo) {
    if (undoCallbacks.has(category.type)) {
      const undoCallbacksWithCategory = undoCallbacks.get(category.type);
      const { toastId } = undoCallbacksWithCategory[0];
      undoCallbacksWithCategory.push({ onUndo, toastId });

      toast.update(toastId, {
        render: `${undoCallbacksWithCategory.length} ${
          category.multiDisplayName
        }`
      });

      return toastId;
    } else {
      const undo = () => {
        undoCallbacks.get(category.type).forEach(cb => cb.onUndo());
        undoCallbacks.delete(category.type);
      };

      const toastId = toast.success(content, {
        className: "success-toast",
        progressClassName: "success-toast-progress",
        closeButton: <UndoButton onUndo={undo} />,
        ...options
      });

      undoCallbacks.set(category.type, [{ onUndo, toastId }]);

      return toastId;
    }
  }
};
