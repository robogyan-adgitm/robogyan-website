import { useEffect } from "react";
import { facts } from "@/data/facts";

const BANNER = String.raw`
 ██████╗
 ██╔══██╗
 ██████╔╝   R O B O G Y A N
 ██╔══██╗   Experience Engineering!
 ██║  ██║
 ╚═╝  ╚═╝
`;

const MOTTO = "Experience Engineering!";
const JOIN =
  "Walk into the Robogyan lab (Basement, 5th Block, ADGIPS, Shastri Park) or write to robogyan.contact@gmail.com. https://robogyan.tech/#/contact";

let greeted = false;

declare global {
  interface Window {
    robogyan?: {
      facts(): string[];
      motto(): string;
      join(): string;
    };
  }
}

/** Installs `window.robogyan`. Safe to call repeatedly. */
export function installConsoleApi(): void {
  window.robogyan = {
    facts() {
      console.table(facts.map((f) => ({ fact: f.text, year: f.year ?? "", source: f.source })));
      return facts.map((f) => f.text);
    },
    motto() {
      return MOTTO;
    },
    join() {
      console.log(JOIN);
      return JOIN;
    },
  };
}

/**
 * A blue/purple banner in the devtools console on first load, plus
 * `robogyan.facts()`, `robogyan.motto()` and `robogyan.join()` helpers.
 */
export function ConsoleGreeting() {
  useEffect(() => {
    if (greeted) return;
    greeted = true;
    installConsoleApi();
    console.log(
      `%c${BANNER}`,
      "background:#0a0a0a;color:hsl(235,85%,65%);font-family:'JetBrains Mono',ui-monospace,monospace;font-size:12px;line-height:1.2;padding:8px 12px;border-left:3px solid hsl(275,85%,70%);",
    );
    console.log(
      `%cHello, engineer. ${facts.length} facts on board. Try robogyan.facts(), robogyan.motto(), robogyan.join()`,
      "background:linear-gradient(135deg,hsl(235,85%,65%),hsl(275,85%,70%));color:#fff;padding:4px 8px;border-radius:6px;font-weight:600;",
    );
  }, []);
  return null;
}
