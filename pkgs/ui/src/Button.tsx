"use client";

import { Icon, type IconBaseProps, type IconId } from "@wrkspc/icons";
import { type Size, textCn, translateSize } from "@wrkspc/theme";
import { cnss } from "cnss";
import React, { type PropsWithChildren } from "react";
import { Button as ButtonComponent, Link } from "react-aria-components";

// TODO: Move somewhere else
type Stringifable = string | number | boolean;

export interface ButtonBaseProps {
  tag?: Stringifable | undefined;
  icon?: IconId | IconBaseProps;
  title?: string | undefined;
}

export interface ButtonLinkProps
  extends ButtonBaseProps,
    Omit<React.ComponentProps<typeof Link>, "children" | "style" | "href">,
    cnss.Props<typeof buttonCn> {
  href: string | undefined;
}

export interface ButtonProps
  extends ButtonBaseProps,
    Omit<React.ComponentProps<typeof ButtonComponent>, "style" | "slot">,
    cnss.Props<typeof buttonCn> {
  slot?: boolean | string | null;
}

export function Button(
  props:
    | React.PropsWithChildren<ButtonProps>
    | React.PropsWithChildren<ButtonLinkProps>,
) {
  const { size, color, style, align, icon, tag, children, slot, ...restProps } =
    props;

  const className = buttonCn({ size, color, style, align });

  const iconColor =
    color === "secondary"
      ? "detail"
      : color === "current"
        ? "current"
        : "support";
  const iconSize = translateSize(size, -1);
  const iconInverse = !style || style === "solid" ? true : false;

  const content = (
    <>
      {icon &&
        (typeof icon === "string" ? (
          <Icon
            id={icon}
            size={iconSize}
            color={iconColor}
            inverse={iconInverse}
          />
        ) : (
          <Icon
            id={icon.id}
            color={icon.color || iconColor}
            size={icon.size || iconSize}
            inverse={iconInverse}
          />
        ))}

      {children && (
        <span
          className={textCn({
            size,
            role: "control",
          })}
        >
          {children}
        </span>
      )}
      {(tag && <ButtonTag>{tag}</ButtonTag>) || null}
    </>
  );

  if ("href" in restProps) {
    // TODO: Right now hash React Router with RAI end up generating absolute
    // URIs with the hash prefix, breaking external links. Find a way to fix it.
    if (
      restProps.href?.startsWith("https:") ||
      restProps.href?.startsWith("mailto:")
    )
      return (
        // @ts-expect-error -- TODO: I have no idea why it's failing here
        <a className={className} {...restProps} href={restProps.href || ""}>
          {content}
        </a>
      );

    return (
      <Link className={className} {...restProps} href={restProps.href || ""}>
        {content}
      </Link>
    );
  }

  // Unless specified, set slot to null, so when i.e. button is rendered
  // inside select component (as label action), it won't trigger select open.
  const raSlot =
    slot === undefined
      ? null
      : // When slot is set to true, set it to undefined to allow default slot
        slot === true
        ? undefined
        : // Or explicitly set to null
          slot === false
          ? null
          : // Or use the value (string or null)
            slot;

  return (
    <ButtonComponent className={className} {...restProps} slot={raSlot || null}>
      {content}
    </ButtonComponent>
  );
}

export function ButtonTag(props: PropsWithChildren) {
  return (
    <span className="rounded-full bg-gray-100 text-xs h-4 px-1 leading-none flex items-center justify-center text-gray-600">
      {props.children}
    </span>
  );
}

export type ButtonColor =
  | "primary"
  | "secondary"
  | "cta"
  | "action"
  | "danger"
  | "current";

export type ButtonStyle = "transparent" | "label" | "solid";

export type ButtonAlign = "auto" | "start";

export const buttonCn = cnss<{
  color: ButtonColor;
  size: Size;
  style: ButtonStyle;
  align: ButtonAlign;
}>()
  .base(
    "shrink-0 truncate inline-flex items-center justify-center whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 font-sans hover:cursor-pointer",
  )
  .size("medium", {
    xsmall: [
      "gap-1",
      {
        style: {
          // TODO: Add special "default" style
          solid: "h-5 rounded-button-xsmall py-[1px] px-1",
          transparent: "h-5 rounded-button-xsmall py-[1px] px-1",
        },
      },
    ],
    small: [
      "gap-1",
      {
        style: {
          solid: "h-7 rounded-button-small px-2 text-sm",
          transparent: "h-7 rounded-button-small px-2 text-sm",
        },
      },
    ],
    medium: [
      "gap-2",
      {
        style: {
          solid: "h-10 rounded-button-medium px-6",
          transparent: "h-10 rounded-button-medium px-6",
        },
      },
    ],
    large: [
      "gap-2",
      {
        style: {
          solid: "h-11 rounded-button-large px-8",
          transparent: "h-11 rounded-button-large px-8",
        },
      },
    ],
  })
  .color("primary", {
    primary: {
      style: {
        solid:
          "bg-button-solid-canvas hover:bg-button-solid-canvas-hover text-button-solid-ink hover:text-button-solid-ink-hover",
        transparent:
          "text-button-transparent-ink hover:text-button-transparent-ink-hover bg-button-transparent-canvas hover:bg-button-transparent-canvas-hover border-button-transparent-border hover:border-button-transparent-border-hover",
        label: "text-button-label-ink hover:text-button-label-ink-hover",
      },
    },
    secondary: {
      style: {
        solid: "bg-gray-400 text-white hover:bg-gray-500",
        transparent:
          "text-button-transparent-secondary-ink hover:text-button-transparent-secondary-ink-hover bg-button-transparent-secondary-canvas hover:bg-button-transparent-secondary-canvas-hover border-button-transparent-secondary-border hover:border-button-transparent-secondary-border-hover",
        label:
          "text-button-secondary-label-ink hover:text-button-secondary-label-ink-hover",
      },
    },
    cta: "bg-blue-700 text-white hover:bg-blue-600",
    action: {
      style: {
        solid: "bg-gray-700 text-white hover:bg-gray-600",
        transparent:
          "text-gray-800 hover:bg-gray-50 border-gray-400 hover:border-gray-500",
      },
    },
    danger: {
      style: {
        solid: "bg-red-800 text-white hover:bg-red-700",
        transparent:
          "text-red-950/80 hover:bg-red-50 border-red-300 hover:border-red-400",
      },
    },
    current: {
      style: {
        // TODO: Find a way to make it work
        solid:
          "bg-[currentColor] text-white mix-blend-difference hover:bg-[color-mix(in srgb, currentColor 80%, transparent)]",
        transparent:
          "text-[currentColor] hover:bg-[color-mix(in srgb, currentColor 80%, transparent)] hover:text-white hover:mix-blend-difference border-[currentColor] hover:border-[color-mix(in srgb, currentColor 80%, transparent)]",
      },
    },
  })
  .style("solid", {
    solid: "shadow-md",
    transparent: "border shadow-none",
    label: "shadow-none",
  })
  .align("auto", {
    start: "self-start",
  });
