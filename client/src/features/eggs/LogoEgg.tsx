import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useScrollLock } from "@/hooks/useScrollLock";
import { emitEgg, useEggEvent } from "./bus";

const CLICKS = 5;
const WINDOW_MS = 3000;
const STEP_MS = 1300;

/**
 * Click handler for the ROBOGYAN wordmark: 5 clicks within 3 s fires the "logo" egg.
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

/** The college has been renamed twice; the lab never moved. */
const steps = [
  { key: "niec", title: "NIEC", sub: "Northern India Engineering College" },
  {
    key: "adgitm",
    title: "ADGITM",
    sub: "Dr. Akhilesh Das Gupta Institute of Technology & Management",
  },
  {
    key: "adgips",
    title: "ADGIPS",
    sub: "Dr. Akhilesh Das Gupta Institute of Professional Studies",
  },
  { key: "lab", title: "Same lab.", sub: "Basement, 5th Block. Experience Engineering!" },
];

/**
 * 5 clicks on the wordmark: a glass card where the "R" flips and the three college
 * names play in sequence (NIEC, ADGITM, ADGIPS), then "Same lab." A click anywhere,
 * Esc or the Close button dismisses it.
 */
export function LogoEgg() {
  const [step, setStep] = useState<number | null>(null);
  const reduced = useReducedMotion();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEggEvent("logo", () => setStep(0));
  useScrollLock(step !== null);

  useEffect(() => {
    if (step === null) return;
    closeRef.current?.focus({ preventScroll: true });
    const t = window.setTimeout(
      () => setStep((s) => (s === null || s >= steps.length - 1 ? null : s + 1)),
      step === steps.length - 1 ? STEP_MS * 1.8 : STEP_MS,
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
          data-testid="logo-egg"
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/70 px-6 backdrop-blur-sm"
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={() => setStep(null)}
        >
          <motion.div
            className="rg-glass-panel w-full max-w-lg rounded-xl px-8 py-10 text-center shadow-2xl shadow-[hsl(235,85%,65%,0.25)]"
            initial={reduced ? false : { scale: 0.94, y: 12 }}
            animate={{ scale: 1, y: 0 }}
            exit={reduced ? undefined : { scale: 0.96, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
          >
            <motion.span
              aria-hidden="true"
              className="gradient-text inline-block font-russo text-[7rem] leading-none sm:text-[9rem]"
              initial={reduced ? false : { rotateY: 0 }}
              animate={reduced ? undefined : { rotateY: 360 }}
              transition={{ duration: 0.9, ease: [0.25, 1, 0.5, 1] }}
              style={{ transformPerspective: 600 }}
            >
              R
            </motion.span>
            <div aria-live="polite" className="mt-6 min-h-28">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.key}
                  initial={reduced ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduced ? { opacity: 0 } : { opacity: 0, y: -8 }}
                  transition={{ duration: 0.18 }}
                >
                  <p className="font-orbitron text-3xl font-bold text-white sm:text-4xl">
                    {current.title}
                  </p>
                  <p className="mt-3 text-base text-gray-300">{current.sub}</p>
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="mt-4 flex justify-center gap-1.5" aria-hidden="true">
              {steps.map((s, i) => (
                <span
                  key={s.key}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === step ? "w-6 bg-[hsl(235,85%,65%)]" : "w-1.5 bg-white/20"
                  }`}
                />
              ))}
            </div>
            <button
              ref={closeRef}
              type="button"
              className="mt-6 text-sm text-gray-400 underline-offset-4 transition-colors hover:text-[hsl(235,85%,65%)] hover:underline"
              onClick={() => setStep(null)}
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
