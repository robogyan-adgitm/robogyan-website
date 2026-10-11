import { motion } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/Button";
import { Chip } from "@/components/Chip";
import { Ticker } from "@/components/Ticker";
import { verifiedFacts } from "@/content/facts";
import { heroVideo, lab, site } from "@/content/site";
import { useFactTicker } from "@/features/eggs/FactCard";
import { useMedia } from "@/hooks/useMedia";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { Wordmark } from "./Wordmark";

const EASE = [0.25, 1, 0.5, 1] as const;
/** How many facts ride the tape (a 60s loop over 72 facts would be unreadable). */
const TICKER_COUNT = 28;
/** Letters finish rising at ~0.85s; the copy follows, then the tape. */
const COPY_DELAY = 0.45;
const TAPE_DELAY = 0.75;

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
 * Lab b-roll as a chamfered panel beside the copy (desktop only; mobile skips the
 * download entirely and Life at RG still has the video). Reduced motion keeps the
 * poster; if the file fails the panel falls back to the poster image.
 */
function LabVideo() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLVideoElement>(null);
  const [failed, setFailed] = useState(false);

  // Media `error` can fire before React attaches its listener: check the element too.
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const fail = () => setFailed(true);
    if (v.error) fail();
    v.addEventListener("error", fail);
    return () => v.removeEventListener("error", fail);
  }, []);

  return (
    <motion.figure
      className="relative aspect-[16/10] overflow-hidden bg-panel chamfer-lg"
      initial={reduced ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: COPY_DELAY + 0.1, ease: "linear" }}
    >
      {failed ? (
        <img
          src={heroVideo.poster}
          alt=""
          className="absolute inset-0 size-full object-cover"
          decoding="async"
        />
      ) : (
        <video
          ref={ref}
          className="absolute inset-0 size-full object-cover"
          src={heroVideo.src}
          poster={heroVideo.poster}
          muted
          playsInline
          loop
          autoPlay={!reduced}
          preload="metadata"
          aria-hidden="true"
          tabIndex={-1}
        />
      )}
      <figcaption className="absolute bottom-3 left-3">
        <Chip className="bg-ink text-text">{`Lab, ${lab.block}`}</Chip>
      </figcaption>
    </motion.figure>
  );
}

/**
 * Home hero: the solid ROBOGYAN wordmark on the dot grid, the tagline and actions
 * directly under it, the lab video beside them on desktop, and the kapton ticker on
 * the bottom edge.
 *
 * Load sequence (≤ 1.2s, once): letters rise with a 40ms stagger, then the copy and
 * video panel, then the tape slides in from the left.
 */
export function Hero() {
  const reduced = useReducedMotion();
  const desktop = useMedia("(min-width: 1024px)");
  const facts = useMemo(() => shuffle(verifiedFacts()).slice(0, TICKER_COUNT), []);
  const { items, card } = useFactTicker(facts);

  const rise = (delay: number) =>
    reduced
      ? { initial: false as const }
      : {
          initial: { y: 12, opacity: 0 },
          animate: { y: 0, opacity: 1 },
          transition: { duration: 0.45, delay, ease: EASE },
        };

  return (
    <section
      aria-labelledby="hero-title"
      className="relative flex min-h-[min(calc(100svh-4rem),52rem)] flex-col overflow-hidden lg:min-h-[min(90svh,64rem)]"
    >
      <div className="flex flex-1 flex-col justify-center px-4 pt-10 pb-10 md:px-6 md:pt-14 lg:pt-10 lg:pb-12">
        {/* One block: the copy row takes exactly the wordmark's width (w-0 + min-w-full
            keeps it out of the fit-content sizing), so the tagline starts under the R
            and the video panel ends under the N. */}
        <div className="lg:w-fit">
          <Wordmark />

          <div className="mt-8 grid gap-10 md:mt-10 lg:w-0 lg:min-w-full lg:grid-cols-12 lg:items-start lg:gap-8">
            <motion.div className="lg:col-span-7" {...rise(COPY_DELAY)}>
              <p className="text-2xl font-display md:text-3xl">Experience engineering.</p>
              <p className="mt-3 max-w-prose text-lg text-text-muted">
                The oldest technical society of ADGIPS, building robots in {lab.block} since{" "}
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
            </motion.div>
            {desktop && (
              <div className="lg:col-span-5">
                <LabVideo />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Kapton ticker at the hero's bottom edge. The rotated tape is wider than the
          viewport; the overflow-hidden wrapper keeps it from widening the page. */}
      <motion.div
        className="-mx-px overflow-hidden"
        initial={reduced ? false : { x: "-100%" }}
        animate={{ x: 0 }}
        transition={{ duration: 0.5, delay: TAPE_DELAY, ease: EASE }}
      >
        <Ticker items={items} speed={100} />
      </motion.div>
      {card}
    </section>
  );
}
