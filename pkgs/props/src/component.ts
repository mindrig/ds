import type { ReactNode } from "react";
import { PropsBase } from "./base";
import { isReactElement } from "./react";
import { RenderProp } from "./render";

export type ComponentProp<Props extends PropsBase.Props> =
  | Props
  | RenderProp.Element
  | ComponentProp<Props>[]
  | ComponentProp.Obj<Props>
  | PropsBase.Fn<[], ReactNode>;

export namespace ComponentProp {
  export interface Obj<Props extends PropsBase.Props> {
    props?: Props | undefined;
    children?: RenderProp.Element | undefined;
  }

  export interface FallbackProps<Props extends PropsBase.Props> {
    props: Partial<Props>;
    children: ReactNode;
  }

  export type Render<Props extends PropsBase.Props> = (
    props: FallbackProps<Props>,
  ) => ReactNode;
}

export function componentPropResolve<Props extends PropsBase.Props>(
  prop: ComponentProp<Props> | undefined,
  render: ComponentProp.Render<Props>,
): ReactNode {
  if (!prop) return render({ props: {}, children: null });
  if (Array.isArray(prop))
    return prop.map((p) => componentPropResolve(p, render));
  if (typeof prop === "function") return prop();
  if (isReactElement(prop)) return prop;
  const { props = {}, children = null } = isComponentPropObj(prop)
    ? prop
    : { props: prop };
  return render({ props, children });
}

export function isComponentPropObj<Props extends PropsBase.Props>(
  something: unknown,
): something is ComponentProp.Obj<Props> {
  return !!(
    typeof something === "object" &&
    something &&
    Object.entries(something).every(
      ([key, value]) =>
        (key === "props" &&
          (value === undefined || typeof value === "object")) ||
        key === "children",
    )
  );
}
