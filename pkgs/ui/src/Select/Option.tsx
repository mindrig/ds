import { Icon } from "@wrkspc/icons";
import iconRegularCheck from "@wrkspc/icons/svg/regular/check.js";
import { cnss } from "cnss";
import { Header, ListBoxItem, ListBoxSection } from "react-aria-components";
import { Select } from ".";
import { Label, labelA11yAttr, labelChildren, labelProps } from "../Label";
import { selectItemCn, selectSectionCng } from "./cns";
import { SelectOptions } from "./Options";

export namespace SelectOption {
  export interface Props<Value extends Select.Value>
    extends cnss.Props<typeof selectItemCn> {
    option: Select.OptionItem<Value>;
  }
}

export function SelectOption<Value extends Select.Value>(
  props: SelectOption.Props<Value>,
) {
  const { option, ...itemProps } = props;
  if (!option) return null;

  if (typeof option === "object" && option.type === "section") {
    if (!option.options.length) return null;

    if (option.flatten) return <SelectOptions options={option.options} />;

    const cns = selectSectionCng(itemProps);
    return (
      <ListBoxSection className={cns.wrapper}>
        <Header className={cns.header}>
          <Label size={itemProps.size} {...labelProps(option.label)} />
        </Header>

        <SelectOptions options={option.options} />
      </ListBoxSection>
    );
  }

  return (
    <ListBoxItem
      // @ts-expect-error: RAC has no undefineds
      id={option.value}
      // NOTE: Without key, RAC throws an error "Cannot change the id of an item."
      // The workaround is to assign key as well as id: https://github.com/adobe/react-spectrum/issues/5176#issuecomment-1743674682
      key={option.value}
      textValue={
        option.label ? labelA11yAttr(option.label) : String(option.value)
      }
      className={({ isSelected }) => selectItemCn({ ...itemProps, isSelected })}
    >
      {({ isSelected }) => (
        <div className="flex gap-1 items-center">
          <div className="w-3 flex items-center flex-shrink-0">
            {isSelected && (
              <Icon id={iconRegularCheck} size="xsmall" color="support" />
            )}
          </div>
          {option.icon && <Icon size="small" id={option.icon} />}
          <span className="truncate">{labelChildren(option.label)}</span>
        </div>
      )}
    </ListBoxItem>
  );
}
