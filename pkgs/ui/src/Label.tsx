"use client";

import { Icon } from "@wrkspc/icons";
import { Size, textCn, translateSize } from "@wrkspc/theme";
import { cnss } from "cnss";
import React from "react";
import { Label as RALabel } from "react-aria-components";

/** @deprecated */
export type LabelValue = Label.Prop;

/** @deprecated */
export type LabelProps = Label.Props;

export namespace Label {
  export type Prop = string | PropObjectString | PropObjectReactNode | PropA11y;

  export interface PropA11y {
    a11y: string;
  }

  export interface PropObjectString extends PropObjectBase {
    label: string;
  }

  export interface PropObjectReactNode extends PropObjectBase, PropA11y {
    label: React.ReactNode;
  }

  export interface PropObjectBase {
    icon?: Icon.Prop | undefined;
    actions?: React.ReactNode | undefined;
  }

  export interface PropsBase {
    actions?: React.ReactNode;
  }

  export interface Props extends PropsBase, cnss.Props<typeof labelCng> {
    icon?: Icon.Prop | undefined;
  }
}

export function Label(props: React.PropsWithChildren<LabelProps>) {
  const { icon, size, actions, children } = props;

  if (children === null) return null;

  const cns = labelCng(props);

  return (
    <div className="flex justify-between items-center">
      <RALabel className={cnss(cns.block, cns.label)}>
        {icon && <Icon id={icon} size={translateSize(size, -1)} />}

        <span className={cns.content}>{children}</span>
      </RALabel>

      <div className="inline-flex gap-2">{actions}</div>
    </div>
  );
}

export function labelProps(
  label: Label.Prop | undefined,
  propsOverrides?: Partial<Label.Props>,
): React.PropsWithChildren<Label.Props> {
  if (label && typeof label === "object" && "label" in label)
    return {
      icon: label.icon,
      children: label.label,
      actions: label.actions,
      ...propsOverrides,
    };

  if (label && typeof label === "object" && "a11y" in label)
    return {
      children: null,
      ...propsOverrides,
    };

  return {
    children: label,
    ...propsOverrides,
  };
}

export function labelA11yProps(
  prop: Label.Prop,
  propsOverrides?: Partial<Label.Props>,
) {
  return {
    "aria-label": labelA11yAttr(prop),
    ...propsOverrides,
  };
}

export function labelA11yAttr(prop: Label.Prop) {
  return typeof prop == "object"
    ? "a11y" in prop
      ? prop.a11y
      : prop.label
    : prop;
}

export const labelCng = cnss().group(($) => ({
  block: $<{ size: Size }>().base("flex items-center").size("medium", {
    xsmall: "gap-1",
    small: "gap-1",
    medium: "gap-2",
    large: "gap-3",
  }),

  label: $.base(
    "leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
  ),

  content: $<{ size: Size }>()
    .base(textCn({ color: "support", role: "label", capsize: true }))
    .size("medium", {
      xsmall: "text-xs",
      small: "text-xs",
      medium: "text-sm",
      large: "",
    }),
}));
