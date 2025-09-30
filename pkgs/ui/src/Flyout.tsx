"use client";

import { ComponentProp, componentPropResolve } from "@wrkspc/props";
import { Size } from "@wrkspc/theme";
import { cn } from "crab";
import React, { useRef } from "react";
import { Dialog, DialogTrigger, Popover } from "react-aria-components";
import { Button, ButtonProps } from "./Button.js";

export interface FlyoutProps extends cn.Props<typeof flyoutCn> {
  button?: ComponentProp<ButtonProps> | undefined;
  inline?: boolean | undefined;
}

export function Flyout(props: React.PropsWithChildren<FlyoutProps>) {
  const { button, size, inline, children } = props;
  const triggerRef = useRef<HTMLSpanElement>(null);

  return (
    <DialogTrigger>
      <div className="inline-flex relative">
        {inline && <span ref={triggerRef} className="absolute" />}

        {componentPropResolve(button, ({ props, children }) => (
          <Button size={size} {...props} slot>
            {children || "Open"}
          </Button>
        ))}
      </div>

      <Popover
        className={flyoutCn(props)}
        triggerRef={inline ? triggerRef : { current: null }}
        placement={inline ? "bottom left" : "bottom"}
        offset={inline ? 0 : 8}
      >
        <Dialog>{children}</Dialog>
      </Popover>
    </DialogTrigger>
  );
}

export const flyoutCn = cn<{ size: Size; bare: boolean }>()
  .size("medium", {
    xsmall: "md:min-w-32",
    small: "md:min-w-48",
    medium: "md:min-w-72",
    large: "md:min-w-96",
  })
  .bare(false, {
    true: "",
    false: "shadow-md bg-white rounded-lg border",
  });
