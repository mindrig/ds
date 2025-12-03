import { cn } from "crab";
import { Dir, Size } from "./props";

export namespace Spacing {
  export type Align = boolean | "start" | "center" | "end" | "stretch";

  export type Justify =
    | boolean
    | "start"
    | "center"
    | "end"
    | "between"
    | "around";
}

export const spacingCn = cn<{
  dir: Dir;
  size: Size;
  align: Spacing.Align;
  justify: Spacing.Justify;
}>()
  .base("flex")
  .dir("x", {
    y: "flex-col",
  })
  .size("medium", {
    xsmall: "gap-1",
    small: "gap-2",
    medium: "gap-3",
    large: "gap-4",
    xlarge: "gap-6",
  })
  .align(false, {
    true: "items-center",
    start: "items-start",
    center: "items-center",
    end: "items-end",
    stretch: "items-stretch",
  })
  .justify(false, {
    true: "justify-center",
    start: "justify-start",
    center: "justify-center",
    end: "justify-end",
    between: "justify-between",
    around: "justify-around",
  });
