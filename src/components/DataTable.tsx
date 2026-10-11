import { Search } from "lucide-react";
import { useId, useMemo, useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface DataColumn<T> {
  id: string;
  header: string;
  /** Plain value: used for filtering and as the default cell. */
  accessor: (row: T) => string | number;
  /** Custom cell renderer (e.g. a Chip). */
  cell?: (row: T) => ReactNode;
  align?: "left" | "right";
  className?: string;
}

export interface DataTableProps<T> {
  columns: DataColumn<T>[];
  rows: T[];
  getRowId: (row: T) => string;
  /** Visible caption above the table (also the accessible name). */
  caption: string;
  /** Show a search box that filters rows across all column values. */
  filter?: { label?: string; placeholder?: string };
  /** Max height before the body scrolls under the sticky header. Default "32rem". */
  maxHeight?: string;
  emptyMessage?: string;
  className?: string;
}

/**
 * Typed table in the condensed datasheet voice, with a sticky header and an optional
 * filter box (used for the 50 SIH results). The match count is announced politely.
 */
export function DataTable<T>({
  columns,
  rows,
  getRowId,
  caption,
  filter,
  maxHeight = "32rem",
  emptyMessage = "No matching rows.",
  className,
}: DataTableProps<T>) {
  const [query, setQuery] = useState("");
  const inputId = useId();
  const q = query.trim().toLowerCase();
  const visible = useMemo(
    () =>
      q
        ? rows.filter((r) => columns.some((c) => String(c.accessor(r)).toLowerCase().includes(q)))
        : rows,
    [rows, columns, q],
  );

  return (
    <div className={className}>
      {filter && (
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <label htmlFor={inputId} className="relative block w-full max-w-sm">
            <span className="sr-only">{filter.label ?? "Filter rows"}</span>
            <Search
              aria-hidden="true"
              className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-text-muted"
            />
            <input
              id={inputId}
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={filter.placeholder ?? "Search"}
              className="h-11 w-full rounded-sm border border-line bg-panel pr-3 pl-9 text-text placeholder:text-text-muted focus-visible:border-kapton"
            />
          </label>
          <p className="text-sm font-condensed text-text-muted" aria-live="polite">
            {visible.length} of {rows.length}
          </p>
        </div>
      )}
      <div className="overflow-auto border border-line" style={{ maxHeight }}>
        <table className="w-full border-collapse text-left text-base font-condensed">
          <caption className="sr-only">{caption}</caption>
          <thead>
            <tr>
              {columns.map((c) => (
                <th
                  key={c.id}
                  scope="col"
                  className={cn(
                    "sticky top-0 z-10 border-b border-line bg-panel px-4 py-3 text-sm font-semibold text-text-muted",
                    c.align === "right" && "text-right",
                    c.className,
                  )}
                >
                  {c.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {visible.map((row) => (
              <tr
                key={getRowId(row)}
                className="border-b border-line last:border-b-0 hover:bg-panel"
              >
                {columns.map((c) => (
                  <td
                    key={c.id}
                    className={cn("px-4 py-2.5", c.align === "right" && "text-right", c.className)}
                  >
                    {c.cell ? c.cell(row) : c.accessor(row)}
                  </td>
                ))}
              </tr>
            ))}
            {visible.length === 0 && (
              <tr>
                <td colSpan={columns.length} className="px-4 py-8 text-center text-text-muted">
                  {emptyMessage}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
