import { useEffect, useRef } from "react";

/*
 * The site background: a fixed, full-viewport canvas dot grid behind all content.
 *
 * - 28px pitch, 1.8px dots in #323232 on ink (the spec's 1.5px #262626 read as
 *   invisible at normal brightness). Paper sections, cards, the nav and the footer are
 *   opaque and simply cover it.
 * - Pointer halo (fine pointers only): dots within 160px grow to 3.5px and brighten
 *   toward the text colour; the nearest ~40px turn kapton. Each dot gets one flat
 *   fill computed from its distance (no overlays). The halo trails the pointer with
 *   a 0.12 lerp and fades out over ~400ms when the pointer leaves the window.
 * - Idle scan: every ~6s one row of dots brightens (peak #5E5E5E) and the highlight
 *   travels down the viewport in 1.2s, like a plotter head.
 * - One rAF loop that only runs while something is moving and stops when the tab is
 *   hidden. Each frame repaints only the dirty rectangles (halo box, scan band) from
 *   a cached base layer. DPR capped at 2.
 * - Reduced motion: the static grid only. Touch: scan only.
 */

const PITCH = 28;
// +0.5 puts each dot on a pixel centre, so a 1.5px dot stays crisp instead of smearing
// across four pixels at DPR 1.
const OFFSET = PITCH / 2 + 0.5;
const BASE_R = 0.9; // 1.8px dot
const MAX_R = 1.75; // 3.5px dot
const HALO = 160;
const CORE = 40;
const LERP = 0.12;
const FADE_MS = 400;
const SCAN_EVERY_MS = 6000;
const SCAN_MS = 1200;
const SCAN_BAND = PITCH * 1.25;
const PAD = 4;

type RGB = readonly [number, number, number];
// Canvas-only greys from the revision spec (not site tokens): resting dot and scan peak.
const BASE: RGB = [50, 50, 50];
const SCAN_PEAK: RGB = [94, 94, 94];
const BASE_FILL = `rgb(${BASE.join(",")})`;

/** Read a `#rrggbb` colour token from :root (falls back if unavailable). */
function token(name: string, fallback: RGB): RGB {
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  const m = /^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i.exec(v);
  return m ? [parseInt(m[1]!, 16), parseInt(m[2]!, 16), parseInt(m[3]!, 16)] : fallback;
}

interface Rect {
  x: number;
  y: number;
  w: number;
  h: number;
}

const smooth = (t: number) => t * t * (3 - 2 * t);
const clamp01 = (t: number) => (t < 0 ? 0 : t > 1 ? 1 : t);
const mix = (a: RGB, b: RGB, t: number): [number, number, number] => [
  a[0] + (b[0] - a[0]) * t,
  a[1] + (b[1] - a[1]) * t,
  a[2] + (b[2] - a[2]) * t,
];

