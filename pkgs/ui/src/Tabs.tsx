"use client";

import { Icon, IconId } from "@wrkspc/icons";
import { Size, translateSize } from "@wrkspc/theme";
import { cn } from "crab";
import React, { useState } from "react";
import { Button } from "react-aria-components";
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
  export interface Item<Id extends string | undefined, Payload> {
    id: Id;
    icon?: IconId;
    label?: React.ReactNode;
    content?: React.ReactNode;
    payload?: Payload;
    isActive?: (
      id: Id | undefined,
      payload: Payload | undefined,
    ) => true | false | undefined | null | "";
    extra?: React.ReactNode | undefined;
  }

  export type Items<Id extends string | undefined, Payload> = Array<
    Item<Id, Payload> | false | undefined | null | ""
  >;

  export interface Props<Id extends string | undefined, Payload>
    extends cn.Props<typeof tabsCn> {
    label?: Label.Prop;
    items: Items<Id, Payload>;
    initial?: Id;
    size?: Size;
    onChange?: (id: Id, payload: Payload | undefined) => void;
    value?: Id;
  }

  export type Style = "default" | "inline";
}

export function Tabs<Id extends string, Payload = undefined>(
  props: Tabs.Props<Id, Payload>,
) {
  const { label, items, initial, size, onChange } = props;
  const localState = useState<Id | undefined>(
    initial || (items[0] && items[0].id) || undefined,
  );
  const controlled = "value" in props;
  const [id, setId] = controlled ? [props.value, onChange] : localState;

  const active = items.find((item) => item && item.id === id) || undefined;

  return (
    <div>
      <div className={tabsCn(props)}>
        {label && (
          <Label {...labelProps(label, { size })} />

          // <div
          //   className={textCn({
          //     size,
          //     role: "label",
          //     color: "detail",
          //     className: "flex items-center",
          //   })}
          // >
          //   {icon && <Icon id={icon} size={translateSize(size, -1)} />}
          //   <span>{label}</span>
          // </div>
        )}

        <div className="flex">
          {items.map(
            (item) =>
              item && (
                <Button
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
                </Button>
              ),
          )}
        </div>
      </div>

      {active?.content}
    </div>
  );
}

export const tabsCn = cn<{ style: Tabs.Style; size: Size }>()
  .base("flex items-center gap-2")
  .style("default", {
    default: "border-b border-gray-200",
    inline: "",
  })
  .size("medium", {
    xsmall: "h-5",
    small: "h-7",
    medium: "h-10",
  });

export const tabCn = cn<{ active: boolean; size: Size }>()
  .base(
    "border-y-[length:var(--border-tab)] border-t-transparent font-semibold flex items-center gap-1",
  )
  .size("medium", {
    xsmall: "h-5 py-[1px] px-1 text-xs",
    small: "h-7 px-2 text-sm",
    medium: "h-10 px-6",
  })
  .active(false, {
    false: "text-tab-ink hover:text-tab-ink-hover border-b-tab-border",
    true: "text-tab-active-ink border-b-tab-active-border",
  });
