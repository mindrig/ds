"use client";

import { Icon, IconId } from "@wrkspc/icons";
import iconRegularTimes from "@wrkspc/icons/svg/regular/times.js";
import { Size, translateSize } from "@wrkspc/theme";
import { cnss } from "cnss";
import React, { useState } from "react";
import { Button as RAButton } from "react-aria-components";
import { $ } from "tdollar";
import { Button } from "./Button.js";
import { Label, labelProps } from "./Label.js";

/** @deprecated */
export type TabItem<Id extends string | undefined, Payload> = Tabs.Item<
  Id,
  Payload
>;

/** @deprecated */
export type TabsProps<Id extends string | undefined, Payload> = Tabs.Props<
  Id,
  Payload
>;

export namespace Tabs {
  export interface Item<Id extends string | undefined | null, Payload> {
    id: Id;
    icon?: IconId;
    label?: React.ReactNode;
    content?: React.ReactNode | (() => React.ReactNode);
    payload?: Payload;
    isActive?: (
      id: Id | undefined | null,
      payload: Payload | undefined,
    ) => true | false | undefined | null | "";
    extra?: React.ReactNode | undefined;
  }

  export type Items<Id extends string | undefined | null, Payload> = Array<
    Item<Id, Payload> | false | undefined | null | ""
  >;

  export interface Props<Id extends string | undefined | null, Payload>
    extends cnss.Props<typeof tabsCn> {
    label?: Label.Prop | undefined;
    items: Items<Id, Payload>;
    initial?: Id | undefined;
    size?: Size | undefined;
    onChange?: ((id: Id, payload: Payload | undefined) => void) | undefined;
    value?: Id | undefined;
    collapsible?: $.Or<
      undefined extends Id ? true : false,
      null extends Id ? true : false
    > extends true
      ? Collapsible<Id, Payload> | undefined
      : never;
  }

  export type Style = "default" | "inline";

  export interface Collapsible<Id extends string | undefined | null, Payload> {
    id: Extract<Id, undefined | null>;
    payload?: Payload | undefined;
  }
}

export function Tabs<Id extends string | undefined | null, Payload = undefined>(
  props: Tabs.Props<Id, Payload>,
) {
  const { label, items, initial, size, onChange, collapsible } = props;
  const localState = useState<Id | undefined>(
    initial || (items[0] && items[0].id) || undefined,
  );
  const controlled = "value" in props;
  const [id, setId] = controlled ? [props.value as Id, onChange] : localState;

  const active = items.find((item) => item && item.id === id) || undefined;

  const cns = tabsCng(props);

  return (
    <div className="w-full">
      <div className={cns.wrapper}>
        <div className={cns.inner}>
          {label && <Label {...labelProps(label, { size })} />}

          <div className="flex">
            {items.map(
              (item) =>
                item && (
                  <RAButton
                    key={item.id}
                    onPress={() => {
                      if (item.id === id) return;
                      setId?.(item.id, item.payload);
                      !controlled && onChange?.(item.id, item.payload);
                    }}
                    className={tabCn({
                      active: item.isActive
                        ? !!item.isActive(id, item.payload)
                        : item.id === id,
                      size,
                    })}
                    slot={null}
                  >
                    {item.icon && (
                      <Icon
                        id={item.icon}
                        size={translateSize(size, -1)}
                        color="support"
                      />
                    )}
                    {item.label && <span>{item.label}</span>}
                    {item.extra}
                  </RAButton>
                ),
            )}
          </div>
        </div>

        {active && collapsible && (
          <Button
            icon={iconRegularTimes}
            size={size}
            style="label"
            onClick={() => {
              setId?.(collapsible.id, collapsible.payload);
              !controlled && onChange?.(collapsible.id, collapsible.payload);
            }}
          />
        )}
      </div>

      {typeof active?.content === "function"
        ? active.content()
        : active?.content}
    </div>
  );
}

export const tabsCng = cnss().group(($) => ({
  wrapper: $<{ style: Tabs.Style }>()
    .base("flex justify-between gap-2 relative mb-[-1px] pb-[1px]")
    .style("default", {
      default: "border-b border-tabs-border",
      inline: "",
    }),

  inner: $<{
    size: Size;
  }>()
    .base("flex items-center gap-2")
    .size("medium", {
      xsmall: "h-5",
      small: "h-6",
      medium: "h-10",
    }),
}));

export const tabsCn = cnss<{
  style: Tabs.Style;
  size: Size;
}>()
  .base("flex items-center gap-2")
  .style("default", {
    default: "border-b border-tabs-border",
    inline: "",
  })
  .size("medium", {
    xsmall: "h-5",
    small: "h-6",
    medium: "h-10",
  });

export const tabCn = cnss<{ active: boolean; size: Size }>()
  .base(
    "border-y-[length:var(--border-tab)] border-t-transparent font-semibold flex items-center gap-1",
  )
  .size("medium", {
    xsmall: "h-5 py-[1px] px-1 text-xs",
    small: "h-6 px-2 text-sm",
    medium: "h-10 px-6",
  })
  .active(false, {
    false: "text-tab-ink hover:text-tab-ink-hover border-b-tab-border",
    true: "text-tab-active-ink border-b-tab-active-border",
  });
