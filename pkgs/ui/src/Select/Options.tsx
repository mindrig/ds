import { cnss } from "cnss";
import { Select } from ".";
import { selectItemCn } from "./cns";
import { SelectOption } from "./Option";

export namespace SelectOptions {
  export interface Props<
    Value extends Select.Value,
    Item extends ItemType<Value>,
  > extends cnss.Props<typeof selectItemCn> {
    options: Item[];
  }

  export type ItemType<Value extends Select.Value> =
    | Select.OptionItem<Value>
    | Select.OptionItemNested<Value>;
}

export function SelectOptions<
  Value extends Select.Value,
  Item extends SelectOptions.ItemType<Value>,
>(props: SelectOptions.Props<Value, Item>) {
  const { options, ...itemProps } = props;
  return (
    <>
      {options.map((option, index) => (
        <SelectOption option={option} {...itemProps} key={index} />
      ))}
    </>
  );
}
