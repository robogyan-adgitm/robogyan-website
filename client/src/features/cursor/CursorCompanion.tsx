import { motion, useMotionValue, useSpring, animate } from "framer-motion";
import { useEffect, useRef } from "react";
import { usePointerEffects } from "@/hooks/useFinePointer";

/** Elements the ring "locks on" to. */
const TARGETS = "a, button, [role=button], .card-hover, .cursor-target";

const RING = 28;
const RING_HOVER = 44;

/**
 * Something that follows the cursor: a 28px gradient ring that trails the pointer on a
 * spring, and a soft blue/purple glow that trails further behind. The native cursor
 * stays visible. Over links, buttons and cards the ring opens to 44px with a faint fill;
 * pressing squeezes it. Desktop pointers only, off with reduced motion.
 */
export default function CursorCompanion() {
  const on = usePointerEffects();
  if (!on) return null;
  return <Companion />;
}

function Companion() {
  const layer = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const fill = useRef<HTMLSpanElement>(null);

  const px = useMotionValue(-100);
  const py = useMotionValue(-100);
  const ringX = useSpring(px, { stiffness: 300, damping: 25, mass: 0.5 });
  const ringY = useSpring(py, { stiffness: 300, damping: 25, mass: 0.5 });
  const glowX = useSpring(px, { stiffness: 120, damping: 25, mass: 0.8 });
  const glowY = useSpring(py, { stiffness: 120, damping: 25, mass: 0.8 });

  useEffect(() => {
    const el = layer.current;
    const r = ring.current;
    const f = fill.current;
    if (!el || !r || !f) return;

    let visible = false;
    let hovering = false;
    let pressed = false;
    const springs = [ringX, ringY, glowX, glowY];

    const setVisible = (v: boolean) => {
      if (visible === v) return;
      visible = v;
      el.style.opacity = v ? "1" : "0";
    };

    const size = () => {
      const s = hovering ? RING_HOVER : RING;
      animate(r, { width: s, height: s, scale: pressed ? 0.85 : 1 }, {
        type: "spring",
        stiffness: 400,
        damping: 28,
      });
      f.style.opacity = hovering ? "1" : "0";
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      px.set(e.clientX);
      py.set(e.clientY);
      if (!visible) {
        // First sighting (or coming back in): appear under the pointer, not fly in.
        springs.forEach((s, i) => s.jump(i % 2 === 0 ? e.clientX : e.clientY));
        setVisible(true);
      }
      const t = e.target instanceof Element ? e.target.closest(TARGETS) : null;
      const next = t !== null;
      if (next !== hovering) {
        hovering = next;
        size();
      }
    };
    const onDown = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      pressed = true;
      size();
    };
    const onUp = () => {
      if (!pressed) return;
      pressed = false;
      size();
    };
    const onOut = (e: MouseEvent) => {
      if (!e.relatedTarget) setVisible(false);
    };
    const hide = () => setVisible(false);
    const onVisibility = () => document.hidden && hide();

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    document.addEventListener("mouseout", onOut);
    window.addEventListener("blur", hide);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.removeEventListener("mouseout", onOut);
      window.removeEventListener("blur", hide);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [px, py, ringX, ringY, glowX, glowY]);

  return (
    <div
      ref={layer}
      aria-hidden="true"
      data-testid="cursor-companion"
      className="pointer-events-none fixed inset-0 z-[60] overflow-hidden opacity-0 transition-opacity duration-300"
    >
      <motion.div className="rg-cursor-glow" style={{ x: glowX, y: glowY }} />
      <motion.div style={{ x: ringX, y: ringY }} className="absolute left-0 top-0 h-0 w-0">
        <div ref={ring} className="rg-cursor-ring" style={{ width: RING, height: RING }}>
          <span ref={fill} className="rg-cursor-fill" />
        </div>
      </motion.div>
    </div>
  );
}
