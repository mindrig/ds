"use client";

import { Button } from "@wrkspc/ui";
import { cn } from "crab";
import React, { forwardRef } from "react";
import { Form as RAForm } from "react-aria-components";
import { useFormStatus } from "react-dom";

export interface FormProps
  extends React.PropsWithChildren<
    Omit<React.ComponentProps<typeof RAForm>, "action">
  > {
  action?: (payload: FormData) => void;
  error?: string | undefined;
  title: string;
  pending?: boolean;
  compact?: boolean;
  color?: "action" | "cta" | "danger";
  actions?: React.ReactNode;
}

export const Form = forwardRef<HTMLFormElement, FormProps>(
  function Form(props, ref) {
    const { action, error, pending, title, actions, ...restProps } = props;

    return (
      <RAForm action={action as any} {...restProps}>
        <div className={cn("space-y-9", props.compact ? "p-9" : "px-9 py-14")}>
          {props.children}

          {error && (
            <div className="border border-red-200 bg-red-100 p-4 rounded-lg text-neutral-900/80">
              {error}
            </div>
          )}
        </div>

        <div className="bg-gray-50 rounded-b-xl border-t border-gray-200 py-5 px-9 flex items-center gap-3 justify-between">
          <Submit title={title} pending={pending} color={props.color} />

          <div className="flex gap-3 align-center">{actions}</div>
        </div>
      </RAForm>
    );
  },
);

interface SubmitProps {
  title: string;
  color?: "action" | "cta" | "danger";
  pending?: boolean;
}

function Submit(props: SubmitProps) {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      isDisabled={props.pending || pending}
      color={props.color || "action"}
    >
      {pending ? "Submitting..." : props.title}
    </Button>
  );
}
