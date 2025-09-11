import type { PropsBase } from "./base";

export type NavFnProp<Args extends any[] = []> =
  | NavFnProp.Href<Args>
  | NavFnProp.Press<Args>;

export namespace NavFnProp {
  export interface Href<Args extends any[]> {
    href: PropsBase.Fn<Args, string>;
  }

  export interface Press<Args extends any[]> {
    onPress: PropsBase.Fn<Args>;
  }

  export interface Resolve<Args extends any[], Result> {
    href(href: PropsBase.Fn<Args, string>): Result;
    press(onPress: PropsBase.Fn<Args>): Result;
  }
}

export function navFnPropResolve<Args extends any[], Result>(
  prop: NavFnProp<Args>,
  resolve: NavFnProp.Resolve<Args, Result>,
): Result {
  if ("href" in prop) return resolve.href(prop.href);
  return resolve.press(prop.onPress);
}

export type NavProp = string | NavFnProp;

export namespace NavProp {
  export type Href = string | NavFnProp;

  export interface Resolve<Args extends any[], Result> {
    href(href: string): Result;
    press(onPress: PropsBase.Fn<Args>): Result;
  }
}

export function navPropResolve<Args extends any[], Result>(
  prop: NavProp,
  resolve: NavProp.Resolve<Args, Result>,
): Result {
  if (typeof prop === "string") return resolve.href(prop);
  if ("href" in prop) return resolve.href(prop.href());
  return resolve.press(prop.onPress);
}
