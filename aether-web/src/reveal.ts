/** Reveal [data-reveal] elements as they scroll into view. */
export function initReveal(): () => void {
  if (typeof IntersectionObserver === "undefined") return () => {}
  const observer = new IntersectionObserver(
    entries => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.setAttribute("data-revealed", "")
          observer.unobserve(entry.target)
        }
      }
    },
    // Any intersection counts — a section taller than the viewport can never
    // reach a fractional threshold. The margin delays the reveal until the
    // element is a little way into view.
    { threshold: 0, rootMargin: "0px 0px -8% 0px" }
  )
  for (const el of document.querySelectorAll("[data-reveal]")) observer.observe(el)
  return () => observer.disconnect()
}
