"use client";

import { Field } from "enso";
import { Switch, SwitchProps } from "./Switch";

export interface SwitchControllerProps extends Omit<
  SwitchProps,
  "value" | "ref"
> {
  field: Field<boolean>;
}

export function SwitchController(props: SwitchControllerProps) {
  const { field, ...restProps } = props;
  return (
    <Field.Component
      field={field}
      errors
      render={(control, { errors }) => (
        <Switch
          {...restProps}
          {...control}
          onChange={(value) => {
            control.onChange(value);
            // TODO: Add a mechanism to support manual revalidation events
            // to Enso
            control.onBlur(new Event("blur") as any);
          }}
          errors={errors}
        />
      )}
    />
  );
}
