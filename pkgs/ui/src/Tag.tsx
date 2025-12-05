"use client";

import { Size } from "@wrkspc/theme";
import { cnss } from "cnss";
import React, { PropsWithChildren } from "react";

/** @deprecated */
export type TagProps = Tag.Props;

export namespace Tag {
  export interface Props
    extends Omit<React.HTMLProps<HTMLDivElement>, "color" | "size">,
      cnss.Props<typeof tagCn> {}

  export type Color =
    | "default"
    | "secondary"
    | "highlight"
    | "accent"
    | "success"
    | "error";
}

export function Tag(props: PropsWithChildren<Tag.Props>) {
  const { size, color, className, ...restProps } = props;
  return (
    <span className={tagCn({ size, color, className })} {...restProps}>
      <span>{props.children}</span>
    </span>
  );
}

/** @deprecated */
export type TagColor = Tag.Color;

export const tagCn = cnss<{ size: Size; color: Tag.Color }>()
  .base("leading-none rounded-full whitespace-nowrap inline-flex items-center")
  .color("default", {
    default: "text-tag-ink bg-tag-canvas",
    secondary: "text-tag-ink-secondary bg-tag-canvas-secondary",
    highlight: "bg-amber-100 text-neutral-900/80",
    accent: "bg-purple-100 text-neutral-900/80",
    success: "bg-green-100 text-green-900/80",
    error: "bg-red-100 text-red-900/80",
  })
  .size("medium", {
    xsmall: "px-[0.2rem] h-[0.9rem] text-xs",
    small: "px-2 h-4 text-sm",
    medium: "px-3 h-5",
    large: "",
  });
