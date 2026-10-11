import { useCallback } from "react";
import { useKeySequence } from "@/hooks/useKeySequence";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export interface SihConfettiOptions {
  /** CSS selector for the cards to celebrate. Default "[data-sih-winner]". */
  selector?: string;
  /** Squares per card. Default 28. */
  pieces?: number;
  /** Listen for the typed sequence "sih". Default true. */
  enabled?: boolean;
}

/** Burst flat amber squares out of one element (flat fills only; Web Animations API). */
export function burstSquares(el: Element, pieces = 28): void {
  const rect = el.getBoundingClientRect();
  if (rect.width === 0 || rect.bottom < 0 || rect.top > window.innerHeight) return;
  const layer = document.createElement("div");
  layer.setAttribute("aria-hidden", "true");
  Object.assign(layer.style, {
    position: "fixed",
    inset: "0",
    pointerEvents: "none",
    zIndex: "80",
  });
  document.body.appendChild(layer);
  const colors = ["var(--color-kapton)", "var(--color-kapton)", "var(--color-text)"];
  let done = 0;
  for (let i = 0; i < pieces; i++) {
    const sq = document.createElement("span");
    const size = 6 + Math.random() * 6;
    const x = rect.left + Math.random() * rect.width;
    const y = rect.top + Math.random() * rect.height * 0.5;
    Object.assign(sq.style, {
      position: "absolute",
      left: `${x}px`,
      top: `${y}px`,
      width: `${size}px`,
      height: `${size}px`,
      background: colors[i % colors.length],
    });
    layer.appendChild(sq);
    const dx = (Math.random() - 0.5) * 240;
    const up = 80 + Math.random() * 140;
    const anim = sq.animate(
      [
        { transform: "translate(0,0) rotate(0deg)", opacity: 1 },
        {
          transform: `translate(${dx * 0.6}px, ${-up}px) rotate(${180 + Math.random() * 180}deg)`,
          opacity: 1,
          offset: 0.4,
        },
        {
          transform: `translate(${dx}px, ${rect.height * 0.6 + 120}px) rotate(${360 + Math.random() * 360}deg)`,
          opacity: 0,
        },
      ],
      { duration: 1200 + Math.random() * 500, easing: "cubic-bezier(0.25, 1, 0.5, 1)" },
    );
    anim.onfinish = () => {
      done += 1;
      if (done === pieces) layer.remove();
    };
  }
}

/**
 * Egg 10 (SIH page): typing "sih" bursts amber squares out of every element matching
 * `selector` (mark the winner cards with `data-sih-winner`). If none is on screen the
 * first one is scrolled into view first. Reduced motion: a brief kapton outline instead.
 * Returns `fire()` to trigger manually.
 */
export function useSihConfetti({
  selector = "[data-sih-winner]",
  pieces = 28,
  enabled = true,
}: SihConfettiOptions = {}) {
  const reduced = useReducedMotion();
  const fire = useCallback(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>(selector));
    const burst = () => {
      for (const el of els) {
        if (reduced) {
          const prev = el.style.outline;
          el.style.outline = "2px solid var(--color-kapton)";
          window.setTimeout(() => (el.style.outline = prev), 1200);
        } else {
          burstSquares(el, pieces);
        }
      }
    };
    const inView = els.some((el) => {
      const r = el.getBoundingClientRect();
      return r.bottom > 0 && r.top < window.innerHeight;
    });
    if (inView || els.length === 0) {
      burst();
      return;
    }
    els[0]?.scrollIntoView({ block: "center", behavior: reduced ? "instant" : "smooth" });
    window.setTimeout(burst, reduced ? 50 : 700);
  }, [selector, pieces, reduced]);
  useKeySequence("sih", fire, { enabled });
  return { fire };
}
