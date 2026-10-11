import { useEffect, useRef, useState, type PointerEvent } from "react";

const LONG_PRESS_MS = 800;

/**
 * Egg 8: wraps the footer year. Long-press (800 ms) or Shift+click reveals the
 * society's numbers, computed from content. Esc or a click outside hides them.
 */
export function FooterYearEgg({ year }: { year: number }) {
  const [open, setOpen] = useState(false);
  const [lines, setLines] = useState<string[]>([]);
  const timer = useRef<number | null>(null);
  const fired = useRef(false);
  const wrapRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!open) return;
    // Content modules load only when the egg fires (see footerStats.ts).
    let live = true;
    void import("./footerStats").then((m) => live && setLines(m.footerStats()));
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onDown = (e: globalThis.PointerEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const t = window.setTimeout(() => setOpen(false), 8000);
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onDown);
    return () => {
      live = false;
      window.clearTimeout(t);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onDown);
    };
  }, [open]);

  const clear = () => {
    if (timer.current !== null) window.clearTimeout(timer.current);
    timer.current = null;
  };

  const onPointerDown = (e: PointerEvent) => {
    if (e.button !== 0) return;
    fired.current = false;
    clear();
    timer.current = window.setTimeout(() => {
      fired.current = true;
      setOpen(true);
    }, LONG_PRESS_MS);
  };

  return (
    <span ref={wrapRef} className="relative inline-block">
      <button
        type="button"
        className="cursor-default tabular select-none"
        aria-expanded={open}
        aria-label={`${year}. Shift+click for a few numbers`}
        onPointerDown={onPointerDown}
        onPointerUp={clear}
        onPointerLeave={clear}
        // Touch long-press would otherwise open the context menu before 800 ms.
        onContextMenu={(e) => e.preventDefault()}
        onClick={(e) => {
          if (e.shiftKey) setOpen((o) => !o);
        }}
      >
        {year}
      </button>
      {open && lines.length > 0 && (
        <span
          role="status"
          className="absolute bottom-full left-0 z-20 mb-3 block w-64 bg-kapton p-4 text-sm font-condensed text-kapton-ink chamfer"
        >
          {lines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </span>
      )}
    </span>
  );
}
