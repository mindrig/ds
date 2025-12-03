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
  }
}

export function Block(props: React.PropsWithChildren<Block.Props>) {
  const { size, children } = props;
  const pad = props.pad === true ? size : props.pad;

  return (
    <div
      className={cn(
        paddingCn(resolvePadding(pad)),
        spacingCn(props),
        blockCn(props),
      )}
    >
      {children}
    </div>
  );
}

export const blockCn = cn<{ divided: boolean; dir: Dir }>()
  .base("")
  .dir("x")
  .divided(false, {
    true: {
      dir: {
        x: "divide-x",
        y: "divide-y",
      },
    },
  });
