/**
 * SkipLink — visually hidden until focused.
 * Allows keyboard users to bypass repeated navigation and jump
 * directly to the main content area.
 *
 * Server Component — no browser APIs or state required.
 * The visibility transition is handled entirely by CSS.
 *
 * Usage: Place as the very first child of <body>.
 * Target: <main id="main-content"> on every page.
 */
export function SkipLink() {
  return (
    <a
      href="#main-content"
      className="
        fixed left-4 top-4 z-[9999]
        -translate-y-20 opacity-0
        focus:translate-y-0 focus:opacity-100
        bg-primary text-primary-foreground
        rounded-md px-4 py-2 text-sm font-semibold
        shadow-lg
        transition-all duration-[120ms]
        focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2
      "
    >
      Skip to main content
    </a>
  );
}
