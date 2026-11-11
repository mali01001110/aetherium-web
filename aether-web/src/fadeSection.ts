function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

export function initFadeSection(): () => void {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return () => {}
  }

  const targets = Array.from(document.querySelectorAll<HTMLElement>("[data-fade-section]"))
  if (targets.length === 0) return () => {}

  let rafId: number

  function update() {
    const vh = window.innerHeight
    for (const el of targets) {
      const rect = el.getBoundingClientRect()
      // Fade in as the section top enters from the bottom of the viewport,
      // hold full opacity while crossing the viewport, fade out as the top
      // leaves the top of the viewport. Reverses on scroll back up.
      const enterStart = vh * 0.75   // top edge 0.75 viewports below bottom -> fade in begins
      const enterEnd = vh * 0.4      // top edge 40% down from top -> fully visible
      const leaveStart = -vh * 0.15  // top edge just above viewport top -> fade out begins
      const leaveEnd = -vh * 0.5     // top edge half a viewport above -> fully faded

      let opacity = 0
      if (rect.top > enterEnd) {
        const p = clamp((rect.top - enterEnd) / (enterStart - enterEnd), 0, 1)
        opacity = 1 - p
      } else if (rect.top < leaveStart) {
        const p = clamp((leaveStart - rect.top) / (leaveStart - leaveEnd), 0, 1)
        opacity = 1 - p
      } else {
        opacity = 1
      }
      el.style.opacity = String(opacity)
    }
  }

  function onScroll() {
    cancelAnimationFrame(rafId)
    rafId = requestAnimationFrame(update)
  }

  window.addEventListener("scroll", onScroll, { passive: true })
  update()

  return () => {
    window.removeEventListener("scroll", onScroll)
    cancelAnimationFrame(rafId)
    for (const el of targets) {
      el.style.opacity = ""
    }
  }
}
