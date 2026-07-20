"use client";

import { Size } from "@wrkspc/theme";
import { cnss } from "cnss";
import React, { PropsWithChildren } from "react";

export interface TagsProps
  extends
    Omit<React.HTMLProps<HTMLDivElement>, "color" | "size">,
    cnss.Props<typeof tagsCn> {}

export function Tags(props: PropsWithChildren<TagsProps>) {
  const { size, className, ...wrapperProps } = props;
  return (
    <div className={tagsCn({ size, className })} {...wrapperProps}>
      {props.children}
    </div>
  );
}

const tagsCn = cnss<{ size: Size }>().base("flex").size("medium", {
  xsmall: "gap-1",
  small: "gap-1",
});
