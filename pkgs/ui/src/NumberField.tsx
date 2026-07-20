"use client";

import React, { forwardRef } from "react";
import {
  Input as RAInput,
  NumberField as RANumberField,
} from "react-aria-components";
import { Description } from "./Description";
import { Label, labelProps, LabelValue } from "./Label";
import { fieldCn, inputCn, InputCnProps } from "./classNames";
import { renderErrors, WithErrorsProps } from "./index.js";

export interface NumberFieldProps
  extends
    React.ComponentProps<typeof RANumberField>,
    Omit<InputCnProps, "prefix">,
    WithErrorsProps {
  label?: LabelValue | undefined;
  description?: string | undefined;
  placeholder?: string | undefined;
  prefix?: string;
}

export const NumberField = forwardRef<HTMLInputElement, NumberFieldProps>(
  function NumberField(props, ref) {
    const {
      label,
      description,
      size,
      mono,
      errors,
      placeholder,
      prefix,
      ...restProps
    } = props;

    return (
      <RANumberField {...restProps} className={fieldCn({ size })}>
        {label && <Label {...labelProps(label)} size={size} />}

        <div className="flex">
          {prefix && (
            <div className="text-sm bg-gray-100 text-gray-500 rounded-l-md py-1 pr-2 pl-4 flex items-center border border-gray-300 border-r-0 shadow-xs">
              <div
                className="whitespace-nowrap truncate direction-reverse"
                title={prefix}
              >
                {prefix}
              </div>
            </div>
          )}

          <div className="relative w-full flex">
            <RAInput
              className={inputCn({ size, prefix: !!prefix, mono })}
              placeholder={placeholder || ""}
              ref={ref}
            />
          </div>
        </div>

        {renderErrors({ errors, size }) ||
          (description && <Description size={size}>{description}</Description>)}
      </RANumberField>
    );
  },
);
