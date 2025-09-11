import { iconRegularAngleDown, iconRegularAngleUp } from "@wrkspc/icons";
import { cn } from "crab";
import { Button } from "./Button";

export interface ExpandButtonProps {
  show?: boolean;
  expanded: boolean;
  setExpanded: (expanded: boolean) => void;
}

export function ExpandButton(props: ExpandButtonProps) {
  const { expanded, setExpanded } = props;
  const show = props.show ?? true;
  if (!show) return null;

  return (
    <div
      className={cn(
        "pointer-events-none flex justify-center font-sans",
        "absolute left-0 bottom-2 right-0",
      )}
    >
      <div className="pointer-events-auto rounded-md bg-white">
        <Button
          style="transparent"
          size="xsmall"
          icon={expanded ? iconRegularAngleUp : iconRegularAngleDown}
          onPress={() => setExpanded(!expanded)}
        >
          {expanded ? "Collapse" : "Expand"}
        </Button>
      </div>
    </div>
  );
}
