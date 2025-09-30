"use client";

import { Icon } from "@wrkspc/icons";
import iconRegularToggleLargeOff from "@wrkspc/icons/svg/regular/toggle-large-off.js";
import iconRegularToggleLargeOn from "@wrkspc/icons/svg/regular/toggle-large-on.js";
import { Size, translateSize } from "@wrkspc/theme";
import { anyErrors, Errors, WithErrorsProps } from "@wrkspc/ui";
import { cn } from "crab";
import React from "react";
import { Switch as RASwitch } from "react-aria-components";
import { Description } from "./Description";
import { Label } from "./Label";

export interface SwitchProps
  extends Omit<React.ComponentProps<typeof RASwitch>, "value">,
    WithErrorsProps {
  label?:
    | string
    | [string | React.ReactNode, string | React.ReactNode]
    | undefined;
  description?: string | undefined;
  value?: boolean | undefined;
  size?: Size | undefined;
}

export function Switch(props: SwitchProps) {
  const { label, description, value, size, ref, errors, ...restProps } = props;
  const leftLabel = Array.isArray(label) ? label[0] : undefined;
  const rightLabel = Array.isArray(label) ? label[1] : label;
  const cns = switchCn({ size });

  return (
    <RASwitch {...restProps} isSelected={!!value}>
      {({ isSelected }) => (
        <div className={cns.wrapper}>
          <div className={cns.inner}>
            {leftLabel && <Label size={size}>{leftLabel}</Label>}

            <Icon
              id={
                isSelected
                  ? iconRegularToggleLargeOn
                  : iconRegularToggleLargeOff
              }
              color={isSelected ? "success" : "detail"}
              size={translateSize(size, 2)}
            />

            {rightLabel && <Label size={size}>{rightLabel}</Label>}

            {description && (
              <Description size={size}>{description}</Description>
            )}
          </div>

          {anyErrors(errors) && <Errors size={size} errors={errors} />}
        </div>
      )}
    </RASwitch>
  );
}

export const switchCn = cn<{ size: Size }>().group(($) => ({
  wrapper: $().base("flex flex-col").size("medium", {
    xsmall: "gap-1",
    small: "gap-2",
    medium: "gap-2",
    large: "gap-2",
  }),

  inner: $().base("flex items-center").size("medium", {
    xsmall: "gap-1",
    small: "gap-2",
    medium: "gap-2",
    large: "gap-2",
  }),
}));
