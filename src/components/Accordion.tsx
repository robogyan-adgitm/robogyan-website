import { ChevronDown } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface AccordionItemProps {
  /** Summary line (the question). */
  title: ReactNode;
  children: ReactNode;
  /** Items sharing a `name` are exclusive: opening one closes the others (native). */
  name?: string;
  defaultOpen?: boolean;
  /** Anchor id for deep links. */
  id?: string;
  onPaper?: boolean;
  className?: string;
}

/** One native <details>/<summary> disclosure with a rotating chevron. */
export function AccordionItem({
  title,
  children,
  name,
  defaultOpen,
  id,
  onPaper,
  className,
}: AccordionItemProps) {
  return (
    <details
      id={id}
      name={name}
      open={defaultOpen}
      className={cn("group border-b", onPaper ? "border-paper-line" : "border-line", className)}
    >
      <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 text-lg font-semibold [&::-webkit-details-marker]:hidden">
        <span>{title}</span>
        <ChevronDown
          aria-hidden="true"
          className="mt-1 size-5 shrink-0 transition-transform duration-200 group-open:rotate-180"
        />
      </summary>
      <div className={cn("max-w-prose pb-6", onPaper ? "text-muted-on-paper" : "text-text-muted")}>
        {children}
      </div>
    </details>
  );
}

export interface AccordionProps {
  items: { id: string; title: ReactNode; content: ReactNode }[];
  /** Group name: makes the list exclusive (one open at a time). Omit for independent items. */
  name?: string;
  /** Item id open on first render. */
  defaultOpenId?: string;
  onPaper?: boolean;
  className?: string;
}

/** A list of AccordionItems, e.g. the SIH FAQ: `<Accordion name="faq" items={…} />`. */
export function Accordion({ items, name, defaultOpenId, onPaper, className }: AccordionProps) {
  return (
    <div className={cn("border-t", onPaper ? "border-paper-line" : "border-line", className)}>
      {items.map((item) => (
        <AccordionItem
          key={item.id}
          title={item.title}
          name={name}
          defaultOpen={item.id === defaultOpenId}
          onPaper={onPaper}
        >
          {item.content}
        </AccordionItem>
      ))}
    </div>
  );
}
