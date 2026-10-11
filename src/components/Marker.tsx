import { cn } from "@/lib/cn";

export interface MarkerProps {
  /** Step number; rendered zero-padded ("01"). */
  n: number;
  /** "current" fills it with kapton (e.g. the live SIH phase). */
  state?: "default" | "current" | "done";
  onPaper?: boolean;
  className?: string;
}

/**
 * Numbered square step marker. ONLY for real sequences (SIH timeline, PPT slide guide);
 * never as decoration on unordered lists.
 */
export function Marker({ n, state = "default", onPaper, className }: MarkerProps) {
  return (
    <span
      className={cn(
        "inline-flex size-10 shrink-0 items-center justify-center text-base font-condensed",
        state === "current"
          ? "bg-kapton text-kapton-ink"
          : onPaper
            ? "border border-text-on-paper text-text-on-paper"
            : "border border-line text-text",
        state === "done" && !onPaper && "border-text-muted text-text-muted",
        className,
      )}
    >
      {String(n).padStart(2, "0")}
    </span>
  );
}
