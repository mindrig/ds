"use client";

import { Field } from "enso";
import { FileSelect, FileSelectProps } from "./FileSelect";

export interface FileSelectControllerProps<
  Multi extends boolean = false,
> extends FileSelectProps {
  field: Field<(Multi extends true ? FileList : File) | null>;
  multi?: Multi;
}

export function FileSelectController<Multi extends boolean = false>(
  props: FileSelectControllerProps<Multi>,
) {
  const { field, multi, onSelect, ...restProps } = props;

  return (
    <Field.Component
      field={field}
      errors
      render={({ value, onChange, ...control }, { errors }) => (
        <FileSelect
          {...restProps}
          {...control}
          // TODO: Handle value as a separate component. It needs to build and
          // memoize FileList, so it can't be done here.
          // value={value}
          onSelect={(files) => {
            // @ts-expect-error -- It's too complex to type this correctly.
            onChange(multi ? files : (files?.[0] ?? null));
          }}
          errors={errors}
          multi={multi}
          ref={restProps.ref}
        />
      )}
    />
  );
}
