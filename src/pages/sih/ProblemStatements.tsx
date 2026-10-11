import { Accordion, Button, Chip, TechTagList } from "@/components";
import { sampleProblemStatements, sihCopy, sihOverview } from "@/content/sih";

/** Six sample problem statements as an exclusive accordion, then the official portal link. */
export function ProblemStatements() {
  return (
    <>
      <Accordion
        name="sample-ps"
        items={sampleProblemStatements.map((ps) => ({
          id: ps.id,
          title: (
            <span className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-4">
              <span className="shrink-0 text-sm font-condensed text-text-muted">{ps.psNumber}</span>
              <span>{ps.title}</span>
            </span>
          ),
          content: (
            <>
              <dl className="grid gap-x-6 gap-y-1 text-sm font-condensed sm:grid-cols-[auto_1fr]">
                <dt className="text-text-muted">Organisation</dt>
                <dd className="text-text">{ps.organization}</dd>
                <dt className="text-text-muted">Theme</dt>
                <dd className="text-text">{ps.theme}</dd>
              </dl>
              <Chip className="mt-3">{ps.category}</Chip>
              <p className="mt-4">{ps.description}</p>
              <TechTagList items={ps.techStack} className="mt-4" />
            </>
          ),
        }))}
      />
      <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-semibold">{sihCopy.problemStatements.portalPrompt}</p>
          <p className="mt-1 max-w-prose text-sm text-text-muted">
            {sihCopy.problemStatements.portalNote}
          </p>
        </div>
        <Button
          variant="secondary"
          href={sihOverview.officialPSUrl}
          className="shrink-0 self-start"
        >
          Browse all problem statements
        </Button>
      </div>
    </>
  );
}
