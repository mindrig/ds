"use client";

import { Icon, IconId, IconProps } from "@wrkspc/icons";
import { Size, translateSize } from "@wrkspc/theme";
import { cn } from "crab";
import { PropsWithChildren } from "react";
import {
  Button,
  MenuItem,
  MenuTrigger,
  Popover,
  Menu as RAMenu,
} from "react-aria-components";

export interface MenuItem {
  icon?: IconId | undefined;
  label: string;
  onAction?: () => void;
  href?: string;
}

export type MenuItems = Array<MenuItem | false | undefined | null | "">;

export interface MenuProps {
  items: MenuItems | undefined;
  icon?: IconId;
  size?: Size;
  color?: IconProps["color"];
  button?: React.ReactNode;
}

export function Menu(props: PropsWithChildren<MenuProps>) {
  const { button, size, color, icon, children } = props;
  const items = props.items?.filter((i) => !!i);
  const cns = menuCn(props);

  if (!items?.length) return null;

  return (
    <MenuTrigger>
      {button || (
        <Button aria-label="Menu" className={cns.button}>
          {icon ? <Icon id={icon} size={size} color={color} /> : children}
        </Button>
      )}

      <Popover className="shadow-md bg-white border rounded-lg">
        <RAMenu className={cns.menu}>
          {items.map((item) => (
            <MenuItem
              onAction={item.onAction}
              href={item.href}
              className={cns.item}
              key={item.label}
            >
              {item.icon && (
                <Icon
                  id={item.icon}
                  size={translateSize(size, -1)}
                  color="detail"
                />
              )}
              <span>{item.label}</span>
            </MenuItem>
          ))}
        </RAMenu>
      </Popover>
    </MenuTrigger>
  );
}

export const menuCn = cn<{ size: Size }>().group(($) => ({
  button: $<{ mode: "button" | "icon" }>()
    .size("medium", {
      xsmall: [{ mode: "icon" }, "h-3 w-3"],
      small: [{ mode: "icon" }, "h-4 w-4"],
      medium: [{ mode: "icon" }, "h-5 w-5"],
    })
    .mode("button", {
      icon: "inline-flex items-center justify-center",
    }),

  menu: $.base("flex flex-col gap-1").size("medium", {
    xsmall: "p-1",
    small: "p-1",
    medium: "p-2",
  }),

  item: $.base(
    "py-1 rounded-md hover:bg-gray-100 cursor-pointer flex items-center",
  ).size("medium", {
    xsmall: "text-xs gap-1 px-2",
    small: "text-sm gap-2 px-3",
    medium: "text-base gap-2 px-3",
  }),
}));
