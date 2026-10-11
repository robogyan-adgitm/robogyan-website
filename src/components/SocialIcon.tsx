import { Mail } from "lucide-react";
import type { Social } from "@/content/schemas";
import { socials as allSocials } from "@/content/site";
import { cn } from "@/lib/cn";
import { AppLink } from "./AppLink";
import {
  GithubIcon,
  InstagramIcon,
  LinkedinIcon,
  YoutubeIcon,
  type IconComponent,
} from "./icons/BrandIcons";

export const socialIcons: Record<Social["id"], IconComponent> = {
  instagram: InstagramIcon,
  linkedin: LinkedinIcon,
  youtube: YoutubeIcon,
  github: GithubIcon,
  email: Mail,
};

export interface SocialIconProps {
  social: Social;
  /** Show the label next to the icon (otherwise it is the accessible name only). */
  showLabel?: boolean;
  /** Icon size in px. Default 20. */
  size?: number;
  className?: string;
}

/** Icon link to one social profile (external → new tab; email → mailto). */
export function SocialIcon({ social, showLabel, size = 20, className }: SocialIconProps) {
  const Icon = socialIcons[social.id];
  return (
    <AppLink
      href={social.href}
      aria-label={showLabel ? undefined : social.label}
      className={cn(
        "inline-flex items-center gap-2 text-text-muted transition-colors hover:text-text",
        !showLabel && "size-10 justify-center rounded-sm",
        className,
      )}
    >
      <Icon aria-hidden="true" size={size} strokeWidth={1.75} />
      {showLabel && <span>{social.label}</span>}
    </AppLink>
  );
}

/** Row of social icon links; defaults to every channel in content/site. */
export function SocialLinks({
  items = allSocials,
  showLabel,
  className,
}: {
  items?: Social[];
  showLabel?: boolean;
  className?: string;
}) {
  return (
    <ul className={cn("flex flex-wrap gap-1", showLabel && "flex-col gap-2", className)}>
      {items.map((s) => (
        <li key={s.id}>
          <SocialIcon social={s} showLabel={showLabel} />
        </li>
      ))}
    </ul>
  );
}
