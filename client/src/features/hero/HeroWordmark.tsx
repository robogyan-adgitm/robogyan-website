import { motion } from "framer-motion";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { usePointerEffects } from "@/hooks/useFinePointer";
import { cn } from "@/lib/utils";

const RADIUS = 140;
const LIFT = 10;
const GRADIENT = "linear-gradient(135deg, hsl(235, 85%, 65%), hsl(275, 85%, 70%))";

interface HeroWordmarkProps {
  text: string;
  className?: string;
  onClick?: () => void;
}

/**
 * The hero's giant gradient word, one span per letter. Letters near the pointer lift up
 * to 10px and brighten, with neighbours falling off smoothly.
 *
 * Letters are plain inline spans moved with `position: relative; top` (not transforms)
 * so the font's kerning survives the split. Each letter paints its own slice of one
 * shared gradient, sized to the heading's box, so at rest the word is pixel-for-pixel
 * the original `.gradient-text` heading. Until the slices are measured the heading
 * keeps `.gradient-text` itself.
 */
export default function HeroWordmark({ text, className, onClick }: HeroWordmarkProps) {
  const ref = useRef<HTMLHeadingElement>(null);
  const letters = useRef<(HTMLSpanElement | null)[]>([]);
  const [sliced, setSliced] = useState(false);
  const live = usePointerEffects();

  // Give each letter its slice of the heading-wide gradient.
  useLayoutEffect(() => {
    const h = ref.current;
    if (!h) return;
    const measure = () => {
      const box = h.getBoundingClientRect();
      if (box.width === 0) return;
      for (const el of letters.current) {
        if (!el) continue;
        const top = parseFloat(el.style.top || "0");
        const r = el.getBoundingClientRect();
        el.style.backgroundImage = GRADIENT;
        el.style.backgroundRepeat = "no-repeat";
        el.style.backgroundSize = `${box.width}px ${box.height}px`;
        el.style.backgroundPosition = `${box.left - r.left}px ${box.top - (r.top - top)}px`;
      }
      setSliced(true);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(h);
    void document.fonts?.ready.then(measure);
    return () => ro.disconnect();
  }, [text]);

  // Lift + brighten letters near the pointer.
  useEffect(() => {
    const h = ref.current;
    if (!h || !live || !sliced) return;
    const n = text.length;
    const current = new Array<number>(n).fill(0);
    const goal = new Array<number>(n).fill(0);
    let raf = 0;
    let last = 0;

    const apply = () => {
      letters.current.forEach((el, i) => {
        if (!el) return;
        const v = current[i];
        if (v < 0.002) {
          el.style.top = "";
          el.style.filter = "";
          return;
        }
        el.style.top = `${(-LIFT * v).toFixed(2)}px`;
        el.style.filter = `brightness(${(1 + 0.25 * v).toFixed(3)}) drop-shadow(0 0 ${(14 * v).toFixed(1)}px hsl(235 85% 65% / ${(0.55 * v).toFixed(3)}))`;
      });
    };

    const tick = (now: number) => {
      const dt = Math.min((now - (last || now)) / 1000, 0.05);
      last = now;
      const k = 1 - Math.exp(-dt * 14);
      let moving = false;
      for (let i = 0; i < n; i++) {
        current[i] += (goal[i] - current[i]) * k;
        if (Math.abs(goal[i] - current[i]) > 0.002) moving = true;
        else current[i] = goal[i];
      }
      apply();
      raf = moving ? requestAnimationFrame(tick) : 0;
      if (!moving) last = 0;
    };
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      letters.current.forEach((el, i) => {
        if (!el) return;
        const r = el.getBoundingClientRect();
        const top = parseFloat(el.style.top || "0");
        const cx = r.left + r.width / 2;
        const cy = r.top - top + r.height / 2;
        const d = Math.hypot(e.clientX - cx, e.clientY - cy);
        const t = Math.max(0, 1 - d / RADIUS);
        goal[i] = t * t * (3 - 2 * t); // smoothstep falloff
      });
      kick();
    };
    const reset = () => {
      goal.fill(0);
      kick();
    };
    const onOut = (e: MouseEvent) => !e.relatedTarget && reset();

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("mouseout", onOut);
    window.addEventListener("blur", reset);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("mouseout", onOut);
      window.removeEventListener("blur", reset);
      goal.fill(0);
      current.fill(0);
      apply();
    };
  }, [live, sliced, text]);

  return (
    <motion.h2
      ref={ref}
      aria-label={text}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className={cn(className, !sliced && "gradient-text")}
      onClick={onClick}
      data-testid="hero-wordmark"
    >
      {Array.from(text).map((ch, i) => (
        <span
          key={i}
          aria-hidden="true"
          ref={(el) => (letters.current[i] = el)}
          className="rg-letter"
        >
          {ch}
        </span>
      ))}
    </motion.h2>
  );
}
