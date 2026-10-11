import { ConsoleGreeting } from "./ConsoleGreeting";
import { EndOfLineEgg } from "./EndOfLineEgg";
import { GyaanEgg } from "./GyaanEgg";
import { KonamiBot } from "./KonamiBot";
import { LogoEgg } from "./LogoEgg";
import { TabTitleEgg } from "./TabTitleEgg";

/**
 * Mounts every shell-level easter egg once (in RootLayout, inside ToastProvider).
 * Page eggs (LostBot, useSihConfetti, FactCard) are imported by the pages themselves;
 * FooterYearEgg is rendered by the Footer.
 */
export function Eggs() {
  return (
    <>
      <ConsoleGreeting />
      <TabTitleEgg />
      <GyaanEgg />
      <KonamiBot />
      <EndOfLineEgg />
      <LogoEgg />
    </>
  );
}
