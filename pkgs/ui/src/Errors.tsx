import { Size } from "@wrkspc/theme";
import { cnss } from "cnss";
import { Field } from "enso";
import React from "react";

/** @deprecated */
export type ErrorsProps = Errors.Props;

/** @deprecated */
export type WithErrorsProps = Errors.WithProp;

/** @deprecated */
export type ErrorsProp = Errors.Prop;

export namespace Errors {
  export interface Props extends cnss.Props<typeof errorsCn> {
    errors: Prop;
  }

  export interface WithProp {
    errors?: Prop | undefined | null;
  }

  export type Prop = string | Field.Error | string[] | Field.Error[];

  export type Style = "label" | "notice";
}

export function Errors(props: Errors.Props) {
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

export namespace renderErrors {
  export interface Props extends Errors.WithProp, cnss.Props<typeof errorsCn> {}
}

export function renderErrors(
  props: renderErrors.Props,
): React.ReactElement | null {
  const { errors } = props;
  return anyErrors(errors) ? <Errors {...{ ...props, errors }} /> : null;
}

export function anyErrors(
  errors?: Errors.Prop | undefined | null,
): errors is Errors.Prop {
  return Array.isArray(errors) ? !!errors.length : !!errors;
}

export const errorsCn = cnss<{ size: Size; style: Errors.Style }>()
  .size("medium", {
    xsmall: "text-xs",
    small: "text-xs",
    medium: "text-sm",
    large: "",
  })
  .style("label", {
    label: "text-errors-label-ink",
    // TODO: Sizes
    notice:
      "bg-errors-notice-canvas text-errors-notice-ink rounded-errors-notice px-2 py-1 text-sm border-[length:var(--border-errors-notice)] border-errors-notice-border",
  });
