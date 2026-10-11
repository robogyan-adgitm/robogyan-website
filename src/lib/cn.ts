import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * tailwind-merge taught about our custom type scale (`text-hero`) and utilities so
 * `cn("text-3xl", "text-hero")` resolves correctly instead of keeping both.
 */
const twMerge = extendTailwindMerge<"font-voice" | "chamfer" | "surface">({
  extend: {
    theme: {
      text: ["hero"],
    },
    classGroups: {
      "font-voice": ["font-condensed", "font-display"],
      chamfer: ["chamfer", "chamfer-lg", "chamfer-br", "chamfer-both"],
      surface: ["surface-ink", "surface-paper"],
    },
  },
});

/** Join class names (clsx) and resolve Tailwind conflicts (tailwind-merge). */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
