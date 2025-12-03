"use client";

import { descriptionTextCn } from "@wrkspc/theme";
import { cnss } from "cnss";
import React, { forwardRef } from "react";
import { Text } from "react-aria-components";

export const Description = forwardRef<
  HTMLInputElement,
  React.PropsWithChildren<cnss.Props<typeof descriptionTextCn>>
>(function Description(props, ref) {
  return (
    <Text slot="description" className={descriptionTextCn(props)}>
      {props.children}
    </Text>
  );
});
