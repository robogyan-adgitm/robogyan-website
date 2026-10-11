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
        // Standing is shown as a line of its own; the rest become datasheet rows.
        const rows = [...new Set([s.badge, s.award, ...s.highlights])].filter(
          (r) => r !== s.standing,
        );
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
              <p className="text-sm font-condensed text-text-muted">{s.edition}</p>
              <h3 className="mt-2 text-2xl font-display">{s.teamName}</h3>
              <p className="mt-1 text-lg">{s.standing}</p>
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
