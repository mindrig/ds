"use client";

import { Icon } from "@wrkspc/icons";
import iconRegularChevronDown from "@wrkspc/icons/svg/regular/chevron-down.js";
import { ComponentProp, componentPropResolve } from "@wrkspc/props";
import { translateSize } from "@wrkspc/theme";
import { ReactNode } from "react";
import {
  Button,
  ButtonProps,
  ListBox,
  Popover,
  Select as RASelect,
  SelectValue,
} from "react-aria-components";
import { fieldCn, FieldCnProps, inputCn, InputCnProps } from "../classNames";
import { Description } from "../Description";
import { Errors, renderErrors } from "../Errors.js";
import { Label, labelA11yProps, labelProps } from "../Label";
import {
  selectButtonContentCn,
  selectButtonContentTextCn,
  selectListCn,
} from "./cns";
import { SelectOptions } from "./Options";

/** @deprecated */
export type SelectOption<Payload extends string | number> =
  Select.Option<Payload>;

/** @deprecated */
export type SelectOptions<Payload extends string | number> =
  Select.OptionItems<Payload>;

/** @deprecated */
export type SelectOptionItem<Payload extends string | number> =
  Select.OptionItemNested<Payload>;

/** @deprecated */
export type SelectProps<Payload extends string | number | null | undefined> =
  Select.Props<Payload>;

export namespace Select {
  export interface Option<Payload extends string | number | null | undefined> {
    type?: "option" | undefined;
    label?: Label.Prop | undefined;
    value: Payload;
    icon?: Icon.Prop | undefined;
  }

  export interface OptionHeader {
    type: "header";
    label: ReactNode | undefined;
    icon?: Icon.Prop | undefined;
  }

  export interface Section {
    type: "section";
    label: Label.Prop | undefined;
    icon?: Icon.Prop | undefined;
    options: OptionItemsNested<Value>;
    flatten?: boolean | undefined;
  }

  export type Value = string | number | null | undefined;

  export type OptionItems<Payload extends Value> = Array<OptionItem<Payload>>;

  export type OptionItem<Payload extends Value> =
    | OptionItemNested<Payload>
    | Section;

  export type OptionItemsNested<Payload extends Value> = Array<
    OptionItemNested<Payload>
  >;

  export type OptionItemNested<Payload extends Value> =
    | Option<Payload>
    | false
    | undefined
    | null;

  export interface Props<Payload extends Value>
    // TODO: Reenable extending React Aria Components props when the optional
    // props missing undefined issue is fixed.
    // extends  Omit<React.ComponentProps<typeof RASelect>, "selectedKey">
    extends FieldCnProps,
      Omit<InputCnProps, "icon">,
      Errors.WithProp {
    label: Label.Prop;
    button?: ComponentProp<ButtonProps> | undefined;
    icon?: Icon.Prop | undefined;
    description?: string | undefined;
    placeholder?: string | undefined;
    options: OptionItems<Payload & {}>;
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
          <SelectValue className="w-stretch text-left">
            {({ selectedText, isPlaceholder }) => (
              <div className={selectButtonContentCn({ size, isPlaceholder })}>
                {icon && <Icon id={icon} size={size} color="detail" />}
                <span className={selectButtonContentTextCn({ isPlaceholder })}>
                  {isPlaceholder ? placeholder : selectedText}
                </span>
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
          <SelectOptions {...{ options, size, mono }} />
        </ListBox>
      </Popover>

      {renderErrors({ errors, size }) ||
        (description && <Description size={size}>{description}</Description>)}
    </RASelect>
  );
}
