import { Chip, Marker } from "@/components";
import { sihTimeline } from "@/content/sih";
import type { SihPhase } from "@/content/schemas";

function markerState(status: SihPhase["status"]) {
  if (status === "Completed") return "done";
  if (status === "Live") return "current";
  return "default";
}

/** Six phases on a vertical 1px rail with numbered markers (a real sequence). */
export function Timeline() {
  return (
    <ol>
      {sihTimeline.map((p, i) => (
        <li
          key={p.id}
          className="relative grid grid-cols-[2.5rem_1fr] gap-x-5 pb-10 last:pb-0 md:gap-x-8"
        >
          {i < sihTimeline.length - 1 && (
            <span aria-hidden="true" className="absolute top-10 bottom-0 left-5 w-px bg-line" />
          )}
          <Marker n={p.number} state={markerState(p.status)} />
          <div className="pt-1.5">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <h3 className="text-xl font-semibold">{p.title}</h3>
              <Chip tone={p.status === "Live" ? "signal" : "neutral"} dot={p.status === "Live"}>
                {p.status}
              </Chip>
            </div>
            <p className="mt-1 text-sm font-condensed text-text-muted">{p.when}</p>
            <p className="mt-3 max-w-prose text-text-muted">{p.description}</p>
            <ul className="mt-3 max-w-prose list-disc space-y-1 pl-5 text-sm text-text-muted">
              {p.details.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
          </div>
        </li>
      ))}
    </ol>
  );
}
