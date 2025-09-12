"use client";

import { Size, textCn } from "@wrkspc/theme";
import { cn } from "crab";
import React from "react";
import { Label as RALabel } from "react-aria-components";

export type LabelValue =
  | string
  | LabelObjectString
  | LabelObjectReactNode
  | LabelAccessibility;

export interface LabelAccessibility {
  a11y: string;
}

export interface LabelObjectString extends LabelObjectBase {
  label: string;
}

export interface LabelObjectReactNode
  extends LabelObjectBase,
    LabelAccessibility {
  label: React.ReactNode;
}

export interface LabelObjectBase {
  actions?: React.ReactNode | undefined;
}

export interface LabelPropsBase {
  actions?: React.ReactNode;
}

export interface LabelProps extends LabelPropsBase, cn.Props<typeof labelCng> {}

export function Label(props: React.PropsWithChildren<LabelProps>) {
  const { actions, children } = props;

  if (children === null) return null;

  const labelCn = labelCng(props);

  return (
    <div className="flex justify-between items-center">
      <RALabel className={labelCn.label}>
        <div className={labelCn.content}>{children}</div>
      </RALabel>

      <div className="inline-flex gap-2">{actions}</div>
    </div>
  );
}

export function labelProps(
  label: LabelValue | undefined,
): React.PropsWithChildren<LabelProps> {
  if (label && typeof label === "object" && "label" in label)
    return {
      children: label.label,
      actions: label.actions,
    };

  if (label && typeof label === "object" && "a11y" in label)
    return {
      children: null,
    };

  return {
    children: label,
  };
}

export function labelA11yProps(label: LabelValue) {
  return {
    "aria-label":
      typeof label == "object"
        ? "a11y" in label
          ? label.a11y
          : label.label
        : label,
  };
}

export const labelCng = cn<{ size: Size }>().group(($) => ({
  label: $.base(
    "leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
  ).size("medium", {
    xsmall: "gap-2",
    small: "gap-2",
    medium: "gap-3",
    large: "gap-3",
  }),

  content: $()
    .base(textCn({ color: "support", role: "label" }))
    .size("medium", {
      xsmall: "text-xs",
      small: "text-xs",
      medium: "text-sm",
      large: "",
    }),
}));
