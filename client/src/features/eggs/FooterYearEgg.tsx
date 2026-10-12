import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

/**
 * Wraps the footer year. Clicking it (or Enter/Space) reveals the society's numbers,
 * computed from the site's data, in a small glass card. Esc, a click outside or 8 s
 * hides them. At rest it is indistinguishable from the plain year.
 */
export function FooterYearEgg({ year }: { year: number }) {
  const [open, setOpen] = useState(false);
  const [lines, setLines] = useState<string[]>([]);
  const wrapRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!open) return;
    // Reads cached live data or the bundle; never waits on the network (see footerStats.ts).
    let live = true;
    void import("./footerStats").then((m) => live && setLines(m.footerStats()));
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onDown = (e: PointerEvent) => {
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

  return (
    <span ref={wrapRef} className="relative">
      <button
        type="button"
        data-testid="footer-year"
        className="cursor-text select-none"
        aria-expanded={open}
        aria-label={`${year}. Click for a few numbers`}
        onClick={() => setOpen((o) => !o)}
      >
        {year}
      </button>
      <AnimatePresence>
        {open && lines.length > 0 && (
          <motion.span
            role="status"
            className="rg-glass-panel absolute bottom-full left-1/2 z-20 mb-3 block w-64 -translate-x-1/2 rounded-xl p-4 text-left text-sm"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.2 }}
          >
            <span className="gradient-text mb-2 block font-orbitron text-xs font-bold uppercase tracking-wider">
              By the numbers
            </span>
            {lines.map((line) => (
              <span key={line} className="block py-0.5 text-gray-300">
                {line}
              </span>
            ))}
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}
