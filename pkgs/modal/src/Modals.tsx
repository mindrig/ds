"use client";

import { forwardRef, useEffect, useMemo } from "react";
import { createPortal } from "react-dom";
import { ModalContext } from "./ModalContext";
import { useModals } from "./ModalsContext";
import { CloseModal, ModalPropsIntersection, ModalState } from "./types";

export interface ModalsProps {
  /** The active modal state. */
  modal: ModalState<any, any>;
  /** The close modal function */
  closeModal: CloseModal;
}

/**
 * The component renders the modal overlay and the modal component.
 */
export function Modals({ modal, closeModal }: ModalsProps) {
  const { Component, id, options, setRenderComponent } = modal;

  const overlayPortal = createPortal(
    <div className="z-40 fixed inset-0 bg-gray-900/75 transition-opacity" />,
    document.body,
  );

  const RenderComponent = useMemo(
    () =>
      forwardRef(function ModalComponent(
        props: ModalPropsIntersection<any, any>,
        ref,
      ) {
        function close(reason?: string) {
          closeModal(id, reason);
        }

        return createPortal(
          <ModalContext.Provider value={{ close, id }}>
            <div className="z-40 fixed inset-0 overflow-y-auto">
              <div
                className="md:items-center md:p-4 flex min-h-full justify-center text-center"
                onClick={(e) => {
                  if (options?.overlayClose)
                    e.target === e.currentTarget && close();
                }}
              >
                <Component {...props} ref={ref} close={close} id={id} />
              </div>
            </div>
          </ModalContext.Provider>,
          document.body,
        );
      }),
    [Component, closeModal, id, options?.overlayClose],
  );

  useEffect(() => {
    if (!options?.manualRender) return;
    setRenderComponent(RenderComponent);
  }, [setRenderComponent, RenderComponent, options?.manualRender]);

  if (options?.manualRender) {
    return overlayPortal;
  } else {
    return (
      <>
        {overlayPortal}
        <RenderComponent {...modal.props} />
      </>
    );
  }
}

/**
 * The component renders the {@link Modals} component if modal is defined
 * or null otherwise. The purpose of this component is to allow to use
 * conditional hooks.
 */
export function MaybeModals() {
  const { modal, closeModal } = useModals();
  if (!modal) return null;
  return <Modals modal={modal} closeModal={closeModal} />;
}
