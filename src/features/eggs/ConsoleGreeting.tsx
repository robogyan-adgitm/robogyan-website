import { useEffect } from "react";
import { facts, verifiedFacts } from "@/content/facts";
import { emails, site } from "@/content/site";

const BANNER = String.raw`
 ██████╗
 ██╔══██╗
 ██████╔╝   R O B O G Y A N
 ██╔══██╗   Experience Engineering since ${site.foundedYear}
 ██║  ██║
 ╚═╝  ╚═╝
`;

let greeted = false;

/** Installs `window.robogyan` (typed in src/global.d.ts). Safe to call repeatedly. */
export function installConsoleApi(): void {
  window.robogyan = {
    facts() {
      const list = verifiedFacts();
      console.table(list.map((f) => ({ fact: f.text, year: f.year ?? "", source: f.source })));
      return list.map((f) => f.text);
    },
    motto() {
      return site.motto;
    },
    join() {
      const msg = `Walk into the Robogyan lab, Block 5, ADGIPS, or write to ${emails.contact}. ${site.url}/contact`;
      console.log(msg);
      return msg;
    },
  };
}

/**
 * Egg 1: a black/amber banner in the devtools console on first load, plus
 * `robogyan.facts()`, `robogyan.motto()` and `robogyan.join()` helpers.
 */
export function ConsoleGreeting() {
  useEffect(() => {
    if (greeted) return;
    greeted = true;
    installConsoleApi();
    console.log(
      `%c${BANNER}`,
      "background:#000;color:#FFB000;font-family:ui-monospace,monospace;font-size:12px;line-height:1.2;padding:8px 12px;",
    );
    console.log(
      `%cHello, engineer. ${facts.length} facts on board. Try robogyan.facts(), robogyan.motto(), robogyan.join()`,
      "background:#FFB000;color:#1A1200;padding:4px 8px;font-weight:700;",
    );
  }, []);
  return null;
}
