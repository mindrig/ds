import { cn } from "crab";
import type { Color, Size } from "./props";

export type TextRole =
  | "body"
  | "header"
  | "subheader"
  | "label"
  | "control"
  | "content";

export type TextFlow = "normal" | "textarea";

export const bodyCn = (className?: string) =>
  cn("text-gray-950 font-sans font-normal leading-normal", className);

export const textCn = cn<{
  color: Color;
  size: Size;
  role: TextRole;
  inverse: boolean;
  align: boolean | "left" | "center" | "right";
  uppercase: boolean;
  italic: boolean;
  mono: boolean;
  bold: boolean;
  flow: TextFlow;
  capsize: boolean;
}>()
  .capsize(false, { true: "capsize" })
  .color("main", {
    // It's text-gray-950, but we set it on body, so we can override
    main: ["", [{ inverse: true }, "text-white"]],
    support: ["text-gray-600", [{ inverse: true }, "text-slate-400"]],
    detail: "text-gray-500",
  })
  .size("medium")
  .role("body", {
    // It's font-normal leading-normal, but we set it on body, so we can override
    body: {
      size: {
        xsmall: "text-xs",
        small: "text-sm",
        medium: "text-base",
        large: "md:text-lg",
        xlarge: "text-lg md:text-xl",
      },
    },
    content: [
      "max-w-none",
      {
        size: {
          xsmall: "prose-xs",
          small: "prose-sm",
          medium: "prose",
          large: "prose-lg",
          xlarge: "prose-lg md:prose-xl",
        },
      },
    ],
    header: [
      "font-bold leading-[1] text-balance",
      {
        size: {
          xsmall: "text-lg",
          small: "text-xl",
          medium: "text-xl md:text-2xl",
          large: "text-2xl md:text-3xl",
          xlarge: "text-3xl md:text-5xl",
        },
      },
    ],
    subheader: [
      "font-medium leading-[1.2] text-balance",
      {
        size: {
          xsmall: "text-sm",
          small: "text-sm",
          medium: "text-lg",
          large: "text-xl",
          xlarge: "text-xl md:text-3xl",
        },
      },
    ],
    label: [
      "font-semibold leading-none",
      {
        size: {
          xsmall: "text-xs",
          small: "text-xs",
          medium: "text-sm",
        },
      },
    ],
    control: [
      "font-medium leading-none",
      {
        size: {
          xsmall: "text-xs",
          small: "text-xs",
          medium: "text-sm",
        },
      },
    ],
  })
  .inverse(false)
  .align(false, {
    true: "text-center",
    center: "text-center",
    left: "text-left",
    right: "text-right",
  })
  .uppercase(false, {
    true: "uppercase",
  })
  .italic(false, {
    true: "italic",
  })
  .mono(false, {
    true: "font-mono",
  })
  .bold(false, {
    true: "font-bold",
  })
  .flow("normal", {
    textarea: "whitespace-pre-wrap break-words",
  });

export const descriptionTextCn = cn<{
  size: Size;
}>()
  .base(textCn({ color: "support" }))
  .size("medium", {
    // TODO: Find a way to reuse scale such this one, which repeats for label and control roles in textCn
    xsmall: "text-xs",
    small: "text-xs",
    medium: "text-sm",
  });
