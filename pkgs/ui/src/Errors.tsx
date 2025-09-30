import { Size } from "@wrkspc/theme";
import { cn } from "crab";
import { Field } from "enso";
import React from "react";

export interface ErrorsProps extends cn.Props<typeof errorsCn> {
  errors: ErrorsProp;
}

export interface WithErrorsProps {
  errors?: ErrorsProp | undefined | null;
}

export type ErrorsProp = string | Field.Error | string[] | Field.Error[];

export function Errors(props: ErrorsProps) {
  const errors = Array.isArray(props.errors) ? props.errors : [props.errors];
  const messages = errors.map((error) =>
    typeof error === "string" ? error : error.message,
  );
  // TODO: Use React Aria Components if you can figure out how to get it to work
  return (
    <div className={errorsCn(props)}>
      {messages.length > 1 ? (
        <ul>
          {messages.map((message, index) => (
            <li key={index}>{message}</li>
          ))}
        </ul>
      ) : (
        messages[0]
      )}
    </div>
  );
}

export interface RenderErrorsProps
  extends WithErrorsProps,
    cn.Props<typeof errorsCn> {}

export function renderErrors(
  props: RenderErrorsProps,
): React.ReactElement | null {
  const { errors } = props;
  return anyErrors(errors) ? <Errors {...{ ...props, errors }} /> : null;
}

export function anyErrors(
  errors?: ErrorsProp | null | undefined,
): errors is ErrorsProp {
  return Array.isArray(errors) ? !!errors.length : !!errors;
}

export type ErrorsStyle = "label" | "notice";

export const errorsCn = cn<{ size: Size; style: ErrorsStyle }>()
  .size("medium", {
    xsmall: "text-xs",
    small: "text-xs",
    medium: "text-sm",
    large: "",
  })
  .style("label", {
    label: "text-red-600",
    // TODO: Sizes
    notice: "bg-red-100 text-neutral-900/80 rounded-md px-2 py-1 text-sm",
  });
