import { Field } from "enso";
import { Input, InputProps } from "./Input";

export type InputControllerProps<
  Value extends string | number | null | undefined,
> = InputController.Props<Value>;

export namespace InputController {
  export interface Props<Value extends string | number | null | undefined>
    extends Omit<InputProps<Value>, "ref"> {
    field: Field<Value>;
  }
}

export function InputController<
  Value extends string | number | null | undefined,
>(props: InputController.Props<Value>) {
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
