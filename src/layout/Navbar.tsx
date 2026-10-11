import { Menu, X } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/Button";
import { contactNavItem, navItems } from "@/content/site";
import { useLogoEggTrigger } from "@/features/eggs/LogoEgg";
import { useDialog } from "@/hooks/useDialog";
import { useScrollLock } from "@/hooks/useScrollLock";
import { cn } from "@/lib/cn";

/** Active when the path matches exactly, or is a child route ("/alumni/2024-25"). */
export function isActivePath(location: string, href: string): boolean {
  if (href === "/") return location === "/";
  return location === href || location.startsWith(`${href}/`);
}

function Logo({ onClick }: { onClick: () => void }) {
  return (
    <Link
      href="/"
      onClick={onClick}
      className="flex shrink-0 items-center gap-3"
      aria-label="Robogyan, home"
    >
      <img src="/logo.png" alt="Robogyan" width={36} height={36} className="size-9" />
      <span className="text-xl font-display" aria-hidden="true">
        Robogyan
      </span>
    </Link>
  );
}

function MobileMenu({
  open,
  onClose,
  location,
}: {
  open: boolean;
  onClose: () => void;
  location: string;
}) {
  const ref = useDialog(open, onClose);
  useScrollLock(open);
  return (
    <dialog
      ref={ref}
      id="mobile-menu"
      aria-label="Site menu"
      className="m-0 h-dvh max-h-none w-screen max-w-none bg-ink p-0 text-text backdrop:bg-ink"
    >
      <div className="flex h-16 items-center justify-between border-b border-line px-4">
        <span className="text-xl font-display">Robogyan</span>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          className="inline-flex size-11 cursor-pointer items-center justify-center rounded-sm border border-line"
        >
          <X aria-hidden="true" className="size-5" />
        </button>
      </div>
      <nav aria-label="Primary" className="px-4 py-8">
        <ul className="flex flex-col gap-1">
          {[...navItems, contactNavItem].map((item) => {
            const active = isActivePath(location, item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onClose}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "flex items-center gap-4 py-2 text-3xl font-display",
                    active ? "text-text" : "text-text-muted hover:text-text",
                  )}
                >
                  {active && <span aria-hidden="true" className="h-1 w-6 bg-kapton" />}
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </dialog>
  );
}

/**
 * Sticky top bar: logo + wordmark, primary links with a sliding kapton underline,
 * Contact as the kapton CTA. Below 1024px a full-screen menu (native modal dialog:
 * focus contained, Esc closes, body scroll locked, closes on route change).
 * Clicking the logo 5× within 3 s triggers the college-names egg.
 */
export function Navbar() {
  const [location] = useLocation();
  const [open, setOpen] = useState(false);
  const onLogoClick = useLogoEggTrigger();

  // Close the mobile menu whenever the route changes.
  const [lastLocation, setLastLocation] = useState(location);
  if (lastLocation !== location) {
    setLastLocation(location);
    setOpen(false);
  }

  // Close if the viewport grows past the breakpoint while open.
  useEffect(() => {
    if (!open) return;
    const mql = window.matchMedia("(min-width: 1024px)");
    const onChange = () => mql.matches && setOpen(false);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [open]);

  const contactActive = isActivePath(location, contactNavItem.href);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-ink">
      <div className="mx-auto flex h-16 w-full max-w-site items-center justify-between gap-6 px-4 md:px-6">
        <Logo onClick={onLogoClick} />

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-7">
            {navItems.map((item) => {
              const active = isActivePath(location, item.href);
              return (
                <li key={item.href} className="relative">
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "block py-5 text-[0.9375rem] font-medium transition-colors",
                      active ? "text-text" : "text-text-muted hover:text-text",
                    )}
                  >
                    {item.label}
                  </Link>
                  {active && (
                    <motion.span
                      layoutId="nav-mark"
                      aria-hidden="true"
                      className="absolute inset-x-0 -bottom-px h-0.5 bg-kapton"
                      transition={{ type: "spring", stiffness: 500, damping: 40 }}
                    />
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Button
            href={contactNavItem.href}
            size="sm"
            aria-current={contactActive ? "page" : undefined}
            className="hidden sm:inline-flex"
          >
            {contactNavItem.label}
          </Button>
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="inline-flex size-11 cursor-pointer items-center justify-center rounded-sm border border-line lg:hidden"
          >
            <Menu aria-hidden="true" className="size-5" />
          </button>
        </div>
      </div>
      <MobileMenu open={open} onClose={() => setOpen(false)} location={location} />
    </header>
  );
}
