"use client";

import { Icon, IconProp } from "@wrkspc/icons";
import iconLightCheck from "@wrkspc/icons/svg/light/check.js";
import iconSolidCaretDown from "@wrkspc/icons/svg/solid/caret-down.js";
import { ComponentProp, componentPropResolve } from "@wrkspc/props";
import { Size } from "@wrkspc/theme";
import { renderErrors, WithErrorsProps } from "@wrkspc/ui";
import { cn } from "crab";
import React from "react";
import {
  Button,
  ButtonProps,
  ListBox,
  ListBoxItem,
  Popover,
  Select as RASelect,
  SelectValue,
} from "react-aria-components";
import { Description } from "./Description";
import { Label, labelA11yProps, labelProps, LabelValue } from "./Label";
import { fieldCn, FieldCnProps, inputCn, InputCnProps } from "./classNames";

export interface SelectOption<Payload extends string | number> {
  label?: string | undefined;
  value: Payload;
}

export type SelectOptions<Payload extends string | number> = Array<
  SelectOption<Payload>
>;

export type SelectOptionItem<Payload extends string | number> =
  | SelectOption<Payload>
  | false
  | undefined
  | null;

export interface SelectProps<Payload extends string | number>
  extends React.ComponentProps<typeof RASelect>,
    FieldCnProps,
    Omit<InputCnProps, "icon">,
    WithErrorsProps {
  label: LabelValue;
  button?: ComponentProp<ButtonProps> | undefined;
  icon?: IconProp | undefined;
  description?: string | undefined;
  options: Array<SelectOptionItem<Payload>>;
  italic?: boolean;
  mono?: boolean;
}

export function Select<Payload extends string | number>(
  props: SelectProps<Payload>,
) {
  const {
    button,
    label,
    description,
    options,
    icon,
    size,
    errors,
    isDisabled,
    italic,
    mono,
    ...restProps
  } = props;

  return (
    <RASelect
      className={fieldCn({ size })}
      {...restProps}
      {...labelA11yProps(label)}
    >
      {label && <Label {...labelProps(label)} size={size} />}

      {componentPropResolve(button, ({ props, children }) => (
        <Button
          {...props}
          className={inputCn({ size, italic, mono })}
          isDisabled={!!isDisabled}
        >
          <SelectValue>
            {({ selectedText }) => (
              <div className={selectButtonContentCn({ size })}>
                {icon && <Icon id={icon} size={size} color="detail" />}
                <span>{selectedText}</span>
              </div>
            )}
          </SelectValue>

          <Icon id={iconSolidCaretDown} color="support" />
        </Button>
      ))}

      <Popover className="shadow-menu bg-menu-canvas border border-menu-border rounded-menu overflow-y-auto">
        <ListBox className={selectListCn({ size })}>
          {props.options.map(
            (option) =>
              option && (
                <ListBoxItem
                  key={option.value}
                  id={option.value}
                  textValue={option.label || String(option.value)}
                  className={({ isSelected }) =>
                    selectItemCn({ size, mono, isSelected })
                  }
                >
                  {({ isSelected }) => (
                    <div className="flex gap-1 items-center">
                      <div className="w-3 flex items-center">
                        {isSelected && (
                          <Icon
                            id={iconLightCheck}
                            size="xsmall"
                            color="support"
                          />
                        )}
                      </div>
                      <div>{option.label || option.value}</div>
                    </div>
                  )}
                </ListBoxItem>
              ),
          )}
        </ListBox>
      </Popover>

      {renderErrors({ errors, size }) ||
        (description && <Description size={size}>{description}</Description>)}
    </RASelect>
  );
}

export const selectButtonContentCn = cn<{ size: Size }>()
  .base("flex items-center whitespace-nowrap")
  .size("medium", {
    xsmall: "gap-1",
    small: "gap-1",
    medium: "gap-2",
    large: "gap-2",
  });

export const selectListCn = cn<{ size: Size }>()
  .base("min-w-[--trigger-width] spacing-y-1")
  .size("medium", {
    xsmall: "p-1",
    small: "p-1",
    medium: "p-2",
    large: "p-2",
  });

export const selectItemCn = cn<{
  size: Size;
  isSelected: boolean;
  mono: boolean;
}>()
  .base(
    "rounded-option hover:bg-option-canvas-hover hover:text-option-ink-hover cursor-pointer select-none",
  )
  .size("medium", {
    xsmall: "py-1 px-1 text-sm",
    small: "py-1 px-2 text-sm",
    medium: "py-1 px-3 text-sm",
    large: "py-1 px-3",
  })
  .isSelected(false, {
    true: "text-option-ink-selected bg-option-canvas-selected",
  })
  .mono(false, {
    true: "font-mono",
  });
