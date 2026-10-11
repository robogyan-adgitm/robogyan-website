import { cn } from "@/lib/cn";

export interface LineFollowerProps {
  /** Width in px (height is 0.75×). Default 72. */
  size?: number;
  /** Light the sensor bar amber (on the line) or grey (line lost). Default true. */
  onLine?: boolean;
  className?: string;
}

/**
 * Top view of a tiny line-follower robot: chassis, two wheels, front sensor bar with
 * four IR sensors. Pure SVG, flat fills, currentColor body.
 */
export function LineFollower({ size = 72, onLine = true, className }: LineFollowerProps) {
  const sensor = onLine ? "var(--color-kapton)" : "var(--color-text-muted)";
  return (
    <svg
      viewBox="0 0 96 72"
      width={size}
      height={(size * 72) / 96}
      aria-hidden="true"
      className={cn("text-text", className)}
    >
      {/* wheels */}
      <rect x="14" y="2" width="22" height="10" fill="var(--color-line)" />
      <rect x="14" y="60" width="22" height="10" fill="var(--color-line)" />
      {/* chassis */}
      <path d="M6 14 H70 L80 24 V48 L70 58 H6 Z" fill="currentColor" />
      {/* board */}
      <rect x="16" y="24" width="30" height="24" fill="var(--color-ink)" />
      <rect x="20" y="28" width="8" height="6" fill="currentColor" />
      {/* sensor bar */}
      <rect x="80" y="18" width="6" height="36" fill="currentColor" />
      {[22, 31, 41, 50].map((y) => (
        <rect key={y} x="87" y={y} width="5" height="5" fill={sensor} />
      ))}
    </svg>
  );
}
