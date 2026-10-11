import { motion } from "motion/react";
import { lazy, Suspense, type ComponentType, type LazyExoticComponent } from "react";
import { Route, Switch, useLocation } from "wouter";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/** Route table. Each page is its own chunk: `src/pages/<name>.tsx` with a default export. */
export const routes: { path: string; component: LazyExoticComponent<ComponentType> }[] = [
  { path: "/", component: lazy(() => import("@/pages/home")) },
  { path: "/sih", component: lazy(() => import("@/pages/sih")) },
  { path: "/projects", component: lazy(() => import("@/pages/projects")) },
  { path: "/events", component: lazy(() => import("@/pages/events")) },
  { path: "/team", component: lazy(() => import("@/pages/team")) },
  { path: "/alumni", component: lazy(() => import("@/pages/alumni")) },
  { path: "/alumni/:year", component: lazy(() => import("@/pages/alumni-batch")) },
  { path: "/life-at-rg", component: lazy(() => import("@/pages/life-at-rg")) },
  { path: "/contact", component: lazy(() => import("@/pages/contact")) },
];

const NotFound = lazy(() => import("@/pages/not-found"));

/** Thin kapton bar at the very top while a route chunk loads. */
export function RouteProgress() {
  return (
    <>
      <div
        role="progressbar"
        aria-label="Loading page"
        className="fixed inset-x-0 top-0 z-[90] h-0.5 overflow-hidden"
      >
        <div className="h-full w-full origin-left animate-route-progress bg-kapton" />
      </div>
      <div className="min-h-[70vh]" />
    </>
  );
}

/**
 * Lazy route switch. Page content fades in over 150 ms on route change (static with
 * reduced motion). Pages read params via wouter's `useParams()`.
 */
export function AppRoutes() {
  const [location] = useLocation();
  const reduced = useReducedMotion();
  return (
    <Suspense fallback={<RouteProgress />}>
      <motion.div
        key={location}
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.15, ease: "linear" }}
      >
        <Switch>
          {routes.map((r) => (
            <Route key={r.path} path={r.path} component={r.component} />
          ))}
          <Route component={NotFound} />
        </Switch>
      </motion.div>
    </Suspense>
  );
}
