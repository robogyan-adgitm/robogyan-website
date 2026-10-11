import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

export type ChipTone = "neutral" | "signal" | "kapton" | "alert";

export interface ChipProps extends HTMLAttributes<HTMLSpanElement> {
  /**
   * neutral = outlined grey; signal = live/open/selected (status only);
   * kapton = amber fill (one highlight per screen); alert = ended/error. Default "neutral".
   */
  tone?: ChipTone;
  /** Show a small square status dot before the label. */
  dot?: boolean;
  /** Neutral chip colours for paper surfaces. */
  onPaper?: boolean;
  children: ReactNode;
}

const tones: Record<ChipTone, string> = {
  neutral: "border border-line text-text-muted",
  signal: "border border-signal text-signal",
  kapton: "bg-kapton text-kapton-ink",
  alert: "border border-alert text-alert",
};

/** Small status chip in the condensed datasheet voice. */
export function Chip({ tone = "neutral", dot, onPaper, className, children, ...rest }: ChipProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-sm px-2 py-0.5 text-sm leading-5 font-condensed whitespace-nowrap",
        tones[tone],
        onPaper && tone === "neutral" && "border-paper-line text-muted-on-paper",
        className,
      )}
      {...rest}
    >
      {dot && <span aria-hidden="true" className="size-1.5 shrink-0 bg-current" />}
      {children}
    </span>
  );
}
