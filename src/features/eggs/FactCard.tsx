import { X } from "lucide-react";
import { useMemo, useState } from "react";
import type { TickerItem } from "@/components/Ticker";
import type { Fact } from "@/content/schemas";
import { factSourceLabel, verifiedFacts } from "@/content/facts";
import { useDialog } from "@/hooks/useDialog";

export interface FactCardProps {
  /** Fact to show; null closes the card. */
  fact: Fact | null;
  onClose: () => void;
}

/**
 * Egg 5: small modal card with a fact's full text, year and source. Native <dialog>
 * (focus contained, Esc closes); click the backdrop to close.
 */
export function FactCard({ fact, onClose }: FactCardProps) {
  const ref = useDialog(fact !== null, onClose);
  return (
    // Backdrop click closes; keyboard users have Esc (native dialog) and the close button.
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
    <dialog
      ref={ref}
      aria-label="Robogyan fact"
      className="fixed inset-0 m-auto w-[min(28rem,calc(100%-2rem))] bg-kapton p-0 text-kapton-ink chamfer-lg backdrop:bg-ink/70"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      {fact && (
        <div className="p-6">
          <div className="flex items-start justify-between gap-4">
            <p className="text-sm font-condensed">
              {[factSourceLabel(fact.source), fact.year, !fact.verified && "unverified"]
                .filter(Boolean)
                .join(", ")}
            </p>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close fact"
              className="-mt-2 -mr-2 inline-flex size-9 cursor-pointer items-center justify-center rounded-sm focus-visible:outline-kapton-ink"
            >
              <X aria-hidden="true" className="size-5" />
            </button>
          </div>
          <p className="mt-3 text-xl font-display tracking-normal">{fact.text}</p>
          {fact.url && (
            <a
              href={fact.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block font-semibold underline underline-offset-4 focus-visible:outline-kapton-ink"
            >
              View the source
            </a>
          )}
        </div>
      )}
    </dialog>
  );
}

/**
 * Ticker + FactCard wiring in one hook:
 * `const { items, card } = useFactTicker(); <Ticker items={items} />{card}`.
 */
export function useFactTicker(list: Fact[] = verifiedFacts()) {
  const [open, setOpen] = useState<Fact | null>(null);
  const items: TickerItem[] = useMemo(
    () => list.map((f) => ({ id: f.id, text: f.text, onSelect: () => setOpen(f) })),
    [list],
  );
  const card = <FactCard fact={open} onClose={() => setOpen(null)} />;
  return { items, card, open: setOpen };
}
