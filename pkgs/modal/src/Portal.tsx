"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { MaybeModals } from "./Modals";

/**
 * The modals portal component, checks if ready to create portal, and renders
 * the modals.
 */
export default function ModalsPortal() {
  // Delay the render until the Next.js hydration is done.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted ? createPortal(<MaybeModals />, document.body) : null;
}
