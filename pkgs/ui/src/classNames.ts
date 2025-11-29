import { Size } from "@wrkspc/theme";
import { cn } from "crab";

export type ControlColor = "primary" | "secondary";

// TODO: Fix interface usage in Crab
export type ControlVariants = {
  size: Size;
  color: ControlColor;
};

export const fieldCn = cn<{
  size: Size;
}>()
  .base("flex flex-col w-full")
  .size("medium", {
    xsmall: "gap-1",
    small: "gap-1",
    medium: "gap-2",
    large: "gap-3",
  });

export type FieldCnProps = cn.Props<typeof fieldCn>;

export const inputIconCn = cn<{
  size: Size;
}>()
  .base("absolute top-0 bottom-0 flex items-center pointer-events-none")
  .size("medium", {
    xsmall: "left-2",
    small: "left-2",
    medium: "left-2",
    large: "left-2",
  });

export const inputCn = cn<{
  size: Size;
  prefix: boolean;
  mono: boolean;
  loading: boolean;
  italic: boolean;
  icon: boolean;
  content: InputContent;
}>()
  .base(
    "flex justify-between items-center w-full placeholder:text-input-placeholder border border-input-border bg-input-canvas ring-offset-background transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 shadow-input",
  )
  .size("medium", {
    xsmall: "h-6 rounded-input-sm p-1 text-sm",
    small: "h-7 rounded-input-sm px-2 py-1 text-sm",
    medium: "h-10 rounded-input px-3 py-2 text-sm",
    large: "h-11 rounded-input px-8",
  })
  .prefix(false, {
    true: "rounded-l-none",
  })
  .mono(false, {
    true: "font-mono",
  })
  .loading(false, {
    true: "animate-pulse",
  })
  .italic(false, {
    true: "italic",
  })
  .icon(false, {
    true: {
      size: {
        xsmall: "pl-7",
        small: "pl-7",
        medium: "pl-8",
        large: "pl-9",
      },
    },
  })
  .content("text", {
    variable: "font-mono font-semibold color-cyan-600",
  });

export type InputContent = "text" | "variable";

export type InputCnProps = cn.Props<typeof inputCn>;
