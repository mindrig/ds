import { Icon } from "@wrkspc/icons";
import { minSize, Size, textCn, translateSize } from "@wrkspc/theme";
import { cnss } from "cnss";
import { ReactNode } from "react";
import { Description } from "./Description";
import { Label, labelProps } from "./Label";

/** @deprecated */
export type DescriptionListItem = DescriptionList.ItemDeprecated;

/** @deprecated */
export type DescriptionListItems = DescriptionList.Items;

/** @deprecated */
export type DescriptionListProps = DescriptionList.Props;

export namespace DescriptionList {
  export interface Props extends cnss.Props<typeof descriptionListItemCn> {
    items: Items;
  }

  /** @deprecated */
  export interface ItemDeprecated {
    label: string;
    icon?: Icon.Prop;
    description?: ReactNode;
    content: ReactNode;
  }

  export interface Item {
    term: TermProp;
    description: ReactNode;
  }

  export type TermProp = Label.Prop | Term;

  export interface Term {
    label: Label.Prop;
    description?: ReactNode | undefined;
  }

  export type Items = Array<
    Item | ItemDeprecated | false | undefined | null | ""
  >;
}

export function DescriptionList(props: DescriptionListProps) {
  const { size } = props;
  const items = props.items.filter((i) => !!i);
  const cns = descriptionListCng({ size });

  return (
    <dl className="w-full divide-y divide-divider">
      {items.map((item, index) => {
        const termDescription = "content" in item ? "TODO" : item.description;
        // TODO: This is such a complicated expression as Label right now
        // enforces a11y properties which complicates things here. We can
        // separate Label into a control label and a general label to
        // simplify this.
        const labelProp: Label.Prop | undefined =
          "term" in item
            ? typeof item.term === "object" && item.term
              ? "a11y" in item.term
                ? item.term
                : item.term.label
              : item.term
            : item.label;

        return (
          <div key={index} className={cns.item}>
            <dt className={cns.term}>
              {"term" in item ? (
                <Label {...labelProps(labelProp)} />
              ) : (
                <Label icon={item.icon} size={size}>
                  {item.label}
                </Label>
              )}

              {termDescription && (
                <Description size={minSize(translateSize(size, -1), "small")}>
                  {termDescription}
                </Description>
              )}
            </dt>

            <dd className={cns.description}>
              <div className={textCn({ size, capsize: false })}>
                {"content" in item ? item.content : item.description}
              </div>
            </dd>
          </div>
        );
      })}
    </dl>
  );
}

export const descriptionListItemCn = cnss<{ size: Size }>()
  .base("grid grid-cols-1 ")
  .size("medium", {
    xsmall: "gap-1 px-1 py-1 grid-cols-[minmax(0,_1fr)_minmax(0,_5fr)]",
    small: "gap-3 px-3 py-3 grid-cols-[minmax(0,_1fr)_minmax(0,_5fr)]",
    medium: "gap-6 px-6 py-4 grid-cols-[minmax(0,_1fr)_minmax(0,_2fr)]",
    large: "gap-6 px-9 py-7 grid-cols-[minmax(0,_1fr)_minmax(0,_2fr)]",
  });

export const descriptionListCng = cnss().group(($) => ({
  // Make `grid-cols-[minmax...` apply on layout `xs:...` which somehow doesn't
  // exist and add `grid-cols-1` to the base
  item: $<{ size: Size }>().base("grid grid-cols-1 ").size("medium", {
    xsmall: "gap-1 px-1 py-1 grid-cols-[minmax(0,_1fr)_minmax(0,_5fr)]",
    small: "gap-3 px-3 py-3 grid-cols-[minmax(0,_1fr)_minmax(0,_5fr)]",
    medium: "gap-6 px-6 py-4 grid-cols-[minmax(0,_1fr)_minmax(0,_2fr)]",
    large: "gap-6 px-9 py-7 grid-cols-[minmax(0,_1fr)_minmax(0,_2fr)]",
  }),

  term: $.base("flex flex-col gap-2"),

  description: $.base(""),
}));
