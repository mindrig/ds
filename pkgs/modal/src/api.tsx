"use client";

import { nanoid } from "nanoid";
import { forwardRef, useEffect, useRef, useState } from "react";
import { useModals } from "./ModalsContext";
import { ModalAPI, ModalOptions, ModalPropsIntersection } from "./types";
import { flatPromise } from "./utils";

/**
 * Creates modal from the component and options. Returns a hook to use the
 * modal API.
 *
 * This variation, enables ref forwarding.
 *
 * @param Component - the modal component with forwarded ref.
 * @param options - the modal options.
 *
 * @returns A hook to use the modal API with forwarded ref.
 */
export function createModal<Props, Result, RefTo>(
  Component: React.ForwardRefRenderFunction<
    RefTo,
    ModalPropsIntersection<Props, Result>
  >,
): ModalAPI<Props, Result, RefTo, boolean, boolean>;

/**
 * Creates modal from the component and options. Returns a hook to use the
 * modal API.
 *
 * @param Component - the modal component.
 * @param options - the modal options.
 *
 * @returns A hook to use the modal API.
 */
export function createModal<Props = {}, Result = unknown>(
  Component: React.FC<ModalPropsIntersection<Props, Result>>,
): ModalAPI<Props, Result, unknown, boolean, boolean>;

/**
 * Creates modal from the component and options. Returns a hook to use the
 * modal API.
 *
 * @param Component - the modal component.
 * @param options - the modal options.
 *
 * @returns A hook to use the modal API.
 */
export function createModal<Props = {}, Result = unknown, RefTo = unknown>(
  Component:
    | React.FC<ModalPropsIntersection<Props, Result>>
    | React.ForwardRefRenderFunction<
        RefTo,
        ModalPropsIntersection<Props, Result>
      >,
): ModalAPI<Props, Result, RefTo, boolean, boolean> {
  function createAPI(options: ModalOptions<boolean, boolean>) {
    function useHook() {
      const { setModal } = useModals();

      const [RenderComponent, setRenderComponentState] = useState<
        React.FC<ModalPropsIntersection<Props, Result>>
      >(() => () => null);
      const renderComponentRef =
        useRef<React.FC<ModalPropsIntersection<Props, Result>>>(
          RenderComponent,
        );
      useEffect(() => {
        renderComponentRef.current = RenderComponent;
      }, [RenderComponent]);

      function setRenderComponent(
        Component: React.FC<ModalPropsIntersection<Props, Result>>,
      ) {
        if (renderComponentRef.current !== Component)
          setRenderComponentState(() => Component);
      }

      return {
        // @ts-expect-error
        show: (props) => {
          document.body.style.overflow = "hidden";
          const promise = flatPromise<Result>();

          setModal({
            // @ts-expect-error - forwardRef makes TS crazy, so to avoid monster
            // types, we just ignore it here.
            Component: options?.forwardRef ? forwardRef(Component) : Component,
            props,
            id: nanoid(),
            options,
            setRenderComponent,
            promise,
          });
          return promise.promise;
        },

        Component: RenderComponent,
      };
    }

    return Object.assign(
      function modalAPI(assignedOptions: ModalOptions<boolean, boolean>) {
        return createAPI({ ...options, ...assignedOptions });
      },
      { use: useHook },
    ) as ModalAPI<Props, Result, RefTo, boolean, boolean>;
  }

  return createAPI({});
}
