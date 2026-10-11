import { useInView as useMotionInView, type UseInViewOptions } from "motion/react";
import type { RefObject } from "react";

/**
 * True once the element has entered the viewport. Defaults to `once: true` and a
 * small negative bottom margin so callouts trigger when they are properly visible.
 */
export function useInView(ref: RefObject<Element | null>, options: UseInViewOptions = {}): boolean {
  return useMotionInView(ref, { once: true, margin: "0px 0px -10% 0px", ...options });
}
