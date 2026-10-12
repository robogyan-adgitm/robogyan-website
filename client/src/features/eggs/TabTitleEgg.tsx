import { useEffect } from "react";

export const AWAY_TITLE = "Solder's cooling… come back";

/** While the tab is hidden the title reads "Solder's cooling… come back". */
export function TabTitleEgg() {
  useEffect(() => {
    let saved: string | null = null;
    const onChange = () => {
      if (document.visibilityState === "hidden") {
        saved = document.title;
        document.title = AWAY_TITLE;
      } else if (saved !== null) {
        if (document.title === AWAY_TITLE) document.title = saved;
        saved = null;
      }
    };
    document.addEventListener("visibilitychange", onChange);
    return () => document.removeEventListener("visibilitychange", onChange);
  }, []);
  return null;
}
