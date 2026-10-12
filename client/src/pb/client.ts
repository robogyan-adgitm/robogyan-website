import PocketBase from "pocketbase";
import type { TypedPocketBase } from "./types.generated";

/**
 * The PocketBase base URL from VITE_PB_URL, or null when unset or unsafe.
 * Outside `vite dev` only https is accepted (loopback hosts excepted, for local tests).
 * With no URL the site runs entirely on its bundled data and /members says it is offline.
 */
function resolveUrl(): string | null {
  const raw = (import.meta.env.VITE_PB_URL as string | undefined)?.trim();
  if (!raw) return null;
  let url: URL;
  try {
    url = new URL(raw);
  } catch {
    console.warn("[pb] VITE_PB_URL is not a valid URL; using bundled data.");
    return null;
  }
  const loopback = url.hostname === "localhost" || url.hostname === "127.0.0.1" || url.hostname === "[::1]";
  if (url.protocol !== "https:" && !(import.meta.env.DEV || (url.protocol === "http:" && loopback))) {
    console.warn("[pb] VITE_PB_URL must use https outside development; using bundled data.");
    return null;
  }
  return url.href.replace(/\/+$/, "");
}

export const PB_URL = resolveUrl();

/** Typed client, or null when no backend is configured. Auth persists in localStorage (LocalAuthStore). */
export const pb: TypedPocketBase | null = PB_URL ? (new PocketBase(PB_URL) as TypedPocketBase) : null;

// Several hooks may load the same collection at once; the SDK would cancel duplicates.
pb?.autoCancellation(false);

/** Public URL of a record's file, or `fallback` when the record has none (or no backend). */
export function fileUrl(
  record: { id: string; collectionId: string; collectionName: string },
  filename: string | null | undefined,
  fallback: string,
): string {
  if (!pb || !filename) return fallback;
  return pb.files.getURL(record, filename);
}
