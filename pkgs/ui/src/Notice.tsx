import iconRegularTimes from "@wrkspc/icons/svg/regular/times.js";
import { Background, Size, textCn, translateSize } from "@wrkspc/theme";
import { Block, Button } from "@wrkspc/ui";
import { PropsWithChildren } from "react";

export namespace Notice {
  export interface Props {
    size?: Size | undefined;
    header?: string | undefined;
    actions?: React.ReactNode | undefined;
    color?: Color | undefined;
    compact?: boolean | undefined;
    onClose?: (() => void) | undefined;
  }

  export type Color = "default" | "error";
}

export function Notice(props: PropsWithChildren<Notice.Props>) {
  const { size, header, color, children, actions, compact, onClose } = props;

  return (
    <Block
      background={colorToBackground(color)}
      pad={
        compact ? [translateSize(size, -1), size || "medium"] : size || "medium"
      }
      size={size}
      justify="between"
      align="start"
    >
      <Block dir="y" size={translateSize(size, -1)} grow>
        {header && (
          <h3
            className={textCn({
              role: "label",
              size: translateSize(size, 1),
            })}
          >
            {header}
          </h3>
        )}

        {children}
      </Block>

      {(actions || onClose) && (
        <Block size={translateSize(size, -1)} align>
          {actions}

          {onClose && (
            <Button
              style="label"
              size="small"
              onClick={onClose}
              icon={iconRegularTimes}
            />
          )}
        </Block>
      )}
    </Block>
  );
}

function colorToBackground(color: Notice.Color | undefined): Background {
  switch (color) {
    case "error":
      return "error";
    case "default":
    default:
      return "highlight";
  }
}
