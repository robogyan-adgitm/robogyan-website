import { useEffect, useRef } from "react";
import { useToast } from "@/components/Toast";

export const END_OF_LINE_MESSAGE = "You've reached the end of the line. The lab is in Block 5.";

const WINDOW_MS = 2000;
const COOLDOWN_MS = 30_000;

function atBottom(): boolean {
  const doc = document.documentElement;
  return window.innerHeight + window.scrollY >= doc.scrollHeight - 2;
}

/**
 * Egg 9: hitting the bottom of the page twice within 2 s (arriving there, then pushing
 * on with the wheel, a swipe or End/PageDown) shows "end of the line". 30 s cooldown.
 */
export function EndOfLineEgg() {
  const toast = useToast();
  const hits = useRef<number[]>([]);
  const lastShown = useRef(0);
  const wasAtBottom = useRef(false);
  const lastPush = useRef(0);

  useEffect(() => {
    const hit = () => {
      const now = Date.now();
      hits.current = [...hits.current.filter((t) => now - t < WINDOW_MS), now];
      if (hits.current.length >= 2 && now - lastShown.current > COOLDOWN_MS) {
        hits.current = [];
        lastShown.current = now;
        toast.show({ title: "End of the line", body: END_OF_LINE_MESSAGE });
      }
    };
    // A "push" while already at the bottom counts at most every 400 ms.
    const push = () => {
      const now = Date.now();
      if (!atBottom() || now - lastPush.current < 400) return;
      lastPush.current = now;
      hit();
    };
    const onScroll = () => {
      const bottom = atBottom();
      if (bottom && !wasAtBottom.current) {
        lastPush.current = Date.now();
        hit();
      }
      wasAtBottom.current = bottom;
    };
    const onWheel = (e: WheelEvent) => e.deltaY > 0 && push();
    let touchY = 0;
    const onTouchStart = (e: TouchEvent) => (touchY = e.touches[0]?.clientY ?? 0);
    const onTouchMove = (e: TouchEvent) => {
      const y = e.touches[0]?.clientY ?? 0;
      if (touchY - y > 30) push();
    };
    const onKey = (e: KeyboardEvent) => {
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
  }, [toast]);

  return null;
}
