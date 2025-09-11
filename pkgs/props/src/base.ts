export namespace PropsBase {
  export type Fn<Args extends any[], Result = void> = (...args: Args) => Result;

  export type Props = Record<keyof any, any>;
}
