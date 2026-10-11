import { Button } from "@/components/Button";
import { Chip } from "@/components/Chip";
import { Dimension } from "@/components/Dimension";
import { Frame } from "@/components/Frame";
import { Section } from "@/components/Section";
import { Seo } from "@/components/Seo";
import { TechTagList } from "@/components/TechTag";
import { stats } from "@/content/achievements";
import { featuredProjects } from "@/content/projects";
import { sihAnchors, sihOverview } from "@/content/sih";
import { about, lab, site, socials } from "@/content/site";
import { featuredTeam } from "@/content/team";
import { formatDate } from "@/lib/dates";
import { Hero } from "./home/Hero";
import { Panel } from "./home/Panel";
import { StickerFrame } from "./home/StickerFrame";
import { WinsRail } from "./home/WinsRail";
import { PortraitTag } from "./people/shared";

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  alternateName: "Robogyan, ADGIPS",
  url: site.url,
  logo: `${site.url}/logo.png`,
  description: site.description,
  foundingDate: String(site.foundedYear),
  slogan: site.tagline,
  address: {
    "@type": "PostalAddress",
    streetAddress: `${lab.name}, ${lab.block}, ADGIPS, FC-26, Shastri Park`,
    addressLocality: "New Delhi",
    postalCode: "110053",
    addressCountry: "IN",
  },
  sameAs: socials.filter((s) => s.href.startsWith("https://")).map((s) => s.href),
};

/** One-line notes for the four "what we do" points, keyed by `about.points[].id`. */
const pointNotes: Record<string, string> = {
  projects: "Hovercrafts, RC planes, line followers, IoT devices for farms and for people.",
  community: "Seniors teach juniors in the lab; teams form across years and branches.",
  "hands-on": "You learn by building, breaking and fixing, not by watching.",
  competitions: "Smart India Hackathon, Techkriti, e-Yantra, Flipkart GRiD and more.",
};

const homeStats = ["years", "members", "wins"]
  .map((id) => stats.find((s) => s.id === id))
  .filter((s) => s !== undefined);

/** Photos taped to a board: small alternating offsets and ±1° tilts. */
const collageTilt = [
  "-rotate-1 md:-translate-y-1",
  "rotate-1 md:translate-y-2",
  "rotate-1",
  "-rotate-1 md:-translate-y-1",
];

