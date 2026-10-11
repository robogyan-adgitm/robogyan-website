import { animate } from "motion/react";
import { useCallback } from "react";
import { useMedia } from "./useMedia";
import { useReducedMotion } from "./useReducedMotion";

/** Most the element travels toward the pointer, in px. */
const PULL = 4;
const SPRING = { type: "spring", stiffness: 350, damping: 18, mass: 0.6 } as const;

/**
 * Light magnetic pull: while hovered, the element translates up to 4px toward the
 * pointer and springs back on leave. Desktop pointers only; off with reduced motion.
 * Returns a callback ref (re-created when the capability flips, so React re-attaches).
 * Writes `transform` only, so Tailwind's `translate` utilities still compose with it.
 */
export function useMagnetic<T extends HTMLElement>(
  enabled = true,
): (node: T | null) => void | (() => void) {
  const fine = useMedia("(hover: hover) and (pointer: fine)");
  const reduced = useReducedMotion();
  const on = enabled && fine && !reduced;

  return useCallback(
    (el: T | null) => {
      if (!el || !on) return;
      // Measured once per hover so the pull doesn't feed back into the maths.
      let rect: DOMRect | null = null;
      const move = (e: PointerEvent) => {
        if (e.pointerType !== "mouse") return;
        rect ??= el.getBoundingClientRect();
        const dx = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
        const dy = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
        const clamp = (v: number) => Math.max(-1, Math.min(1, v));
        animate(el, { x: clamp(dx) * PULL, y: clamp(dy) * PULL }, SPRING);
      };
      const leave = () => {
        rect = null;
        animate(el, { x: 0, y: 0 }, SPRING);
      };
      el.addEventListener("pointermove", move);
      el.addEventListener("pointerleave", leave);
      return () => {
        el.removeEventListener("pointermove", move);
        el.removeEventListener("pointerleave", leave);
      };
    },
    [on],
  );
}
