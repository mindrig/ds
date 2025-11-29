"use client";

import { Icon, IconProp } from "@wrkspc/icons";
import React from "react";
import {
  Input as RAInput,
  NumberField as RANumberField,
  TextField as RATextField,
} from "react-aria-components";
import { Description } from "./Description";
import { Label, labelA11yProps, labelProps, LabelValue } from "./Label";
import { fieldCn, inputCn, InputCnProps, inputIconCn } from "./classNames";
import { anyErrors, Errors, WithErrorsProps, Wrap } from "./index.js";

export type InputProps<Value extends string | number | null | undefined> =
  Input.Props<Value>;

export namespace Input {
  export interface Props<Value extends string | number | null | undefined>
    // TODO: Reenable extending React Aria Components props when the optional
    // props missing undefined issue is fixed.
    // extends Omit<React.ComponentProps<typeof RATextField>, "type" | "value">,
    extends Omit<InputCnProps, "prefix" | "icon">,
      WithErrorsProps {
    label: LabelValue;
    description?: string | undefined;
    placeholder?: string | undefined;
    icon?: IconProp | undefined;
    prefix?: string;
    ref?: React.Ref<HTMLInputElement | null>;
    type?: Type<Value>;
    value?: Value;
    // TODO: Try picking these from React Aria Components props
    min?: Value extends number ? number | undefined : undefined;
    step?: Value extends number ? number | undefined : undefined;
    max?: Value extends number ? number | undefined : undefined;
    className?: string | undefined;
    autoFocus?: boolean | undefined;
  }

  export type Type<Value extends string | number | null | undefined> =
    number extends Value ? TypeNumber : TypeText;

  export type TypeNumber = "number";

  export type TypeText =
    | "text"
    | "search"
    | "url"
    | "tel"
    | "email"
    | "password";

  export type Value<Type extends string | number | null | undefined> =
    "number" extends Type ? number : string;
}

export function Input<Value extends string | number | null | undefined>(
  props: Input.Props<Value>,
) {
  const {
    type,
    label,
    description,
    size,
    mono,
    errors,
    placeholder,
    icon,
    prefix,
    ref,
    value,
    autoFocus,
    min,
    max,
    step,
    ...restProps
  } = props;

  return (
    <Wrap
      into={(children) =>
        type === "number" ? (
          <RANumberField
            {...restProps}
            {...labelA11yProps(label)}
            className={fieldCn({ size })}
            // TODO: Make React Aria Components accept undefineds for all optional props
            value={
              ((value as number | null | undefined) ?? undefined) as number
            }
            minValue={min as number}
            maxValue={max as number}
            step={step as number}
            autoFocus={autoFocus as boolean}
          >
            {children}
          </RANumberField>
        ) : (
          <RATextField
            {...restProps}
            {...labelA11yProps(label)}
            className={fieldCn({ size })}
            // TODO: Make React Aria Components accept undefineds for all optional props
            value={
              ((value as string | null | undefined) ?? undefined) as string
            }
            autoFocus={autoFocus as boolean}
          >
            {children}
          </RATextField>
        )
      }
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
              <Icon id={icon} size={size} color="detail" className="absolute" />
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
    </Wrap>
  );
}

function Content() {}
