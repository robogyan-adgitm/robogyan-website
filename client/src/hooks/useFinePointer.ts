import { useMedia } from "./useMedia";
import { useReducedMotion } from "./useReducedMotion";

/** Desktop mouse/trackpad and no reduced-motion preference: pointer effects are on. */
export function usePointerEffects(): boolean {
  const fine = useMedia("(hover: hover) and (pointer: fine)");
  const reduced = useReducedMotion();
  return fine && !reduced;
}
