import { useEffect, useRef } from "react";
import { isTypingTarget } from "@/hooks/useKeySequence";
import { eggToast } from "./eggToast";

export const END_OF_LINE_MESSAGE =
  "You've reached the end of the line. The lab is in the basement of Block 5.";

/** The push must come within this long of reaching the bottom. */
const WINDOW_MS = 3000;
/** Pushes this soon after reaching the bottom are the same gesture (or its inertia). */
const SETTLE_MS = 1000;
/** A push only counts if the page has not scrolled for this long. */
const QUIET_MS = 250;
const COOLDOWN_MS = 30_000;

function atBottom(): boolean {
  const doc = document.documentElement;
  return window.innerHeight + window.scrollY >= doc.scrollHeight - 2;
}

/** Keys pressed on these mean something else (Space activates a button). */
function isControlTarget(target: EventTarget | null): boolean {
  return (
    isTypingTarget(target) ||
    (target instanceof Element && target.closest("button, a, [role=button]") !== null)
  );
}

/**
 * Reaching the bottom of the page, then deliberately pushing on (a fresh wheel
 * gesture, a swipe, or End/PageDown/Space outside fields and buttons) shows "end of
 * the line". Trackpad inertia does not count: pushes within 1 s of arriving, while
 * the page is still scrolling, or inside a continuous wheel stream are ignored.
 * 30 s cooldown.
 */
export function EndOfLineEgg() {
  const reachedAt = useRef(0);
  const lastScroll = useRef(0);
  const lastWheel = useRef(0);
  const lastShown = useRef(0);
  const wasAtBottom = useRef(false);

  useEffect(() => {
    const push = () => {
      const now = performance.now();
      if (!atBottom() || !reachedAt.current) return;
      const since = now - reachedAt.current;
      if (since < SETTLE_MS || since > WINDOW_MS) return;
      if (now - lastScroll.current < QUIET_MS) return;
      if (Date.now() - lastShown.current < COOLDOWN_MS) return;
      lastShown.current = Date.now();
      reachedAt.current = 0;
      eggToast("End of the line", END_OF_LINE_MESSAGE);
    };
    const onScroll = () => {
      const now = performance.now();
      lastScroll.current = now;
      const bottom = atBottom();
      if (bottom && !wasAtBottom.current) reachedAt.current = now;
      if (!bottom) reachedAt.current = 0;
      wasAtBottom.current = bottom;
    };
    const onWheel = (e: WheelEvent) => {
      const now = performance.now();
      // Only the first event of a new wheel gesture counts; inertia streams are continuous.
      const fresh = now - lastWheel.current > QUIET_MS;
      lastWheel.current = now;
      if (fresh && e.deltaY > 0) push();
    };
    let touchY = 0;
    let swiped = false;
    const onTouchStart = (e: TouchEvent) => {
      touchY = e.touches[0]?.clientY ?? 0;
      swiped = false;
    };
    const onTouchMove = (e: TouchEvent) => {
      const y = e.touches[0]?.clientY ?? 0;
      if (!swiped && touchY - y > 30) {
        swiped = true;
        push();
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (isControlTarget(e.target)) return;
      if (e.key === "End" || e.key === "PageDown" || (e.key === " " && !e.shiftKey)) push();
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  return null;
}
