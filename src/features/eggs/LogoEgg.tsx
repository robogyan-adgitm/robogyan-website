import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { collegeEras, eraYears, lab } from "@/content/site";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { emitEgg, useEggEvent } from "./bus";

const CLICKS = 5;
const WINDOW_MS = 3000;
const STEP_MS = 1100;

/**
 * Click handler for the Navbar logo: 5 clicks within 3 s fires the "logo" egg.
 * Normal navigation still happens on every click.
 */
export function useLogoEggTrigger(): () => void {
  const clicks = useRef<number[]>([]);
  return useCallback(() => {
    const now = Date.now();
    clicks.current = [...clicks.current.filter((t) => now - t < WINDOW_MS), now];
    if (clicks.current.length >= CLICKS) {
      clicks.current = [];
      emitEgg("logo");
    }
  }, []);
}

const steps = [
  ...collegeEras.map((e) => ({ key: e.short, title: e.short, sub: `${eraYears(e)} · ${e.name}` })),
  { key: "lab", title: "Same lab.", sub: `${lab.block}, since ${collegeEras[0]?.from ?? 2009}.` },
];

/**
 * Egg 4: the "R" flips and the three college names play in sequence
 * (NIEC → ADGITM → ADGIPS), then "Same lab, Block 5". Click or Esc to dismiss.
 */
export function LogoEgg() {
  const [step, setStep] = useState<number | null>(null);
  const reduced = useReducedMotion();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEggEvent("logo", () => setStep(0));

  useEffect(() => {
    if (step === null) return;
    closeRef.current?.focus({ preventScroll: true });
    const t = window.setTimeout(
      () => setStep((s) => (s === null || s >= steps.length - 1 ? null : s + 1)),
      step === steps.length - 1 ? STEP_MS * 1.6 : STEP_MS,
    );
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setStep(null);
    window.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("keydown", onKey);
    };
  }, [step]);

  const current = step !== null ? steps[step] : undefined;

  return (
    <AnimatePresence>
      {current && (
        <motion.div
          key="logo-egg"
          role="dialog"
          aria-modal="true"
          aria-label="Robogyan through the years"
          className="fixed inset-0 z-[70] flex flex-col items-center justify-center gap-8 bg-ink px-6 text-center"
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={() => setStep(null)}
        >
          <motion.span
            aria-hidden="true"
            className="block text-[10rem] leading-none font-display text-text"
            initial={reduced ? false : { rotateY: 0 }}
            animate={reduced ? undefined : { rotateY: 360 }}
            transition={{ duration: 0.9, ease: [0.25, 1, 0.5, 1] }}
            style={{ transformPerspective: 600 }}
          >
            R
          </motion.span>
          <div aria-live="polite" className="min-h-28">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.key}
                initial={reduced ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduced ? { opacity: 0 } : { opacity: 0, y: -8 }}
                transition={{ duration: 0.18 }}
              >
                <p className="text-4xl font-display text-kapton">{current.title}</p>
                <p className="mt-3 text-lg font-condensed text-text-muted">{current.sub}</p>
              </motion.div>
            </AnimatePresence>
          </div>
          <button
            ref={closeRef}
            type="button"
            className="cursor-pointer text-sm font-condensed text-text-muted underline-offset-4 hover:underline"
            onClick={() => setStep(null)}
          >
            Close
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
