import { useRoute } from "wouter";
import { Eggs } from "@/features/eggs/Eggs";
import { Footer } from "@/layout/Footer";
import { Navbar } from "@/layout/Navbar";
import { SkipLink } from "@/layout/SkipLink";
import { AppRoutes } from "./router";
import { ScrollManager } from "./ScrollManager";

/**
 * Page chrome. `/alumni/:year` hides the Navbar (a standalone, shareable batch page,
 * as before) but keeps the Footer.
 */
export function RootLayout() {
  const [isBatchPage] = useRoute("/alumni/:year");
  return (
    <>
      <SkipLink />
      <ScrollManager />
      {!isBatchPage && <Navbar />}
      <main id="main" tabIndex={-1} className="min-h-[70vh] outline-none">
        <AppRoutes />
      </main>
      <Footer />
      <Eggs />
    </>
  );
}
