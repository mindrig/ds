import { Field } from "enso";
import { TextArea, TextAreaProps } from "./TextArea";

export interface TextAreaControllerProps extends TextAreaProps {
  field: Field<string>;
}

export function TextAreaController(props: TextAreaControllerProps) {
  const { field, onBlur, ...restProps } = props;
  return (
    <Field.Component
      field={field}
      errors
      render={(control, { errors }) => (
        <TextArea
          {...restProps}
          {...control}
          onBlur={(e) => {
            control.onBlur(e);
            onBlur?.(e);
          }}
          errors={errors}
        />
      )}
    />
  );
}
