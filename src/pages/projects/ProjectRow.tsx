import type { ReactNode } from "react";
import { Chip, Frame, TechTagList } from "@/components";
import type { Project } from "@/content/schemas";
import { formatDate } from "@/lib/dates";

/** One spec cell of the condensed datasheet table. */
function Spec({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex items-baseline gap-3 border-t border-line py-2.5">
      <dt className="w-16 shrink-0 text-sm font-condensed text-text-muted">{label}</dt>
      <dd className="min-w-0 font-condensed text-text">{children}</dd>
    </div>
  );
}

/**
 * One project as a full-width datasheet row: image left (5/12), name, summary, a
 * 2-column spec table and the tech stack right (7/12). Stacked on mobile.
 */
export function ProjectRow({ project }: { project: Project }) {
  const active = project.status === "Active";
  return (
    <li className="grid gap-6 border-t border-line py-10 md:grid-cols-12 md:gap-8 md:py-14">
      <div className="md:col-span-5">
        <Frame
          src={project.image}
          alt={project.name}
          ratio="3 / 2"
          sizes="(min-width: 768px) 40vw, 100vw"
        />
      </div>
      <div className="md:col-span-7 md:pt-1">
        <h2 className="text-2xl font-display">{project.name}</h2>
        <p className="mt-3 max-w-prose text-text-muted">{project.summary}</p>
        <dl className="mt-6 grid border-b border-line sm:grid-cols-2 sm:gap-x-8">
          <Spec label="Status">
            <Chip tone={active ? "signal" : "neutral"} dot={active}>
              {project.status}
            </Chip>
          </Spec>
          <Spec label="Category">{project.category}</Spec>
          <Spec label="Started">{formatDate(project.start)}</Spec>
          <Spec label="Finished">
            {project.end ? formatDate(project.end) : <span className="text-text-muted">Ongoing</span>}
          </Spec>
        </dl>
        <TechTagList items={project.techStack} className="mt-5" />
      </div>
    </li>
  );
}
