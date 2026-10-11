import { useRoute } from "wouter";
import { DotField } from "@/features/background/DotField";
import { Cursor } from "@/features/cursor/Cursor";
import { Eggs } from "@/features/eggs/Eggs";
import { Footer } from "@/layout/Footer";
import { Navbar } from "@/layout/Navbar";
import { SkipLink } from "@/layout/SkipLink";
import { AppRoutes } from "./router";
import { ScrollManager } from "./ScrollManager";

/**
 * Page chrome: the DotField background, nav, routes, footer, eggs and the custom
 * cursor. `/alumni/:year` hides the Navbar (a standalone, shareable batch page,
 * as before) but keeps the Footer.
 */
export function RootLayout() {
  const [isBatchPage] = useRoute("/alumni/:year");
  return (
    <>
      <SkipLink />
      <ScrollManager />
      {/* Fixed canvas behind everything (z -10 under a transparent body). */}
      <DotField />
      {!isBatchPage && <Navbar />}
      <main id="main" tabIndex={-1} className="min-h-[70vh] outline-none">
        <AppRoutes />
      </main>
      <Footer />
      <Eggs />
      <Cursor />
    </>
  );
}
