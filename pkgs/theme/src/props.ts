export type Dir = "x" | "y";

export type Color = "main" | "support" | "detail" | "current";

export type Background = "primary" | "secondary";

export const sizes = ["xsmall", "small", "medium", "large", "xlarge"] as const;

export type Size = (typeof sizes)[number];

export function translateSize(baseSize: Size | undefined, sizeDiff: number) {
  return sizes[translateSizeIndex(baseSize || "medium", sizeDiff)]!;
}

/**
 * Truncates size to set max size.
 *
 * @param size - Size to truncate
 * @param max - Max size
 *
 * @returns Truncated size
 */
export function maxSize(size: Size, max: Size) {
  return sizes.indexOf(size) > sizes.indexOf(max) ? max : size;
}

/**
 * Truncates size to set min size.
 *
 * @param size - Size to truncate
 * @param min - Min size
 *
 * @returns Truncated size
 */
export function minSize(size: Size, min: Size) {
  return sizes.indexOf(size) < sizes.indexOf(min) ? min : size;
}

export function minMaxSize(size: Size, min: Size, max: Size) {
  return maxSize(minSize(size, min), max);
}

export function translateSizeIndex(baseSize: Size, sizeDiff: number) {
  const index = sizes.indexOf(baseSize) + sizeDiff;
  if (index < 0) return 0;
  if (index > sizes.length - 1) return sizes.length - 1;
  return index;
}
