import { useToast } from "@/components/Toast";
import { useKeySequence } from "@/hooks/useKeySequence";

export const GYAAN_MESSAGE = "Robo + gyaan (ज्ञान) = knowledge of robots. That's the name.";

/** Egg 3: typing "gyaan" anywhere outside a field explains the name. */
export function GyaanEgg() {
  const toast = useToast();
  useKeySequence("gyaan", () => toast.show({ title: "Robogyan", body: GYAAN_MESSAGE }));
  return null;
}
