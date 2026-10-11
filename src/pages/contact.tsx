import { Mail, MessageCircle } from "lucide-react";
import {
  AppLink,
  GithubIcon,
  InstagramIcon,
  LinkedinIcon,
  Marker,
  PageHead,
  Section,
  YoutubeIcon,
  type IconComponent,
} from "@/components";
import { contactChannels, lab, socials } from "@/content/site";

interface Channel {
  id: string;
  label: string;
  value: string;
  href: string;
  Icon: IconComponent;
}

const icons: Record<string, IconComponent> = {
  email: Mail,
  whatsapp: MessageCircle,
  instagram: InstagramIcon,
  linkedin: LinkedinIcon,
  github: GithubIcon,
  youtube: YoutubeIcon,
};

/** Email and WhatsApp from contactChannels, then the four social profiles. */
function buildChannels(): Channel[] {
  const list: Channel[] = [];
  for (const c of contactChannels) {
    const Icon = icons[c.id];
    if (c.href && Icon) list.push({ id: c.id, label: c.label, value: c.value, href: c.href, Icon });
  }
  for (const id of ["instagram", "linkedin", "github", "youtube"] as const) {
    const s = socials.find((x) => x.id === id);
    const Icon = icons[id];
    if (s && Icon) list.push({ id, label: s.label, value: s.handle, href: s.href, Icon });
  }
  return list;
}

const channels = buildChannels();

const joinSteps = [
  {
    id: "follow",
    title: "Follow the recruitment post",
    body: "Recruitment is announced on Instagram and in the WhatsApp community.",
  },
  {
    id: "audition",
    title: "Sit the audition in the Block 5 lab",
    body: "A short conversation in the lab. No prior experience needed, only the will to build.",
  },
  {
    id: "build",
    title: "Build your first project",
    body: "New members start on a real build alongside a senior.",
  },
];

/**
 * Contact: the ways to reach Robogyan (left) and the lab itself, with how to join
 * (right). There is no form; email is answered within a few days.
 */
export default function ContactPage() {
  return (
    <>
      <PageHead
        title="Contact"
        description="Email, WhatsApp community and the way to the lab in Block 5. Curiosity isn't a weakness; it's the first step to understanding."
      />

      <Section>
        <div className="grid gap-12 md:grid-cols-12 md:gap-8 lg:gap-12">
          <div className="md:col-span-7">
            <h2 className="text-2xl font-display">Reach us</h2>
            <ul className="mt-6 border-b border-line">
              {channels.map(({ id, label, value, href, Icon }) => (
                <li key={id} className="border-t border-line">
                  <AppLink
                    href={href}
                    className="group flex items-start gap-4 py-4 text-text-muted transition-colors hover:text-text md:items-baseline md:gap-6"
                  >
                    <Icon
                      aria-hidden="true"
                      size={22}
                      strokeWidth={1.75}
                      className="mt-1 shrink-0 md:mt-0 md:self-center"
                    />
                    <span className="flex min-w-0 flex-1 flex-col gap-0.5 md:flex-row md:items-baseline md:gap-6">
                      <span className="shrink-0 text-sm font-condensed md:w-40 md:text-base">
                        {label}
                      </span>
                      <span className="min-w-0 text-lg break-words text-text underline-offset-4 group-hover:underline">
                        {value}
                      </span>
                    </span>
                  </AppLink>
                </li>
              ))}
            </ul>
            <p className="mt-6 max-w-prose text-text-muted">
              Email is answered within a few days. For anything quick, the WhatsApp community is
              where most of the lab already is.
            </p>
          </div>

          <div className="md:col-span-5">
            <h2 className="text-2xl font-display">The lab</h2>
            <address className="mt-6 text-lg not-italic">
              {lab.addressLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </address>
            <AppLink
              href={lab.mapsUrl}
              className="mt-3 inline-block text-text underline underline-offset-4 hover:text-kapton"
            >
              Open in Maps
            </AppLink>
            <p className="mt-6 max-w-prose text-text-muted">
              Find us on campus: the lab is in the basement of Block 5. Someone is usually around on
              weekday afternoons during the semester; email first if you are making a trip.
            </p>

            <h2 className="mt-12 text-2xl font-display">How to join</h2>
            <ol className="mt-6 flex flex-col gap-6">
              {joinSteps.map((s, i) => (
                <li key={s.id} className="flex gap-4">
                  <Marker n={i + 1} />
                  <div className="pt-1.5">
                    <h3 className="font-semibold">{s.title}</h3>
                    <p className="mt-1 text-text-muted">{s.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Section>
    </>
  );
}
