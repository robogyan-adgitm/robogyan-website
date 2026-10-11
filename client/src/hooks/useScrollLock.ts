import { useEffect } from "react";

let locks = 0;

/** Lock page scroll while `active` (nested locks are reference-counted). */
export function useScrollLock(active: boolean): void {
  useEffect(() => {
    if (!active) return;
    locks += 1;
    const root = document.documentElement;
    if (locks === 1) {
      const gap = window.innerWidth - root.clientWidth;
      root.style.overflow = "hidden";
      if (gap > 0) root.style.paddingRight = `${gap}px`;
    }
    return () => {
      locks -= 1;
      if (locks === 0) {
        root.style.overflow = "";
        root.style.paddingRight = "";
      }
    };
  }, [active]);
}
