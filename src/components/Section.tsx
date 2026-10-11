import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

/** Max width 1280px, 16px gutters on mobile and 24px from md up. */
export function Container({ className, children, ...rest }: ContainerProps) {
  return (
    <div className={cn("mx-auto w-full max-w-site px-4 md:px-6", className)} {...rest}>
      {children}
    </div>
  );
}

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  /** "ink" (default, true black) or "paper" (cool white + 24px dot grid). Max 1–2 paper sections per page. */
  surface?: "ink" | "paper";
  /** Wrap children in a <Container>. Default true. */
  contained?: boolean;
  /** Tighter vertical rhythm (64/48px instead of 96/64px). */
  compact?: boolean;
  children: ReactNode;
}

/** Page section with the site rhythm: 96px vertical padding on desktop, 64px on mobile. */
export function Section({
  surface = "ink",
  contained = true,
  compact = false,
  className,
  children,
  ...rest
}: SectionProps) {
  return (
    <section
      className={cn(
        surface === "paper" ? "surface-paper" : "surface-ink",
        compact ? "py-12 md:py-16" : "py-16 md:py-24",
        className,
      )}
      {...rest}
    >
      {contained ? <Container>{children}</Container> : children}
    </section>
  );
}
