import { useState } from "react";
import { Button, PageHead, Section } from "@/components";
import { projects } from "@/content/projects";
import type { Project } from "@/content/schemas";
import { cn } from "@/lib/cn";
import { ProjectRow } from "./projects/ProjectRow";

type Filter = "all" | Project["category"];

/** Categories in first-seen order, so the chips follow the list. */
const categories = [...new Set(projects.map((p) => p.category))];

/**
 * Projects: a datasheet list of every lab build, filterable by category. The active
 * filter chip is the page's one kapton element.
 */
export default function ProjectsPage() {
  const [filter, setFilter] = useState<Filter>("all");
  const shown = filter === "all" ? projects : projects.filter((p) => p.category === filter);
  const options: { id: Filter; label: string }[] = [
    { id: "all", label: "All" },
    ...categories.map((c) => ({ id: c, label: c })),
  ];

  return (
    <>
      <PageHead
        title="Projects"
        description="What the lab is building: hovercrafts, RC planes, IoT devices and more. Every build starts on a bench in Block 5."
      >
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          <div
            role="group"
            aria-label="Filter projects by category"
            className="flex flex-wrap gap-2"
          >
            {options.map((o) => {
              const pressed = o.id === filter;
              return (
                <button
                  key={o.id}
                  type="button"
                  aria-pressed={pressed}
                  onClick={() => setFilter(o.id)}
                  className={cn(
                    "h-9 cursor-pointer px-3 text-sm font-semibold transition-colors duration-150",
                    pressed
                      ? "bg-kapton text-kapton-ink chamfer"
                      : "rounded-sm border border-line text-text-muted hover:border-text hover:text-text",
                  )}
                >
                  {o.label}
                </button>
              );
            })}
          </div>
          <p aria-live="polite" className="text-sm font-condensed text-text-muted">
            {shown.length} of {projects.length} projects
          </p>
        </div>
      </PageHead>

      <Section compact>
        <ul className="border-b border-line">
          {shown.map((p) => (
            <ProjectRow key={p.id} project={p} />
          ))}
        </ul>
      </Section>

      <Section surface="paper">
        <div className="grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <h2 className="text-3xl font-display">Have an idea? The lab is open.</h2>
            <p className="mt-4 max-w-prose text-lg text-muted-on-paper">
              Most of these started as a sketch and a parts list. Bring yours to Block 5 and build
              it with people who have done this before.
            </p>
          </div>
          <div className="md:col-span-4 md:justify-self-end">
            <Button variant="secondary" onPaper href="/contact">
              Get in touch
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