export default function HomePage() {
  return (
    <>
      <Seo description={site.description} path="/" jsonLd={organizationJsonLd} />

      <Hero />

      {/* SIH 2026 notice */}
      <Section compact aria-labelledby="sih-notice-title">
        <Panel innerClassName="p-6 md:p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-prose">
              <div className="flex flex-wrap items-center gap-3">
                <Chip tone="signal" dot>
                  Results out
                </Chip>
                <h2 id="sih-notice-title" className="text-xl font-display">
                  {sihOverview.shortTitle}
                </h2>
              </div>
              <p className="mt-3 text-text-muted">{sihOverview.intro}</p>
            </div>
            <div className="flex shrink-0 flex-wrap gap-3">
              <Button href={`/sih#${sihAnchors.results}`}>
                See the {sihOverview.internalRound.selected} selected teams
              </Button>
              <Button href={`/sih#${sihAnchors.judges}`} variant="secondary">
                Meet the {sihOverview.internalRound.judges} judges
              </Button>
            </div>
          </div>
        </Panel>
      </Section>

      {/* What we do */}
      <Section surface="paper" aria-labelledby="what-title">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-6">
            <h2 id="what-title" className="text-2xl font-display md:text-3xl">
              What we do
            </h2>
            <div className="mt-6 max-w-prose space-y-4 text-lg">
              <p>
                Robogyan is the oldest technical society of ADGIPS. Since {site.foundedYear} the lab
                in the basement of {lab.block} has been where students build hovercrafts, RC planes,
                line followers and IoT devices, and where teams prepare for the Smart India
                Hackathon.
              </p>
              <p>{about.mission}</p>
              <p className="text-muted-on-paper">
                Engineering comes alive here: hands-on innovation, skills you master by using them,
                and building what&rsquo;s next.
              </p>
            </div>
            <ul className="mt-10 max-w-prose border-t border-paper-line">
              {about.points.map((point) => (
                <li
                  key={point.id}
                  className="grid gap-1 border-b border-paper-line py-4 md:grid-cols-[14rem_1fr] md:gap-6"
                >
                  <span className="font-semibold">{point.title}</span>
                  <span className="text-muted-on-paper">{pointNotes[point.id]}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-6 lg:pl-6">
            <ul className="grid grid-cols-2 gap-4 md:gap-6" aria-label="Photos from the lab">
              {about.photos.map((photo, i) => (
                <li key={photo.src} className={collageTilt[i]}>
                  <StickerFrame
                    src={photo.src}
                    alt={photo.alt}
                    ratio="4 / 3"
                    sizes="(min-width: 1024px) 300px, 45vw"
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 grid gap-6 md:mt-20 md:grid-cols-3 md:gap-10">
          {homeStats.map((s) => (
            <Dimension key={s.id} value={s.value} suffix={s.suffix} label={s.label} onPaper />
          ))}
        </div>
      </Section>

      {/* Wins rail */}
      <Section aria-labelledby="wins-title">
        <WinsRail />
      </Section>

      {/* Featured projects */}
      <Section aria-labelledby="projects-title" className="border-t border-line">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <h2 id="projects-title" className="text-2xl font-display md:text-3xl">
              Featured projects
            </h2>
            <p className="mt-3 max-w-prose text-text-muted">
              Three things on the bench right now, with their datasheets.
            </p>
          </div>
          <Button href="/projects" variant="secondary">
            All projects
          </Button>
        </div>
        <ul className="mt-10 grid gap-6 md:grid-cols-3">
          {featuredProjects.map((p) => (
            <li key={p.id} className="hover-card">
              <Panel hover className="h-full" innerClassName="flex flex-col">
                <Frame
                  src={p.image}
                  alt={p.name}
                  ratio="16 / 10"
                  chamfer="none"
                  sizes="(min-width: 768px) 400px, 100vw"
                />
                <div className="flex flex-1 flex-col p-5 md:p-6">
                  <h3 data-card-title className="text-xl font-display">
                    {p.name}
                  </h3>
                  <p className="mt-2 text-text-muted">{p.summary}</p>
                  <dl className="mt-6 border-t border-line text-sm">
                    <div className="grid grid-cols-[5rem_1fr] gap-3 border-b border-line py-2.5">
                      <dt className="font-condensed text-text-muted">Status</dt>
                      <dd className="font-condensed">{p.status}</dd>
                    </div>
                    <div className="grid grid-cols-[5rem_1fr] gap-3 border-b border-line py-2.5">
                      <dt className="font-condensed text-text-muted">Started</dt>
                      <dd className="font-condensed">{formatDate(p.start)}</dd>
                    </div>
                    <div className="grid grid-cols-[5rem_1fr] gap-3 border-b border-line py-2.5">
                      <dt className="font-condensed text-text-muted">Stack</dt>
                      <dd>
                        <TechTagList items={p.techStack} />
                      </dd>
                    </div>
                  </dl>
                </div>
              </Panel>
            </li>
          ))}
        </ul>
      </Section>

      {/* Core team */}
      <Section surface="paper" aria-labelledby="team-title">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <h2 id="team-title" className="text-2xl font-display md:text-3xl">
              Core team {featuredTeam[0]?.term}
            </h2>
            <p className="mt-3 max-w-prose text-muted-on-paper">
              The people who keep the lab open.
            </p>
          </div>
          <Button href="/team" variant="secondary" onPaper>
            Meet the full team
          </Button>
        </div>
        <ul className="mt-10 grid grid-cols-2 gap-6 md:gap-8 lg:grid-cols-4">
          {featuredTeam.map((m) => (
            <li key={m.id} className="hover-portrait">
              <StickerFrame
                src={m.image}
                alt={m.name}
                ratio={1}
                position="top"
                sizes="(min-width: 1024px) 290px, 45vw"
                imgClassName="portrait-img"
              >
                <PortraitTag>{m.role}</PortraitTag>
              </StickerFrame>
              <h3 data-name className="mt-4 font-semibold">
                {m.name}
              </h3>
              <p className="text-sm font-condensed text-muted-on-paper">{m.role}</p>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
