"use client";

import { createContext, useContext, useState } from "react";
import { ModalsContextValue, ModalState } from "./types";
import ModalsPortal from "./Portal";

/**
 * The modals context.
 */
export const ModalsContext = createContext<ModalsContextValue>({
  modal: null,
  setModal: () => {},
  closeModal: () => {},
});

/**
 * Uses the modals context.
 * @returns The modals context value.
 */
export function useModals() {
  return useContext(ModalsContext);
}

/**
 * The component creates modals API, wraps children into the context provider,
 * and renders the modals.
 */
export function ModalsProvider({ children }: React.PropsWithChildren) {
  const [modal, setModal] = useState<null | ModalState<any, any>>(null);

  function closeModal(id: string, reason: any) {
    if (modal?.id === id) {
      modal?.promise.resolve(reason);
      setModal(null);
      modal.setRenderComponent(() => null);
      document.body.style.overflow = "";
    }
  }

  return (
    <ModalsContext.Provider
      value={{
        modal,
        setModal,
        closeModal,
      }}
    >
      {children}
      <ModalsPortal />
    </ModalsContext.Provider>
  );
}
