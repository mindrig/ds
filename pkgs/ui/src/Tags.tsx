"use client";

import { Size } from "@wrkspc/theme";
import { cn } from "crab";
import React, { PropsWithChildren } from "react";

export interface TagsProps
  extends Omit<React.HTMLProps<HTMLDivElement>, "color" | "size">,
    cn.Props<typeof tagsCn> {}

export function Tags(props: PropsWithChildren<TagsProps>) {
  const { size, className, ...restProps } = props;
  return (
    <div className={tagsCn({ size, className })} {...restProps}>
      {props.children}
    </div>
  );
}

const tagsCn = cn<{ size: Size }>().base("flex").size("medium", {
  xsmall: "gap-1",
  small: "gap-1",
});
