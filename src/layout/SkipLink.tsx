/** First focusable element: jumps keyboard users past the nav to <main id="main">. */
export function SkipLink() {
  return (
    <a
      href="#main"
      className="fixed top-2 left-2 z-[100] -translate-y-[200%] bg-kapton px-4 py-2 font-semibold text-kapton-ink chamfer focus:translate-y-0"
      onClick={(e) => {
        const main = document.getElementById("main");
        if (!main) return;
        e.preventDefault();
        main.focus({ preventScroll: false });
        main.scrollIntoView();
      }}
    >
      Skip to content
    </a>
  );
}
