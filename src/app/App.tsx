import { MotionConfig } from "motion/react";
import { Router } from "wouter";
import { ToastProvider } from "@/components/Toast";
import { RootLayout } from "./RootLayout";

/** Providers: browser-history router (clean URLs), toasts, motion honouring reduced motion. */
export function App() {
  return (
    <MotionConfig reducedMotion="user">
      <ToastProvider>
        <Router>
          <RootLayout />
        </Router>
      </ToastProvider>
    </MotionConfig>
  );
}
