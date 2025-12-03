import {
  Dir,
  Padding,
  paddingCn,
  resolvePadding,
  spacingCn,
} from "@wrkspc/theme";
import { cn } from "crab";
import React from "react";

export namespace Block {
  export interface Props
    extends cn.Props<typeof blockCn>,
      cn.Props<typeof spacingCn> {
    pad?: Padding.Prop | true | undefined;
    border?: Border | undefined;
  }

  export type Border = boolean | "top" | "right" | "bottom" | "left";
}

export function Block(props: React.PropsWithChildren<Block.Props>) {
  const { size, children } = props;
  const pad = props.pad === true ? size : props.pad;

  debugger;
  const cns = cn(
    pad && paddingCn(resolvePadding(pad)),
    spacingCn(props),
    blockCn(props),
  );

  return (
    <div
      className={cn(
        pad && paddingCn(resolvePadding(pad)),
        spacingCn(props),
        blockCn(props),
      )}
    >
      {children}
    </div>
  );
}

export const blockCn = cn<{
  divided: boolean;
  dir: Dir;
  border: Block.Border;
  grow: boolean;
}>()
  .base("")
  .dir("x")
  .border(false, {
    true: "border border-divider",
    top: "border-t border-divider",
    right: "border-r border-divider",
    bottom: "border-b border-divider",
    left: "border-l border-divider",
  })
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
  .grow(false, { true: "grow" });
