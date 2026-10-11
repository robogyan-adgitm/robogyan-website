import { useLocation } from "wouter";
import { absoluteUrl, pageTitle } from "@/lib/seo";

export interface SeoProps {
  /** Page name; renders "<title> · Robogyan". Omit on the home page. */
  title?: string;
  description?: string;
  /** Canonical path; defaults to the current route. */
  path?: string;
  /** OG image path; defaults to /og.png. */
  image?: string;
  /** Keep the page out of search results (404). */
  noindex?: boolean;
  /** JSON-LD object rendered as application/ld+json (e.g. Organization on home). */
  jsonLd?: Record<string, unknown>;
}

/**
 * Per-page document metadata using React 19's built-in hoisting of <title>, <meta> and
 * <link> into <head>. Static defaults in index.html are removed at boot (main.tsx).
 */
export function Seo({ title, description, path, image = "/og.png", noindex, jsonLd }: SeoProps) {
  const [location] = useLocation();
  const fullTitle = pageTitle(title);
  const url = absoluteUrl(path ?? location);
  return (
    <>
      <title>{fullTitle}</title>
      {description && <meta name="description" content={description} />}
      <link rel="canonical" href={url} />
      <meta property="og:title" content={fullTitle} />
      {description && <meta property="og:description" content={description} />}
      <meta property="og:url" content={url} />
      <meta property="og:image" content={absoluteUrl(image)} />
      <meta name="twitter:title" content={fullTitle} />
      {description && <meta name="twitter:description" content={description} />}
      {noindex && <meta name="robots" content="noindex" />}
      {jsonLd && (
        <script
          type="application/ld+json"
          // JSON.stringify output is safe here: content is our own static data.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
      )}
    </>
  );
}
