/** Smoothly scroll to a section on the home page (works from any route). */
export function scrollToSection(id: string, offset = 72) {
  const el = document.getElementById(id);
  if (!el) return false;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const top = el.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top, behavior: reduce ? "auto" : "smooth" });
  return true;
}
