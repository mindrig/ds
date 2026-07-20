import { Checkbox, CheckboxProps } from "./Checkbox";
import { Field } from "enso";

export interface CheckboxControllerProps extends Omit<
  CheckboxProps,
  "value" | "ref"
> {
  field: Field<boolean>;
}

export function CheckboxController(props: CheckboxControllerProps) {
  const { field, ...restProps } = props;
  return (
    <Field.Component
      field={field}
      errors
      render={(control, { errors }) => (
        <Checkbox
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
