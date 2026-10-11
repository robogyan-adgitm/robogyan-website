import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";
import { Frame } from "@/components/Frame";
import { latestWins, trackRecord } from "@/content/achievements";
import { cn } from "@/lib/cn";

interface RailCard {
  id: string;
  year: string;
  title: string;
  result: string;
  image?: string;
  alt?: string;
}

/** "Smart India Hackathon 2025: national winners" → title + sentence-case result. */
function splitRecord(title: string): { title: string; result: string } {
  const i = title.indexOf(": ");
  if (i < 0) return { title, result: "" };
  const result = title.slice(i + 2);
  return {
    title: title.slice(0, i),
    result: result.charAt(0).toUpperCase() + result.slice(1),
  };
}

const cards: RailCard[] = [
  ...latestWins.map((w) => ({
    id: w.id,
    year: w.date.slice(0, 4),
    title: w.title,
    result: w.result,
    image: w.image,
    alt: `${w.title}: ${w.result}`,
  })),
  ...trackRecord.map((r) => ({ id: r.id, year: String(r.year), ...splitRecord(r.title) })),
];

/**
 * Horizontal scroll-snap rail of wins. Scrolls by touch, keyboard (the strip is
 * focusable), and the labelled prev/next buttons. No auto-advance.
 */
export function WinsRail() {
  const ref = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: 1 | -1) => {
    const el = ref.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("li");
    const step = card ? card.offsetWidth + 16 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step * 2, behavior: "smooth" });
  };

  const navButton = (dir: 1 | -1) => (
    <button
      type="button"
      onClick={() => scrollBy(dir)}
      aria-label={dir === 1 ? "Next wins" : "Previous wins"}
      className="inline-flex size-11 cursor-pointer items-center justify-center rounded-sm border border-line text-text transition-colors hover:border-text"
    >
      {dir === 1 ? (
        <ChevronRight aria-hidden="true" className="size-5" />
      ) : (
        <ChevronLeft aria-hidden="true" className="size-5" />
      )}
    </button>
  );

  return (
    <div>
      <div className="flex items-end justify-between gap-6">
        <div>
          <h2 id="wins-title" className="text-2xl font-display md:text-3xl">
            Wins
          </h2>
          <p className="mt-3 max-w-prose text-text-muted">
            Recent results first, then the record that got us here.
          </p>
        </div>
        <div className="flex shrink-0 gap-2">
          {navButton(-1)}
          {navButton(1)}
        </div>
      </div>

      <div
        ref={ref}
        role="region"
        aria-labelledby="wins-title"
        // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex -- keyboard-scrollable rail
        tabIndex={0}
        className={cn(
          "-mx-4 mt-8 snap-x snap-mandatory overflow-x-auto scroll-smooth px-4 pb-2 md:-mx-6 md:px-6",
          "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
        )}
      >
        <ul className="flex w-max gap-4">
          {cards.map((c) => (
            <li
              key={c.id}
              className="flex w-[min(78vw,20rem)] shrink-0 snap-start flex-col border-t border-line pt-4"
            >
              {c.image ? (
                <Frame src={c.image} alt={c.alt ?? c.title} ratio="16 / 10" sizes="320px" />
              ) : (
                <div
                  aria-hidden="true"
                  className="flex aspect-[16/10] items-end bg-panel p-4 text-5xl font-display text-line chamfer"
                >
                  {c.year}
                </div>
              )}
              <p className="mt-4 text-sm font-condensed text-text-muted">{c.year}</p>
              <h3 className="mt-1 text-lg font-semibold">{c.title}</h3>
              {c.result && <p className="mt-1 text-text-muted">{c.result}</p>}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
