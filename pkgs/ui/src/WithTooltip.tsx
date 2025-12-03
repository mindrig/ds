"use client";

import { Size } from "@wrkspc/theme";
import { cnss } from "cnss";
import { ComponentProps, PropsWithChildren, ReactNode } from "react";
import { Button, Tooltip, TooltipTrigger } from "react-aria-components";

export interface WithTooltipProps
  extends ComponentProps<typeof TooltipTrigger>,
    cnss.Props<typeof tooltipCn> {
  tooltip: ReactNode | undefined;
  className?: string | undefined;
  onPress?: () => void;
}

export function WithTooltip(props: PropsWithChildren<WithTooltipProps>) {
  if (!props.tooltip) return <>{props.children}</>;

  const { children, tooltip, className, onPress, ...restProps } = props;
  return (
    <TooltipTrigger {...restProps} delay={200}>
      <Button className={className || ""} onPress={onPress || (() => {})}>
        {props.children}
      </Button>

      <Tooltip className={tooltipCn(props)}>{props.tooltip}</Tooltip>
    </TooltipTrigger>
  );
}

export const tooltipCn = cnss<{ size: Size }>()
  .base("shadow-md bg-white border rounded-lg p-2")
  .size("medium", {
    small: "text-xs max-w-xs",
    medium: "text-sm max-w-sm",
    large: "text-base max-w-md",
  });
