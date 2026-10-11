import { ConsoleGreeting } from "./ConsoleGreeting";
import { EndOfLineEgg } from "./EndOfLineEgg";
import { GyaanEgg } from "./GyaanEgg";
import { KonamiBot } from "./KonamiBot";
import { LogoEgg } from "./LogoEgg";
import { TabTitleEgg } from "./TabTitleEgg";

/**
 * Mounts every shell-level easter egg once (in App.tsx). Page eggs (LostBot,
 * useSihConfetti) are used by their pages; FooterYearEgg is rendered by the Footer;
 * FactCard belongs to RoboBuddy.
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
