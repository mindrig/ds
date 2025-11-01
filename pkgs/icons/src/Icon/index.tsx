import { type Size } from "@wrkspc/theme";
import { cn } from "crab";
import { type HTMLProps } from "react";
import { type IconId } from "..";

export type IconProps = Icon.Props;

export type IconBaseProps = Icon.PropsBase;

export type IconProp = Icon.Prop;

export namespace Icon {
  export interface Props
    extends Omit<HTMLProps<HTMLDivElement>, "id" | "color" | "size">,
      cn.Props<typeof iconBaseCn>,
      cn.Props<typeof iconMaskCn> {
    id: Prop;
  }

  export interface PropsBase
    extends cn.Props<typeof iconBaseCn>,
      cn.Props<typeof iconMaskCn> {
    id: IconId;
    className?: string | undefined;
  }

  export type Prop = IconId | PropsBase | PropHref;

  export interface PropHref {
    type: "svg";
    href: string;
  }
}

export function Icon(props: IconProps) {
  // This allows passing either the icon id or an object with the id and
  // props. It allows to wrap the component:
  //   <Icon id={props.icon} size="xlarge" color="support" />
  // Where `props.icon` is `IconProp`. Whatever is defined will override
  // the explicitly size and color props.
  const { id: idProp, ...restProps } = props;
  const [id, cnProps] =
    typeof idProp === "string"
      ? [idProp, props]
      : ["href" in idProp ? idProp.href : idProp.id, { ...props, ...idProp }];

  return (
    <div
      className={cn(iconBaseCn(cnProps), iconMaskCn(cnProps))}
      style={{
        // TODO: Migrate Mind Control to the new approach. Here's the previous URL:
        // mask: `url(https://assets.mindcontrol.studio/icons/${id}) no-repeat center / contain`,
        mask: `url(${id}) no-repeat center / contain`,
      }}
      {...restProps}
    />
  );
}

export type IconSize = Size | "fill";

export type IconColor =
  | "main" // TODO: Rename to adaptive, as it adapts via `currentColor`
  | "primary"
  | "support"
  | "detail"
  | "brand"
  | "danger"
  | "success"
  | "current";

export const iconMaskCn = cn<{
  color: IconColor;
  inverse: boolean;
  trigger: boolean;
}>()
  .color("main", {
    main: [
      "bg-[currentColor]",
      [{ inverse: false, trigger: true }, "hover:bg-icon-hover"],
      // Inverse
      [{ inverse: true, trigger: false }, "bg-icon-inverse"],
      [
        { inverse: true, trigger: true },
        "bg-icon-inverse hover:bg-icon-inverse-hover",
      ],
    ],
    primary: [
      "bg-icon",
      [{ inverse: false, trigger: true }, "hover:bg-icon-hover"],
      // Inverse
      [{ inverse: true }, "bg-icon-inverse"],
      [{ inverse: true, trigger: true }, " hover:bg-icon-inverse-hover"],
    ],
    support: [
      [{ inverse: false }, "bg-icon-support"],
      [{ inverse: false, trigger: true }, "hover:bg-icon-support-hover"],
      // Inverse
      [{ inverse: true }, "bg-icon-support-inverse"],
      [{ inverse: true, trigger: true }, "hover:bg-icon-support-inverse-hover"],
    ],
    detail: [
      [{ inverse: false }, "bg-icon-support"],
      [{ inverse: false, trigger: true }, "hover:bg-icon-support-hover"],
      // Inverse
      [{ inverse: true }, "bg-icon-support-inverse"],
      [{ inverse: true, trigger: true }, "hover:bg-icon-support-inverse-hover"],
    ],
    brand: ["bg-lime-500" /* TODO: */],
    danger: ["bg-red-500" /* TODO: */],
    success: ["bg-green-500" /* TODO: */],
    current: [
      [{ inverse: false }, "bg-[currentColor]"],
      [
        { inverse: false, trigger: true },
        "hover:bg-[color-mix(in srgb, currentColor 80%, transparent)]",
      ],
      // TODO: Inverse
      // [{ inverse: true }, "bg-icon-support-inverse"],
      // [{ inverse: true, trigger: true }, "hover:bg-icon-support-inverse-hover"],
    ],
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
      [{ inverse: false, trigger: true }, "hover:text-icon-hover"],
      // Inverse
      [{ inverse: true, trigger: false }, "text-icon-inverse"],
      [
        { inverse: true, trigger: true },
        "text-icon-inverse hover:text-icon-inverse-hover",
      ],
    ],
    primary: [
      "text-icon",
      [{ inverse: false, trigger: true }, "hover:text-icon-hover"],
      // Inverse
      [{ inverse: true }, "text-icon-inverse"],
      [{ inverse: true, trigger: true }, " hover:text-icon-inverse-hover"],
    ],
    support: [
      [{ inverse: false }, "text-icon-support"],
      [{ inverse: false, trigger: true }, "hover:text-icon-support-hover"],
      // Inverse
      [{ inverse: true }, "text-icon-support-inverse"],
      [
        { inverse: true, trigger: true },
        "hover:text-icon-support-inverse-hover",
      ],
    ],
    detail: [
      [{ inverse: false }, "text-icon-support"],
      [{ inverse: false, trigger: true }, "hover:text-icon-support-hover"],
      // Inverse
      [{ inverse: true }, "text-icon-support-inverse"],
      [
        { inverse: true, trigger: true },
        "hover:text-icon-support-inverse-hover",
      ],
    ],
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
