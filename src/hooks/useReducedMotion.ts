import { useReducedMotion as useMotionReducedMotion } from "motion/react";

/**
 * True when the user prefers reduced motion. Wraps motion's hook so a `null`
 * (unknown, e.g. during SSR) is treated as "no preference".
 */
export function useReducedMotion(): boolean {
  return useMotionReducedMotion() ?? false;
}
