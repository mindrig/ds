import type { ReactElement, ReactNode } from "react";

export type RenderProp = RenderProp.Element | RenderProp[] | RenderProp.Fn;

export namespace RenderProp {
  export type Element = ReactElement | Element[] | null;

  export type Fn = () => Element;
}

export function renderPropResolve(
  prop: RenderProp,
  fallback?: RenderProp.Fn | undefined,
): ReactNode {
  if (Array.isArray(prop))
    return prop.map((p) => renderPropResolve(p, fallback));
  if (typeof prop === "function") return prop();
  // if (typeof prop === "object" && prop)
  return prop || fallback?.() || null;
}
