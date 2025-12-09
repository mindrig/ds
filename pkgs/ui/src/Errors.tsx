import { Size } from "@wrkspc/theme";
import { cnss } from "cnss";
import React, { ReactElement } from "react";
import { isReactElement } from "react-upgrade";

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

  export type Prop = ReactElement | string | Entry | string[] | Entry[];

  interface Entry {
    type?: string | undefined;
    message: string;
  }
}

export function Errors(props: Errors.Props) {
  const errors = Array.isArray(props.errors) ? props.errors : [props.errors];
  const messages = errors.map((error) =>
    typeof error === "string" || isReactElement(error) ? error : error.message,
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

export const errorsCn = cnss<{ size: Size }>()
  .base("text-errors-ink")
  .size("medium", {
    xsmall: "text-xs",
    small: "text-xs",
    medium: "text-sm",
    large: "",
  });
