import { never } from "alwaysly";
import { cnss } from "cnss";
import { Dir, Side } from "./props";

export namespace Border {
  export type Prop =
    | boolean
    | Dir
    | Side
    | PropYX
    | PropTopXBottom
    | PropTopRightBottomLeft
    | PropObject;

  export type PropYX = [y: boolean, x: boolean];

  export type PropTopXBottom = [top: boolean, x: boolean, bottom: boolean];

  export type PropTopRightBottomLeft = [
    top: boolean,
    right: boolean,
    bottom: boolean,
    left: boolean,
  ];

  export interface PropObject {
    top?: boolean;
    right?: boolean;
    bottom?: boolean;
    left?: boolean;
  }
}

export function resolveBorder(
  border: Border.Prop | undefined | null | 0 | typeof NaN | "" | false,
): Partial<borderCn.Props> {
  switch (border) {
    case "x":
      return { x: true };
    case "y":
      return { y: true };
    case "top":
      return { top: true };
    case "right":
      return { right: true };
    case "bottom":
      return { bottom: true };
    case "left":
      return { left: true };
    case true:
      return {
        x: true,
        y: true,
      };
    case false:
      return {};
  }

  if (!border || typeof border === "number") return {};

  if (!Array.isArray(border)) return border;

  switch (border.length) {
    case 2:
      return {
        top: border[0],
        bottom: border[0],
        left: border[1],
        right: border[1],
      };

    case 3:
      return {
        top: border[0],
        left: border[1],
        right: border[1],
        bottom: border[2],
      };

    case 4:
      return {
        top: border[0],
        right: border[1],
        bottom: border[2],
        left: border[3],
      };

    default:
      never(border);
  }
}

export namespace borderCn {
  export type Props = {
    x: boolean;
    y: boolean;
    top: boolean;
    right: boolean;
    bottom: boolean;
    left: boolean;
  };
}

export const borderCn = cnss<borderCn.Props>()
  .x(false, {
    true: "border-divider border-x",
  })
  .y(false, {
    true: "border-divider border-y",
  })
  .left(false, {
    true: "border-divider border-l",
  })
  .right(false, {
    true: "border-divider border-r",
  })
  .top(false, {
    true: "border-dividerborder-t",
  })
  .bottom(false, {
    true: "border-divider border-b",
  });
