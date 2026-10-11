import type { ReactNode } from "react";
import { Frame } from "@/components/Frame";
import { SocialIcon } from "@/components/SocialIcon";
import type { AlumniMember, Social } from "@/content/schemas";
import { cn } from "@/lib/cn";
import { personSocials } from "./helpers";

/** Row of labelled icon links (email, LinkedIn, GitHub). Renders nothing when empty. */
export function PersonLinks({
  socials,
  size = 16,
  className,
}: {
  socials: Social[];
  size?: number;
  className?: string;
}) {
  if (socials.length === 0) return null;
  return (
    <ul className={cn("flex flex-wrap gap-x-5 gap-y-1", className)} aria-label="Links">
      {socials.map((s) => (
        <li key={s.id}>
          <SocialIcon social={s} showLabel size={size} className="text-sm" />
        </li>
      ))}
    </ul>
  );
}

/** Square portrait. No circles anywhere on the people pages. */
export function Portrait({
  src,
  alt,
  chamfer = "sm",
  position = "center",
  priority,
  className,
}: {
  src: string;
  alt: string;
  chamfer?: "sm" | "lg" | "none";
  position?: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <Frame
      src={src}
      alt={alt}
      ratio={1}
      position={position}
      chamfer={chamfer}
      priority={priority}
      className={className}
    />
  );
}

/** Small section heading in the datasheet voice (same device as the footer columns). */
export function GroupHeading({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <h2 className={cn("text-sm font-condensed text-text-muted", className)}>{children}</h2>
  );
}

/** Condensed list with 1px rules; used for achievements. */
export function RuledList({
  items,
  emptyText,
  onPaper,
  className,
}: {
  items: string[];
  emptyText?: string;
  onPaper?: boolean;
  className?: string;
}) {
  const rule = onPaper ? "border-paper-line" : "border-line";
  if (items.length === 0) {
    return (
      <p
        className={cn(
          "border-t py-2 text-sm",
          rule,
          onPaper ? "text-muted-on-paper" : "text-text-muted",
          className,
        )}
      >
        {emptyText ?? "Being updated."}
      </p>
    );
  }
  return (
    <ul className={cn("border-t", rule, className)}>
      {items.map((item) => (
        <li key={item} className={cn("border-b py-2 font-condensed", rule)}>
          {item}
        </li>
      ))}
    </ul>
  );
}

/**
 * Grid of alumni members: square portrait, name, position that year, where they are
 * now, LinkedIn. `size="compact"` is the /alumni roster (6 across); `size="large"` the
 * batch page (3 across).
 */
export function MemberGrid({
  members,
  size = "compact",
  className,
}: {
  members: AlumniMember[];
  size?: "compact" | "large";
  className?: string;
}) {
  const large = size === "large";
  return (
    <ul
      className={cn(
        "grid",
        large
          ? "grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-3"
          : "grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-6",
        className,
      )}
    >
      {members.map((m) => {
        const socials = personSocials({ linkedin: m.linkedin });
        return (
          <li key={m.id} className="min-w-0">
            <Portrait src={m.image} alt={`Portrait of ${m.name}`} chamfer={large ? "lg" : "sm"} />
            <h3
              className={cn(
                "mt-3",
                large ? "text-lg font-display sm:text-xl" : "text-base leading-snug font-semibold",
              )}
            >
              {m.name}
            </h3>
            <p className={cn("font-condensed text-text-muted", large ? "text-base" : "text-sm")}>
              {m.position}
            </p>
            <p className={cn("mt-2 text-text-muted", large ? "text-base" : "text-sm")}>
              {m.currentRole}, {m.company}
            </p>
            {socials.length > 0 && <PersonLinks socials={socials} size={14} className="mt-2" />}
          </li>
        );
      })}
    </ul>
  );
}
