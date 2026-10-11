import { Button, Marker } from "@/components";
import { pptSlides, sihCopy, sihOverview } from "@/content/sih";

/** The six-slide deck as a numbered sequence, each with its key points and a ruled pro-tip aside. */
export function PptGuide() {
  return (
    <>
      <ol className="border-t border-line">
        {pptSlides.map((s) => (
          <li
            key={s.id}
            className="grid grid-cols-[2.5rem_1fr] gap-x-5 border-b border-line py-8 md:grid-cols-[2.5rem_3fr_2fr] md:gap-x-8 md:py-10"
          >
            <Marker n={s.number} />
            <div className="pt-1.5">
              <h3 className="text-xl font-semibold">{s.title}</h3>
              <p className="mt-1 text-text-muted">{s.subtitle}</p>
              <ul className="mt-4 max-w-prose list-disc space-y-2 pl-5 text-sm text-text-muted">
                {s.keyPoints.map((k) => (
                  <li key={k}>{k}</li>
                ))}
              </ul>
            </div>
            <aside className="col-start-2 mt-6 border-l border-line pl-4 md:col-start-3 md:mt-1.5 md:pl-6">
              <p className="text-sm font-condensed text-text-muted">{sihCopy.ppt.tipLabel}</p>
              <p className="mt-1 max-w-prose text-sm">{s.proTip}</p>
            </aside>
          </li>
        ))}
      </ol>
      <div className="mt-10 flex flex-wrap gap-3">
        <Button href={sihOverview.pptTemplateUrl}>Download the official template</Button>
        <Button variant="secondary" href={sihOverview.officialPSUrl}>
          Browse problem statements
        </Button>
      </div>
    </>
  );
}