export function DotField() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const BRIGHT = token("--color-text", [245, 247, 250]);
    const KAPTON = token("--color-kapton", [255, 176, 0]);
    const reducedMq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const fineMq = window.matchMedia("(hover: hover) and (pointer: fine)");

    let w = 0;
    let h = 0;
    let dpr = 1;
    const base = document.createElement("canvas");
    const bctx = base.getContext("2d");

    // Pointer state: target (t*), trailing position (p*), halo strength 0..1.
    let tx = -9999;
    let ty = -9999;
    let px = -9999;
    let py = -9999;
    let present = false;
    let strength = 0;
    let lastTime = 0;

    // Scan state: y of the highlight, or null when idle.
    let scanStart = 0;
    let scanY: number | null = null;

    let prevRects: Rect[] = [];
    let raf = 0;
    let scanTimer = 0;

    const halo = () => !reducedMq.matches && fineMq.matches;
    const scanning = () => !reducedMq.matches;

    function drawBase() {
      if (!bctx) return;
      base.width = canvas!.width;
      base.height = canvas!.height;
      bctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      bctx.fillStyle = BASE_FILL;
      bctx.beginPath();
      for (let y = OFFSET; y < h + PITCH; y += PITCH) {
        for (let x = OFFSET; x < w + PITCH; x += PITCH) {
          bctx.moveTo(x + BASE_R, y);
          bctx.arc(x, y, BASE_R, 0, Math.PI * 2);
        }
      }
      bctx.fill();
      ctx!.setTransform(1, 0, 0, 1, 0, 0);
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);
      ctx!.drawImage(base, 0, 0);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      prevRects = [];
    }

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      // The canvas is `fixed inset-0`: size it to the layout viewport (no scrollbar).
      w = document.documentElement.clientWidth;
      h = document.documentElement.clientHeight;
      canvas!.width = Math.round(w * dpr);
      canvas!.height = Math.round(h * dpr);
      drawBase();
    }

    /** Copy a rect of the cached base layer back onto the canvas. */
    function restore(r: Rect) {
      const x = Math.max(0, Math.floor(r.x));
      const y = Math.max(0, Math.floor(r.y));
      const x2 = Math.min(w, Math.ceil(r.x + r.w));
      const y2 = Math.min(h, Math.ceil(r.y + r.h));
      if (x2 <= x || y2 <= y) return;
      const sx = Math.floor(x * dpr);
      const sy = Math.floor(y * dpr);
      const sw = Math.ceil((x2 - x) * dpr);
      const sh = Math.ceil((y2 - y) * dpr);
      ctx!.setTransform(1, 0, 0, 1, 0, 0);
      ctx!.clearRect(sx, sy, sw, sh);
      ctx!.drawImage(base, sx, sy, sw, sh, sx, sy, sw, sh);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function frame(now: number) {
      raf = 0;
      const dt = lastTime ? Math.min(now - lastTime, 64) : 16;
      lastTime = now;

      // Pointer: trail and fade.
      if (halo()) {
        const k = 1 - Math.pow(1 - LERP, dt / 16.67);
        px += (tx - px) * k;
        py += (ty - py) * k;
        strength = present
          ? Math.min(1, strength + dt / 200)
          : Math.max(0, strength - dt / FADE_MS);
      } else {
        strength = 0;
      }

      // Scan: travels from the top to the bottom of the viewport.
      if (scanY !== null) {
        const t = (now - scanStart) / SCAN_MS;
        scanY = t >= 1 ? null : -SCAN_BAND + t * (h + SCAN_BAND * 2);
      }

      const rects: Rect[] = [];
      const haloOn = strength > 0.001;
      if (haloOn) {
        rects.push({
          x: px - HALO - PAD,
          y: py - HALO - PAD,
          w: (HALO + PAD) * 2,
          h: (HALO + PAD) * 2,
        });
      }
      if (scanY !== null) {
        rects.push({ x: 0, y: scanY - SCAN_BAND - PAD, w, h: (SCAN_BAND + PAD) * 2 });
      }

      for (const r of prevRects) restore(r);
      for (const r of rects) restore(r);

      // Collect the dots inside the current rects and paint each once.
      if (rects.length) {
        const seen = new Set<number>();
        const cols = Math.ceil(w / PITCH) + 1;
        for (const r of rects) {
          const c0 = Math.max(0, Math.floor((r.x - OFFSET) / PITCH));
          const c1 = Math.min(cols, Math.ceil((r.x + r.w - OFFSET) / PITCH));
          const r0 = Math.max(0, Math.floor((r.y - OFFSET) / PITCH));
          const r1 = Math.ceil((Math.min(h, r.y + r.h) - OFFSET) / PITCH);
          for (let j = r0; j <= r1; j++) {
            const y = OFFSET + j * PITCH;
            for (let i = c0; i <= c1; i++) {
              const id = j * cols + i;
              if (seen.has(id)) continue;
              seen.add(id);
              const x = OFFSET + i * PITCH;

              let f = 0; // halo brightness 0..1
              let kap = 0; // kapton core 0..1
              if (haloOn) {
                const dx = x - px;
                const dy = y - py;
                const d2 = dx * dx + dy * dy;
                if (d2 < HALO * HALO) {
                  const d = Math.sqrt(d2);
                  f = smooth(1 - d / HALO) * strength;
                  kap = smooth(clamp01((CORE * 1.5 - d) / CORE)) * strength;
                }
              }
              let s = 0; // scan brightness 0..1
              if (scanY !== null) {
                const dy = Math.abs(y - scanY);
                if (dy < SCAN_BAND) s = smooth(1 - dy / SCAN_BAND);
              }
              if (f < 0.01 && s < 0.01) continue;

              let col = mix(BASE, SCAN_PEAK, s);
              if (f > 0) col = mix(col, BRIGHT, f);
              if (kap > 0) col = mix(col, KAPTON, kap);
              const rad = BASE_R + (MAX_R - BASE_R) * f;
              ctx!.fillStyle = `rgb(${col[0] | 0},${col[1] | 0},${col[2] | 0})`;
              // The live dot is never smaller than the base dot, so it simply covers it.
              ctx!.beginPath();
              ctx!.arc(x, y, rad, 0, Math.PI * 2);
              ctx!.fill();
            }
          }
        }
      }
      prevRects = rects;

      const settling =
        haloOn &&
        (Math.abs(tx - px) > 0.3 ||
          Math.abs(ty - py) > 0.3 ||
          (present ? strength < 1 : strength > 0));
      if ((settling || scanY !== null) && !document.hidden) {
        kick();
      } else {
        lastTime = 0;
      }
    }

    function kick() {
      if (!raf && !document.hidden) raf = requestAnimationFrame(frame);
    }

    function onMove(e: PointerEvent) {
      if (e.pointerType !== "mouse" || !halo()) return;
      tx = e.clientX;
      ty = e.clientY;
      if (!present || px < -999) {
        // First move (or re-entry): start the trail close to the pointer.
        if (strength === 0) {
          px = tx;
          py = ty;
        }
        present = true;
      }
      kick();
    }

    function onLeave() {
      present = false;
      kick();
    }

    function scheduleScan() {
      window.clearTimeout(scanTimer);
      if (!scanning()) return;
      scanTimer = window.setTimeout(() => {
        if (!document.hidden) {
          scanStart = performance.now();
          scanY = -SCAN_BAND;
          kick();
        }
        scheduleScan();
      }, SCAN_EVERY_MS);
    }

    function onVisibility() {
      if (document.hidden) {
        cancelAnimationFrame(raf);
        raf = 0;
        lastTime = 0;
      } else {
        kick();
      }
    }

    function onPrefChange() {
      present = false;
      strength = 0;
      scanY = null;
      drawBase();
      scheduleScan();
    }

    resize();
    scheduleScan();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    window.addEventListener("blur", onLeave);
    document.addEventListener("visibilitychange", onVisibility);
    reducedMq.addEventListener("change", onPrefChange);
    fineMq.addEventListener("change", onPrefChange);
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(scanTimer);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("blur", onLeave);
      document.removeEventListener("visibilitychange", onVisibility);
      reducedMq.removeEventListener("change", onPrefChange);
      fineMq.removeEventListener("change", onPrefChange);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      id="dot-field"
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 block size-full"
    />
  );
}
