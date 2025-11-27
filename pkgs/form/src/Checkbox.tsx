"use client";

import { Icon } from "@wrkspc/icons";
import iconLightSquareCheck from "@wrkspc/icons/svg/light/square-check.js";
import iconLightSquare from "@wrkspc/icons/svg/light/square.js";
import { Color, Size } from "@wrkspc/theme";
import { anyErrors, renderErrors, WithErrorsProps } from "@wrkspc/ui";
import { cn } from "crab";
import React, { forwardRef } from "react";
import { Checkbox as RACheckbox } from "react-aria-components";
import { FieldCnProps, InputCnProps } from "./classNames";
import { Description } from "./Description";
import { Label, labelProps, LabelValue } from "./Label";

export interface CheckboxProps
  extends Omit<React.ComponentProps<typeof RACheckbox>, "value">,
    FieldCnProps,
    InputCnProps,
    WithErrorsProps {
  value: boolean;
  label?: LabelValue | undefined;
  description?: string | undefined;
  color?: Color | undefined;
  disabled?: boolean | undefined;
}

export const Checkbox = forwardRef<HTMLLabelElement, CheckboxProps>(
  function Checkbox(props, ref) {
    const {
      label,
      description,
      size,
      color,
      errors,
      value,
      disabled,
      ...restProps
    } = props;

    // TODO: Figure out the right value type
    return (
      <RACheckbox
        {...restProps}
        isSelected={value}
        isDisabled={!!disabled}
        className={checkboxCn({ size, disabled })}
        ref={ref}
      >
        {({ isSelected }) => (
          <>
            <Icon
              id={isSelected ? iconLightSquareCheck : iconLightSquare}
              color="support"
            />

            {(label || anyErrors(errors)) && (
              <div>
                {label && (
                  // <Label className={textCn({ size, color, role: "control" })}>
                  //   {label}
                  // </Label>
                  <Label {...labelProps(label)} size={size} />
                )}

                {renderErrors({ errors, size }) ||
                  (description && (
                    <Description size={size}>{description}</Description>
                  ))}
              </div>
            )}
          </>
        )}
      </RACheckbox>
    );
  },
);

export const checkboxCn = cn<{ size: Size; disabled: boolean }>()
  .base("flex items-center")
  .size("medium", {
    small: "gap-1",
    medium: "gap-2",
  })
  .disabled(false, {
    true: "opacity-50",
  });
