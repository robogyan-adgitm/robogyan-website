import { Chip, Frame } from "@/components";
import { moments } from "@/content/lifeAtRg";

/** Six highlighted moments: photo, title, year and place, one line, a result chip. */
export function Moments() {
  return (
    <ul className="grid gap-x-6 gap-y-10 sm:grid-cols-2">
      {moments.map((m) => (
        <li key={m.id}>
          <Frame
            src={m.image}
            alt={m.title}
            ratio="3 / 2"
            sizes="(min-width: 1024px) 600px, (min-width: 640px) 50vw, 100vw"
          />
          <div className="mt-4 flex flex-wrap items-baseline gap-x-4 gap-y-1">
            <h3 className="text-xl font-display">{m.title}</h3>
            {m.badges.map((b) => (
              <Chip key={b}>{b}</Chip>
            ))}
          </div>
          <p className="mt-1.5 flex flex-wrap gap-x-4 font-condensed text-text-muted">
            <span className="tabular">{m.year}</span>
            <span>{m.location}</span>
            {m.attendees && <span>{m.attendees}</span>}
          </p>
          <p className="mt-3 max-w-prose text-text-muted">{m.description}</p>
        </li>
      ))}
    </ul>
  );
}
