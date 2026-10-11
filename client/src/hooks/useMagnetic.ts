import { animate, motionValue } from "framer-motion";
import { useCallback, useEffect, useRef } from "react";
import { usePointerEffects } from "./useFinePointer";

/** Most the element travels toward the pointer, in px. */
const PULL = 4;
const SPRING = { type: "spring", stiffness: 350, damping: 18, mass: 0.6 } as const;

/**
 * Light magnetic pull: while hovered, the element moves up to 4px toward the pointer
 * and springs back on leave. Desktop pointers only; off with reduced motion.
 *
 * Writes the CSS `translate` property (not `transform`), so it composes with Tailwind's
 * `hover:scale-*` and framer-motion's `whileHover` transforms on the same element.
 * Returns a callback ref.
 */
export function useMagnetic<T extends HTMLElement>(enabled = true) {
  const on = usePointerEffects() && enabled;
  const cleanup = useRef<(() => void) | null>(null);

  useEffect(() => () => cleanup.current?.(), []);

  return useCallback(
    (el: T | null) => {
      cleanup.current?.();
      cleanup.current = null;
      if (!el || !on) return;
      const x = motionValue(0);
      const y = motionValue(0);
      const write = () => {
        el.style.translate = `${x.get().toFixed(2)}px ${y.get().toFixed(2)}px`;
      };
      const offX = x.on("change", write);
      const offY = y.on("change", write);
      // Measured once per hover so the pull doesn't feed back into the maths.
      let rect: DOMRect | null = null;
      const clamp = (v: number) => Math.max(-1, Math.min(1, v));
      const move = (e: PointerEvent) => {
        if (e.pointerType !== "mouse") return;
        rect ??= el.getBoundingClientRect();
        const dx = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
        const dy = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
        animate(x, clamp(dx) * PULL, SPRING);
        animate(y, clamp(dy) * PULL, SPRING);
      };
      const leave = () => {
        rect = null;
        animate(x, 0, SPRING);
        animate(y, 0, SPRING);
      };
      el.addEventListener("pointermove", move);
      el.addEventListener("pointerleave", leave);
      cleanup.current = () => {
        offX();
        offY();
        x.stop();
        y.stop();
        el.removeEventListener("pointermove", move);
        el.removeEventListener("pointerleave", leave);
        el.style.translate = "";
      };
    },
    [on],
  );
}
