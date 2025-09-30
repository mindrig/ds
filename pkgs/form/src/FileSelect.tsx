"use client";

import { textCn } from "@wrkspc/theme";
import { anyErrors, Button, Errors, WithErrorsProps, Wrap } from "@wrkspc/ui";
import React, { ReactNode, useState } from "react";
import { FileTrigger } from "react-aria-components";
import { Description } from "./Description";
import { Label, labelProps, LabelValue } from "./Label";
import { fieldCn, FieldCnProps, InputCnProps } from "./classNames";

export interface FileSelectProps
  extends React.ComponentPropsWithRef<"input">,
    Omit<
      React.ComponentProps<typeof FileTrigger>,
      "onSelect" | "allowsMultiple"
    >,
    FieldCnProps,
    InputCnProps,
    WithErrorsProps {
  name?: string | undefined;
  label?: LabelValue | undefined;
  action?: ReactNode | undefined;
  description?: string | undefined;
  isDisabled?: boolean;
  multi?: boolean | undefined;
  onSelect?: (value: FileList | null) => void;
}

export function FileSelect(
  props: React.ComponentPropsWithRef<"input"> & FileSelectProps,
) {
  const {
    name,
    label,
    action,
    description,
    size,
    errors,
    isDisabled,
    onSelect,
    multi,
    ref,
    ...restProps
  } = props;
  const [files, setFiles] = useState<FileList | null>(null);

  return (
    <div className={fieldCn({ size })}>
      {label && <Label {...labelProps(label)} size={size} />}

      <div>
        <Wrap
          into={(children) =>
            onSelect ? (
              <FileTrigger
                {...restProps}
                allowsMultiple={!!multi}
                onSelect={(newFiles) => {
                  setFiles(newFiles);
                  onSelect?.(newFiles);
                }}
              >
                {children}
              </FileTrigger>
            ) : (
              <div className="relative">
                <input
                  name={name}
                  type="file"
                  ref={ref}
                  className="absolute left-0 top-0 right-0 bottom-0 opacity-0"
                  onChange={(e) => setFiles(e.target.files)}
                  accept={restProps.acceptedFileTypes?.join(",")}
                />
                {children}
              </div>
            )
          }
        >
          <div className="flex gap-2 items-center">
            <Button
              isDisabled={isDisabled}
              size={size}
              style="transparent"
              slot={!!onSelect}
            >
              {action || "Select file"}
            </Button>

            {files && (
              <div className={textCn({ size, color: "support" })}>
                {files.length > 1 ? `${files.length} files` : files[0]?.name}
              </div>
            )}
          </div>
        </Wrap>
      </div>

      {anyErrors(errors) ? (
        <Errors errors={errors} size={size} />
      ) : (
        description && <Description size={size}>{description}</Description>
      )}
    </div>
  );
}
