import { X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/cn";

export type ToastTone = "neutral" | "kapton" | "signal" | "alert";

export interface ToastOptions {
  title: string;
  body?: ReactNode;
  /** Top rule colour. Default "kapton". */
  tone?: ToastTone;
  /** Auto-dismiss after ms. Default 5000. */
  duration?: number;
}

interface ToastRecord extends Required<Pick<ToastOptions, "title" | "tone" | "duration">> {
  id: number;
  body?: ReactNode;
}

export interface ToastApi {
  /** Show a toast; returns its id. */
  show: (opts: ToastOptions) => number;
  dismiss: (id: number) => void;
}

const ToastContext = createContext<ToastApi | null>(null);

/** `const toast = useToast(); toast.show({ title: "…", body: "…" })`. Needs <ToastProvider>. */
export function useToast(): ToastApi {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used inside <ToastProvider>");
  return ctx;
}

const toneRule: Record<ToastTone, string> = {
  neutral: "bg-line",
  kapton: "bg-kapton",
  signal: "bg-signal",
  alert: "bg-alert",
};

function ToastView({ toast, onDismiss }: { toast: ToastRecord; onDismiss: () => void }) {
  const reduced = useReducedMotion();
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = window.setTimeout(onDismiss, toast.duration);
    return () => window.clearTimeout(t);
  }, [paused, toast.duration, onDismiss]);

  return (
    <motion.li
      layout={!reduced}
      initial={reduced ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduced ? { opacity: 0, transition: { duration: 0 } } : { opacity: 0, x: -24 }}
      transition={{ duration: 0.18 }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      className="pointer-events-auto relative w-full max-w-sm bg-panel text-text chamfer"
    >
      <span
        aria-hidden="true"
        className={cn("absolute inset-x-0 top-0 h-0.5", toneRule[toast.tone])}
      />
      <div className="flex items-start gap-3 py-4 pr-3 pl-4">
        <div className="min-w-0 flex-1">
          <p className="font-semibold">{toast.title}</p>
          {toast.body && <div className="mt-1 text-sm text-text-muted">{toast.body}</div>}
        </div>
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Dismiss notification"
          className="inline-flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-sm text-text-muted hover:text-text"
        >
          <X aria-hidden="true" className="size-4" />
        </button>
      </div>
    </motion.li>
  );
}

/** Provides `useToast()` and renders the bottom-left stack (aria-live polite). */
export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastRecord[]>([]);
  const nextId = useRef(1);

  const dismiss = useCallback((id: number) => {
    setToasts((list) => list.filter((t) => t.id !== id));
  }, []);

  const show = useCallback((opts: ToastOptions) => {
    const id = nextId.current++;
    const record: ToastRecord = {
      id,
      title: opts.title,
      body: opts.body,
      tone: opts.tone ?? "kapton",
      duration: opts.duration ?? 5000,
    };
    setToasts((list) => [...list.slice(-3), record]);
    return id;
  }, []);

  const api = useMemo(() => ({ show, dismiss }), [show, dismiss]);

  return (
    <ToastContext.Provider value={api}>
      {children}
      <div
        aria-live="polite"
        aria-relevant="additions"
        className="pointer-events-none fixed bottom-4 left-4 z-[60] w-[calc(100%-2rem)] max-w-sm"
      >
        <ol className="flex flex-col gap-2">
          <AnimatePresence initial={false}>
            {toasts.map((t) => (
              <ToastView key={t.id} toast={t} onDismiss={() => dismiss(t.id)} />
            ))}
          </AnimatePresence>
        </ol>
      </div>
    </ToastContext.Provider>
  );
}
