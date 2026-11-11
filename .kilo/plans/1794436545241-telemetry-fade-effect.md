# Extend scroll fade in/out to the four telemetry text blocks

## Goal
Apply the existing scroll-driven fade-in/fade-out effect (fadeSection.ts, already wired in Page.tsx) to the four chapter telemetry text blocks, in addition to the four field-notes text blocks already covered. Do not apply the effect to planet/moon images, orbital scenes, header, footer, or the orbital atlas.

## Context
- `src/fadeSection.ts` fades every `[data-fade-section]` element: opacity ramps 0→1 as the element's top edge rises from `vh*2.0` to `vh*0.5` (entering), holds 1, then ramps 1→0 from `-vh*0.2` to `-vh*1.5` (leaving). Reverses on scroll-up. Respects `prefers-reduced-motion`.
- Currently `data-fade-section=""` sits on the 4 field-notes divs: `fabre-field-notes` (line 96), `jaunes-field-notes` (line 149), `devis-field-notes` (line 182), `indy-field-notes` (line 225) in `aether-web/aether-web/src/Page.tsx`.
- The user-quoted texts correspond exactly to the four telemetry wrapper divs, which contain only measurement labels/values (text, no images):
  - Fabre: `fabre-telemetry` (line 116) — ORBITAL PERIOD 186 days / MEAN TEMPERATURE 18°C / DISTANCE TO STAR 2.4 AU
  - Jaunes: `jaunes-telemetry` (line 159) — ORBITAL PERIOD 1,240 days / WIND VELOCITY 1,800 km/h / DISTANCE TO STAR 5.8 AU
  - Devis: `devis-telemetry` (line 202) — ORBITAL PERIOD 3,860 days / SURFACE TEMPERATURE −168°C / DISTANCE TO STAR 11.2 AU
  - Indy: `indy-telemetry` (line 245) — ORBITAL PERIOD 27.6 days / MEAN RADIUS 1,420 km / PARENT PLANET Devis

## Tasks
1. `aether-web/src/Page.tsx`: add `data-fade-section=""` to the four telemetry wrapper divs:
   - `<div className={styles["fabre-telemetry"]}>` → `<div className={styles["fabre-telemetry"]} data-fade-section="">`
   - `<div className={styles["jaunes-telemetry"]}>` → `<div className={styles["jaunes-telemetry"]} data-fade-section="">`
   - `<div className={styles["devis-telemetry"]}>` → `<div className={styles["devis-telemetry"]} data-fade-section="">`
   - `<div className={styles["indy-telemetry"]}>` → `<div className={styles["indy-telemetry"]} data-fade-section="">`
   Each class name string is unique in the file, so single exact-match edits suffice.
2. No changes to `fadeSection.ts` or `fadeSection.css` — the effect already covers all `[data-fade-section]` targets.
3. Do not touch orbital scenes, globes, arrow labels, header, footer, or `n-05-orbital-atlas`.

## Decisions
- Reuse the existing `[data-fade-section]` mechanism rather than adding a new attribute/effect; one effect for all section text.
- Apply the attribute at the telemetry wrapper level so labels and values fade together as one block.
- Keep current pronounced fade windows (2.0vh → 0.5vh in, -0.2vh → -1.5vh out) unchanged.

## Risks
- Minimal. Telemetry divs contain no images, so no risk of fading planet/moon visuals. The four class-name strings are unique, so no replace-all ambiguity.

## Validation
- `grep "data-fade-section" src/Page.tsx` returns exactly 8 matches: 4 field-notes + 4 telemetry divs.
- `npm run build` (`tsc -b && vite build`) passes.
- Dev server on port 5182 hot-reloads; scrolling shows each telemetry block fading in on approach and out on exit, reversing on scroll-up.
