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

/** Each tone inverts on hover (and on tap for touch), 120ms. */
const tones: Record<ChipTone, string> = {
  neutral:
    "border border-line text-text-muted hover:border-text hover:bg-text hover:text-ink active:border-text active:bg-text active:text-ink",
  signal:
    "border border-signal text-signal hover:bg-signal hover:text-ink active:bg-signal active:text-ink",
  kapton: "bg-kapton text-kapton-ink hover:bg-text active:bg-text",
  alert:
    "border border-alert text-alert hover:bg-alert hover:text-ink active:bg-alert active:text-ink",
};

const paperNeutral =
  "border-paper-line text-muted-on-paper hover:border-text-on-paper hover:bg-text-on-paper hover:text-paper active:bg-text-on-paper active:text-paper";

/** Small status chip in the condensed datasheet voice. */
export function Chip({ tone = "neutral", dot, onPaper, className, children, ...rest }: ChipProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-sm px-2 py-0.5 text-sm leading-5 font-condensed whitespace-nowrap transition-colors duration-[120ms]",
        tones[tone],
        onPaper && tone === "neutral" && paperNeutral,
        className,
      )}
      {...rest}
    >
      {dot && <span aria-hidden="true" className="size-1.5 shrink-0 bg-current" />}
      {children}
    </span>
  );
}
