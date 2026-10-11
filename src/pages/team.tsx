import { Button } from "@/components/Button";
import { PageHead } from "@/components/PageHead";
import { Section } from "@/components/Section";
import { TechTagList } from "@/components/TechTag";
import type { TeamMember } from "@/content/schemas";
import { lab } from "@/content/site";
import { teamMembers } from "@/content/team";
import { personSocials } from "./people/helpers";
import { PersonLinks, Portrait } from "./people/shared";

const LEADERSHIP = new Set(["President", "Vice President"]);

/** President and vice president: large square portrait, 32px name. */
function Leader({ member, priority }: { member: TeamMember; priority?: boolean }) {
  return (
    <article className="hover-portrait border-t border-line pt-6">
      <Portrait
        src={member.image}
        alt={`Portrait of ${member.name}`}
        chamfer="lg"
        priority={priority}
        tag={member.role}
      />
      <h3 data-name className="mt-6 text-2xl font-display">
        {member.name}
      </h3>
      <p className="mt-1 text-lg font-condensed text-text-muted">{member.role}</p>
      <p className="mt-4 max-w-prose">{member.bio}</p>
      <TechTagList items={member.techStack} className="mt-5" />
      <PersonLinks socials={personSocials(member)} className="mt-5" />
    </article>
  );
}

/** Domain lead: same fields, one step smaller. */
function Lead({ member }: { member: TeamMember }) {
  return (
    <article className="hover-portrait grid grid-cols-[7rem_1fr] gap-x-4 border-t border-line pt-5 sm:block">
      <Portrait src={member.image} alt={`Portrait of ${member.name}`} tag={member.role} />
      <div className="self-end sm:mt-5">
        <h3 data-name className="text-xl font-display">
          {member.name}
        </h3>
        <p className="mt-1 font-condensed text-text-muted">{member.role}</p>
      </div>
      <div className="col-span-2">
        <p className="mt-3 text-sm text-text-muted">{member.bio}</p>
        <TechTagList items={member.techStack} className="mt-4" />
        <PersonLinks socials={personSocials(member)} className="mt-4" />
      </div>
    </article>
  );
}

/** Row of the recruitment datasheet on paper. */
function Row({ term, children }: { term: string; children: string }) {
  return (
    <div className="grid grid-cols-[6rem_1fr] gap-4 border-b border-paper-line py-3">
      <dt className="font-condensed text-muted-on-paper">{term}</dt>
      <dd>{children}</dd>
    </div>
  );
}

export default function TeamPage() {
  const leaders = teamMembers.filter((m) => LEADERSHIP.has(m.role));
  const leads = teamMembers.filter((m) => !LEADERSHIP.has(m.role));
  const term = teamMembers[0]?.term ?? "2025–26";

  return (
    <>
      <PageHead
        title={`Core team ${term}`}
        seoTitle="Team"
        description="Eight students run the lab this year: a president, a vice president and six domain leads. Here is who they are and what they build."
      />

      <Section aria-labelledby="leadership">
        <h2 id="leadership" className="sr-only">
          President and vice president
        </h2>
        <div className="grid gap-x-6 gap-y-14 md:grid-cols-2">
          {leaders.map((m, i) => (
            <Leader key={m.id} member={m} priority={i === 0} />
          ))}
        </div>
      </Section>

      <Section compact aria-labelledby="leads" className="pt-0 md:pt-0">
        <h2 id="leads" className="mb-8 text-2xl font-display">
          Domain leads
        </h2>
        <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {leads.map((m) => (
            <Lead key={m.id} member={m} />
          ))}
        </div>
      </Section>

      <Section surface="paper" aria-labelledby="want-in">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <h2 id="want-in" className="text-2xl font-display md:text-3xl">
              Want in?
            </h2>
            <p className="mt-4 max-w-prose text-lg text-muted-on-paper">
              Recruitment happens once a year. Auditions run each autumn in the {lab.block} lab: a
              short technical and aptitude test, then an interview. Any stream and any year can
              apply; what we look for is that you want to build things.
            </p>
            <Button href="/contact" className="mt-8">
              Contact us
            </Button>
          </div>
          <dl className="border-t border-paper-line lg:col-span-5 lg:col-start-8">
            <Row term="When">Each autumn. The 2025 auditions were on 27 October.</Row>
            <Row term="Where">{`${lab.name}, basement of ${lab.block}`}</Row>
            <Row term="How">A 20–30 minute technical and aptitude test, then an interview.</Row>
            <Row term="Teams">IoT, embedded, coding and robotics.</Row>
          </dl>
        </div>
      </Section>
    </>
  );
}
