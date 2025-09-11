import { type Size } from "@wrkspc/theme";
import { cn } from "crab";
import { type HTMLProps } from "react";
import { type IconId } from "..";
import "./styles.css";

export interface IconProps
  extends Omit<HTMLProps<HTMLDivElement>, "id" | "color" | "size">,
    cn.Props<typeof iconBaseCn>,
    cn.Props<typeof iconMaskCn> {
  id: IconProp;
}

export interface IconBaseProps
  extends cn.Props<typeof iconBaseCn>,
    cn.Props<typeof iconMaskCn> {
  id: IconId;
  className?: string | undefined;
}

export type IconProp = IconId | IconBaseProps;

export function Icon(props: IconProps) {
  // This allows passing either the icon id or an object with the id and props.
  // It allows to wrap the component:
  //   <Icon id={props.icon} size="xlarge" color="support" />
  // Where `props.icon` is `IconProp`. Whatever is defined will override
  // the explicitly size and color props.
  const [id, iconProps] =
    typeof props.id === "string"
      ? [props.id, props]
      : [props.id.id, { ...props, ...props.id }];

  return (
    <div
      className={cn(iconBaseCn(iconProps), iconMaskCn(iconProps))}
      style={{
        mask: `url(https://assets.mindcontrol.studio/icons/${id}) no-repeat center / contain`,
      }}
    />
  );
}

export type IconSize = Size | "fill";

export type IconColor =
  | "main"
  | "support"
  | "detail"
  | "brand"
  | "danger"
  | "success";

export const iconMaskCn = cn<{
  color: IconColor;
  inverse: boolean;
  trigger: boolean;
}>()
  .color("main", {
    main: [
      "bg-[currentColor]",
      [{ inverse: false, trigger: true }, "hover:bg-gray-900"],
      [{ inverse: true, trigger: false }, "bg-white"],
      [{ inverse: true, trigger: true }, "hover:bg-gray-100"],
    ],
    support: [
      [{ inverse: false }, "bg-gray-500"],
      [{ inverse: false, trigger: true }, "hover:bg-gray-800"],
      [{ inverse: true, trigger: false }, "bg-gray-50"],
      [{ inverse: true, trigger: true }, "hover:bg-gray-100"],
    ],
    detail: ["bg-gray-400", { trigger: { true: "hover:bg-gray-600" } }],
    brand: ["bg-lime-500" /* TODO: */],
    danger: ["bg-red-500" /* TODO: */],
    success: ["bg-green-500" /* TODO: */],
  })
  .trigger(false)
  .inverse(false);

export const iconInlineCn = cn<{
  color: IconColor;
  inverse: boolean;
  trigger: boolean;
}>()
  .color("main", {
    main: [
      "text-[currentColor]",
      [{ inverse: false, trigger: true }, "hover:text-gray-900"],
      [{ inverse: true, trigger: false }, "text-white"],
      [{ inverse: true, trigger: true }, "hover:text-gray-100"],
    ],
    support: [
      [{ inverse: false }, "text-gray-500"],
      [{ inverse: false, trigger: true }, "hover:text-gray-800"],
      [{ inverse: true, trigger: false }, "text-gray-50"],
      [{ inverse: true, trigger: true }, "hover:text-gray-100"],
    ],
    detail: ["text-gray-400", { trigger: { true: "hover:text-gray-600" } }],
    brand: ["text-lime-500" /* TODO: */],
    danger: ["text-red-500" /* TODO: */],
    success: ["text-green-500" /* TODO: */],
  })
  .trigger(false)
  .inverse(false);

export const iconBaseCn = cn<{
  size: IconSize;
}>().size("medium", {
  xsmall: "size-3",
  small: "size-4",
  medium: "size-5",
  large: "size-6",
  xlarge: "size-9",
  fill: "w-full aspect-square",
});
