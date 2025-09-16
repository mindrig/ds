export * from "./Icon/index";

/**
 * The icon id, used to reference in the icon component.
 */
export type IconId = string & { [iconIdBrand]: true };
declare const iconIdBrand: unique symbol;
