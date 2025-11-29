"use client";

import { Field } from "enso";
import React from "react";
import { RadioGroup } from "react-aria-components";

export interface RadioGroupControllerProps<Payload extends string | undefined>
  extends React.ComponentProps<typeof RadioGroup> {
  field: Field<Payload>;
}

export function RadioGroupController<Payload extends string | undefined>(
  props: RadioGroupControllerProps<Payload>,
) {
  const { field, ...restProps } = props;
  return (
    <Field.Component
      field={field}
      errors
      render={({ value, onChange, ...control }, { errors }) => {
        return (
          <RadioGroup
            {...restProps}
            {...control}
            // NOTE: React Aria Components treats undefined as not controlled,
            // so it won't deselect the radio button if the value is undefined.
            // TODO: Consider making such values null?!
            value={value || null}
            /* @ts-ignore: Figure out who's tripping, React Aria Components or Enso */
            onChange={onChange}
            // TODO: Add error?
          />
        );
      }}
    />
  );
}
