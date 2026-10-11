import { useEffect, useRef } from "react";
import { useLocation } from "wouter";

const MAX_WAIT_MS = 4000;

/**
 * Scroll to `#id` once the element exists (lazy pages mount a little later). The 2025
 * portal used `#results-section` / `#judges-section`; those links still land on
 * `#results` / `#judges`.
 */
export function scrollToHash(hash: string, behavior: ScrollBehavior = "instant"): () => void {
  const id = decodeURIComponent(hash.replace(/^#/, ""));
  if (!id) return () => {};
  const legacy = id.replace(/-section$/, "");
  const start = performance.now();
  let frame = 0;
  const tick = () => {
    const el = document.getElementById(id) ?? document.getElementById(legacy);
    if (el) {
      el.scrollIntoView({ behavior, block: "start" });
      return;
    }
    if (performance.now() - start < MAX_WAIT_MS) frame = requestAnimationFrame(tick);
  };
  frame = requestAnimationFrame(tick);
  return () => cancelAnimationFrame(frame);
}

/**
 * Route scroll behaviour: on a new path scroll to the top instantly, then (instantly)
 * to the hash target if the URL has one. Same-path hash links ("/sih#judges" while on /sih) scroll
 * smoothly. Back/forward keeps the browser's own restoration.
 */
export function ScrollManager() {
  const [path] = useLocation();
  const prevPath = useRef<string | null>(null);
  const popped = useRef(false);

  useEffect(() => {
    const onPop = () => {
      popped.current = true;
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  useEffect(() => {
    const first = prevPath.current === null;
    const changed = prevPath.current !== path;
    prevPath.current = path;
    if (!changed) return;
    const hash = window.location.hash;
    if (popped.current && !hash) {
      popped.current = false;
      return;
    }
    popped.current = false;
    if (!first) window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    const cancel = hash ? scrollToHash(hash) : undefined;
    return () => {
      cancel?.();
      // StrictMode runs the first effect twice; let the re-run treat itself as first too,
      // otherwise a fresh load with a hash never scrolls in development.
      if (first) prevPath.current = null;
    };
  }, [path]);

  // Same-path hash navigation (wouter dispatches "pushState"; browsers "hashchange").
  useEffect(() => {
    let cancel = () => {};
    let lastHref = window.location.href;
    const onNav = () => {
      const href = window.location.href;
      const samePath = new URL(lastHref).pathname === window.location.pathname;
      lastHref = href;
      if (samePath && window.location.hash) {
        cancel();
        cancel = scrollToHash(window.location.hash, "smooth");
      }
    };
    window.addEventListener("pushState", onNav);
    window.addEventListener("hashchange", onNav);
    return () => {
      cancel();
      window.removeEventListener("pushState", onNav);
      window.removeEventListener("hashchange", onNav);
    };
  }, []);

  return null;
}
