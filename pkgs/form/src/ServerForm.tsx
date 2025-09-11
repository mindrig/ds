"use client";

import { forwardRef, useActionState } from "react";
import { Form, FormProps } from "./Form";

export interface ServerFormState {
  error?: string;
}

export interface ServerFormProps extends Omit<FormProps, "pending" | "action"> {
  action: ServerFormAction;
}

export type ServerFormAction = (formData: FormData) => Promise<any>;

export const ServerForm = forwardRef<HTMLFormElement, ServerFormProps>(
  function ServerForm(props, ref) {
    const { action, ...restProps } = props;

    const [state, formAction] = useActionState<ServerFormState, FormData>(
      (_prevState, formData) =>
        action(formData).catch((error) => ({
          error:
            typeof error === "string"
              ? error
              : error instanceof Error
                ? error.message
                : "Unexpected error",
        })),
      {},
    );

    return (
      <Form {...restProps} action={formAction} ref={ref} error={state.error} />
    );
  },
);
