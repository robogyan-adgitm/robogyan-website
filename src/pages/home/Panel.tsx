import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface PanelProps extends HTMLAttributes<HTMLDivElement> {
  /** Also reveal the kapton band on the cut corner on hover/focus (cards only). */
  hover?: boolean;
  /** Class for the inner (ink) box, e.g. padding. */
  innerClassName?: string;
  children: ReactNode;
}

/**
 * Ink panel with a 1px `line` border that follows the chamfer: a `line`-filled outer
 * box clipped with the chamfer, and a 1px-inset ink box clipped the same way, so the
 * diagonal edge keeps its hairline. (Page-local: a plain `border` would be cut off
 * by the clip-path.)
 */
export function Panel({ hover, innerClassName, className, children, ...rest }: PanelProps) {
  return (
    <div
      className={cn("relative bg-line p-px chamfer", hover && "chamfer-hover", className)}
      {...rest}
    >
      <div className={cn("h-full bg-ink chamfer", innerClassName)}>{children}</div>
    </div>
  );
}
