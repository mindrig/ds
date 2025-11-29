import { Field } from "enso";
import { Select, SelectProps } from "./Select";

export interface SelectControllerProps<
  Value extends string | number | null | undefined,
> extends Omit<SelectProps<Value>, "ref"> {
  field: Field<Value>;
}
export function SelectController<
  Value extends string | number | null | undefined,
>(props: SelectControllerProps<Value>) {
  const { field, ...restProps } = props;
  return (
    <Field.Component
      field={field}
      errors
      render={({ value, onChange, ...control }, { errors }) => (
        <Select
          {...restProps}
          {...control}
          errors={errors}
          value={value}
          onChange={(key) => {
            // @ts-ignore: Figure out who's tripping, React Aria Components or Enso
            onChange(key);
            // TODO: Add a mechanism to support manual revalidation events
            // to Enso
            control.onBlur(new Event("blur") as any);
          }}
        />
      )}
    />
  );
}
