import React from "react";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button, { LINK_TYPE } from "../Button/Button";

const DefaultCloseButton = ({ closeToast }) => (
  <FontAwesomeIcon icon="times" onClick={closeToast} />
);

const CallbackButton = ({ closeToast, onCallback, label }) => {
  const handleClick = () => {
    onCallback();
    closeToast();
  };

  return (
    <Button type="button" buttonType={LINK_TYPE} onClick={handleClick}>
      {label}
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

export const RETRY_CATEGORIES = {
  bookRemovalFailed: {
    type: "BOOK_REMOVAL_FAILED",
    multiDisplayName: "books failed to delete."
  }
};

// Category -> {toastId, onUndo}
const undoCallbacks = new Map();
const retryCallbacks = new Map();

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
  aggregateWithCallback(
    content,
    options,
    callbacks,
    callbackCategory,
    doCallback,
    toastFn,
    callbackBtnLabel
  ) {
    if (callbacks.has(callbackCategory.type)) {
      const callbacksWithCategory = callbacks.get(callbackCategory.type);
      const { toastId } = callbacksWithCategory[0];
      callbacksWithCategory.push({ doCallback, toastId });

      toast.update(toastId, {
        render: `${callbacksWithCategory.length} ${
          callbackCategory.multiDisplayName
        }`
      });

      return toastId;
    } else {
      const callback = () => {
        callbacks.get(callbackCategory.type).forEach(cb => cb.doCallback());
        callbacks.delete(callbackCategory.type);
      };

      const toastId = toastFn(content, {
        closeButton: (
          <CallbackButton onCallback={callback} label={callbackBtnLabel} />
        ),
        ...options
      });

      callbacks.set(callbackCategory.type, [{ doCallback, toastId }]);

      return toastId;
    }
  },
  undo(content, options, category, onUndo) {
    return this.aggregateWithCallback(
      content,
      options,
      undoCallbacks,
      category,
      onUndo,
      this.success,
      "Undo"
    );
  },
  retry(content, options, category, onRetry) {
    return this.aggregateWithCallback(
      content,
      options,
      retryCallbacks,
      category,
      onRetry,
      this.danger,
      "Retry"
    );
  }
};
