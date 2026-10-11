import { AppLink, Button, Dimension, PageHead, Section } from "@/components";
import { sihAnchors, sihCopy, sihOverview } from "@/content/sih";
import { emails, lab, links } from "@/content/site";
import { useSihConfetti } from "@/features/eggs";
import { FaqGroups } from "./sih/Faq";
import { JudgesGrid } from "./sih/Judges";
import { PptGuide } from "./sih/PptGuide";
import { ProblemStatements } from "./sih/ProblemStatements";
import { ResultsTables } from "./sih/Results";
import { SectionNav } from "./sih/SectionNav";
import { SectionTitle } from "./sih/SectionTitle";
import { WinnerStories } from "./sih/Stories";
import { TracksAndThemes } from "./sih/Themes";
import { Timeline } from "./sih/Timeline";

/** Clears the sticky navbar + section strip when jumping to an anchor. */
const anchor = "scroll-mt-28";
const { internalRound } = sihOverview;

/**
 * SIH 2026 portal: results, judges, legacy, timeline, tracks and themes, sample problem
 * statements, PPT guide, FAQ, teammate finder. Typing "sih" bursts amber squares out of
 * the national-winner stories.
 */
export default function SihPage() {
  useSihConfetti();

  return (
    <>
      <PageHead
        title="Smart India Hackathon 2026"
        seoTitle="SIH 2026"
        description={sihCopy.head.status}
      >
        <div className="grid gap-x-10 gap-y-5 sm:grid-cols-2 lg:grid-cols-4">
          <Dimension value={internalRound.teams} suffix="+" label="teams" />
          <Dimension value={internalRound.participants} label="participants" />
          <Dimension
            value={`${internalRound.selected} + ${internalRound.waitlisted}`}
            label="selected and waitlisted"
          />
          <Dimension value={internalRound.judges} label="judges" />
        </div>
        <div className="mt-8 flex flex-wrap gap-3 md:mt-10">
          <Button href={`#${sihAnchors.results}`}>See results</Button>
          <Button variant="secondary" href={sihOverview.officialPortalUrl}>
            Official SIH portal
          </Button>
        </div>
      </PageHead>

      <SectionNav />

      <Section id={sihAnchors.results} className={anchor}>
        <SectionTitle title={sihCopy.results.title} intro={sihCopy.results.intro} />
        <ResultsTables />
        <p className="mt-6 max-w-prose text-sm text-text-muted">{sihCopy.results.note}</p>
      </Section>

      <Section id={sihAnchors.judges} className={`${anchor} border-t border-line`}>
        <SectionTitle title={sihCopy.judges.title} intro={sihCopy.judges.intro} />
        <JudgesGrid />
      </Section>

      <Section id="legacy" className={`${anchor} border-t border-line`}>
        <SectionTitle title={sihCopy.legacy.title} intro={sihCopy.legacy.intro} />
        <WinnerStories />
      </Section>

      <Section id="timeline" className={`${anchor} border-t border-line`}>
        <SectionTitle title={sihCopy.timeline.title} intro={sihCopy.timeline.intro} />
        <Timeline />
      </Section>

      <Section id="tracks" surface="paper" className={anchor}>
        <SectionTitle title={sihCopy.tracks.title} intro={sihCopy.tracks.intro} onPaper />
        <TracksAndThemes />
      </Section>

      <Section id="problem-statements" className={anchor}>
        <SectionTitle
          title={sihCopy.problemStatements.title}
          intro={sihCopy.problemStatements.intro}
        />
        <ProblemStatements />
      </Section>

      <Section id={sihAnchors.pptGuide} className={`${anchor} border-t border-line`}>
        <SectionTitle title={sihCopy.ppt.title} intro={sihCopy.ppt.intro} />
        <PptGuide />
      </Section>

      <Section id="faq" className={`${anchor} border-t border-line`}>
        <SectionTitle title={sihCopy.faq.title} intro={sihCopy.faq.intro} />
        <FaqGroups />
      </Section>

      <Section id={sihAnchors.teammateFinder} className={`${anchor} border-t border-line`}>
        <div className="grid gap-10 lg:grid-cols-[3fr_2fr] lg:gap-16">
          <div>
            <SectionTitle title={sihCopy.finder.title} intro={sihCopy.finder.intro} />
            <p className="max-w-prose text-text-muted">{sihCopy.finder.mentoring}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href={links.whatsappSihTeammates}>Join the SIH WhatsApp community</Button>
              <Button variant="secondary" href="/contact">
                Visit the lab in {lab.block}
              </Button>
            </div>
          </div>
          <dl className="self-start border-t border-line text-sm font-condensed lg:mt-2">
            <div className="grid grid-cols-[7rem_1fr] gap-4 border-b border-line py-3">
              <dt className="text-text-muted">Helpdesk</dt>
              <dd>{sihCopy.finder.committee}</dd>
            </div>
            <div className="grid grid-cols-[7rem_1fr] gap-4 border-b border-line py-3">
              <dt className="text-text-muted">Email</dt>
              <dd>
                <AppLink href={`mailto:${emails.contact}`} className="underline-offset-4 hover:underline">
                  {emails.contact}
                </AppLink>
              </dd>
            </div>
            <div className="grid grid-cols-[7rem_1fr] gap-4 border-b border-line py-3">
              <dt className="text-text-muted">Location</dt>
              <dd>{sihCopy.finder.location}</dd>
            </div>
          </dl>
        </div>
      </Section>

      <Section compact className="border-t border-line">
        <h2 className="text-2xl font-display md:text-3xl">{sihCopy.closing.title}</h2>
        <p className="mt-4 max-w-prose text-lg text-text-muted">{sihCopy.closing.intro}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button variant="secondary" href={`#${sihAnchors.results}`}>
            View selected teams
          </Button>
          <Button variant="secondary" href={links.whatsappSihTeammates}>
            Join the WhatsApp community
          </Button>
        </div>
        <p className="mt-10 max-w-prose text-text-muted">
          Questions about the hackathon? Write to{" "}
          <AppLink
            href={`mailto:${emails.contact}`}
            className="text-text underline-offset-4 hover:underline"
          >
            {emails.contact}
          </AppLink>
          , or{" "}
          <AppLink href="/" className="text-text underline-offset-4 hover:underline">
            go back to the home page
          </AppLink>
          .
        </p>
      </Section>
    </>
  );
}
