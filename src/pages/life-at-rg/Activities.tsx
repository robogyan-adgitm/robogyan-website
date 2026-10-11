import { Frame } from "@/components";
import { activities } from "@/content/lifeAtRg";

/** Six regular activities: photo, title and one line each, in a 3-column list. */
export function Activities() {
  return (
    <ul className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
      {activities.map((a) => (
        <li key={a.id} className="hover-card">
          <Frame
            src={a.src}
            alt={a.alt}
            ratio="3 / 2"
            sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
          />
          <h3 data-card-title className="mt-4 text-lg font-semibold">
            {a.title}
          </h3>
          <p className="mt-1 text-text-muted">{a.description}</p>
        </li>
      ))}
    </ul>
  );
}
