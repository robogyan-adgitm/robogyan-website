import { AppLink, Chip, TechTagList } from "@/components";
import { sihCopy, sihOverview, sihThemes, sihTracks } from "@/content/sih";

/** Two tracks as text blocks with datasheet rows, then the twelve themes as a ruled grid. */
export function TracksAndThemes() {
  return (
    <>
      <div className="grid gap-10 md:grid-cols-2 md:gap-12">
        {sihTracks.map((t) => (
          <article key={t.id}>
            <h3 className="text-xl font-display">{t.name}</h3>
            <p className="mt-1 text-lg text-muted-on-paper">{t.title}</p>
            <p className="mt-4 max-w-prose text-muted-on-paper">{t.description}</p>
            <TechTagList items={t.domains} onPaper className="mt-5" />
            <dl className="mt-6 max-w-prose border-t border-paper-line text-sm font-condensed">
              <div className="flex justify-between gap-6 border-b border-paper-line py-2">
                <dt className="text-muted-on-paper">Problem statements</dt>
                <dd className="text-right">{t.psCount}</dd>
              </div>
              <div className="flex justify-between gap-6 border-b border-paper-line py-2">
                <dt className="text-muted-on-paper">{sihCopy.tracks.deliverableLabel}</dt>
                <dd className="text-right">{t.deliverable}</dd>
              </div>
            </dl>
            <AppLink
              href={sihOverview.officialPSUrl}
              className="mt-4 inline-block font-semibold underline decoration-paper-line underline-offset-4 hover:decoration-current"
            >
              {t.portalLabel}
            </AppLink>
          </article>
        ))}
      </div>

      <h3 className="mt-16 text-xl font-display">Twelve themes</h3>
      <ul className="mt-6 grid border-b border-paper-line sm:grid-cols-2 sm:gap-x-8 lg:grid-cols-4">
        {sihThemes.map((t) => (
          <li key={t.id} className="flex flex-col border-t border-paper-line py-5">
            <h4 className="font-semibold">{t.name}</h4>
            <p className="mt-2 text-sm text-muted-on-paper">{t.description}</p>
            <Chip onPaper className="mt-4 self-start">
              {t.category === "Both" ? "Software and hardware" : t.category}
            </Chip>
          </li>
        ))}
      </ul>
    </>
  );
}
