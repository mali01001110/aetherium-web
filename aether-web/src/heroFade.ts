function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

function smoothstep(t: number): number {
  return t * t * (3 - 2 * t)
}

export function initHeroFade(): () => void {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return () => {}
  }

  const hero = document.getElementById("top")
  if (!hero) return () => {}
  const heroEl: HTMLElement = hero

  const targets = Array.from(heroEl.querySelectorAll<HTMLElement>("[data-hero-fade]"))
  if (targets.length === 0) return () => {}

  let rafId: number

  function update() {
    const scrollY = window.scrollY
    const vh = window.innerHeight
    const fadeWindow = vh * 0.6

    // Fade begins at the first pixel of scroll, easing smoothly over the
    // next 60vh (ease-in-out via smoothstep), stay invisible past 60vh.
    // Reverses on the way back up.
    const progress = clamp(scrollY / fadeWindow, 0, 1)
    const eased = smoothstep(progress)
    const opacity = 1 - eased

    for (const el of targets) {
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