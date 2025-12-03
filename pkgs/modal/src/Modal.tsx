"use client";

import { Icon } from "@wrkspc/icons";
import iconRegularXmark from "@wrkspc/icons/svg/regular/xmark.js";
import { cnss } from "cnss";
import { useContext } from "react";
import { ModalContext } from "./ModalContext";

/**
 * The {@link ModalLayout} props.
 */
export interface ModalLayoutProps extends cnss.Props<typeof modalLayoutCn> {
  /** If to show close button */
  close?: boolean;
}

export function ModalLayout(props: React.PropsWithChildren<ModalLayoutProps>) {
  return (
    <div className={modalLayoutCn(props)}>
      {props.close && (
        <div className="absolute top-2 right-2">
          <ModalClose />
        </div>
      )}

      {props.children}
    </div>
  );
}

export const modalLayoutCn = cnss<{
  size: "medium" | "small" | "xsmall" | "large";
  expanded: boolean;
  color: "default" | "secondary" | "background";
}>()
  .base(
    "absolute inset-2 sm:inset-4 md:relative md:inset-auto md:w-full transform rounded-lg text-left shadow-xl transition-all flex flex-col",
  )
  .size("medium", {
    medium: "md:max-w-4xl",
    small: "md:max-w-xl",
    xsmall: "md:max-w-md",
    large: "md:max-w-7xl",
  })
  .expanded(false, {
    true: "md:h-[80vh]",
  })
  .color("default", {
    default: "bg-white",
    secondary: "bg-gray-50",
    background: "bg-gray-0",
  });

/**
 * The {@link ModalHeader} props.
 */
export interface ModalHeaderProps extends cnss.Props<typeof modalHeaderCn> {}

/**
 * The modal header component.
 */
export function ModalHeader(props: React.PropsWithChildren<ModalHeaderProps>) {
  return (
    <div className={modalHeaderCn(props)}>
      {props.children}

      <ModalClose />
    </div>
  );
}

/**
 * The modal close button.
 */
export function ModalClose() {
  const { close } = useContext(ModalContext);

  return (
    <div className="sm:block">
      <button
        type="button"
        className="rounded-md text-gray-400 hover:text-gray-500 focus:outline-hidden focus:ring-2 focus:ring-lime-500 focus:ring-offset-2 w-6 h-6"
        onClick={() => close()}
      >
        <span className="sr-only">Close</span>
        <Icon id={iconRegularXmark} className="w-6 h-6" aria-hidden="true" />
      </button>
    </div>
  );
}

export const modalHeaderCn = cnss<{
  sticky: boolean;
  style: "bordered" | "gradient";
}>()
  .base("flex justify-between items-center px-5 py-3")
  .sticky(false, {
    true: "sticky top-0 z-10",
  })
  .style("bordered", {
    bordered: "border-gray-300 border-b",
    gradient: "bg-gradient-to-b from-60% from-white to-white/0 rounded-t-lg",
  });
