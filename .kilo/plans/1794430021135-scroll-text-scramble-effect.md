# Aetherium — Chapter Text Scramble (Writing) Effect

Goal: Make chapter body text dynamic — when a planet section (Fabre, Jaunes, Devis, Indy) is scrolled into view, its text plays a character-shuffle "writing" effect where characters randomly cycle until the real ones lock into place. The effect must re-run every time the section is scrolled to.

## Context

- React 19 + Vite SPA exported from Framer. Single page: `aether-web/src/Page.tsx`; all layout in `aether-web/src/Page.module.css` (2332 lines); typography tokens in `aether-web/src/tokens.module.css`.
- Scroll reveals already exist: `src/reveal.ts` observes `[data-reveal]` sections (threshold 0, `rootMargin: "0px 0px -8% 0%"`) and adds `data-revealed` once; `src/reveal.css` drives the fade-up. `src/heroFade.ts` handles the hero scroll fade. No animation library, no test framework, no new deps desired.
- Four chapter sections exist, each with `data-reveal=""`: `.n-01-fabre` (id="system"), `.n-02-jaunes`, `.n-03-devis`, `.n-04-indy`. Each has a field-notes column with: h2 planet name, h3 statement, p description, p observation note.
- Example text to scramble: h2 "Fabre", h3 "Where the ocean learned to glow.", p "An endless cobalt sea, threaded with living light. Beneath Fabre’s pearl-white storms, luminous reef forests follow the slow pulse of Aetherium across the water.", p "At night, the shoreline becomes a constellation of its own." (same structure for Jaunes / Devis / Indy).

## Decisions

1. **New module `src/scramble.ts`** exporting `initScramble(): () => void`, wired into `Page.tsx`'s existing `useEffect` next to `initReveal()` / `initHeroFade()`, with cleanup on unmount.
2. **Trigger:** a dedicated `IntersectionObserver` on the four `[data-reveal]` chapter sections. Run the scramble every time a section *enters* the viewport (observer keeps observing across enter/leave cycles so re-scrolling re-triggers). Same `rootMargin: "0px 0px -8% 0%"` as `reveal.ts` so timing matches the existing reveal.
3. **Targets:** elements explicitly marked `data-scramble=""` — per chapter: h2 name, h3 statement, p description, p observation note (16 elements total). Static data (chapter index, telemetry labels/values, celestial labels, hero text, footer) is out of scope and stays untouched.
4. **Effect mechanics:** snapshot `textContent`; replace each visible character with its own `<span class="scramble-char">`; spaces and line breaks preserved as plain text (never scrambled, to avoid word-boundary/layout jitter). Each character position starts after a per-character stagger (~25 ms) and each element starts after a per-element delay (~110 ms) so text "types" left-to-right within a section top-to-bottom. While a position is unlocked, cycle a random charset character every animation frame; lock to the target character with a rising probability so completion is guaranteed within ~1 s per element; once locked, hold the final character. When complete, leave the final text in the DOM and remove `aria-hidden`.
5. **Charset:** A–Z, a–z, 0–9, plus punctuation appearing in the target (`.,'"/–—:;!?…`). Spaces preserved.
6. **`prefers-reduced-motion: reduce`:** render final text immediately, no shuffling (consistent with `reveal.css` / `heroFade.ts`).
7. **Cleanup / idempotence:** cancel in-flight RAF/timeouts and restore the element's original HTML on unmount or observer disconnect; if a section re-enters while its scramble is running, restart that element's scramble.
8. **Accessibility:** during shuffling set `aria-hidden="true"` on the target element (final text stays in the DOM so it is available once locked / under reduced motion). Accept minor glyph-width jitter during the effect; bound it with `min-width: 1ch; text-align: center` on `.scramble-char`.
9. **Styling:** new `src/scramble.css` imported in `Page.tsx` alongside `reveal.css`. No changes to `Page.module.css` needed beyond nothing; layout classes already size the text containers.
10. **No new dependencies.** Pure DOM/RAF implementation, matching the existing effect files' style.

## Files to change

- `aether-web/src/scramble.ts` — new: `initScramble()` with IntersectionObserver + per-element scramble animator.
- `aether-web/src/scramble.css` — new: `.scramble-char` containment + reduced-motion rule.
- `aether-web/src/Page.tsx` — import `initScramble`, call in `useEffect` with cleanup; add `data-scramble=""` to h2/h3/p.description/p.observation-note in each of the four chapter field-notes columns.

## Out of scope

- Telemetry rows ("ORBITAL PERIOD / 186 days", etc.), chapter index numbers ("01 / OCEAN WORLD"), celestial labels ("FABRE / 01"), hero cover text, footer, and `.n-05-orbital-atlas` placeholder — static, no scramble.
- Replacing the Framer "Plus" / "Arrow Right" / "OrbitalAtlas" TODOs — unrelated.
- Unit/integration tests — no test tooling exists in the repo.

## Validation

1. `npm run build` in `aether-web/` (`tsc -b && vite build`) — must pass with no TS errors.
2. `npm run dev` — open the app; scroll to Fabre → verify h2/h3/description/observation each scramble then lock to exact text; scroll away and back → effect re-runs; repeat for Jaunes, Devis, Indy.
3. Emulate `prefers-reduced-motion` in DevTools → text appears instantly, no scrambling.
4. Confirm final DOM text equals source text after each effect completes; no console errors; no layout shift that breaks adjacent globe/scene alignment.

## Risks / notes

- React StrictMode double-mounts in dev: effects run twice — cleanup functions must fully remove listeners/timeouts to avoid double scrambles.
- Screen readers hear gibberish during the shuffle — mitigated with `aria-hidden="true"` during animation and restored afterward; reduced-motion users get final text immediately.
- Proportional fonts cause slight per-frame width jitter while shuffling — accepted; `min-width: 1ch` on char spans bounds it.
- IntersectionObserver threshold 0 with `-8%` rootMargin fires when the section top is ~8% into the viewport; effect starts then, in sync with the existing fade-up reveal.