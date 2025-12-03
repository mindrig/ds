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
  gap: boolean;
}>()
  .base("flex")
  .dir("x", {
    y: "flex-col",
  })
  .gap(true)
  .size("medium", {
    xsmall: { gap: { true: "gap-1" } },
    small: { gap: { true: "gap-2" } },
    medium: { gap: { true: "gap-3" } },
    large: { gap: { true: "gap-4" } },
    xlarge: { gap: { true: "gap-6" } },
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
