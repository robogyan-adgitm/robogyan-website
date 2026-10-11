import { Fragment, type CSSProperties, type FocusEvent, type KeyboardEvent } from "react";
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

function Item({ item, hidden, first }: { item: TickerItem; hidden?: boolean; first?: boolean }) {
  if (item.onSelect) {
    return (
      <button
        type="button"
        onClick={item.onSelect}
        // Roving tabindex: the strip is one tab stop; arrow keys move between facts.
        tabIndex={hidden || !first ? -1 : 0}
        className="-mx-1.5 cursor-pointer rounded-sm px-1.5 whitespace-nowrap transition-colors duration-150 hover:bg-text focus-visible:bg-text focus-visible:outline-kapton-ink active:bg-text"
      >
        {item.text}
      </button>
    );
  }
  return <span className="whitespace-nowrap">{item.text}</span>;
}

/**
 * The kapton tape: a full-width amber strip with facts scrolling continuously.
 * Pauses on hover and keyboard focus. Keyboard: one tab stop, ←/→ (Home/End) move
 * between facts and the focused fact is scrolled into view. With reduced motion it
 * becomes a static strip the user can scroll horizontally.
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
    items.map((item, i) => (
      <Fragment key={`${hidden ? "b" : "a"}-${item.id}`}>
        <Item item={item} hidden={hidden} first={i === 0} />
        <Separator />
      </Fragment>
    ));

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const buttons = Array.from(
      e.currentTarget.querySelectorAll<HTMLButtonElement>("button:not([aria-hidden] *)"),
    );
    const i = buttons.indexOf(document.activeElement as HTMLButtonElement);
    if (i < 0 || buttons.length === 0) return;
    let next = -1;
    if (e.key === "ArrowRight") next = (i + 1) % buttons.length;
    else if (e.key === "ArrowLeft") next = (i - 1 + buttons.length) % buttons.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = buttons.length - 1;
    if (next < 0) return;
    e.preventDefault();
    buttons[next]?.focus();
  };
  // The marquee is translated, so a focused fact may sit outside the strip: pull it in,
  // and reset once focus leaves so the animation continues from where it was.
  const onFocus = (e: FocusEvent<HTMLDivElement>) => {
    (e.target as HTMLElement).scrollIntoView({ block: "nearest", inline: "nearest" });
  };
  const onBlur = (e: FocusEvent<HTMLDivElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node | null)) e.currentTarget.scrollLeft = 0;
  };

  return (
    <div className={cn("relative overflow-hidden py-4 md:py-5", className)}>
      <section
        aria-label={label}
        className={cn(
          // 16px wider than the viewport on each side, so the tilted ends never show a gap;
          // the inner padding is larger than that overhang, so no fact starts off-screen.
          "relative -mx-4 w-[calc(100%+2rem)] bg-kapton py-2.5 text-base font-condensed text-kapton-ink",
          tilt && "-rotate-1",
        )}
      >
        {reduced ? (
          // eslint-disable-next-line jsx-a11y/no-static-element-interactions -- key delegation for the roving tabindex; the buttons inside are the interactive elements
          <div className="flex overflow-x-auto px-7" onKeyDown={onKeyDown}>
            {row(false)}
          </div>
        ) : (
          // eslint-disable-next-line jsx-a11y/no-static-element-interactions -- key delegation for the roving tabindex; the buttons inside are the interactive elements
          <div
            className="group flex overflow-hidden"
            onKeyDown={onKeyDown}
            onFocus={onFocus}
            onBlur={onBlur}
          >
            <div
              className="flex w-max animate-marquee items-center group-focus-within:[animation-play-state:paused] group-hover:[animation-play-state:paused]"
              style={{ "--marquee-duration": `${speed}s` } as CSSProperties}
            >
              <div className="flex items-center pl-7">{row(false)}</div>
              <div className="flex items-center pl-7" aria-hidden="true">
                {row(true)}
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
