import { animate, motion } from "motion/react";
import { useEffect, useRef } from "react";
import { useInView } from "@/hooks/useInView";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/cn";

export interface DimensionProps {
  /** Numbers count up on first view; strings render as-is. */
  value: number | string;
  /** Unit / noun after the value: "participants". */
  label: string;
  /** Appended to the number: "+". */
  suffix?: string;
  prefix?: string;
  /** Colours for paper sections. */
  onPaper?: boolean;
  className?: string;
}

const nf = new Intl.NumberFormat("en-IN");

function formatValue(v: number | string): string {
  return typeof v === "number" ? nf.format(Math.round(v)) : v;
}

/**
 * CAD-style dimension callout: `|—— 1,500 participants ——|`. On first view the rule
 * draws out from the centre and the number counts up (static with reduced motion).
 */
export function Dimension({
  value,
  label,
  suffix = "",
  prefix = "",
  onPaper,
  className,
}: DimensionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const numRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref);
  const reduced = useReducedMotion();
  const animated = !reduced && typeof value === "number";
  const finalText = `${prefix}${formatValue(value)}${suffix}`;

  useEffect(() => {
    const node = numRef.current;
    if (!node || !animated || !inView || typeof value !== "number") return;
    const controls = animate(0, value, {
      duration: 1.1,
      ease: [0.25, 1, 0.5, 1],
      onUpdate: (v) => {
        node.textContent = `${prefix}${formatValue(v)}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [animated, inView, value, prefix, suffix]);

  const shown = !animated || inView;
  const rule = (origin: "left" | "right") => (
    <motion.span
      aria-hidden="true"
      className="h-px min-w-4 flex-1 bg-current"
      style={{ originX: origin === "left" ? 0 : 1 }}
      initial={animated ? { scaleX: 0 } : false}
      animate={{ scaleX: shown ? 1 : 0 }}
      transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
    />
  );
  const tick = <span aria-hidden="true" className="h-4 w-px shrink-0 bg-current" />;

  return (
    <div
      ref={ref}
      className={cn(
        "flex w-full items-center",
        onPaper ? "text-muted-on-paper" : "text-text-muted",
        className,
      )}
    >
      {tick}
      {rule("right")}
      <span
        className={cn(
          "px-3 text-lg font-condensed whitespace-nowrap md:text-xl",
          onPaper ? "text-text-on-paper" : "text-text",
        )}
      >
        <span className="sr-only">{`${finalText} ${label}`}</span>
        <span aria-hidden="true">
          <span ref={numRef} className="tabular">
            {animated && !inView ? `${prefix}0${suffix}` : finalText}
          </span>{" "}
          {label}
        </span>
      </span>
      {rule("left")}
      {tick}
    </div>
  );
}
