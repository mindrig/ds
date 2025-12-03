"use client";

import { Icon } from "@wrkspc/icons";
import iconRegularCircleDot from "@wrkspc/icons/svg/regular/circle-dot.js";
import iconRegularCircle from "@wrkspc/icons/svg/regular/circle.js";
import { Size, textCn } from "@wrkspc/theme";
import { cnss } from "cnss";
import React, { forwardRef } from "react";
import { Label, Radio as RARadio } from "react-aria-components";

export interface RadioProps
  extends cnss.Props<typeof radioCn>,
    Omit<React.ComponentProps<typeof RARadio>, "isDisabled"> {
  label?: string | undefined;
  value: string;
  disabled?: boolean | undefined;
}

export const Radio = forwardRef<HTMLLabelElement, RadioProps>(
  function Radio(props, ref) {
    const { label, size, disabled, ...restProps } = props;

    // TODO: Figure out the right value type
    return (
      <RARadio
        {...restProps}
        className={radioCn({ size })}
        isDisabled={!!disabled}
        ref={ref}
      >
        {({ isSelected }) => (
          <>
            <Icon
              size={size}
              id={isSelected ? iconRegularCircleDot : iconRegularCircle}
              disabled={disabled}
              color="support"
            />

            {label && (
              <div>
                <Label className={textCn({ size, role: "control" })}>
                  {label}
                </Label>
              </div>
            )}
          </>
        )}
      </RARadio>
    );
  },
);

export const radioCn = cnss<{ size: Size }>()
  .base("flex items-center gap-2")
  .size("medium");
