import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { randomFact } from "@/data/facts";
import { currentFacts } from "@/pb/content";
import { useKeySequence } from "@/hooks/useKeySequence";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { emitEgg, hasUserInteracted, useEggEvent } from "./bus";
import { eggToast } from "./eggToast";
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
  let ctx: AudioContext;
  try {
    ctx = new Ctx();
  } catch {
    return; // Audio is a garnish; ignore failures.
  }
  let closed = false;
  const close = () => {
    if (closed) return;
    closed = true;
    ctx.close().catch(() => {});
  };
  // Always release the context, even if `ended` never fires (suspended context).
  window.setTimeout(close, 400);
  const beep = () => {
    if (closed) return;
    // Safari can leave a new context suspended; then there is nothing to play.
    if (ctx.state !== "running") {
      close();
      return;
    }
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "square";
      osc.frequency.value = 440;
      gain.gain.setValueAtTime(0.0001, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.08, ctx.currentTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.25);
      osc.connect(gain).connect(ctx.destination);
      osc.onended = close;
      osc.start();
      osc.stop(ctx.currentTime + 0.3);
    } catch {
      close();
    }
  };
  if (ctx.state === "running") beep();
  else ctx.resume().then(beep, close);
}

const DRIVE_S = 4;

function factToast() {
  eggToast("Beep. A fact from the lab", randomFact(undefined, currentFacts()).text, 8000);
}

/**
 * The Konami code sends a line-follower along a blue→purple line on the bottom edge
 * of the viewport (4 s); it honks once, leaves, and a toast shows a random fact.
 * Esc sends it home early. Reduced motion: no drive, just the toast.
 * Also triggerable with `emitEgg("konami")`.
 */
export function KonamiBot() {
  const [run, setRun] = useState(0);
  const reduced = useReducedMotion();

  const start = () => {
    if (reduced) {
      factToast();
      return;
    }
    setRun((r) => (r === 0 ? Date.now() : r));
  };
  useKonami(() => emitEgg("konami"));
  useEggEvent("konami", start);

  useEffect(() => {
    if (!run) return;
    const honkTimer = window.setTimeout(honk, (0.3 + DRIVE_S / 2) * 1000);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setRun(0);
    window.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(honkTimer);
      window.removeEventListener("keydown", onKey);
    };
  }, [run]);

  if (!run) return null;

  const finish = () => {
    setRun(0);
    factToast();
  };

  return (
    <div
      aria-hidden="true"
      data-testid="konami-bot"
      className="pointer-events-none fixed inset-x-0 bottom-0 z-[65] h-20 overflow-hidden"
    >
      <motion.span
        className="absolute inset-x-0 bottom-[38px] block h-[2px] origin-left rounded-full bg-gradient-to-r from-[hsl(235,85%,65%)] to-[hsl(275,85%,70%)] shadow-[0_0_12px_hsl(235,85%,65%,0.6)]"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: [0, 1, 1, 0] }}
        transition={{ duration: DRIVE_S + 0.6, times: [0, 0.12, 0.85, 1] }}
      />
      <motion.div
        key={run}
        className="absolute bottom-[15px] left-0"
        initial={{ x: -90 }}
        animate={{ x: window.innerWidth + 10 }}
        transition={{ duration: DRIVE_S, ease: "linear", delay: 0.3 }}
        onAnimationComplete={finish}
      >
        <LineFollower size={64} />
      </motion.div>
    </div>
  );
}
