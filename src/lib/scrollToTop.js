/**
 * Scroll to the top, honoring the visitor's reduced-motion preference:
 * smooth by default, instant for prefers-reduced-motion. (CSS
 * scroll-behavior does not apply to a programmatic scrollTo() with an
 * explicit behavior option, so the media query is checked here.)
 */
export function scrollToTop() {
  const reduce =
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
}
