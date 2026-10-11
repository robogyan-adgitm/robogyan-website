import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { factSourceLabel, randomFact, type Fact } from "@/data/facts";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

const AUTO_CLOSE_MS = 8000;

export interface FactCardProps {
  /** Fact to show; null hides the card. */
  fact: Fact | null;
  onClose: () => void;
  className?: string;
}

/**
 * A fun fact as a glass speech bubble (RoboBuddy anchors it above its head; the tail
 * points down-right). Dismissed by a click on the bubble, Esc, or after 8 s.
 * Announced politely to screen readers.
 */
export function FactCard({ fact, onClose, className }: FactCardProps) {
  const reduced = useReducedMotion();
  const closeRef = useRef(onClose);
  useEffect(() => {
    closeRef.current = onClose;
  });

  useEffect(() => {
    if (!fact) return;
    const t = window.setTimeout(() => closeRef.current(), AUTO_CLOSE_MS);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeRef.current();
    window.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("keydown", onKey);
    };
  }, [fact]);

  return (
    <div aria-live="polite" className={cn("pointer-events-none", className)}>
      <AnimatePresence>
        {fact && (
          <motion.div
            key={fact.id}
            role="status"
            data-testid="fact-card"
            className="rg-glass-panel rg-bubble pointer-events-auto w-[min(18rem,calc(100vw-2rem))] cursor-pointer rounded-xl p-4 pr-9 text-left shadow-2xl shadow-[hsl(235,85%,65%,0.2)]"
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 8, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, y: 6, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 380, damping: 28 }}
            style={{ transformOrigin: "90% 100%" }}
            onClick={(e) => {
              if ((e.target as HTMLElement).closest("a")) return;
              onClose();
            }}
          >
            <button
              type="button"
              aria-label="Close fact"
              className="absolute right-2 top-2 rounded-md p-1 text-gray-400 transition-colors hover:text-white"
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
            >
              <X size={14} aria-hidden="true" />
            </button>
            <p className="gradient-text font-orbitron text-[11px] font-bold uppercase tracking-wider">
              Did you know?
            </p>
            <p className="mt-1.5 text-sm leading-relaxed text-gray-200">{fact.text}</p>
            <p className="mt-2 flex items-center gap-2 text-[11px] text-gray-500">
              <span>{[factSourceLabel(fact.source), fact.year].filter(Boolean).join(", ")}</span>
              {fact.url && (
                <a
                  href={fact.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[hsl(235,85%,65%)] underline-offset-2 hover:underline"
                >
                  source
                </a>
              )}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/**
 * Fact state for FactCard: `show()` picks a new random fact (never the same one twice
 * in a row), `close()` hides it. `{ fact, show, close, card }` where `card` is a
 * ready-made `<FactCard>`.
 */
export function useFactTicker() {
  const [fact, setFact] = useState<Fact | null>(null);
  const last = useRef<string | undefined>(undefined);
  const show = useCallback(() => {
    const next = randomFact(last.current);
    last.current = next.id;
    setFact(next);
  }, []);
  const close = useCallback(() => setFact(null), []);
  const card = <FactCard fact={fact} onClose={close} />;
  return { fact, show, close, card };
}
