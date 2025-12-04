import { never } from "alwaysly";
import { cnss } from "cnss";
import { Dir, Size } from "./props";

export namespace Padding {
  export type Prop =
    | boolean
    | Dir
    | Size
    | PropYX
    | PropTopXBottom
    | PropTopRightBottomLeft
    | PropObject;

  export type PropSize = Size | false;

  export type PropYX = [y: PropSize, x: PropSize];

  export type PropTopXBottom = [top: PropSize, x: PropSize, bottom: PropSize];

  export type PropTopRightBottomLeft = [
    top: PropSize,
    right: PropSize,
    bottom: PropSize,
    left: PropSize,
  ];

  export interface PropObject {
    top?: PropSize;
    right?: PropSize;
    bottom?: PropSize;
    left?: PropSize;
  }
}

export function resolvePadding(
  padding: Padding.Prop | undefined | null | 0 | typeof NaN | "" | false,
  size?: Size,
): Partial<paddingCn.Props> {
  switch (padding) {
    case "x":
      return { x: size || "medium" };
    case "y":
      return { y: size || "medium" };
    case true:
      return {
        x: size || "medium",
        y: size || "medium",
      };
    case false:
      return {};
  }

  if (!padding || typeof padding === "number") return {};

  if (typeof padding === "string")
    return {
      top: padding,
      right: padding,
      bottom: padding,
      left: padding,
    };

  if (!Array.isArray(padding)) return padding;

  switch (padding.length) {
    case 2:
      return {
        top: padding[0],
        bottom: padding[0],
        left: padding[1],
        right: padding[1],
      };

    case 3:
      return {
        top: padding[0],
        left: padding[1],
        right: padding[1],
        bottom: padding[2],
      };

    case 4:
      return {
        top: padding[0],
        right: padding[1],
        bottom: padding[2],
        left: padding[3],
      };

    default:
      never(padding);
  }
}

export namespace paddingCn {
  export type Props = {
    x: Padding.PropSize;
    y: Padding.PropSize;
    top: Padding.PropSize;
    right: Padding.PropSize;
    bottom: Padding.PropSize;
    left: Padding.PropSize;
  };
}

export const paddingCn = cnss<paddingCn.Props>()
  .x(false, {
    xsmall: "px-1",
    small: "px-2",
    medium: "px-4",
    large: "px-6",
  })
  .y(false, {
    xsmall: "py-1",
    small: "py-2",
    medium: "py-4",
    large: "py-6",
  })
  .left(false, {
    xsmall: "pl-1",
    small: "pl-2",
    medium: "pl-4",
    large: "pl-6",
  })
  .right(false, {
    xsmall: "pr-1",
    small: "pr-2",
    medium: "pr-4",
    large: "pr-6",
  })
  .top(false, {
    xsmall: "pt-1",
    small: "pt-2",
    medium: "pt-4",
    large: "pt-6",
  })
  .bottom(false, {
    xsmall: "pb-1",
    small: "pb-2",
    medium: "pb-4",
    large: "pb-6",
  });
