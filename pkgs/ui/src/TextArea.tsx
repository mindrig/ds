"use client";

import { Size } from "@wrkspc/theme";
import { cnss } from "cnss";
import React, { useCallback, useEffect, useRef } from "react";
import { TextArea as RATextArea, TextField } from "react-aria-components";
import { fieldCn, FieldCnProps, InputCnProps } from "./classNames";
import { Description } from "./Description";
import { renderErrors, WithErrorsProps } from "./index.js";
import { Label, labelA11yProps, labelProps, LabelValue } from "./Label";

export interface TextAreaProps
  extends Omit<React.ComponentProps<typeof TextField>, "ref">,
    FieldCnProps,
    InputCnProps,
    WithErrorsProps {
  label: LabelValue;
  description?: string | undefined | false;
  placeholder?: string | undefined;
  ref?: React.Ref<HTMLTextAreaElement | null>;
}

export function TextArea(props: TextAreaProps) {
  const {
    label,
    description,
    size,
    mono,
    errors,
    onChange,
    ref,
    ...restProps
  } = props;
  const { textAreaRef, onHeightChange } = useTextAreaAutoSize(false);

  console.log("***", label);
  return (
    <TextField
      {...restProps}
      {...labelA11yProps(label)}
      className={fieldCn({ size })}
    >
      {label && <Label {...labelProps(label)} size={size} />}

      <RATextArea
        className={textAreaCn({ size, mono })}
        ref={(el) => {
          textAreaRef.current = el;
          if (typeof ref === "function") ref(el);
          else if (ref) ref.current = el;
        }}
        onChange={(e) => {
          onHeightChange();
          if (onChange) onChange(e.currentTarget.value);
        }}
        placeholder={props.placeholder}
      />

      {renderErrors({ errors, size }) ||
        (description && <Description size={size}>{description}</Description>)}
    </TextField>
  );
}

export const textAreaCn = cnss<{ size: Size; mono: boolean }>()
  .base(
    "w-full placeholder:text-input-placeholder border border-input-border bg-input-canvas ring-offset-background transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 shadow-input",
  )
  .size("medium", {
    xsmall: "min-h-6 rounded-input-sm p-1 text-xs",
    small: "min-h-7 rounded-input-sm px-2 py-1 text-sm",
    medium: "min-h-15 rounded-input p-3 ",
    large: "min-h-11 rounded-input px-8",
  })
  .mono(false, {
    true: "font-mono",
  });

export function useTextAreaAutoSize(enable = true) {
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

  const onHeightChange = useCallback(() => {
    if (!enable || !textAreaRef.current) return;
    textAreaRef.current.style.height = "auto";
    textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
  }, [enable]);

  useEffect(() => {
    if (!textAreaRef.current?.value) return;
    onHeightChange();
  }, [onHeightChange]);

  return { textAreaRef, onHeightChange };
}
