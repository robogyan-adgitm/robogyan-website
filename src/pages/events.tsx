import { AppLink, PageHead, Section } from "@/components";
import { pastEvents, upcomingEvents } from "@/content/events";
import type { RgEvent } from "@/content/schemas";
import { socials } from "@/content/site";
import { EventRow } from "./events/EventRow";

/** Past events grouped by year, newest year first, newest event first within a year. */
function groupByYear(events: RgEvent[]): { year: number; events: RgEvent[] }[] {
  const map = new Map<number, RgEvent[]>();
  for (const e of [...events].sort((a, b) => (a.start < b.start ? 1 : -1))) {
    const year = Number(e.start.slice(0, 4));
    map.set(year, [...(map.get(year) ?? []), e]);
  }
  return [...map.entries()]
    .sort((a, b) => b[0] - a[0])
    .map(([year, list]) => ({ year, events: list }));
}

const instagram = socials.find((s) => s.id === "instagram");

/**
 * Events: what is coming up (an empty state today) and everything the lab has run,
 * as a chronological list with a sticky year rail on desktop.
 */
export default function EventsPage() {
  const years = groupByYear(pastEvents);
  const upcoming = groupByYear(upcomingEvents);

  return (
    <>
      <PageHead
        title="Events"
        description="Hackathons, workshops and fest builds run by Robogyan, in and around Block 5."
      />

      <Section compact aria-labelledby="upcoming">
        <h2 id="upcoming" className="text-2xl font-display">
          Upcoming
        </h2>
        {upcomingEvents.length === 0 ? (
          <p className="mt-4 max-w-prose text-lg text-text-muted">
            Nothing scheduled right now. Follow{" "}
            {instagram ? (
              <AppLink
                href={instagram.href}
                className="text-text underline underline-offset-4 hover:text-kapton"
              >
                {instagram.handle} on Instagram
              </AppLink>
            ) : (
              "@robogyan on Instagram"
            )}{" "}
            for the next one.
          </p>
        ) : (
          upcoming.map((g) => (
            <ul key={g.year} className="mt-6 border-b border-line">
              {g.events.map((e) => (
                <EventRow key={e.id} event={e} />
              ))}
            </ul>
          ))
        )}
      </Section>

      <Section compact aria-labelledby="past" className="border-t border-line">
        <h2 id="past" className="text-2xl font-display">
          Past events
        </h2>
        <div className="mt-8 flex flex-col gap-12 border-b border-line md:gap-16">
          {years.map((g) => (
            <section
              key={g.year}
              aria-label={String(g.year)}
              className="grid gap-4 md:grid-cols-12 md:gap-8"
            >
              <div className="md:col-span-2">
                <p className="text-4xl font-display text-text-muted tabular md:sticky md:top-24">
                  {g.year}
                </p>
              </div>
              <ul className="md:col-span-10">
                {g.events.map((e) => (
                  <EventRow key={e.id} event={e} />
                ))}
              </ul>
            </section>
          ))}
        </div>
      </Section>
    </>
  );
}
