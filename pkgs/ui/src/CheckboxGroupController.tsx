"use client";

import { Field } from "enso";
import React from "react";
import { CheckboxGroup } from "react-aria-components";

export interface CheckboxGroupControllerProps<
  Payload extends string[],
> extends React.ComponentProps<typeof CheckboxGroup> {
  field: Field<Payload>;
}

export function CheckboxGroupController<Payload extends string[]>(
  props: CheckboxGroupControllerProps<Payload>,
) {
  const { field, ...restProps } = props;
  return (
    <Field.Component
      field={field}
      errors
      render={({ onChange, ...control }, { errors }) => {
        return (
          <CheckboxGroup
            {...restProps}
            {...control}
            /* @ts-ignore: Figure out who's tripping, React Aria Components or Enso */
            onChange={onChange}
            // TODO: Add error?
          />
        );
      }}
    />
  );
}
