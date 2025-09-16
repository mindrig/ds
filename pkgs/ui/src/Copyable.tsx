"use client";

import { Icon } from "@wrkspc/icons";
import iconLightCheck from "@wrkspc/icons/svg/light/check.js";
import iconLightCopy from "@wrkspc/icons/svg/light/copy.js";
import { PropsWithChildren, useRef, useState } from "react";
import { WithTooltip } from "./WithTooltip";

export interface CopiableProps {
  value: string;
}

export function Copyable(props: PropsWithChildren<CopiableProps>) {
  const [copied, setCopied] = useState(false);
  const intervalRef = useRef<number | null>(null);

  return (
    <div className="relative">
      {props.children}
      <div className="absolute right-2 top-2">
        <WithTooltip
          onOpenChange={(open) => {
            if (!open) return;
            setCopied(false);
            intervalRef.current && clearInterval(intervalRef.current);
            intervalRef.current = null;
          }}
          tooltip={copied ? "Copied" : "Copy"}
          isOpen={!!copied}
          className="w-7 h-7 bg-white/80 shadow-xs rounded-md border border-gray-400 flex items-center justify-center"
          onPress={() => {
            navigator.clipboard.writeText(props.value);
            setCopied(true);
            intervalRef.current && clearInterval(intervalRef.current);
            intervalRef.current = window.setTimeout(() => {
              setCopied(false);
            }, 3000);
          }}
        >
          <Icon
            id={copied ? iconLightCheck : iconLightCopy}
            color="support"
            trigger
          />
        </WithTooltip>
      </div>
    </div>
  );
}
