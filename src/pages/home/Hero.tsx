import { motion } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/Button";
import { Ticker } from "@/components/Ticker";
import { verifiedFacts } from "@/content/facts";
import { heroVideo, site } from "@/content/site";
import { useFactTicker } from "@/features/eggs/FactCard";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/cn";

/** The name is Robo + gyaan; on narrow screens the mark breaks there. */
const WORD_PARTS = ["ROBO", "GYAN"] as const;
const EASE = [0.25, 1, 0.5, 1] as const;
/** How many facts ride the tape (a 60s loop over 72 facts would be unreadable). */
const TICKER_COUNT = 28;

/** Fisher–Yates, once per page load. */
function shuffle<T>(list: T[]): T[] {
  const out = [...list];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j]!, out[i]!];
  }
  return out;
}

/**
 * The one memorable thing on the site: the wordmark cut out of solid ink with the lab
 * video playing through the letters.
 *
 * Knockout: the video sits behind; an ink box with white text is composited with
 * `mix-blend-mode: multiply`, so black stays black and the white letters reveal the
 * video. Reduced motion pauses the video on its poster; if the video fails to load the
 * blend is dropped and the letters stay white.
 *
 * Load sequence (≤ 1.2 s, once): letters rise with a 40 ms stagger, the video fades
 * in behind them, then the kapton ticker slides in from the left.
 */
export function Hero() {
  const reduced = useReducedMotion();
  const [videoFailed, setVideoFailed] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Media `error` events can fire before React's own listener is attached, so check
  // the element's error state directly as well as listening natively.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const fail = () => setVideoFailed(true);
    if (v.error) fail();
    v.addEventListener("error", fail);
    return () => v.removeEventListener("error", fail);
  }, []);
  const facts = useMemo(() => shuffle(verifiedFacts()).slice(0, TICKER_COUNT), []);
  const { items, card } = useFactTicker(facts);
  const knockout = !videoFailed;

  return (
    <section
      aria-labelledby="hero-title"
      className="relative flex min-h-[92svh] flex-col overflow-hidden bg-ink"
    >
      {/* The video only lives behind the wordmark band, so object-cover centres on
          the brightest part of the footage rather than the dark ceiling. */}
      <div className="relative isolate">
        {!videoFailed && (
          <motion.video
            ref={videoRef}
            className="absolute inset-0 -z-10 size-full object-cover"
            src={heroVideo.src}
            poster={heroVideo.poster}
            muted
            playsInline
            loop
            autoPlay={!reduced}
            preload="metadata"
            aria-hidden="true"
            tabIndex={-1}
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "linear" }}
          />
        )}

        {/* Knockout layer: ink everywhere except inside the letters. */}
        <div
          className={cn(
            "bg-ink px-4 pt-10 pb-6 md:px-6 md:pt-14 md:pb-10",
            knockout && "mix-blend-multiply",
          )}
        >
          <h1
            id="hero-title"
            className="font-display text-text lg:text-hero lg:whitespace-nowrap"
            style={{ letterSpacing: "-0.04em" }}
          >
            <span className="sr-only">{site.name}</span>
            {/* Below md the mark breaks at its etymology (Robo + gyaan) so each half can be
              twice the size; from lg up it is one line. */}
            <span aria-hidden="true" className="flex flex-col lg:flex-row">
              {WORD_PARTS.map((part, p) => (
                <span
                  key={part}
                  className="flex text-[min(34vw,16rem)] leading-[0.85] lg:text-hero lg:leading-[0.85]"
                >
                  {part.split("").map((letter, i) => {
                    const n = p * WORD_PARTS[0]!.length + i;
                    return (
                      <motion.span
                        key={`${letter}-${n}`}
                        className="inline-block"
                        initial={reduced ? false : { y: "0.35em", opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.55, delay: n * 0.04, ease: EASE }}
                      >
                        {letter}
                      </motion.span>
                    );
                  })}
                </span>
              ))}
            </span>
          </h1>
        </div>
      </div>

      <div className="flex-1" />

      <div className="px-4 pb-12 md:px-6 md:pb-16">
        <div className="mx-auto w-full max-w-site">
          <p className="text-2xl font-display md:text-3xl">Experience engineering.</p>
          <p className="mt-3 max-w-prose text-lg text-text-muted">
            The oldest technical society of ADGIPS, building robots in Block 5 since{" "}
            {site.foundedYear}.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/contact" size="lg">
              Join the lab
            </Button>
            <Button href="/sih#results" variant="secondary" size="lg">
              SIH 2026 results
            </Button>
          </div>
        </div>
      </div>

      {/* Kapton ticker at the hero's bottom edge. The rotated tape is wider than the
          viewport; the overflow-hidden wrapper keeps it from widening the page. */}
      <motion.div
        className="-mx-px overflow-hidden"
        initial={reduced ? false : { x: "-100%" }}
        animate={{ x: 0 }}
        transition={{ duration: 0.5, delay: 0.7, ease: EASE }}
      >
        <Ticker items={items} speed={100} />
      </motion.div>
      {card}
    </section>
  );
}
