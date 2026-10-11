import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./app/App";
import "./styles/globals.css";

/**
 * Hash-URL compat: the old site used hash routing, so links like `/#/sih#results` are
 * out in the wild (Instagram bios, posts). Rewrite them to `/sih#results` before render.
 */
function rewriteLegacyHash(loc: Location, history: History): void {
  if (loc.hash.startsWith("#/")) {
    history.replaceState(history.state, "", loc.hash.slice(1));
  }
}

rewriteLegacyHash(window.location, window.history);

// index.html carries static <title>/<meta> defaults for crawlers without JS; pages
// render their own via <Seo>, so drop the defaults to avoid duplicates.
document.head.querySelectorAll("[data-default]").forEach((el) => el.remove());

const root = document.getElementById("root");
if (!root) throw new Error("#root missing from index.html");

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
