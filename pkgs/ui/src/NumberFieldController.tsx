import { Field } from "enso";
import { NumberField, NumberFieldProps } from "./NumberField";

export interface NumberFieldControllerProps extends Omit<
  NumberFieldProps,
  "ref"
> {
  field: Field<number>;
}

export function NumberFieldController(props: NumberFieldControllerProps) {
  const { field, ...restProps } = props;
  return (
    <Field.Component
      field={field}
      errors
      render={(control, { errors }) => (
        <NumberField {...restProps} {...control} errors={errors} />
      )}
    />
  );
}
