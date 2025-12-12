import { Size } from "@wrkspc/theme";
import { cnss } from "cnss";

export const selectButtonContentCn = cnss<{
  size: Size;
  isPlaceholder: boolean;
}>()
  .base("flex items-center")
  .size("medium", {
    xsmall: "gap-1",
    small: "gap-1",
    medium: "gap-2",
    large: "gap-2",
  })
  .isPlaceholder(false, {
    true: "text-input-placeholder italic",
  });

export const selectButtonContentTextCn = cnss<{
  isPlaceholder: boolean;
}>()
  .base("inline whitespace-nowrap truncate")
  .isPlaceholder(false, {
    true: "text-input-placeholder italic",
  });

export const selectListCn = cnss<{ size: Size }>()
  .base("min-w-[--trigger-width] spacing-y-1")
  .size("medium", {
    xsmall: "p-1",
    small: "p-1",
    medium: "p-2",
    large: "p-2",
  });

export const selectItemCn = cnss<{
  size: Size;
  isSelected: boolean;
  mono: boolean;
}>()
  .base(
    "max-w-70 rounded-option whitespace-nowrap truncate hover:bg-option-canvas-hover hover:text-option-ink-hover cursor-pointer select-none",
  )
  .size("medium", {
    xsmall: "py-1 px-1 text-xs",
    small: "py-1 px-2 text-sm",
    medium: "py-1 px-3",
    large: "py-1 px-3",
  })
  .isSelected(false, {
    true: "text-option-ink-selected bg-option-canvas-selected",
  })
  .mono(false, {
    true: "font-mono",
  });

export const selectSectionCng = cnss<{
  size: Size;
}>().group(($) => ({
  wrapper: $.base("border-b border-divider last:border-0 last:mb-0").size(
    "medium",
    {
      xsmall: "mb-1 pb-1",
      small: "mb-2 pb-2",
    },
  ),

  header: $().size("medium", {
    xsmall: "px-1 py-0.5",
  }),
}));
