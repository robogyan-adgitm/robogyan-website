import { useCallback } from "react";
import { useKeySequence } from "@/hooks/useKeySequence";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export interface SihConfettiOptions {
  /** CSS selector for the elements to celebrate. Default "[data-sih-winner]". */
  selector?: string;
  /** Pieces per element. Default 36. */
  pieces?: number;
  /** Listen for the typed sequence "sih". Default true. */
  enabled?: boolean;
}

/** The site palette: primary blue, purple, secondary blue, accent green, white. */
const COLORS = [
  "hsl(235, 85%, 65%)",
  "hsl(275, 85%, 70%)",
  "hsl(220, 70%, 55%)",
  "hsl(150, 45%, 60%)",
  "hsl(0, 0%, 100%)",
];

/**
 * Burst rounded confetti in the site's gradient colours out of one element (Web
 * Animations API, removed when done).
 */
export function burstConfetti(el: Element, pieces = 36): void {
  const rect = el.getBoundingClientRect();
  if (rect.width === 0 || rect.bottom < 0 || rect.top > window.innerHeight) return;
  const layer = document.createElement("div");
  layer.setAttribute("aria-hidden", "true");
  Object.assign(layer.style, {
    position: "fixed",
    inset: "0",
    pointerEvents: "none",
    zIndex: "80",
    overflow: "hidden",
  });
  document.body.appendChild(layer);
  let done = 0;
  for (let i = 0; i < pieces; i++) {
    const piece = document.createElement("span");
    const w = 5 + Math.random() * 5;
    const h = Math.random() < 0.5 ? w : w * 0.45;
    const x = rect.left + Math.random() * rect.width;
    const y = rect.top + Math.min(rect.height, 160) * Math.random() * 0.5;
    const a = COLORS[i % COLORS.length];
    const b = COLORS[(i + 1) % COLORS.length];
    Object.assign(piece.style, {
      position: "absolute",
      left: `${x}px`,
      top: `${y}px`,
      width: `${w}px`,
      height: `${h}px`,
      borderRadius: h === w ? "9999px" : "2px",
      background: `linear-gradient(135deg, ${a}, ${b})`,
      boxShadow: `0 0 8px ${a}`,
    });
    layer.appendChild(piece);
    const dx = (Math.random() - 0.5) * 260;
    const up = 80 + Math.random() * 160;
    const anim = piece.animate(
      [
        { transform: "translate(0,0) rotate(0deg)", opacity: 1 },
        {
          transform: `translate(${dx * 0.6}px, ${-up}px) rotate(${180 + Math.random() * 180}deg)`,
          opacity: 1,
          offset: 0.4,
        },
        {
          transform: `translate(${dx}px, ${220 + Math.random() * 120}px) rotate(${360 + Math.random() * 360}deg)`,
          opacity: 0,
        },
      ],
      { duration: 1300 + Math.random() * 600, easing: "cubic-bezier(0.25, 1, 0.5, 1)" },
    );
    anim.onfinish = () => {
      done += 1;
      if (done === pieces) layer.remove();
    };
  }
}

/** Real outline of each element while a reduced-motion highlight is showing. */
const savedOutline = new WeakMap<HTMLElement, string>();

/** Briefly outline `el` in blue, restoring its own outline afterwards. Re-entrant. */
function flashOutline(el: HTMLElement): void {
  if (savedOutline.has(el)) return; // a restore is already pending
  savedOutline.set(el, el.style.outline);
  el.style.outline = "2px solid hsl(235, 85%, 65%)";
  window.setTimeout(() => {
    el.style.outline = savedOutline.get(el) ?? "";
    savedOutline.delete(el);
  }, 1200);
}

/**
 * SIH page: typing "sih" bursts gradient confetti out of every element matching
 * `selector` (the results header is marked `data-sih-winner`). If none is on screen
 * the first one is scrolled into view first. Reduced motion: a brief blue outline
 * instead. Returns `fire()` to trigger it manually.
 */
export function useSihConfetti({
  selector = "[data-sih-winner]",
  pieces = 36,
  enabled = true,
}: SihConfettiOptions = {}) {
  const reduced = useReducedMotion();
  const fire = useCallback(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>(selector));
    const burst = () => {
      for (const el of els) {
        if (reduced) {
          flashOutline(el);
        } else {
          burstConfetti(el, pieces);
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
    els[0]?.scrollIntoView({ block: "center", behavior: reduced ? "auto" : "smooth" });
    window.setTimeout(burst, reduced ? 50 : 700);
  }, [selector, pieces, reduced]);
  useKeySequence("sih", fire, { enabled });
  return { fire };
}
