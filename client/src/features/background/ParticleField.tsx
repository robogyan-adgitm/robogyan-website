import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { useMedia } from "@/hooks/useMedia";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * The site's floating particles, on a canvas: sparse 2px dots in the brand blue (with
 * some purple and white) drifting slowly upward in three depth layers. On desktop the
 * pointer adds a gentle gravity well (nearby dots lean toward it, then spring back) and
 * a small parallax per layer. Reduced motion: static dots, nothing moves.
 */

type Layer = { size: number; speed: number; alpha: number; parallax: number };

/** far, mid, near. `speed` is in viewport heights per second. */
const LAYERS: Layer[] = [
  { size: 1.6, speed: 0.06, alpha: 0.7, parallax: 6 },
  { size: 2, speed: 0.085, alpha: 0.9, parallax: 12 },
  { size: 2.5, speed: 0.11, alpha: 1, parallax: 18 },
];

const BLUE = "235, 85%, 65%";
const PURPLE = "275, 85%, 70%";
const WHITE = "0, 0%, 100%";

/** Dots per 1440×900 viewport; scaled by area, so phones get fewer. */
const BASE_COUNT = 32;
const WELL_RADIUS = 180;
const WELL_MAX = 40;
const FRAME_MS = 1000 / 60;

interface Dot {
  x: number;
  y: number;
  layer: number;
  hue: string;
  alpha: number;
  /** Precomputed canvas fill, e.g. "hsla(235, 85%, 65%, 0.9)". */
  fill: string;
  phase: number;
  wander: number;
  /** current gravity-well offset */
  ox: number;
  oy: number;
}

function makeDot(w: number, h: number, anywhere: boolean): Dot {
  const layer = Math.random() < 0.4 ? 0 : Math.random() < 0.6 ? 1 : 2;
  const roll = Math.random();
  const hue = roll < 0.7 ? BLUE : roll < 0.9 ? PURPLE : WHITE;
  const tone = hue === BLUE ? 1 : hue === PURPLE ? 0.75 : 0.45;
  return {
    x: Math.random() * w,
    y: anywhere ? Math.random() * h : h + 4 + Math.random() * 40,
    layer,
    hue,
    alpha: LAYERS[layer].alpha * tone,
    fill: `hsla(${hue}, ${LAYERS[layer].alpha * tone})`,
    phase: Math.random() * Math.PI * 2,
    wander: 8 + Math.random() * 18,
    ox: 0,
    oy: 0,
  };
}

export default function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();
  const fine = useMedia("(hover: hover) and (pointer: fine)");

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    let w = 0;
    let h = 0;
    let dpr = 1;
    let dots: Dot[] = [];
    let raf = 0;
    let last = 0;
    let time = 0;

    // Pointer, plus a smoothed copy for the parallax.
    let pointer: { x: number; y: number } | null = null;
    const par = { x: 0, y: 0 };

    const target = () => Math.max(22, Math.round((BASE_COUNT * (w * h)) / (1440 * 900)));

    const resize = () => {
      const pw = w;
      const ph = h;
      w = window.innerWidth;
      h = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (pw && ph) {
        for (const d of dots) {
          d.x *= w / pw;
          d.y *= h / ph;
        }
      }
      const n = target();
      while (dots.length < n) dots.push(makeDot(w, h, true));
      if (dots.length > n) dots = dots.slice(0, n);
      if (reduced) draw();
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const d of dots) {
        const L = LAYERS[d.layer];
        const sway = reduced ? 0 : Math.sin(time * 0.5 + d.phase) * d.wander;
        const x = d.x + sway + d.ox - par.x * L.parallax;
        const y = d.y + d.oy - par.y * L.parallax;
        ctx.fillStyle = d.fill;
        ctx.beginPath();
        ctx.arc(x, y, L.size / 2, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const step = (dt: number) => {
      time += dt;
      // Parallax: layers slide opposite to the pointer's offset from the centre.
      const tx = pointer ? (pointer.x - w / 2) / (w / 2) : 0;
      const ty = pointer ? (pointer.y - h / 2) / (h / 2) : 0;
      const k = 1 - Math.exp(-dt * 3);
      par.x += (tx - par.x) * k;
      par.y += (ty - par.y) * k;

      const ease = 1 - Math.exp(-dt * 6);
      for (let i = 0; i < dots.length; i++) {
        const d = dots[i];
        const L = LAYERS[d.layer];
        d.y -= L.speed * h * dt;
        d.x += 5 * dt; // the original drifted ~100px right over its climb
        if (d.y < -10 || d.x > w + 30) {
          dots[i] = makeDot(w, h, false);
          continue;
        }
        // Gravity well: lean toward the pointer, ease-out with distance, capped.
        let gx = 0;
        let gy = 0;
        if (pointer) {
          const sway = Math.sin(time * 0.5 + d.phase) * d.wander;
          const dx = pointer.x - (d.x + sway - par.x * L.parallax);
          const dy = pointer.y - (d.y - par.y * L.parallax);
          const dist = Math.hypot(dx, dy);
          if (dist < WELL_RADIUS && dist > 0.001) {
            const t = 1 - dist / WELL_RADIUS;
            const pull = Math.min(WELL_MAX * (1 - (1 - t) * (1 - t)), dist * 0.6);
            gx = (dx / dist) * pull;
            gy = (dy / dist) * pull;
          }
        }
        d.ox += (gx - d.ox) * ease;
        d.oy += (gy - d.oy) * ease;
      }
    };

    // Cap at ~60fps on high-refresh screens. `last` advances in whole 60Hz frames
    // (carrying the remainder), so 75/90/144Hz displays still average 60fps; the 1ms
    // slack keeps a 60Hz display from skipping frames on timer jitter.
    let prevDraw = 0;
    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      const elapsed = now - last;
      if (elapsed < FRAME_MS - 1) return;
      last = elapsed >= FRAME_MS && elapsed < FRAME_MS * 4 ? now - (elapsed % FRAME_MS) : now;
      const dt = prevDraw ? Math.min((now - prevDraw) / 1000, 0.05) : 1 / 60;
      prevDraw = now;
      step(dt);
      draw();
    };

    const start = () => {
      if (reduced || raf) return;
      last = 0;
      prevDraw = 0;
      raf = requestAnimationFrame(frame);
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "mouse") pointer = { x: e.clientX, y: e.clientY };
    };
    const onOut = (e: MouseEvent) => {
      if (!e.relatedTarget) pointer = null;
    };
    const onVisibility = () => (document.hidden ? stop() : start());

    resize();
    draw();
    start();
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", onVisibility);
    if (fine && !reduced) {
      window.addEventListener("pointermove", onMove, { passive: true });
      document.addEventListener("mouseout", onOut);
    }
    return () => {
      stop();
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("mouseout", onOut);
    };
  }, [reduced, fine]);

  return (
    <motion.canvas
      ref={canvasRef}
      aria-hidden="true"
      data-testid="particle-field"
      className="fixed inset-0 pointer-events-none z-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
    />
  );
}
