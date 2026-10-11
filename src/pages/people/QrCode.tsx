import { useMemo } from "react";
import { cn } from "@/lib/cn";
import { encodeQr, qrPath } from "./qr";

/**
 * QR code for `text`, rendered as a flat SVG (black modules on paper, four-module
 * quiet zone). Falls back to nothing when the text is too long for version 6.
 */
export function QrCode({
  text,
  size = 240,
  label,
  className,
}: {
  text: string;
  /** Rendered side in px. */
  size?: number;
  /** Accessible name, e.g. "QR code for this page". */
  label: string;
  className?: string;
}) {
  const qr = useMemo(() => encodeQr(text), [text]);
  if (!qr) return null;
  const quiet = 4;
  const side = qr.size + quiet * 2;
  return (
    <svg
      role="img"
      aria-label={label}
      viewBox={`0 0 ${side} ${side}`}
      width={size}
      height={size}
      shapeRendering="crispEdges"
      className={cn("block bg-paper text-text-on-paper", className)}
    >
      <path d={qrPath(qr)} fill="currentColor" transform={`translate(${quiet} ${quiet})`} />
    </svg>
  );
}
