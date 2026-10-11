import { eggToast } from "./eggToast";
import { useKeySequence } from "@/hooks/useKeySequence";

export const GYAAN_MESSAGE = "Robo + gyaan (ज्ञान) = knowledge of robots. That's the name.";

/** Typing "gyaan" anywhere outside a field explains the name. */
export function GyaanEgg() {
  useKeySequence("gyaan", () => eggToast("Robogyan", GYAAN_MESSAGE));
  return null;
}
