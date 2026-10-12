import { useEffect, useRef } from "react";

/** True when the event target is somewhere the user is typing. */
export function isTypingTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  if (target.isContentEditable) return true;
  const tag = target.tagName;
  return tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT";
}

function normalise(key: string): string {
  return key.length === 1 ? key.toLowerCase() : key;
}

export interface UseKeySequenceOptions {
  /** Disable the listener without unmounting. Default true. */
  enabled?: boolean;
  /** Reset progress if the gap between keys exceeds this many ms. Default 1500. */
  timeout?: number;
}

/**
 * Fire `callback` when the user types `sequence` anywhere on the page (outside inputs,
 * textareas, selects and contenteditable). `sequence` is either a string of characters
 * ("gyaan") or an array of `KeyboardEvent.key` values (["ArrowUp", "ArrowUp", ...]).
 * Single characters match case-insensitively.
 */
export function useKeySequence(
  sequence: string | readonly string[],
  callback: () => void,
  { enabled = true, timeout = 1500 }: UseKeySequenceOptions = {},
): void {
  const cbRef = useRef(callback);
  useEffect(() => {
    cbRef.current = callback;
  });

  const keys = (typeof sequence === "string" ? Array.from(sequence) : Array.from(sequence)).map(normalise);
  const signature = keys.join("\u0000");

  useEffect(() => {
    if (!enabled || keys.length === 0) return;
    let index = 0;
    let last = 0;
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (isTypingTarget(e.target)) return;
      const now = performance.now();
      if (now - last > timeout) index = 0;
      last = now;
      const key = normalise(e.key);
      if (key === keys[index]) {
        index += 1;
        if (index === keys.length) {
          index = 0;
          cbRef.current();
        }
      } else {
        index = key === keys[0] ? 1 : 0;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // `signature` captures the sequence contents; `keys` is rebuilt each render.
  }, [signature, enabled, timeout]);
}
