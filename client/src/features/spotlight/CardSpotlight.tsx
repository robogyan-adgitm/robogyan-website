import { useEffect } from "react";
import { usePointerEffects } from "@/hooks/useFinePointer";

const CARDS = ".card-hover, .glassmorphism";
/** Glass used as chrome rather than as a card: the navbar, buttons, the mobile menu. */
const SKIP = "nav, button, a, [role=button], [data-no-spotlight]";
const MIN_SIZE = 72;

/** Per-element verdict: can it host the spotlight pseudo-elements without side effects? */
const verdicts = new WeakMap<Element, boolean>();

function canHost(el: HTMLElement): boolean {
  const cached = verdicts.get(el);
  if (cached !== undefined) return cached;
  let ok = !el.matches(SKIP) && !el.closest("nav");
  const rect = el.getBoundingClientRect();
  if (ok && (rect.width < MIN_SIZE || rect.height < MIN_SIZE)) ok = false;
  // Leave elements that already draw their own ::before / ::after alone.
  if (ok) {
    const before = getComputedStyle(el, "::before").content;
    const after = getComputedStyle(el, "::after").content;
    if ((before && before !== "none") || (after && after !== "none")) ok = false;
  }
  // The pseudo-elements need a positioned host. Making a static element `relative` is
  // only safe if no absolutely positioned descendant was anchored further out.
  if (ok && getComputedStyle(el).position === "static") {
    for (const child of Array.from(el.querySelectorAll<HTMLElement>("*"))) {
      const pos = getComputedStyle(child).position;
      if ((pos === "absolute" || pos === "fixed") && !el.contains(child.offsetParent)) {
        ok = false;
        break;
      }
    }
  }
  verdicts.set(el, ok);
  return ok;
}

/**
 * Card spotlight: one delegated `pointermove` on the document finds the card under the
 * pointer (`.card-hover` / `.glassmorphism`) and feeds it `--mx` / `--my`; CSS in
 * index.css draws a soft blue highlight on the card's 1px border plus a faint fill
 * that follows the pointer. No per-card React state. Desktop pointers only.
 */
export default function CardSpotlight() {
  const on = usePointerEffects();

  useEffect(() => {
    if (!on) return;
    let active: HTMLElement | null = null;
    let raf = 0;
    let pending: { el: HTMLElement; x: number; y: number } | null = null;

    const release = () => {
      if (!active) return;
      active.removeAttribute("data-rg-spot");
      active = null;
    };

    const flush = () => {
      raf = 0;
      if (!pending) return;
      const { el, x, y } = pending;
      pending = null;
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${(x - r.left).toFixed(1)}px`);
      el.style.setProperty("--my", `${(y - r.top).toFixed(1)}px`);
      if (active !== el) {
        release();
        active = el;
        // The host attribute stays, so the highlight can fade out after the pointer leaves.
        if (!el.hasAttribute("data-rg-spot-host")) {
          // canHost() checked that a static host can safely become `relative`.
          if (getComputedStyle(el).position === "static") el.style.position = "relative";
          el.setAttribute("data-rg-spot-host", "");
        }
        el.setAttribute("data-rg-spot", "");
      }
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const target = e.target instanceof Element ? e.target : null;
      let card = target?.closest<HTMLElement>(CARDS) ?? null;
      // Nested glass (a glass chip inside a glass card): use the outermost host that works.
      while (card && !canHost(card)) {
        card = card.parentElement?.closest<HTMLElement>(CARDS) ?? null;
      }
      if (!card) {
        pending = null;
        release();
        return;
      }
      pending = { el: card, x: e.clientX, y: e.clientY };
      if (!raf) raf = requestAnimationFrame(flush);
    };
    const onOut = (e: MouseEvent) => !e.relatedTarget && release();

    document.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("mouseout", onOut);
    return () => {
      cancelAnimationFrame(raf);
      release();
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("mouseout", onOut);
    };
  }, [on]);

  return null;
}
