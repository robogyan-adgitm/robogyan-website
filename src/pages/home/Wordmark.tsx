import { animate, motion, useMotionValue, useTransform, type MotionValue } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useMedia } from "@/hooks/useMedia";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/cn";

/** The name is Robo + gyaan; on narrow screens the mark breaks there. */
const WORD_PARTS = ["ROBO", "GYAN"] as const;
const LETTERS = WORD_PARTS.join("").split("");
const EASE = [0.25, 1, 0.5, 1] as const;
const SPRING = { type: "spring", stiffness: 500, damping: 22 } as const;
const IDLE_MS = 8000;

/** wdth 100 → 80 → 100: the letter breathes in. */
function squeeze(wdth: MotionValue<number>, duration: number) {
  return animate(wdth, [100, 80, 100], { duration, ease: "easeInOut", times: [0, 0.45, 1] });
}

interface LetterProps {
  letter: string;
  index: number;
  hovered: number | null;
  flips: number;
  wdth: MotionValue<number>;
  live: boolean;
  reduced: boolean;
  onEnter: (i: number) => void;
  onFlip: (i: number) => void;
}

/**
 * One letter, three layers:
 * - outer: the load-in rise, and the stable hit box (it never moves, so hovering
 *   doesn't jitter as the glyph rises or narrows);
 * - a hidden wdth-100 ghost in the same grid cell, so a squeezing glyph doesn't
 *   shift its neighbours;
 * - the glyph: spring rise (hovered 10px, neighbours 3px after 60ms), Y flip on
 *   click, kapton on hover (CSS colour transition), and its own wdth motion value.
 */
function Letter({
  letter,
  index,
  hovered,
  flips,
  wdth,
  live,
  reduced,
  onEnter,
  onFlip,
}: LetterProps) {
  const settings = useTransform(wdth, (v) => `"wdth" ${v.toFixed(1)}, "opsz" 96`);
  const distance = hovered === null ? Infinity : Math.abs(hovered - index);
  const lift = !live ? 0 : distance === 0 ? -10 : distance === 1 ? -3 : 0;
  const isHovered = distance === 0;

  return (
    <motion.span
      className="inline-grid"
      data-letter={index}
      initial={reduced ? false : { y: "0.35em", opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.55, delay: index * 0.04, ease: EASE }}
      onPointerEnter={(e) => e.pointerType === "mouse" && onEnter(index)}
      onClick={() => onFlip(index)}
    >
      <span
        className="invisible col-start-1 row-start-1"
        style={{ fontVariationSettings: '"wdth" 100, "opsz" 96' }}
      >
        {letter}
      </span>
      <motion.span
        className={cn(
          "col-start-1 row-start-1 inline-block justify-self-center transition-colors duration-150 active:text-kapton",
          isHovered ? "text-kapton" : "text-text",
        )}
        data-hovered={isHovered ? "true" : undefined}
        style={{ fontVariationSettings: settings, transformPerspective: 900 }}
        animate={{ y: lift, rotateY: flips * 360 }}
        transition={{
          y: { ...SPRING, delay: distance === 1 && lift !== 0 ? 0.06 : 0 },
          rotateY: { duration: 0.5, ease: EASE },
        }}
      >
        {letter}
      </motion.span>
    </motion.span>
  );
}

/**
 * The solid "ROBOGYAN" wordmark on the dot grid. Each letter answers the pointer:
 * hover lifts it 10px, turns it kapton and squeezes its width (neighbours ripple up
 * 3px); click flips it. Every ~8s one random letter squeezes on its own.
 * Touch: tap colour only (plus the flip). Reduced motion: hover changes colour only.
 */
export function Wordmark() {
  const reduced = useReducedMotion();
  const fine = useMedia("(hover: hover) and (pointer: fine)");
  const live = fine && !reduced;
  const [hovered, setHovered] = useState<number | null>(null);
  const [flips, setFlips] = useState<number[]>(() => LETTERS.map(() => 0));

  // One wdth value per letter (fixed count, so hooks are called in a stable order).
  const w0 = useMotionValue(100);
  const w1 = useMotionValue(100);
  const w2 = useMotionValue(100);
  const w3 = useMotionValue(100);
  const w4 = useMotionValue(100);
  const w5 = useMotionValue(100);
  const w6 = useMotionValue(100);
  const w7 = useMotionValue(100);
  const widths = [w0, w1, w2, w3, w4, w5, w6, w7];
  const widthsRef = useRef(widths);
  const hoveredRef = useRef(hovered);
  useEffect(() => {
    hoveredRef.current = hovered;
  }, [hovered]);

  // Idle: every ~8s one random letter (not the hovered one) squeezes.
  useEffect(() => {
    if (reduced) return;
    const id = window.setInterval(() => {
      if (document.hidden) return;
      const options = LETTERS.map((_, i) => i).filter((i) => i !== hoveredRef.current);
      const pick = options[Math.floor(Math.random() * options.length)];
      const mv = pick === undefined ? undefined : widthsRef.current[pick];
      if (mv && !mv.isAnimating()) squeeze(mv, 0.6);
    }, IDLE_MS);
    return () => window.clearInterval(id);
  }, [reduced]);

  const enter = (i: number) => {
    setHovered(i);
    const mv = widthsRef.current[i];
    if (live && mv) squeeze(mv, 0.45);
  };

  const flip = (i: number) => {
    if (reduced) return;
    setFlips((f) => f.map((n, j) => (j === i ? n + 1 : n)));
  };

  return (
    <h1
      id="hero-title"
      aria-label="Robogyan"
      className="font-display text-text select-none lg:whitespace-nowrap"
      style={{ letterSpacing: "-0.04em" }}
    >
      {/* Below lg the mark breaks at its etymology (Robo + gyaan) so each half can be
          twice the size; from lg up it is one line. */}
      <span
        aria-hidden="true"
        className="flex flex-col lg:flex-row"
        onPointerLeave={() => setHovered(null)}
      >
        {WORD_PARTS.map((part, p) => (
          <span
            key={part}
            className="flex text-[min(34vw,16rem)] leading-[0.85] lg:text-hero lg:leading-[0.85]"
          >
            {part.split("").map((letter, i) => {
              const n = p * WORD_PARTS[0].length + i;
              return (
                <Letter
                  key={n}
                  letter={letter}
                  index={n}
                  hovered={hovered}
                  flips={flips[n] ?? 0}
                  wdth={widths[n]!}
                  live={live}
                  reduced={reduced}
                  onEnter={enter}
                  onFlip={flip}
                />
              );
            })}
          </span>
        ))}
      </span>
    </h1>
  );
}
