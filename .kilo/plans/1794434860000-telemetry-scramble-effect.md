# Add character-shuffle effect to telemetry sections

## Goal
Apply the existing scramble “writing” effect to the telemetry label/value text in the Fabre, Jaunes, Devis, and Indy chapter sections (same effect as chapter headings/body: re-runs on each scroll-in).

## Current state (verified)
- `aether-web/src/scramble.ts`: `initScramble()` observes `[data-reveal]`; on intersection it scrambles all `[data-scramble]` elements inside that section (per-char stagger/lock, RAF, re-runs on re-entry, restores on cleanup, `prefers-reduced-motion` respected, `aria-hidden` while animating). No source changes needed.
- `aether-web/src/scramble.css`, `Page.tsx` wiring (`initScramble` in `useEffect`) already in place.
- Targets already present: `data-scramble` on chapter h2/h3/description/observation-note only (`Page.tsx:97-102,150-155,183-188,226-231`).
- Telemetry blocks live inside the same `[data-reveal]` chapter sections but their `<p>`s lack `data-scramble` (`Page.tsx:116-129,159-172,202-215,245-258`).

## Scope
Add scramble to these 24 elements (label + value per row):

| Section | Labels | Values |
|---|---|---|
| Fabre (`.n-01-fabre`) | ORBITAL PERIOD, MEAN TEMPERATURE, DISTANCE TO STAR | 186 days, 18°C, 2.4 AU |
| Jaunes (`.n-02-jaunes`) | ORBITAL PERIOD, WIND VELOCITY, DISTANCE TO STAR | 1,240 days, 1,800 km/h, 5.8 AU |
| Devis (`.n-03-devis`) | ORBITAL PERIOD, SURFACE TEMPERATURE, DISTANCE TO STAR | 3,860 days, −168°C, 11.2 AU |
| Indy (`.n-04-indy`) | ORBITAL PERIOD, MEAN RADIUS, PARENT PLANET | 27.6 days, 1,420 km, Devis |

Out of scope: chapter index labels, celestial labels, hero/footer, atlas placeholder, changes to scramble timing/charset/CSS (existing charset already covers A–Z, 0–9, space, `,`, `.`, `/`, `°`, `−`), new deps, tests.

## Implementation (single file)
- [ ] `aether-web/src/Page.tsx` — add `data-scramble=""` to each telemetry `<p>` (labels and values) in the four blocks above (~lines 118-127, 161-170, 204-213, 247-256). Markup-only attribute additions; keep existing classes/tokens/text unchanged.

## Verification
1. `cd aether-web && npm run build` (`tsc -b && vite build`) — passes.
2. `npm run dev`: scroll to each of Fabre/Jaunes/Devis/Indy — telemetry labels and values shuffle then lock to exact source strings; scroll away/back re-triggers.
3. DevTools emulate `prefers-reduced-motion: reduce` — telemetry renders immediately, no shuffle.
4. Confirm no console errors and telemetry alignment/layout unchanged after lock.

## Risks/notes
- Telemetry elements will animate after existing field-notes targets in DOM order within the section (current `scrambleSection` staggers by query order); acceptable unless user requests different sequencing.
- Minor glyph-width jitter during shuffle is bounded by existing `.scramble-char { min-width: 1ch; }`.
- `aria-hidden` applied per-element during animation (existing behavior); restored on completion/reduced-motion.
