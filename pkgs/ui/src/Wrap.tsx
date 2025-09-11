import React from "react";

export interface WrapProps {
  into: (
    children: React.ReactNode | undefined,
  ) => React.ReactNode | null | undefined | false | 0 | "";
}

export function Wrap(props: React.PropsWithChildren<WrapProps>) {
  const { into, children } = props;
  const wrapped = into(children);
  if (wrapped) return wrapped;
  return <>{children}</>;
}
