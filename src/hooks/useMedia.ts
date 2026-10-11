import { useSyncExternalStore } from "react";

/**
 * Subscribe to a media query: `useMedia("(min-width: 1024px)")`.
 * Returns `fallback` where `matchMedia` is unavailable.
 */
export function useMedia(query: string, fallback = false): boolean {
  return useSyncExternalStore(
    (onChange) => {
      if (typeof window === "undefined" || !window.matchMedia) return () => {};
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    () =>
      typeof window !== "undefined" && window.matchMedia
        ? window.matchMedia(query).matches
        : fallback,
    () => fallback,
  );
}
