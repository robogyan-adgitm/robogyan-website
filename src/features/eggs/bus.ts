import { useEffect, useRef } from "react";

/** Easter eggs that can be triggered from elsewhere in the shell. */
export type EggName = "logo" | "konami";

const target = typeof window !== "undefined" ? new EventTarget() : null;

/** Fire an egg by name (e.g. the Navbar's 5-click logo counter emits "logo"). */
export function emitEgg(name: EggName): void {
  target?.dispatchEvent(new Event(name));
}

/** Run `handler` whenever egg `name` is emitted. */
export function useEggEvent(name: EggName, handler: () => void): void {
  const ref = useRef(handler);
  useEffect(() => {
    ref.current = handler;
  });
  useEffect(() => {
    if (!target) return;
    const fn = () => ref.current();
    target.addEventListener(name, fn);
    return () => target.removeEventListener(name, fn);
  }, [name]);
}

/** True once the user has clicked/tapped/typed (needed before playing audio). */
export function hasUserInteracted(): boolean {
  if (typeof navigator === "undefined") return false;
  const ua = (navigator as Navigator & { userActivation?: { hasBeenActive: boolean } })
    .userActivation;
  return ua?.hasBeenActive ?? false;
}
