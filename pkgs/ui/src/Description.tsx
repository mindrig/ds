"use client";

import { descriptionTextCn } from "@wrkspc/theme";
import { cn } from "crab";
import React, { forwardRef } from "react";
import { Text } from "react-aria-components";

export const Description = forwardRef<
  HTMLInputElement,
  React.PropsWithChildren<cn.Props<typeof descriptionTextCn>>
>(function Description(props, ref) {
  return (
    <Text slot="description" className={descriptionTextCn(props)}>
      {props.children}
    </Text>
  );
});
