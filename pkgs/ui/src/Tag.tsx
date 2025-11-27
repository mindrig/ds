"use client";

import { Size } from "@wrkspc/theme";
import { cn } from "crab";
import React, { PropsWithChildren } from "react";

export interface TagProps
  extends Omit<React.HTMLProps<HTMLDivElement>, "color" | "size">,
    cn.Props<typeof tagCn> {}

export function Tag(props: PropsWithChildren<TagProps>) {
  const { size, color, className, ...restProps } = props;
  return (
    <span className={tagCn({ size, color, className })} {...restProps}>
      <span>{props.children}</span>
    </span>
  );
}

export type TagColor =
  | "default"
  | "secondary"
  | "highlight"
  | "accent"
  | "success"
  | "error";

export const tagCn = cn<{ size: Size; color: TagColor }>()
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
    xsmall: "px-[0.4rem] h-[1rem] text-xs",
    small: "px-2 h-4 text-sm",
    medium: "px-3 h-5",
    large: "",
  });
