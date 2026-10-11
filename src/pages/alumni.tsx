import { Button } from "@/components/Button";
import { Dimension } from "@/components/Dimension";
import { Frame } from "@/components/Frame";
import { PageHead } from "@/components/PageHead";
import { Section } from "@/components/Section";
import { alumniBatches, founders, foundersCopy, presidentsOnRecord } from "@/content/alumni";
import type { AlumniBatch } from "@/content/schemas";
import { links, site } from "@/content/site";
import { batchYear, personSocials } from "./people/helpers";
import { MemberGrid, PersonLinks, Portrait, RuledList } from "./people/shared";

/** Flat stand-in for a batch without a photo yet: the year on a panel. */
function YearPanel({ year }: { year: string }) {
  return (
    <div
      aria-hidden="true"
      className="flex aspect-video items-end bg-panel p-6 chamfer-lg select-none"
    >
      <span className="text-5xl font-display text-line">{year}</span>
    </div>
  );
}

function BatchRow({ batch }: { batch: AlumniBatch }) {
  const year = batchYear(batch.id);
  const headingId = `batch-${batch.id}`;
  return (
    <li className="border-t border-line py-12 md:py-16" aria-labelledby={headingId}>
      <div className="grid gap-8 lg:grid-cols-12 lg:gap-x-10">
        <div className="lg:col-span-5">
          <h3 id={headingId} className="text-3xl font-display tabular">
            {year}
          </h3>
          <p className="mt-2 text-xl">{batch.title}</p>
          <p className="mt-4 max-w-prose text-text-muted">{batch.description}</p>
          <RuledList
            items={batch.achievements}
            emptyText="Achievements for this batch are being added."
            className="mt-6"
          />
          <Button variant="secondary" href={`/alumni/${batch.id}`} className="mt-6">
            Open batch page
          </Button>
        </div>
        <div className="order-first lg:order-none lg:col-span-7">
          {batch.image ? (
            <Frame
              src={batch.image}
              alt={`The Robogyan core team of ${year}`}
              ratio="16 / 9"
              chamfer="lg"
            />
          ) : (
            <YearPanel year={year} />
          )}
        </div>
      </div>
      <MemberGrid members={batch.members} className="mt-10 md:mt-12" />
    </li>
  );
}

export default function AlumniPage() {
  const people = new Set(alumniBatches.flatMap((b) => b.members.map((m) => m.id)));
  for (const f of founders) people.add(f.id);

  return (
    <>
      <PageHead
        title="Alumni"
        description="The people who built Robogyan before us: two founders and every core team on record. Open a batch page to share it with your year."
      >
        <div className="grid max-w-3xl gap-4 sm:grid-cols-3 sm:gap-x-8">
          <Dimension value={people.size} label="alumni on record" />
          <Dimension value={alumniBatches.length} label="batches" />
          <Dimension value={presidentsOnRecord().length} label="presidents" />
        </div>
      </PageHead>

      <Section aria-labelledby="founders">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-x-10">
          <div className="lg:col-span-5">
            <h2 id="founders" className="text-2xl font-display md:text-3xl">
              {foundersCopy.title}
            </h2>
            <p className="mt-4 max-w-prose text-lg text-text-muted">
              {foundersCopy.body} The society was founded in {site.foundedYear}.
            </p>
            <blockquote className="mt-8 max-w-prose border-l-2 border-kapton pl-5 text-lg">
              {foundersCopy.quote}
            </blockquote>
            <p className="mt-8 text-sm text-text-muted">
              More on the founding years is being added.
            </p>
          </div>
          <ul className="grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-6 lg:col-span-7">
            {founders.map((f, i) => (
              <li key={f.id} className="min-w-0">
                <Portrait
                  src={f.image}
                  alt={`Portrait of ${f.name}`}
                  chamfer="lg"
                  priority={i === 0}
                />
                <h3 className="mt-4 text-xl font-display md:text-2xl">{f.name}</h3>
                <p className="mt-1 font-condensed text-text-muted">{f.position}</p>
                <p className="mt-2 text-text-muted">
                  {f.currentRole}, {f.company}
                </p>
                <PersonLinks socials={personSocials({ linkedin: f.linkedin })} className="mt-3" />
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section compact aria-labelledby="batches" className="pt-0 md:pt-0">
        <h2 id="batches" className="mb-8 text-sm font-condensed text-text-muted">
          Core teams, newest first
        </h2>
        <ol className="border-b border-line">
          {alumniBatches.map((b) => (
            <BatchRow key={b.id} batch={b} />
          ))}
        </ol>
      </Section>

      <Section surface="paper" aria-labelledby="your-details">
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h2 id="your-details" className="text-2xl font-display md:text-3xl">
              Were you in Robogyan?
            </h2>
            <p className="mt-4 max-w-prose text-lg text-muted-on-paper">
              We are still filling in the batches before 2019. If you were part of the society,
              tell us who you are and what you did here, so future members know who is behind the
              RG legacy.
            </p>
            <Button href={links.alumniFormUrl} className="mt-8">
              Share your details
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
