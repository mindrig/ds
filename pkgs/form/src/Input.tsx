"use client";

import { Icon, IconProp } from "@wrkspc/icons";
import { anyErrors, Errors, WithErrorsProps } from "@wrkspc/ui";
import React, { forwardRef } from "react";
import {
  Input as RAInput,
  TextField as RATextField,
} from "react-aria-components";
import { Description } from "./Description";
import { Label, labelA11yProps, labelProps, LabelValue } from "./Label";
import { fieldCn, inputCn, InputCnProps, inputIconCn } from "./classNames";

export interface InputProps
  extends React.ComponentProps<typeof RATextField>,
    Omit<InputCnProps, "prefix" | "icon">,
    WithErrorsProps {
  label: LabelValue;
  description?: string | undefined;
  placeholder?: string | undefined;
  icon?: IconProp | undefined;
  prefix?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  function TextField(props, ref) {
    const {
      label,
      description,
      size,
      mono,
      errors,
      placeholder,
      icon,
      prefix,
      ...restProps
    } = props;

    return (
      <RATextField
        {...restProps}
        {...labelA11yProps(label)}
        className={fieldCn({ size })}
      >
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

          <div className="relative w-full">
            {icon && (
              <div className={inputIconCn({ size })}>
                <Icon
                  id={icon}
                  size={size}
                  color="detail"
                  className="absolute"
                />
              </div>
            )}

            <RAInput
              className={inputCn({
                size,
                prefix: !!prefix,
                icon: !!icon,
                mono,
              })}
              placeholder={placeholder || ""}
              ref={ref}
            />
          </div>
        </div>

        {anyErrors(errors) ? (
          <Errors size={size} errors={errors} />
        ) : (
          description && <Description size={size}>{description}</Description>
        )}
      </RATextField>
    );
  },
);
