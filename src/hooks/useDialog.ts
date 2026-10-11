import { useEffect, useRef } from "react";

/**
 * Drive a native `<dialog>` from React state: opens with `showModal()` (focus is
 * contained, the page goes inert, Esc fires `cancel`) and closes with `close()`.
 * `onClose` runs for Esc and for programmatic closes so state stays in sync.
 */
export function useDialog(open: boolean, onClose: () => void) {
  const ref = useRef<HTMLDialogElement>(null);
  const onCloseRef = useRef(onClose);
  useEffect(() => {
    onCloseRef.current = onClose;
  });

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      dialog.showModal();
      // Lets the custom cursor hand back to the native one at once (see features/cursor).
      document.dispatchEvent(new CustomEvent("rg:dialog", { detail: true }));
    }
    if (!open && dialog.open) {
      dialog.close();
      document.dispatchEvent(new CustomEvent("rg:dialog", { detail: false }));
    }
  }, [open]);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    const handleClose = () => onCloseRef.current();
    dialog.addEventListener("close", handleClose);
    return () => dialog.removeEventListener("close", handleClose);
  }, []);

  return ref;
}
