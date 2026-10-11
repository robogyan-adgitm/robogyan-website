import { cn } from "@/lib/cn";

/** Section heading + one-sentence intro, left-aligned, no eyebrow. */
export function SectionTitle({
  title,
  intro,
  onPaper,
  className,
}: {
  title: string;
  intro?: string;
  onPaper?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("mb-10 md:mb-12", className)}>
      <h2 className="text-2xl font-display md:text-3xl">{title}</h2>
      {intro && (
        <p
          className={cn(
            "mt-4 max-w-prose text-lg",
            onPaper ? "text-muted-on-paper" : "text-text-muted",
          )}
        >
          {intro}
        </p>
      )}
    </div>
  );
}
