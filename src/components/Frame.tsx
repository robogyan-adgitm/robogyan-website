import { motion } from "motion/react";
import { useCallback, useState, type CSSProperties } from "react";
import { imageSize } from "@/content/imageMeta";
import { cn } from "@/lib/cn";

export interface FrameProps {
  src: string;
  alt: string;
  /** Intrinsic size. Looked up from content/imageMeta when omitted. */
  width?: number;
  height?: number;
  /** Fixed aspect ratio for the frame, e.g. "4 / 3" or 1. Without it the image keeps its own ratio. */
  ratio?: string | number;
  /** object-fit when `ratio` is set. Default "cover". */
  fit?: "cover" | "contain";
  /** object-position, e.g. "top" or "50% 20%". Default "center". */
  position?: string;
  /** Above-the-fold image: eager loading + high fetch priority. */
  priority?: boolean;
  /** Corner treatment. Default "sm" (12px chamfer). */
  chamfer?: "sm" | "lg" | "none";
  /** `sizes` attribute for responsive layouts. */
  sizes?: string;
  /** Shared-element id, e.g. to animate into the Lightbox (use `lightboxLayoutId`). */
  layoutId?: string;
  className?: string;
  imgClassName?: string;
}

const chamfers = { sm: "chamfer", lg: "chamfer-lg", none: "" } as const;

/**
 * Chamfered image frame. Shows a flat `panel` block until the image has loaded (no
 * spinner), lazy-loads unless `priority`, and always sets width/height to avoid layout shift.
 */
export function Frame({
  src,
  alt,
  width,
  height,
  ratio,
  fit = "cover",
  position = "center",
  priority = false,
  chamfer = "sm",
  sizes,
  layoutId,
  className,
  imgClassName,
}: FrameProps) {
  const [loaded, setLoaded] = useState(false);
  const meta = imageSize(src);
  const w = width ?? meta?.width;
  const h = height ?? meta?.height;

  // Cached images can finish before React attaches onLoad.
  const imgRef = useCallback((node: HTMLImageElement | null) => {
    if (node?.complete && node.naturalWidth > 0) setLoaded(true);
  }, []);

  const wrapperStyle: CSSProperties | undefined = ratio
    ? { aspectRatio: String(ratio) }
    : undefined;
  const imgStyle: CSSProperties = { objectFit: fit, objectPosition: position };

  return (
    <div
      className={cn("relative overflow-hidden bg-panel", chamfers[chamfer], className)}
      style={wrapperStyle}
    >
      <motion.img
        ref={imgRef}
        layoutId={layoutId}
        src={src}
        alt={alt}
        width={w}
        height={h}
        sizes={sizes}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={priority ? "high" : "auto"}
        onLoad={() => setLoaded(true)}
        style={imgStyle}
        className={cn(
          "block transition-opacity duration-200",
          ratio ? "absolute inset-0 size-full" : "h-auto w-full",
          loaded ? "opacity-100" : "opacity-0",
          imgClassName,
        )}
      />
    </div>
  );
}
