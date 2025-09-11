import { Field } from "enso";
import { Input, InputProps } from "./Input";

export interface InputControllerProps extends Omit<InputProps, "ref"> {
  field: Field<string>;
}

export function InputController(props: InputControllerProps) {
  const { field, ...restProps } = props;
  return (
    <Field.Component
      field={field}
      errors
      render={(control, { errors }) => (
        <Input {...restProps} {...control} errors={errors} />
      )}
    />
  );
}
