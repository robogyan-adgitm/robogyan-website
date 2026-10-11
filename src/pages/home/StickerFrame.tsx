import { Frame, type FrameProps } from "@/components/Frame";
import { cn } from "@/lib/cn";

/**
 * A `Frame` with the hard 2px paper "sticker" shadow. `Frame` clips itself with the
 * chamfer, which would also clip a box-shadow, so the shadow is a chamfered ink block
 * offset 2px behind the image instead. Paper surfaces only.
 */
export function StickerFrame({ className, ...frame }: FrameProps) {
  return (
    <div
      className={cn(
        "relative before:absolute before:inset-0 before:translate-x-0.5 before:translate-y-0.5 before:bg-text-on-paper before:content-[''] before:chamfer",
        className,
      )}
    >
      <Frame {...frame} className="relative" />
    </div>
  );
}
