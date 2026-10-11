import { useEffect, useRef } from "react";
import { useMedia } from "@/hooks/useMedia";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const INTERACTIVE =
  "a, button, [role=button], input, select, textarea, summary, label, [data-cursor]";
/** Over these the crosshair hides and the native I-beam does the job. */
const TEXT_FIELDS =
  "input:not([type=button]):not([type=submit]):not([type=checkbox]):not([type=radio]):not([type=range]), textarea, [contenteditable=true]";
/** Fired by useDialog when a modal opens or closes (detail: boolean open). */
export const DIALOG_EVENT = "rg:dialog";
const LERP = 0.2;
const ACTIVE_CLASS = "has-custom-cursor";

/**
 * Desktop-only crosshair cursor: two 1px lines and a centre dot in the text colour,
 * trailing the pointer with a 0.2 lerp. Over interactive elements it opens into a 32px
 * ring; over primary buttons (`data-cursor="primary"`) the ring turns kapton.
 *
 * The native cursor is only hidden on `body` (links and buttons keep their own
 * pointer) and only while the custom one is healthy: it comes back when the pointer
 * leaves the window, the tab is hidden, or a modal dialog is open (useDialog announces
 * open/close so the swap is immediate, not on the next move). Over text fields the
 * crosshair hides so only the native I-beam shows. Not rendered for touch / coarse
 * pointers or with reduced motion.
 */
export function Cursor() {
  const fine = useMedia("(hover: hover) and (pointer: fine)");
  const reduced = useReducedMotion();
  if (!fine || reduced) return null;
  return <CursorImpl />;
}

function CursorImpl() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const body = document.body;
    let tx = 0;
    let ty = 0;
    let x = 0;
    let y = 0;
    let raf = 0;
    let visible = false;

    const render = () => {
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    };

    const tick = () => {
      raf = 0;
      x += (tx - x) * LERP;
      y += (ty - y) * LERP;
      if (Math.abs(tx - x) < 0.1 && Math.abs(ty - y) < 0.1) {
        x = tx;
        y = ty;
      } else {
        raf = requestAnimationFrame(tick);
      }
      render();
    };

    const show = (on: boolean) => {
      if (visible === on) return;
      visible = on;
      el.dataset.visible = on ? "true" : "false";
      body.classList.toggle(ACTIVE_CLASS, on);
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      tx = e.clientX;
      ty = e.clientY;
      if (!visible) {
        x = tx;
        y = ty;
        render();
      }
      // A modal dialog sits in the top layer above the cursor: hand back to the native one.
      show(!document.querySelector("dialog[open]"));
      const target = e.target instanceof Element ? e.target.closest(INTERACTIVE) : null;
      const mode = !target
        ? "default"
        : target.matches(TEXT_FIELDS)
          ? "text"
          : target.closest("[data-cursor=primary]")
            ? "primary"
            : "ring";
      if (el.dataset.mode !== mode) el.dataset.mode = mode;
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const hide = () => show(false);
    const onVisibility = () => document.hidden && hide();
    const onDown = () => (el.dataset.pressed = "true");
    const onUp = () => (el.dataset.pressed = "false");
    // Keyboard-opened dialogs: hide now; show again on the next pointer move after close.
    const onDialog = (e: Event) => {
      if ((e as CustomEvent<boolean>).detail) hide();
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    document.documentElement.addEventListener("pointerleave", hide);
    window.addEventListener("blur", hide);
    document.addEventListener("visibilitychange", onVisibility);
    document.addEventListener(DIALOG_EVENT, onDialog);
    return () => {
      cancelAnimationFrame(raf);
      body.classList.remove(ACTIVE_CLASS);
      document.removeEventListener(DIALOG_EVENT, onDialog);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.documentElement.removeEventListener("pointerleave", hide);
      window.removeEventListener("blur", hide);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <div
      ref={ref}
      id="rg-cursor"
      aria-hidden="true"
      data-visible="false"
      data-mode="default"
      className="rg-cursor"
    >
      <span className="rg-cursor-h" />
      <span className="rg-cursor-v" />
      <span className="rg-cursor-dot" />
      <span className="rg-cursor-ring" />
    </div>
  );
}
