import { motion, useSpring, useTransform } from "motion/react";
import { useMedia } from "@/hooks/useMedia";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * The footer's oversized "R". On hover it squeezes to wdth 75 and springs back to 100
 * when the pointer leaves (desktop pointers, motion allowed).
 */
export function FooterMark() {
  const fine = useMedia("(hover: hover) and (pointer: fine)");
  const reduced = useReducedMotion();
  const live = fine && !reduced;
  const wdth = useSpring(100, { stiffness: 500, damping: 22 });
  const settings = useTransform(wdth, (v) => `"wdth" ${v.toFixed(1)}, "opsz" 96`);

  return (
    <motion.span
      aria-hidden="true"
      className="block h-[0.82em] w-[0.8em] overflow-hidden text-[160px] leading-[0.82] font-display text-text select-none"
      style={{ fontVariationSettings: settings }}
      onPointerEnter={live ? () => wdth.set(75) : undefined}
      onPointerLeave={live ? () => wdth.set(100) : undefined}
    >
      R
    </motion.span>
  );
}
