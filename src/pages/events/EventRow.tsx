import { Button, Chip, Frame } from "@/components";
import type { RgEvent } from "@/content/schemas";
import { formatRange } from "@/lib/dates";

function Meta({ label, children }: { label: string; children: string }) {
  return (
    <div className="flex items-baseline gap-3">
      <dt className="w-14 shrink-0 text-sm font-condensed text-text-muted">{label}</dt>
      <dd className="font-condensed text-text">{children}</dd>
    </div>
  );
}

/** One past event: photo left, type chip, name, description and the datasheet meta. */
export function EventRow({ event }: { event: RgEvent }) {
  const sih = event.registrationUrl === "/sih";
  return (
    <li
      data-rule
      className="hover-card grid gap-5 border-t border-line py-8 sm:grid-cols-12 sm:gap-6 md:py-10"
    >
      <div className="sm:col-span-5">
        <Frame
          src={event.image}
          alt={event.name}
          ratio="3 / 2"
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 40vw, 100vw"
        />
      </div>
      <div className="sm:col-span-7">
        <Chip>{event.type}</Chip>
        <h3 data-card-title className="mt-3 text-xl font-display md:text-2xl">
          {event.name}
        </h3>
        <p className="mt-3 max-w-prose text-text-muted">{event.description}</p>
        <dl className="mt-5 flex flex-col gap-1.5">
          <Meta label="Date">{formatRange(event.start, event.end)}</Meta>
          <Meta label="Time">{event.time}</Meta>
          <Meta label="Venue">{event.venue}</Meta>
        </dl>
        {sih && (
          <Button variant="secondary" size="sm" href="/sih" className="mt-6">
            See the SIH portal
          </Button>
        )}
      </div>
    </li>
  );
}
