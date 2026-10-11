import { Frame } from "@/components";
import { sihWinnerStories } from "@/content/sih";
import { cn } from "@/lib/cn";

/**
 * Five legacy stories as an editorial list, image and text alternating sides. National
 * winners carry `data-sih-winner` so the "sih" confetti egg can find them.
 */
export function WinnerStories() {
  return (
    <ol className="border-y border-line">
      {sihWinnerStories.map((s, i) => {
        // Standing and badge are lines of their own; highlights become datasheet rows
        // (award repeats the standing in other words, so it is not listed again).
        const rows = s.highlights;
        return (
          <li
            key={s.id}
            className="grid gap-6 border-b border-line py-10 last:border-b-0 md:grid-cols-2 md:gap-12 md:py-14"
          >
            <div
              className={cn("self-start", i % 2 === 1 && "md:order-2")}
              data-sih-winner={s.winner ? "" : undefined}
            >
              <Frame
                src={s.image}
                alt={`${s.title}: ${s.teamName}`}
                ratio="16 / 10"
                fit={s.imageFit}
                position={s.imagePosition}
                sizes="(min-width: 1280px) 616px, (min-width: 768px) 50vw, 100vw"
              />
            </div>
            <div className="flex flex-col justify-center">
              <h3 className="text-2xl font-display">{s.teamName}</h3>
              <p className="mt-1 text-lg">{s.standing}</p>
              <p className="mt-1 text-sm font-condensed text-text-muted">
                {s.edition}, {s.badge}
              </p>
              <p className="mt-4 max-w-prose text-text-muted">{s.description}</p>
              <ul className="mt-6 max-w-prose border-t border-line text-sm font-condensed">
                {rows.map((r) => (
                  <li key={r} className="border-b border-line py-2 text-text-muted">
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
