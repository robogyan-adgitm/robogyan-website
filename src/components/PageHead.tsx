import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Container } from "./Section";
import { Seo, type SeoProps } from "./Seo";

export interface PageHeadProps {
  /** Visible h1 and the document title ("<title> · Robogyan"). */
  title: string;
  /** One sentence under the title; also the meta description. */
  description?: string;
  /** Row under the description: Dimension callouts or actions. */
  children?: ReactNode;
  /** Override the document title if it should differ from the h1. */
  seoTitle?: string;
  /** Extra Seo props (noindex, image, jsonLd, path). */
  seo?: Omit<SeoProps, "title" | "description">;
  className?: string;
}

/**
 * Compact inner-page head: display title left, one-sentence description, optional
 * Dimension/actions row. Also sets the document <title> and meta description.
 */
export function PageHead({
  title,
  description,
  children,
  seoTitle,
  seo,
  className,
}: PageHeadProps) {
  return (
    <header className={cn("border-b border-line pt-16 pb-12 md:pt-24 md:pb-16", className)}>
      <Seo title={seoTitle ?? title} description={description} {...seo} />
      <Container>
        <h1 className="text-3xl font-display md:text-4xl">{title}</h1>
        {description && (
          <p className="mt-4 max-w-prose text-lg text-text-muted md:mt-6">{description}</p>
        )}
        {children && <div className="mt-8 md:mt-12">{children}</div>}
      </Container>
    </header>
  );
}
