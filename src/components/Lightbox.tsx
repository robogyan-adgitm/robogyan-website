import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { motion } from "motion/react";
import { useEffect } from "react";
import { useDialog } from "@/hooks/useDialog";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useScrollLock } from "@/hooks/useScrollLock";
import { imageSize } from "@/content/imageMeta";

export interface LightboxImage {
  /** Stable id; used for the shared-element layoutId. */
  id: string;
  src: string;
  alt: string;
  caption?: string;
}

export interface LightboxProps {
  images: LightboxImage[];
  /** Index of the open image, or null when closed. */
  index: number | null;
  /** Called with the new index (prev/next) or null (close). */
  onIndexChange: (index: number | null) => void;
  /** Prefix shared with thumbnails: give the thumb `layoutId={lightboxLayoutId(prefix, id)}`. */
  layoutIdPrefix?: string;
  /** Accessible name of the dialog. Default "Image viewer". */
  label?: string;
}

/** The layoutId a thumbnail (e.g. `<Frame layoutId>`) must use to morph into the Lightbox. */
export function lightboxLayoutId(prefix: string, id: string): string {
  return `${prefix}-${id}`;
}

const iconBtn =
  "inline-flex size-11 cursor-pointer items-center justify-center rounded-sm border border-line bg-ink text-text hover:border-text";

/**
 * Accessible image viewer on a native modal <dialog>: focus is contained, Esc closes,
 * ←/→ move between images, caption and "n / total" shown. Pair with thumbnails that use
 * the same layoutId for a shared-element open.
 */
export function Lightbox({
  images,
  index,
  onIndexChange,
  layoutIdPrefix = "lightbox",
  label = "Image viewer",
}: LightboxProps) {
  const open = index !== null && images[index] !== undefined;
  const ref = useDialog(open, () => onIndexChange(null));
  const reduced = useReducedMotion();
  useScrollLock(open);

  const count = images.length;
  const current = index !== null ? images[index] : undefined;

  useEffect(() => {
    if (!open || index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") onIndexChange((index + 1) % count);
      if (e.key === "ArrowLeft") onIndexChange((index - 1 + count) % count);
    };
    window.addEventListener("keydown", onKey);
    // Preload neighbours.
    for (const i of [index + 1, index - 1]) {
      const img = images[(i + count) % count];
      if (img) new Image().src = img.src;
    }
    return () => window.removeEventListener("keydown", onKey);
  }, [open, index, count, images, onIndexChange]);

  const size = current ? imageSize(current.src) : undefined;

  return (
    // Backdrop click closes; keyboard users have Esc (native dialog) and the close button.
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
    <dialog
      ref={ref}
      aria-label={label}
      className="m-0 h-dvh max-h-none w-screen max-w-none bg-ink/95 p-0 text-text backdrop:bg-ink/90"
      onClick={(e) => {
        if (e.target === e.currentTarget) onIndexChange(null);
      }}
    >
      {current && index !== null && (
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between gap-4 p-4">
            <p className="text-sm font-condensed text-text-muted" aria-live="polite">
              {index + 1} / {count}
            </p>
            <button
              type="button"
              className={iconBtn}
              onClick={() => onIndexChange(null)}
              aria-label="Close"
            >
              <X aria-hidden="true" className="size-5" />
            </button>
          </div>
          <figure className="flex min-h-0 flex-1 flex-col items-center justify-center gap-3 px-4 pb-4 md:px-20">
            <motion.img
              key={current.id}
              layoutId={reduced ? undefined : lightboxLayoutId(layoutIdPrefix, current.id)}
              src={current.src}
              alt={current.alt}
              width={size?.width}
              height={size?.height}
              decoding="async"
              className="max-h-full min-h-0 w-auto max-w-full object-contain"
            />
            {current.caption && (
              <figcaption className="max-w-prose text-center text-text-muted">
                {current.caption}
              </figcaption>
            )}
          </figure>
          {count > 1 && (
            <>
              <button
                type="button"
                className={`${iconBtn} absolute top-1/2 left-4 -translate-y-1/2`}
                onClick={() => onIndexChange((index - 1 + count) % count)}
                aria-label="Previous image"
              >
                <ChevronLeft aria-hidden="true" className="size-5" />
              </button>
              <button
                type="button"
                className={`${iconBtn} absolute top-1/2 right-4 -translate-y-1/2`}
                onClick={() => onIndexChange((index + 1) % count)}
                aria-label="Next image"
              >
                <ChevronRight aria-hidden="true" className="size-5" />
              </button>
            </>
          )}
        </div>
      )}
    </dialog>
  );
}
