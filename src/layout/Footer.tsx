import { Link } from "wouter";
import { SocialIcon } from "@/components/SocialIcon";
import { exploreLinks, lab, site, socials } from "@/content/site";
import { FooterYearEgg } from "@/features/eggs/FooterYearEgg";

function Heading({ children }: { children: string }) {
  return <h2 className="mb-4 text-sm font-condensed text-text-muted">{children}</h2>;
}

/**
 * Site footer: oversized "R", Explore / Connect / Lab columns, and the copyright row
 * whose year hides the footer-year egg (long-press or Shift+click).
 */
export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative overflow-hidden border-t border-line bg-ink">
      <div className="mx-auto grid w-full max-w-site gap-12 px-4 pt-16 pb-10 md:grid-cols-12 md:px-6 md:pt-24">
        <div className="md:col-span-4">
          <span
            aria-hidden="true"
            className="block h-[0.82em] overflow-hidden text-[160px] leading-[0.82] font-display text-text select-none"
          >
            R
          </span>
          <p className="mt-6 max-w-xs text-text-muted">
            {site.name}. {site.tagline}, since {site.foundedYear}.
          </p>
        </div>

        <nav aria-label="Footer" className="md:col-span-2">
          <Heading>Explore</Heading>
          <ul className="flex flex-col gap-2">
            {exploreLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-text-muted transition-colors hover:text-text">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-3">
          <Heading>Connect</Heading>
          <ul className="flex flex-col gap-2">
            {socials.map((s) => (
              <li key={s.id}>
                <SocialIcon social={s} showLabel size={18} />
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-3">
          <Heading>Lab</Heading>
          <address className="text-text-muted not-italic">
            {lab.address
              .split(", ")
              .reduce<string[]>((lines, part, i) => {
                // Break after "Robogyan Lab, Block 5" and after "Shastri Park".
                if (i === 0 || i === 2 || i === 4) lines.push(part);
                else lines[lines.length - 1] += `, ${part}`;
                return lines;
              }, [])
              .map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
          </address>
          <a
            href={lab.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-block text-text underline underline-offset-4"
          >
            Open in Maps
          </a>
        </div>
      </div>

      <div className="border-t border-line">
        <p className="mx-auto w-full max-w-site px-4 py-6 text-sm font-condensed text-text-muted md:px-6">
          © <FooterYearEgg year={year} /> {site.name} · Experience engineering since{" "}
          {site.foundedYear}
        </p>
      </div>
    </footer>
  );
}
