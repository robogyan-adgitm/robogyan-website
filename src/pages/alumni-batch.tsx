import { useRef } from "react";
import { Link, useParams } from "wouter";
import { Button } from "@/components/Button";
import { Frame } from "@/components/Frame";
import { Container, Section } from "@/components/Section";
import { Seo } from "@/components/Seo";
import { useToast } from "@/components/Toast";
import { getBatch } from "@/content/alumni";
import type { AlumniBatch } from "@/content/schemas";
import { absoluteUrl } from "@/lib/seo";
import NotFound from "./not-found";
import { QrCode } from "./people/QrCode";
import { batchYear } from "./people/helpers";
import { MemberGrid, RuledList } from "./people/shared";

/**
 * Slim bar replacing the navbar on this standalone page: the "R" home link, the batch
 * year, and a way back to the full alumni list. Not labelled "Primary" on purpose.
 */
function TopBar({ year }: { year?: string }) {
  return (
    <header className="border-b border-line">
      <Container className="flex h-14 items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <Link href="/" aria-label="Robogyan, home" className="shrink-0">
            <img src="/logo.png" alt="" width={32} height={32} className="size-8" />
          </Link>
          {year && (
            <span className="truncate font-condensed text-text-muted">Robogyan alumni, {year}</span>
          )}
        </div>
        <Link href="/alumni" className="shrink-0 text-sm text-text-muted hover:text-text">
          All batches
        </Link>
      </Container>
    </header>
  );
}

function ShareBlock({ batch }: { batch: AlumniBatch }) {
  const url = absoluteUrl(`/alumni/${batch.id}`);
  const toast = useToast();
  const inputRef = useRef<HTMLInputElement>(null);

  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      toast.show({ title: "Link copied", body: url });
    } catch {
      inputRef.current?.select();
      toast.show({
        title: "Could not copy automatically",
        body: "The link is selected: press Ctrl+C or Cmd+C.",
        tone: "neutral",
      });
    }
  }

  return (
    <Section surface="paper" aria-labelledby="share">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-x-10">
        <div className="lg:col-span-7">
          <h2 id="share" className="text-2xl font-display md:text-3xl">
            Share this page
          </h2>
          <p className="mt-4 max-w-prose text-lg text-muted-on-paper">
            Send the link to your batchmates, or point a camera at the code.
          </p>
          <form
            className="mt-8 flex max-w-xl flex-col gap-3 sm:flex-row"
            onSubmit={(e) => {
              e.preventDefault();
              void copy();
            }}
          >
            <label htmlFor="batch-url" className="sr-only">
              Page link
            </label>
            <input
              id="batch-url"
              ref={inputRef}
              type="url"
              readOnly
              value={url}
              onFocus={(e) => e.currentTarget.select()}
              className="h-11 min-w-0 flex-1 rounded-sm border border-paper-line bg-paper px-3 font-condensed text-text-on-paper"
            />
            <Button type="submit">Copy link</Button>
          </form>
        </div>
        <div className="lg:col-span-4 lg:col-start-9">
          <div className="inline-block border border-paper-line bg-paper p-2">
            <QrCode text={url} size={224} label={`QR code linking to ${url}`} />
          </div>
        </div>
      </div>
    </Section>
  );
}

export default function AlumniBatchPage() {
  const { year: id = "" } = useParams<{ year: string }>();
  const batch = getBatch(id);

  if (!batch) {
    return (
      <>
        <TopBar />
        <NotFound />
      </>
    );
  }

  const year = batchYear(batch.id);

  return (
    <>
      <Seo
        title={`Alumni ${year}`}
        description={`${batch.title}: the Robogyan core team of ${year}, where they are now, and what the batch achieved.`}
        image={batch.image ?? undefined}
      />
      <TopBar year={year} />

      <Container className="pt-6 md:pt-8">
        {/* No stand-in block for a batch without a photo: the page simply opens on the year. */}
        {batch.image && (
          <Frame
            src={batch.image}
            alt={`The Robogyan core team of ${year}`}
            ratio="16 / 9"
            chamfer="lg"
            priority
          />
        )}

        <div className="grid gap-8 py-12 md:py-16 lg:grid-cols-12 lg:gap-x-10">
          <div className="lg:col-span-7">
            <h1 className="text-4xl font-display tabular">{year}</h1>
            <p className="mt-3 text-xl">{batch.title}</p>
            <p className="mt-4 max-w-prose text-lg text-text-muted">{batch.description}</p>
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <h2 className="mb-3 text-sm font-condensed text-text-muted">Achievements</h2>
            <RuledList
              items={batch.achievements}
              emptyText="Achievements for this batch are being added."
            />
          </div>
        </div>

        <section aria-labelledby="members" className="border-t border-line py-12 md:py-16">
          <h2 id="members" className="mb-8 text-2xl font-display">
            {batch.members.length} members
          </h2>
          <MemberGrid members={batch.members} size="large" />
        </section>
      </Container>

      <ShareBlock batch={batch} />
    </>
  );
}
