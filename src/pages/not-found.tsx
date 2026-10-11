import { useState } from "react";
import { Button, Container, Seo } from "@/components";
import { factSourceLabel, randomFact } from "@/content/facts";
import { LostBot } from "@/features/eggs";
import { useMedia } from "@/hooks/useMedia";

/**
 * 404 (egg 7): the line-follower has lost the line and spins in place. One viewport,
 * one fact, one way back.
 */
export default function NotFoundPage() {
  const [fact] = useState(() => randomFact());
  const wide = useMedia("(min-width: 768px)");
  return (
    <section className="flex min-h-[calc(100dvh-4rem)] items-center py-16">
      <Seo title="Page not found" description="Line lost. Sensor array reads 0000." noindex />
      <Container>
        <div className="grid items-center gap-10 md:grid-cols-12 md:gap-8">
          <div className="order-2 md:order-1 md:col-span-7">
            <p className="text-sm font-condensed text-text-muted tabular">Error 404</p>
            <h1 className="mt-3 text-4xl font-display">Page not found</h1>
            <p className="mt-4 max-w-prose text-lg text-text-muted">
              Line lost. Sensor array reads 0000.
            </p>
            <Button href="/" size="lg" className="mt-8">
              Back to the line
            </Button>
            <p className="mt-12 max-w-prose border-t border-line pt-5 text-text-muted">
              While you are here: {fact.text}{" "}
              <span className="font-condensed whitespace-nowrap">
                (Source: {factSourceLabel(fact.source)}
                {fact.year ? `, ${fact.year}` : ""})
              </span>
            </p>
          </div>
          <div className="order-1 flex justify-start md:order-2 md:col-span-5 md:justify-center">
            <LostBot size={wide ? 240 : 160} />
          </div>
        </div>
      </Container>
    </section>
  );
}
