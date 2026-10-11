import { motion } from "motion/react";
import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface TabItem {
  id: string;
  label: ReactNode;
  content: ReactNode;
}

export interface TabsProps {
  tabs: TabItem[];
  /** Accessible name of the tablist. */
  label: string;
  /** Controlled selected id. */
  value?: string;
  /** Uncontrolled initial id. Default: first tab. */
  defaultValue?: string;
  onValueChange?: (id: string) => void;
  onPaper?: boolean;
  className?: string;
  /** Extra classes for the tablist row. */
  listClassName?: string;
}

/**
 * Accessible tabs (WAI-ARIA pattern): roving tabindex, ←/→/Home/End move and activate,
 * kapton underline slides between tabs via a per-instance `layoutId`.
 */
export function Tabs({
  tabs,
  label,
  value,
  defaultValue,
  onValueChange,
  onPaper,
  className,
  listClassName,
}: TabsProps) {
  const uid = useId();
  const [inner, setInner] = useState(defaultValue ?? tabs[0]?.id ?? "");
  const selected = value ?? inner;
  const refs = useRef<Record<string, HTMLButtonElement | null>>({});

  const select = (id: string) => {
    if (value === undefined) setInner(id);
    onValueChange?.(id);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    const i = tabs.findIndex((t) => t.id === selected);
    let next = -1;
    if (e.key === "ArrowRight") next = (i + 1) % tabs.length;
    else if (e.key === "ArrowLeft") next = (i - 1 + tabs.length) % tabs.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = tabs.length - 1;
    const tab = tabs[next];
    if (!tab) return;
    e.preventDefault();
    select(tab.id);
    refs.current[tab.id]?.focus();
  };

  const tabId = (id: string) => `${uid}-tab-${id}`;
  const panelId = (id: string) => `${uid}-panel-${id}`;

  return (
    <div className={className}>
      <div
        role="tablist"
        aria-label={label}
        className={cn(
          "flex gap-6 overflow-x-auto border-b",
          onPaper ? "border-paper-line" : "border-line",
          listClassName,
        )}
      >
        {tabs.map((t) => {
          const active = t.id === selected;
          return (
            <button
              key={t.id}
              ref={(n) => {
                refs.current[t.id] = n;
              }}
              id={tabId(t.id)}
              type="button"
              role="tab"
              aria-selected={active}
              aria-controls={panelId(t.id)}
              tabIndex={active ? 0 : -1}
              onClick={() => select(t.id)}
              onKeyDown={onKeyDown}
              className={cn(
                "relative cursor-pointer py-3 font-semibold whitespace-nowrap transition-colors",
                active
                  ? onPaper
                    ? "text-text-on-paper"
                    : "text-text"
                  : onPaper
                    ? "text-muted-on-paper hover:text-text-on-paper"
                    : "text-text-muted hover:text-text",
              )}
            >
              {t.label}
              {active && (
                <motion.span
                  layoutId={`${uid}-tab-mark`}
                  aria-hidden="true"
                  className="absolute inset-x-0 -bottom-px h-0.5 bg-kapton"
                  transition={{ type: "spring", stiffness: 500, damping: 40 }}
                />
              )}
            </button>
          );
        })}
      </div>
      {tabs.map((t) => (
        <div
          key={t.id}
          id={panelId(t.id)}
          role="tabpanel"
          aria-labelledby={tabId(t.id)}
          hidden={t.id !== selected}
          tabIndex={0}
          className="pt-6 focus-visible:outline-offset-4"
        >
          {t.id === selected && t.content}
        </div>
      ))}
    </div>
  );
}
