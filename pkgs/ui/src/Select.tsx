"use client";

import { Icon, IconProp } from "@wrkspc/icons";
import iconRegularCheck from "@wrkspc/icons/svg/regular/check.js";
import iconRegularChevronDown from "@wrkspc/icons/svg/regular/chevron-down.js";
import { ComponentProp, componentPropResolve } from "@wrkspc/props";
import { Size, translateSize } from "@wrkspc/theme";
import { cnss } from "cnss";
import {
  Button,
  ButtonProps,
  ListBox,
  ListBoxItem,
  Popover,
  Select as RASelect,
  SelectValue,
} from "react-aria-components";
import { fieldCn, FieldCnProps, inputCn, InputCnProps } from "./classNames";
import { Description } from "./Description";
import { Errors, renderErrors } from "./Errors.js";
import { Label, labelA11yProps, labelProps } from "./Label";

/** @deprecated */
export type SelectOption<Payload extends string | number> =
  Select.Option<Payload>;

/** @deprecated */
export type SelectOptions<Payload extends string | number> =
  Select.Options<Payload>;

/** @deprecated */
export type SelectOptionItem<Payload extends string | number> =
  Select.OptionItem<Payload>;

/** @deprecated */
export type SelectProps<Payload extends string | number | null | undefined> =
  Select.Props<Payload>;

export namespace Select {
  export interface Option<Payload extends string | number | null | undefined> {
    label?: string | undefined;
    value: Payload;
    icon?: Icon.Prop | undefined;
  }

  export type Options<Payload extends string | number | null | undefined> =
    Array<Option<Payload>>;

  export type OptionItem<Payload extends string | number> =
    | Option<Payload>
    | false
    | undefined
    | null;

  export interface Props<Payload extends string | number | null | undefined>
    // TODO: Reenable extending React Aria Components props when the optional
    // props missing undefined issue is fixed.
    // extends  Omit<React.ComponentProps<typeof RASelect>, "selectedKey">
    extends FieldCnProps,
      Omit<InputCnProps, "icon">,
      Errors.WithProp {
    label: Label.Prop;
    button?: ComponentProp<ButtonProps> | undefined;
    icon?: IconProp | undefined;
    description?: string | undefined;
    placeholder?: string | undefined;
    options: Array<OptionItem<Payload & {}>>;
    italic?: boolean;
    mono?: boolean;
    isDisabled?: boolean | undefined;
    value?: Payload | null | undefined;
    onChange?: (key: Payload | null) => void;
  }
}

export function Select<Payload extends string | number>(
  props: Select.Props<Payload>,
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
    placeholder,
    value,
    onChange,
    ...restProps
  } = props;

  return (
    <RASelect
      className={fieldCn({ size })}
      {...restProps}
      {...labelA11yProps(label)}
      placeholder={placeholder || ""}
      value={value ?? null}
      onChange={(value) => onChange?.(value as Payload)}
    >
      {label && <Label {...labelProps(label)} size={size} />}

      {componentPropResolve(button, ({ props, children }) => (
        <Button
          {...props}
          className={inputCn({ size, italic, mono })}
          isDisabled={!!isDisabled}
        >
          <SelectValue>
            {({ selectedText, isPlaceholder }) => (
              <div className={selectButtonContentCn({ size, isPlaceholder })}>
                {icon && <Icon id={icon} size={size} color="detail" />}
                <span>{isPlaceholder ? placeholder : selectedText}</span>
              </div>
            )}
          </SelectValue>

          <Icon
            id={iconRegularChevronDown}
            size={translateSize(size, 1)}
            color="support"
            aria-hidden
          />
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
                            id={iconRegularCheck}
                            size="xsmall"
                            color="support"
                          />
                        )}
                      </div>
                      {option.icon && <Icon size="small" id={option.icon} />}
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

export const selectButtonContentCn = cnss<{
  size: Size;
  isPlaceholder: boolean;
}>()
  .base("flex items-center whitespace-nowrap truncate")
  .size("medium", {
    xsmall: "gap-1",
    small: "gap-1",
    medium: "gap-2",
    large: "gap-2",
  })
  .isPlaceholder(false, {
    true: "text-input-placeholder italic",
  });

export const selectListCn = cnss<{ size: Size }>()
  .base("min-w-[--trigger-width] spacing-y-1")
  .size("medium", {
    xsmall: "p-1",
    small: "p-1",
    medium: "p-2",
    large: "p-2",
  });

export const selectItemCn = cnss<{
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
