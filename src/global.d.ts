export {};

declare global {
  /** Console easter egg API installed by features/eggs/ConsoleGreeting. */
  interface RobogyanConsoleApi {
    /** Prints a table of verified facts and returns their texts. */
    facts(): string[];
    /** The society motto. */
    motto(): string;
    /** How to join; also logged. */
    join(): string;
  }

  interface Window {
    robogyan?: RobogyanConsoleApi;
  }
}
