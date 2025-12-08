import {
  Background,
  Border,
  borderCn,
  Dir,
  Padding,
  paddingCn,
  resolveBorder,
  resolvePadding,
  spacingCn,
} from "@wrkspc/theme";
import { cnss } from "cnss";
import React from "react";

export namespace Block {
  export interface Props
    extends cnss.Props<typeof blockCn>,
      cnss.Props<typeof spacingCn> {
    pad?: Padding.Prop | undefined;
    border?: Border.Prop | undefined;
  }

  export type Empty = "hide" | "preserve";
}

export function Block(props: React.PropsWithChildren<Block.Props>) {
  const { size, pad, border, children } = props;

  return (
    <div
      className={cnss(
        pad && paddingCn(resolvePadding(pad, size)),
        border && borderCn(resolveBorder(border)),
        spacingCn(props),
        blockCn(props),
      )}
    >
      {children}
    </div>
  );
}

export const blockCn = cnss<{
  divided: boolean;
  dir: Dir;
  grow: boolean;
  background: Background | boolean;
  empty: Block.Empty;
}>()
  .base("")
  .dir("x")
  .divided(false, {
    true: [
      "divide-divider",
      {
        dir: {
          x: "divide-x",
          y: "divide-y",
        },
      },
    ],
  })
  .grow(false, { true: "grow" })
  .background(false, {
    true: "bg-canvas",
    primary: "bg-canvas",
    context: "bg-canvas-context",
    header: "bg-canvas-header",
    hover: "bg-canvas-hover",
    selected: "bg-canvas-selected",
  })
  .empty("hide", {
    hide: "empty:hidden",
  });
