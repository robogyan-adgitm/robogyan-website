import { useId } from "react";
import { cn } from "@/lib/utils";

export interface LineFollowerProps {
  /** Width in px (height is 0.75×). Default 72. */
  size?: number;
  /** Light the IR sensors blue (on the line) or grey (line lost). Default true. */
  onLine?: boolean;
  className?: string;
}

/**
 * Top view of a tiny line-follower robot in the site palette: glass chassis with a
 * blue→purple edge, two wheels, a board, and a front sensor bar with four IR sensors.
 */
export function LineFollower({ size = 72, onLine = true, className }: LineFollowerProps) {
  const id = useId().replace(/:/g, "");
  const edge = `lf-edge-${id}`;
  const glow = `lf-glow-${id}`;
  return (
    <svg
      viewBox="0 0 96 72"
      width={size}
      height={(size * 72) / 96}
      aria-hidden="true"
      className={cn("overflow-visible", className)}
    >
      <defs>
        <linearGradient id={edge} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="hsl(235,85%,65%)" />
          <stop offset="1" stopColor="hsl(275,85%,70%)" />
        </linearGradient>
        <filter id={glow} x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="1.6" />
        </filter>
      </defs>
      {/* wheels */}
      <rect x="14" y="1" width="24" height="11" rx="3" fill="hsl(0,0%,16%)" stroke="rgba(255,255,255,0.15)" />
      <rect x="14" y="60" width="24" height="11" rx="3" fill="hsl(0,0%,16%)" stroke="rgba(255,255,255,0.15)" />
      {/* chassis */}
      <rect x="4" y="13" width="76" height="46" rx="10" fill="rgba(26,26,26,0.92)" stroke={`url(#${edge})`} strokeWidth="1.5" />
      {/* board */}
      <rect x="16" y="24" width="30" height="24" rx="4" fill="hsl(0,0%,7%)" stroke="rgba(255,255,255,0.12)" />
      <rect x="21" y="29" width="9" height="6" rx="1.5" fill={`url(#${edge})`} opacity="0.8" />
      <circle cx="38" cy="41" r="2.5" fill="hsl(150,45%,60%)" />
      {/* sensor bar */}
      <rect x="80" y="18" width="7" height="36" rx="3" fill="hsl(0,0%,16%)" stroke="rgba(255,255,255,0.15)" />
      {[22, 31, 41, 50].map((y) => (
        <g key={y}>
          {onLine && <circle cx="91" cy={y + 2.5} r="3.5" fill="hsl(235,85%,65%)" filter={`url(#${glow})`} opacity="0.8" />}
          <rect x="88.5" y={y} width="5" height="5" rx="1.5" fill={onLine ? "hsl(235,85%,70%)" : "hsl(0,0%,35%)"} />
        </g>
      ))}
    </svg>
  );
}
