import { motion } from "motion/react";
import { useState } from "react";
import { useToast } from "@/components/Toast";
import { randomFact } from "@/content/facts";
import { useKeySequence } from "@/hooks/useKeySequence";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { emitEgg, hasUserInteracted, useEggEvent } from "./bus";
import { LineFollower } from "./LineFollower";

export const KONAMI = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
] as const;

/** Fire `callback` on ↑↑↓↓←→←→BA (outside text fields). */
export function useKonami(callback: () => void): void {
  useKeySequence(KONAMI, callback, { timeout: 2500 });
}

/** One short square-wave beep via WebAudio. No-op until the user has interacted. */
export function honk(): void {
  if (!hasUserInteracted()) return;
  const Ctx =
    window.AudioContext ??
    (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!Ctx) return;
  try {
    const ctx = new Ctx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "square";
    osc.frequency.value = 440;
    gain.gain.setValueAtTime(0.0001, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.08, ctx.currentTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.25);
    osc.connect(gain).connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.3);
    osc.onended = () => void ctx.close();
  } catch {
    // Audio is a garnish; ignore failures.
  }
}

const DRIVE_S = 4;

/**
 * Egg 2: the Konami code sends a line-follower along an amber line on the bottom edge
 * of the viewport (4 s), it honks once, leaves, and a toast shows a random verified fact.
 * Reduced motion: no drive, just the toast. Also triggerable with `emitEgg("konami")`.
 */
export function KonamiBot() {
  const [run, setRun] = useState(0);
  const toast = useToast();
  const reduced = useReducedMotion();

  const start = () => {
    if (reduced) {
      const fact = randomFact();
      toast.show({ title: "Beep. A fact from the lab", body: fact.text });
      return;
    }
    setRun((r) => (r === 0 ? Date.now() : r));
  };
  useKonami(() => emitEgg("konami"));
  useEggEvent("konami", start);

  if (!run) return null;

  const finish = () => {
    setRun(0);
    const fact = randomFact();
    toast.show({ title: "Beep. A fact from the lab", body: fact.text });
  };

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 bottom-0 z-[65] h-16 overflow-hidden"
    >
      <motion.span
        className="absolute inset-x-0 bottom-5 block h-1 origin-left bg-kapton"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: [0, 1, 1, 0] }}
        transition={{ duration: DRIVE_S + 0.6, times: [0, 0.12, 0.85, 1] }}
      />
      <motion.div
        key={run}
        className="absolute bottom-1 left-0 text-text"
        initial={{ x: -90 }}
        animate={{ x: window.innerWidth + 10 }}
        transition={{ duration: DRIVE_S, ease: "linear", delay: 0.3 }}
        onAnimationStart={() => window.setTimeout(honk, (0.3 + DRIVE_S / 2) * 1000)}
        onAnimationComplete={finish}
      >
        <LineFollower size={64} />
      </motion.div>
    </div>
  );
}
