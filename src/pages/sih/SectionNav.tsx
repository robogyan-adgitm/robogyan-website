import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Container } from "@/components";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/cn";
import { sihSections } from "./sections";

/** Navbar (64px) + this strip (44px): sections use `scroll-mt-28` to clear both. */
const NAV_OFFSET = 112;

/**
 * Sticky strip under the navbar listing the page's sections. The current section is
 * tracked with an IntersectionObserver; a 2px kapton mark slides between labels.
 */
export function SectionNav() {
  const [active, setActive] = useState(sihSections[0]?.id ?? "");
  const reduced = useReducedMotion();
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const visible = new Set<string>();
    const targets = sihSections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => el !== null);
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) visible.add(e.target.id);
          else visible.delete(e.target.id);
        }
        const first = sihSections.find((s) => visible.has(s.id));
        if (first) setActive(first.id);
      },
      // Watch the band just under the sticky chrome down to mid-viewport. The 8px slack
      // stops a section whose bottom edge sits exactly on the scroll margin from counting.
      { rootMargin: `-${NAV_OFFSET + 8}px 0px -55% 0px`, threshold: 0 },
    );
    targets.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Keep the active label in view when the strip scrolls horizontally (mobile).
  useEffect(() => {
    const list = listRef.current;
    const item = list?.querySelector<HTMLElement>(`[data-section="${active}"]`);
    if (!list || !item || list.scrollWidth <= list.clientWidth) return;
    list.scrollTo({
      left: item.offsetLeft - list.clientWidth / 2 + item.clientWidth / 2,
      behavior: reduced ? "auto" : "smooth",
    });
  }, [active, reduced]);

  return (
    <nav aria-label="On this page" className="sticky top-16 z-30 border-b border-line bg-ink">
      <Container>
        <ul
          ref={listRef}
          className="flex gap-6 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {sihSections.map((s) => {
            const isActive = s.id === active;
            return (
              <li key={s.id} data-section={s.id} className="relative shrink-0">
                <a
                  href={`#${s.id}`}
                  aria-current={isActive ? "location" : undefined}
                  className={cn(
                    "block py-3 text-sm font-medium whitespace-nowrap transition-colors",
                    isActive ? "text-text" : "text-text-muted hover:text-text",
                  )}
                >
                  {s.label}
                </a>
                {isActive &&
                  (reduced ? (
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-0 -bottom-px h-0.5 bg-kapton"
                    />
                  ) : (
                    <motion.span
                      layoutId="sih-section-mark"
                      aria-hidden="true"
                      className="absolute inset-x-0 -bottom-px h-0.5 bg-kapton"
                      transition={{ type: "spring", stiffness: 500, damping: 40 }}
                    />
                  ))}
              </li>
            );
          })}
        </ul>
      </Container>
    </nav>
  );
}
