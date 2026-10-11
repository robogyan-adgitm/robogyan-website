import {
  animate,
  motion,
  useMotionValue,
  useSpring,
  type MotionValue,
} from "framer-motion";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { FactCard, useFactTicker } from "@/features/eggs/FactCard";
import { isLost, useEggEvent } from "@/features/eggs/bus";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/** Things that make the eyes go wide when hovered. */
const TARGETS = "a, button, [role=button], .card-hover, .cursor-target";

/** Most a pupil travels from the socket centre, in SVG units (1 unit = 1px at 64px wide). */
const MAX = 3.6;
/** Distance (px) at which the pupils reach full deflection. */
const REACH = 140;
const IDLE_MS = 6000;
/** px per ms. Faster than this counts as a "fast scroll". */
const FAST_SCROLL = 2.2;

const VIEW_W = 64;
const VIEW_H = 72;
const EYES = [
  { cx: 23, cy: 35 },
  { cx: 41, cy: 35 },
] as const;

const BLUE = "hsla(235, 85%, 65%, 1)";
const PURPLE = "hsla(275, 85%, 70%, 1)";
const PURPLE_DEEP = "hsla(275, 85%, 60%, 1)";
const LED_OFF = "rgba(255, 255, 255, 0.12)";

const PUPIL_SPRING = { stiffness: 200, damping: 20, mass: 0.6 };
const HEAD_SPRING = { stiffness: 120, damping: 18, mass: 0.8 };

const clamp = (v: number, lo = -1, hi = 1) => Math.max(lo, Math.min(hi, v));
const rand = (lo: number, hi: number) => lo + Math.random() * (hi - lo);

/** A spring that follows `source`, or `source` itself when motion is reduced. */
function useFollow(source: MotionValue<number>, spring: typeof PUPIL_SPRING, instant: boolean) {
  const sprung = useSpring(source, spring);
  return instant ? source : sprung;
}

/**
 * RoboBuddy: a small robot face fixed bottom-right whose eyes follow the cursor.
 *
 * - Pupils track the pointer on a spring; the head turns slightly toward it.
 * - Blinks every 3 to 7 s and when the pointer passes over it.
 * - Eyes widen over links/buttons/cards; turn purple and look up on fast scrolls.
 * - After 6 s without pointer movement the eyes look around on their own.
 * - The mouth (3 LEDs) lights up left to right as the pointer gets close.
 * - Happy wobble when the Konami or logo egg fires; looks lost on the 404 page.
 * - Click / Enter / Space shows a fun fact in a speech bubble.
 *
 * Touch: eyes follow the last tap, otherwise wander. Reduced motion: eyes track
 * instantly, no blinking or wobble.
 */
