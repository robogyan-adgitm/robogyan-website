import type { AnchorHTMLAttributes, Ref } from "react";
import { Link } from "wouter";

/** True for root-relative app paths ("/sih", "/sih#results"), false for "//cdn…" and URLs. */
export function isInternalHref(href: string): boolean {
  return href.startsWith("/") && !href.startsWith("//");
}

export interface AppLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  ref?: Ref<HTMLAnchorElement>;
}

/**
 * One link component for everything: internal paths render a wouter `<Link>` (client
 * navigation, hash supported: "/sih#results"), external URLs open in a new tab with
 * `rel="noopener noreferrer"`, and `mailto:`/`tel:` render a plain anchor.
 */
export function AppLink({ href, children, ...rest }: AppLinkProps) {
  if (isInternalHref(href)) {
    return (
      <Link href={href} {...rest}>
        {children}
      </Link>
    );
  }
  const external = /^https?:\/\//.test(href);
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...rest}
    >
      {children}
    </a>
  );
}
