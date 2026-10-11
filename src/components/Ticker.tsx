import { Fragment, type CSSProperties } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/cn";

export interface TickerItem {
  id: string;
  text: string;
  /** When set, the item renders as a button (e.g. open the FactCard). */
  onSelect?: () => void;
}

export interface TickerProps {
  items: TickerItem[];
  /** Seconds for one full loop. Default 60. */
  speed?: number;
  /** Rotate the tape −1°. Default true. */
  tilt?: boolean;
  /** Accessible name of the strip. Default "Robogyan facts". */
  label?: string;
  className?: string;
}

function Separator() {
  return <span aria-hidden="true" className="mx-5 inline-block size-1.5 shrink-0 bg-kapton-ink" />;
}

function Item({ item, hidden }: { item: TickerItem; hidden?: boolean }) {
  if (item.onSelect) {
    return (
      <button
        type="button"
        onClick={item.onSelect}
        tabIndex={hidden ? -1 : undefined}
        className="cursor-pointer whitespace-nowrap underline-offset-4 hover:underline focus-visible:outline-kapton-ink"
      >
        {item.text}
      </button>
    );
  }
  return <span className="whitespace-nowrap">{item.text}</span>;
}

/**
 * The kapton tape: a full-width amber strip with facts scrolling continuously.
 * Pauses on hover and keyboard focus. With reduced motion it becomes a static strip
 * the user can scroll horizontally.
 */
export function Ticker({
  items,
  speed = 60,
  tilt = true,
  label = "Robogyan facts",
  className,
}: TickerProps) {
  const reduced = useReducedMotion();
  const row = (hidden: boolean) =>
    items.map((item) => (
      <Fragment key={`${hidden ? "b" : "a"}-${item.id}`}>
        <Item item={item} hidden={hidden} />
        <Separator />
      </Fragment>
    ));

  return (
    <div className={cn("relative overflow-hidden py-3", className)}>
      <section
        aria-label={label}
        className={cn(
          "relative -mx-[2%] w-[104%] bg-kapton py-2.5 text-base font-condensed text-kapton-ink",
          tilt && "-rotate-1",
        )}
      >
        {reduced ? (
          <div className="flex overflow-x-auto px-6">{row(false)}</div>
        ) : (
          <div className="group flex overflow-hidden">
            <div
              className="flex w-max animate-marquee items-center group-focus-within:[animation-play-state:paused] group-hover:[animation-play-state:paused]"
              style={{ "--marquee-duration": `${speed}s` } as CSSProperties}
            >
              <div className="flex items-center pl-5">{row(false)}</div>
              <div className="flex items-center pl-5" aria-hidden="true">
                {row(true)}
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
