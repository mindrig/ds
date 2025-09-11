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
      {props.children}
    </span>
  );
}

export type TagColor = "default" | "highlight" | "accent" | "success" | "error";

export const tagCn = cn<{ size: Size; color: TagColor }>()
  .base("leading-none rounded-full whitespace-nowrap inline-flex items-center")
  .color("default", {
    default: "bg-gray-200 text-gray-600",
    highlight: "bg-amber-100 text-neutral-900/80",
    accent: "bg-purple-100 text-neutral-900/80",
    success: "bg-green-100 text-green-900/80",
    error: "bg-red-100 text-red-900/80",
  })
  .size("medium", {
    xsmall: "px-1 h-3 text-xs",
    small: "px-2 h-4 text-sm",
    medium: "px-3 h-5",
    large: "",
  });
