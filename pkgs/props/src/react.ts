import type { ReactElement } from "react";

// NOTE: Sync with React's symbols:
// https://github.com/facebook/react/blob/8039f1b2a05d00437cd29707761aeae098c80adc/packages/shared/ReactSymbols.js#L18
const reactElementTypeSymbol = Symbol.for("react.transitional.element");

export function isReactElement(something: unknown): something is ReactElement {
  return !!(
    typeof something === "object" &&
    something &&
    "$$typeof" in something &&
    something.$$typeof === reactElementTypeSymbol
  );
}
