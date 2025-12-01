import { Icon } from "@wrkspc/icons";
import { minSize, Size, textCn, translateSize } from "@wrkspc/theme";
import { cn } from "crab";
import { ReactNode } from "react";
import { Label } from "./Label";

export interface DescriptionListItem {
  label: string;
  icon?: Icon.Prop;
  description?: ReactNode;
  content: ReactNode;
}

export type DescriptionListItems = Array<
  DescriptionListItem | false | undefined | null | ""
>;

export interface DescriptionListProps
  extends cn.Props<typeof descriptionListItemCn> {
  items: DescriptionListItems;
}

export function DescriptionList(props: DescriptionListProps) {
  const { size } = props;
  const items = props.items.filter((i) => !!i);

  return (
    <dl className="divide-y divide-gray-200">
      {items.map((item, index) => (
        <div key={index} className={descriptionListItemCn({ size })}>
          <dt className="flex flex-col gap-2">
            <Label icon={item.icon} size={size}>
              {item.label}
            </Label>

            {item.description && (
              <div
                className={textCn({
                  color: "support",
                  size: minSize(translateSize(size, -1), "small"),
                })}
              >
                {item.description}
              </div>
            )}
          </dt>

          <dd className={textCn({ size, capsize: false })}>{item.content}</dd>
        </div>
      ))}
    </dl>
  );
}

export const descriptionListItemCn = cn<{ size: Size }>()
  .base("grid grid-cols-1 ")
  .size("medium", {
    xsmall: "gap-1 px-1 py-1 grid-cols-[minmax(0,_1fr)_minmax(0,_5fr)]",
    small: "gap-3 px-3 py-3 sm:grid-cols-[minmax(0,_1fr)_minmax(0,_5fr)]",
    medium: "gap-6 px-6 py-4 sm:grid-cols-[minmax(0,_1fr)_minmax(0,_2fr)]",
    large: "gap-6 px-9 py-7 sm:grid-cols-[minmax(0,_1fr)_minmax(0,_2fr)]",
  });