export default function RoboBuddy() {
  const reduced = useReducedMotion();
  const uid = useId().replace(/:/g, "");
  const wrapRef = useRef<HTMLDivElement>(null);
  const { fact, show, close } = useFactTicker();

  const [alert, setAlert] = useState(false);
  const [scrolling, setScrolling] = useState(false);
  const [happy, setHappy] = useState(false);
  const [lost, setLost] = useState(isLost);
  const [mouth, setMouth] = useState(0);

  // Pupil targets per eye, head pose, lids.
  const lx = useMotionValue(0);
  const ly = useMotionValue(0);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const rot = useMotionValue(0);
  const hx = useMotionValue(0);
  const hy = useMotionValue(0);
  const lid = useMotionValue(1);
  const wobble = useMotionValue(0);
  const hop = useMotionValue(0);

  const pLx = useFollow(lx, PUPIL_SPRING, reduced);
  const pLy = useFollow(ly, PUPIL_SPRING, reduced);
  const pRx = useFollow(rx, PUPIL_SPRING, reduced);
  const pRy = useFollow(ry, PUPIL_SPRING, reduced);
  const hRot = useFollow(rot, HEAD_SPRING, reduced);
  const hX = useFollow(hx, HEAD_SPRING, reduced);
  const hY = useFollow(hy, HEAD_SPRING, reduced);

  // Mirrors of state for the event handlers.
  const mode = useRef({ alert: false, lost: isLost() });
  useEffect(() => {
    mode.current = { alert, lost };
  });

  const blink = useCallback(
    (slow = false) => {
      if (reduced) return;
      animate(lid, [1, 0.1, 0.1, 1], {
        duration: slow ? 0.6 : 0.2,
        times: [0, 0.3, 0.7, 1],
        ease: "easeInOut",
      });
    },
    [lid, reduced],
  );

  const look = useCallback(
    (l: [number, number], r: [number, number], head: [number, number, number]) => {
      lx.set(l[0]);
      ly.set(l[1]);
      rx.set(r[0]);
      ry.set(r[1]);
      rot.set(head[0]);
      hx.set(head[1]);
      hy.set(head[2]);
    },
    [lx, ly, rx, ry, rot, hx, hy],
  );

  // Pointer tracking, hover, scroll, idle wander.
  useEffect(() => {
    let lastMove = 0;
    let idle = false;
    let fast = false;
    let wanderTimer = 0;
    let scrollTimer = 0;
    let lastScrollY = window.scrollY;
    let lastScrollT = performance.now();
    let pointer: { x: number; y: number } | null = null;

    const box = () => wrapRef.current?.getBoundingClientRect() ?? null;

    const pupil = (p: { x: number; y: number }, r: DOMRect, eye: (typeof EYES)[number]) => {
      const s = r.width / VIEW_W;
      const cx = r.left + eye.cx * s;
      const cy = r.top + eye.cy * s;
      const dx = p.x - cx;
      const dy = p.y - cy;
      const len = Math.hypot(dx, dy) || 1;
      const k = Math.min(1, len / REACH) * MAX;
      return [(dx / len) * k, (dy / len) * k] as [number, number];
    };

    const track = () => {
      const m = mode.current;
      if (!pointer || m.lost || fast || idle) return;
      const r = box();
      if (!r) return;
      const l = pupil(pointer, r, EYES[0]);
      const rr = pupil(pointer, r, EYES[1]);
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const nx = clamp((pointer.x - cx) / (window.innerWidth * 0.5));
      const ny = clamp((pointer.y - cy) / (window.innerHeight * 0.5));
      look(l, rr, [nx * 6, nx * 3, ny * 3]);
      const d = Math.hypot(pointer.x - cx, pointer.y - cy);
      setMouth(d < 140 ? 3 : d < 240 ? 2 : d < 360 ? 1 : 0);
    };

    const wander = () => {
      window.clearTimeout(wanderTimer);
      if (!idle || mode.current.lost) return;
      const x = rand(-MAX, MAX) * 0.9;
      const y = rand(-MAX, MAX) * 0.7;
      look([x, y], [x, y], [x * 1.2, x * 0.5, y * 0.4]);
      if (Math.random() < 0.25) blink();
      wanderTimer = window.setTimeout(wander, rand(1400, 2800));
    };

    const wake = () => {
      lastMove = performance.now();
      if (idle) {
        idle = false;
        window.clearTimeout(wanderTimer);
      }
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      pointer = { x: e.clientX, y: e.clientY };
      wake();
      const t = e.target instanceof Element ? e.target : null;
      const over = !!t?.closest(TARGETS) && !wrapRef.current?.contains(t);
      if (over !== mode.current.alert) setAlert(over);
      track();
    };
    // Touch and pen: follow the last tap.
    const onDown = (e: PointerEvent) => {
      if (e.pointerType === "mouse") return;
      pointer = { x: e.clientX, y: e.clientY };
      wake();
      track();
    };
    const onOut = (e: MouseEvent) => {
      if (e.relatedTarget) return;
      setAlert(false);
      setMouth(0);
    };

    const onScroll = () => {
      const now = performance.now();
      const v = Math.abs(window.scrollY - lastScrollY) / Math.max(1, now - lastScrollT);
      lastScrollY = window.scrollY;
      lastScrollT = now;
      if (v < FAST_SCROLL || mode.current.lost) return;
      if (!fast) {
        fast = true;
        setScrolling(true);
      }
      look([-1.2, -MAX], [-1.2, -MAX], [-2, -1, -2]);
      window.clearTimeout(scrollTimer);
      scrollTimer = window.setTimeout(() => {
        fast = false;
        setScrolling(false);
        track();
      }, 700);
    };

    const idleCheck = window.setInterval(() => {
      if (idle || mode.current.lost) return;
      if (performance.now() - lastMove > IDLE_MS) {
        idle = true;
        setMouth(0);
        wander();
      }
    }, 500);

    lastMove = performance.now();
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("mouseout", onOut);
    return () => {
      window.clearInterval(idleCheck);
      window.clearTimeout(wanderTimer);
      window.clearTimeout(scrollTimer);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("mouseout", onOut);
    };
  }, [blink, look]);

  // Random blinks every 3 to 7 s (slow ones while lost).
  useEffect(() => {
    if (reduced) return;
    let t = 0;
    const loop = () => {
      t = window.setTimeout(
        () => {
          blink(mode.current.lost);
          loop();
        },
        mode.current.lost ? rand(2500, 4000) : rand(3000, 7000),
      );
    };
    loop();
    return () => window.clearTimeout(t);
  }, [blink, reduced]);

  // Lost (404): eyes drift down and around, head droops.
  useEggEvent("lost", () => setLost(true));
  useEggEvent("found", () => setLost(false));
  // The 404 page may have announced itself before this component subscribed.
  useEffect(() => setLost(isLost()), []);
  useEffect(() => {
    if (!lost) return;
    setMouth(0);
    let t = 0;
    const drift = () => {
      const x = rand(-MAX, MAX) * 0.8;
      look([x, MAX * 0.85], [x, MAX * 0.85], [-5 + x, x * 0.4, 2]);
      t = window.setTimeout(drift, rand(1800, 3200));
    };
    drift();
    return () => window.clearTimeout(t);
  }, [lost, look]);

  // Happy wobble when an egg fires.
  const celebrate = useCallback(() => {
    setHappy(true);
    if (!reduced) {
      animate(wobble, [0, -14, 12, -9, 6, -3, 0], { duration: 0.9, ease: "easeInOut" });
      animate(hop, [0, -8, 0, -5, 0], { duration: 0.7, ease: "easeOut" });
    }
    window.setTimeout(() => setHappy(false), 2200);
  }, [hop, reduced, wobble]);
  useEggEvent("konami", celebrate);
  useEggEvent("logo", celebrate);

  // Wide eyes over interactive things (and when happy).
  const widen = useMotionValue(1);
  useEffect(() => {
    const target = alert || happy ? 1.15 : 1;
    if (reduced) widen.set(target);
    else animate(widen, target, { type: "spring", stiffness: 300, damping: 20 });
  }, [alert, happy, reduced, widen]);

  // Close the fact on a click anywhere outside the widget.
  useEffect(() => {
    if (!fact) return;
    const onDown = (e: PointerEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) close();
    };
    window.addEventListener("pointerdown", onDown);
    return () => window.removeEventListener("pointerdown", onDown);
  }, [fact, close]);

  const toggleFact = () => {
    if (fact) close();
    else show();
    blink();
  };

  const purple = scrolling;
  const lit = happy ? 3 : mouth;
  const core = purple ? PURPLE : BLUE;
  const rim = purple ? PURPLE_DEEP : PURPLE;
  const glowOpacity = alert || happy ? 0.9 : purple ? 0.75 : 0.5;
  const edge = `rb-edge-${uid}`;
  const glow = `rb-glow-${uid}`;
  const soft = `rb-soft-${uid}`;
  const pupils: [MotionValue<number>, MotionValue<number>][] = [
    [pLx, pLy],
    [pRx, pRy],
  ];

  return (
    <div
      ref={wrapRef}
      data-testid="robo-buddy"
      data-mood={lost ? "lost" : happy ? "happy" : scrolling ? "scroll" : alert ? "alert" : "track"}
      className="pointer-events-none fixed bottom-4 right-4 z-[58] sm:bottom-6 sm:right-6"
    >
      <FactCard fact={fact} onClose={close} className="absolute bottom-full right-0 mb-3" />
      <motion.div style={{ rotate: wobble, y: hop }}>
        <motion.div
          role="button"
          tabIndex={0}
          aria-label="Robogyan bot. Click for a fun fact"
          aria-expanded={fact !== null}
          data-testid="robo-face"
          className="rg-robot pointer-events-auto relative block w-12 cursor-pointer select-none rounded-2xl sm:w-16"
          style={{ rotate: hRot, x: hX, y: hY }}
          onClick={toggleFact}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              toggleFact();
            }
          }}
          onPointerEnter={(e) => e.pointerType === "mouse" && blink()}
        >
          {/* Glass behind the head shape. */}
          <span aria-hidden="true" className="rg-robot-glass" />
          <svg
            viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
            className="relative block h-auto w-full overflow-visible"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id={edge} x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="hsl(235,85%,65%)" />
                <stop offset="1" stopColor="hsl(275,85%,70%)" />
              </linearGradient>
              <filter id={glow} x="-150%" y="-150%" width="400%" height="400%">
                <feGaussianBlur stdDeviation="2" />
              </filter>
              <filter id={soft} x="-100%" y="-100%" width="300%" height="300%">
                <feGaussianBlur stdDeviation="1.2" />
              </filter>
              {EYES.map((eye, i) => (
                <clipPath key={i} id={`rb-socket-${uid}-${i}`}>
                  <rect x={eye.cx - 7} y={eye.cy - 7} width="14" height="14" rx="4" />
                </clipPath>
              ))}
            </defs>

            {/* antenna */}
            <line x1="32" y1="5" x2="32" y2="13" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" strokeLinecap="round" />
            <motion.circle
              cx="32"
              cy="4"
              r="4.5"
              fill="hsl(235,85%,65%)"
              filter={`url(#${glow})`}
              initial={{ opacity: 0.35 }}
              animate={reduced ? { opacity: 0.5 } : { opacity: [0.35, 0.9, 0.35] }}
              transition={reduced ? undefined : { duration: 1.4, repeat: Infinity, repeatDelay: 2.6, ease: "easeInOut" }}
            />
            <circle cx="32" cy="4" r="2.2" fill={happy ? "hsl(275,85%,75%)" : "hsl(235,85%,72%)"} />

            {/* ear bolts */}
            <rect x="0.75" y="31" width="3.5" height="12" rx="1.5" fill="hsl(0,0%,16%)" stroke="rgba(255,255,255,0.12)" />
            <rect x="59.75" y="31" width="3.5" height="12" rx="1.5" fill="hsl(0,0%,16%)" stroke="rgba(255,255,255,0.12)" />

            {/* head: glass fill, 1px border, faint inner gradient edge */}
            <rect x="4" y="13" width="56" height="52" rx="14" fill="rgba(26,26,26,0.7)" stroke="rgba(255,255,255,0.12)" />
            <rect x="5.5" y="14.5" width="53" height="49" rx="12.5" fill="none" stroke={`url(#${edge})`} strokeOpacity="0.55" />

            {/* visor */}
            <rect x="10" y="23" width="44" height="24" rx="8" fill="rgba(0,0,0,0.45)" stroke="rgba(255,255,255,0.06)" />

            {/* eyes */}
            {EYES.map((eye, i) => (
              <motion.g key={i} style={{ scale: widen }}>
                <motion.g style={{ scaleY: lid }}>
                  <rect
                    x={eye.cx - 7}
                    y={eye.cy - 7}
                    width="14"
                    height="14"
                    rx="4"
                    fill="#07070c"
                    stroke="rgba(255,255,255,0.1)"
                  />
                  <g clipPath={`url(#rb-socket-${uid}-${i})`}>
                    <motion.g
                      data-testid={`robo-pupil-${i}`}
                      style={{ x: pupils[i][0], y: pupils[i][1] }}
                    >
                      <motion.circle
                        cx={eye.cx}
                        cy={eye.cy}
                        r="5"
                        filter={`url(#${soft})`}
                        initial={false}
                        animate={{ fill: core, opacity: glowOpacity }}
                        transition={{ duration: 0.25 }}
                      />
                      <motion.circle
                        cx={eye.cx}
                        cy={eye.cy}
                        r="3.4"
                        initial={false}
                        animate={{ fill: rim }}
                        transition={{ duration: 0.25 }}
                      />
                      <motion.circle
                        cx={eye.cx}
                        cy={eye.cy}
                        r="2.3"
                        initial={false}
                        animate={{ fill: core }}
                        transition={{ duration: 0.25 }}
                      />
                      <circle cx={eye.cx - 0.9} cy={eye.cy - 0.9} r="0.8" fill="white" opacity="0.85" />
                    </motion.g>
                  </g>
                </motion.g>
              </motion.g>
            ))}

            {/* mouth: 3-segment LED bar */}
            {[23, 29.5, 36].map((x, i) => (
              <motion.rect
                key={x}
                data-testid={`robo-led-${i}`}
                x={x}
                y="54"
                width="5"
                height="2.5"
                rx="1.25"
                initial={false}
                animate={{ fill: i < lit ? (i === 2 ? PURPLE : BLUE) : LED_OFF }}
                transition={{ duration: 0.15, delay: i < lit ? i * 0.06 : 0 }}
              />
            ))}
          </svg>
        </motion.div>
      </motion.div>
    </div>
  );
}
