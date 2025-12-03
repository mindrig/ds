import { never } from "alwaysly";
import { cn } from "crab";
import { Size } from "./props";

export namespace Padding {
  export interface Defined {
    top: Size;
    right: Size;
    bottom: Size;
    left: Size;
  }

  export type Prop =
    | Size
    | PropYX
    | PropTopXBottom
    | PropTopRightBottomLeft
    | PropObject;

  export type PropYX = [y: Size, x: Size];

  export type PropTopXBottom = [top: Size, x: Size, bottom: Size];

  export type PropTopRightBottomLeft = [
    top: Size,
    right: Size,
    bottom: Size,
    left: Size,
  ];

  export interface PropObject {
    top?: Size | undefined;
    right?: Size | undefined;
    bottom?: Size | undefined;
    left?: Size | undefined;
  }

  export interface PropDefined {
    top: Size;
    right: Size;
    bottom: Size;
    left: Size;
  }
}

export function resolvePadding(
  padding: Padding.Prop | undefined | null | 0 | typeof NaN | "" | false,
): Padding.PropObject {
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

export const paddingCn = cn<{
  x: Size;
  y: Size;
  top: Size;
  right: Size;
  bottom: Size;
  left: Size;
}>()
  .x("medium", {
    xsmall: "px-1",
    small: "px-2",
    medium: "px-4",
    large: "px-6",
  })
  .y("medium", {
    xsmall: "py-1",
    small: "py-2",
    medium: "py-4",
    large: "py-6",
  })
  .left("medium", {
    xsmall: "pl-1",
    small: "pl-2",
    medium: "pl-4",
    large: "pl-6",
  })
  .right("medium", {
    xsmall: "pr-1",
    small: "pr-2",
    medium: "pr-4",
    large: "pr-6",
  })
  .top("medium", {
    xsmall: "pt-1",
    small: "pt-2",
    medium: "pt-4",
    large: "pt-6",
  })
  .bottom("medium", {
    xsmall: "pb-1",
    small: "pb-2",
    medium: "pb-4",
    large: "pb-6",
  });
