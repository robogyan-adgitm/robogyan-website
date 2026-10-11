import { toast } from "@/hooks/use-toast";

/**
 * Show an easter-egg toast through the app's shadcn Toaster, in the glass style
 * (see `.rg-toast` in index.css). It closes itself after `duration` ms; Esc (from
 * anywhere on the page) and swipe dismiss it early.
 */
export function eggToast(title: string, description: string, duration = 6000): void {
  const t = toast({ title, description, duration, className: "rg-toast" });
  const onKey = (e: KeyboardEvent) => {
    if (e.key !== "Escape") return;
    t.dismiss();
    stop();
  };
  const timer = window.setTimeout(() => stop(), duration + 500);
  function stop() {
    window.clearTimeout(timer);
    window.removeEventListener("keydown", onKey);
  }
  window.addEventListener("keydown", onKey);
}
