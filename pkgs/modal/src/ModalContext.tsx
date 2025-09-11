"use client";

import { createContext } from "react";
import { ModalProps } from "./types";

/**
 * The modal context. Unlike {@link ModalsContext} that provides the API to
 * display modals, this context provides API to the modal components.
 */
export const ModalContext = createContext<ModalProps<any>>({
  close: () => {},
  id: "",
});
