import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface TechTagProps {
  children: ReactNode;
  onPaper?: boolean;
  className?: string;
}

/** Small outlined tag for tech stacks ("ESP32", "PID"). Condensed voice, 2px radius; inverts on hover. */
export function TechTag({ children, onPaper, className }: TechTagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-sm border px-1.5 py-px text-sm font-condensed whitespace-nowrap transition-colors duration-[120ms]",
        onPaper
          ? "border-paper-line text-muted-on-paper hover:border-text-on-paper hover:bg-text-on-paper hover:text-paper active:bg-text-on-paper active:text-paper"
          : "border-line text-text-muted hover:border-text hover:bg-text hover:text-ink active:border-text active:bg-text active:text-ink",
        className,
      )}
    >
      {children}
    </span>
  );
}

/** A wrapping row of TechTags. */
export function TechTagList({
  items,
  onPaper,
  className,
}: {
  items: string[];
  onPaper?: boolean;
  className?: string;
}) {
  return (
    <ul className={cn("flex flex-wrap gap-1.5", className)} aria-label="Tech stack">
      {items.map((t) => (
        <li key={t}>
          <TechTag onPaper={onPaper}>{t}</TechTag>
        </li>
      ))}
    </ul>
  );
}
