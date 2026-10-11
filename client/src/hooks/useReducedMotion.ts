import { useReducedMotion as useMotionReducedMotion } from "framer-motion";

/**
 * True when the user prefers reduced motion. Wraps framer-motion's hook so a `null`
 * (unknown) is treated as "no preference".
 */
export function useReducedMotion(): boolean {
  return useMotionReducedMotion() ?? false;
}
