# Aetherium — Web Responsiveness Plan

Goal: Make the Aetherium single-page site fully responsive across phones, tablets, and large
desktop monitors (24", 27", 32"). Chosen large-screen strategy: **scale content up proportionally**
(no compact-centered compromise).

## Context

- React 19 + Vite single-page app exported from Framer. Only page: `aether-web/src/Page.tsx`.
- Layout is entirely in `aether-web/src/Page.module.css` (2332 lines). Typography tokens in
  `aether-web/src/tokens.module.css`. Colors/fonts in `aether-web/src/theme.css`.
- Existing breakpoints: Tablet `max-width:1199px`, Phone `max-width:809px`, small-phone tweak
  `max-width:360px`, plus a hand-tuned override block (lines ~1855–2332: hero, header, star,
  footer) that already uses some `clamp()`.
- `index.html` already has a proper `<meta name="viewport">`. Images are remote (Framer CDN).
- Scroll effects (`reveal.ts`, `heroFade.ts`) need no change.

## Core problems being fixed

1. **Fixed section heights clip content.** `.n-01-fabre` … `.n-04-indy` use `height: 900px`
   (desktop) / `975px` (tablet) / `1100px` (phone) with `overflow: hidden`. At intermediate
   widths (e.g. 810–900px) or when text wraps/zooms, stacked content can exceed the fixed
   height and get clipped. Convert to `min-height` so sections grow instead of clip.
2. **No large-screen scaling.** Everything caps (content 1344px, hero title 14rem, star 920px,
   globes 480px). On 24"/27"/32" monitors the design looks small with huge empty margins.
3. **Small phones.** `AETHERIUM` title is `white-space: nowrap` and can overflow near 320px;
   telemetry rows can get cramped below ~400px.
4. **Horizontal overflow safety** on fixed star backdrop and any residual floaters.
5. **Fixed vertical gaps** (`celestial-journey` 384/288/192px) don't adapt to tall screens.

## Approach

Layer a fluid `clamp()` scale on top of the existing structure, driven by CSS custom
properties, and add `min-width` breakpoints for large screens. No JSX/TS changes, no new deps.

### 1. Add a scaling variable scope (`.desktop` in Page.module.css)

```css
.desktop {
  /* new */
  --content-max: 1344px;      /* chapter rows / cover content */
  --hero-max: 1150px;         /* hero cover, header, footer column */
  --section-min: 900px;
  --journey-gap: 384px;
  --globe: 480px;
  --globe-indy: 330px;
}
```

Replace hard `max-width: 1344px` (chapter layouts), `max-width: 1150px` (`.cover-content`,
`.footer`), `max-width: 1000px` (`.hero-header`) with `var(--content-max)` / `var(--hero-max)`
as appropriate. Keep `max-width: 100%` guards intact.

### 2. Convert fixed heights to min-heights (all four `.n-0X-*` sections)

- Desktop: `height: 900px` → `min-height: clamp(840px, 62vh, 1000px)`.
- Tablet block (≤1199): `height: 975px` → `min-height: 975px` (allows growth).
- Phone block (≤809): `height: 1100px` → `min-height: 1100px` (allows growth).
- Keep `overflow: hidden` only where a decorative crop is intentional (star wrapper);
  on the section rows switch to `overflow: clip`/visible-safe so nothing inside is lost.

### 3. Make vertical rhythm fluid

- `.celestial-journey` gap: desktop `384px` → `clamp(160px, 20vh, 384px)`;
  tablet → `clamp(120px, 14vh, 288px)`; phone → `clamp(96px, 12vh, 192px)`.
- `min-height: 100svh` already used on hero — keep.

### 4. Add large-screen breakpoints (append at end of Page.module.css)

```css
@media (min-width: 1920px) { /* 24" / 27" / 4K@200% */
  .desktop { --content-max: 1680px; --hero-max: 1480px; --section-min: 1000px; --globe: 560px; --globe-indy: 400px; }
  .aetherium { font-size: clamp(6rem, 12vw, 20rem); }
  .blue-corona, .aetherium-blue-star { width: clamp(780px, 52vw, 1280px); height: clamp(780px, 52vw, 1280px); }
  .fabre-orbital-scene, .jaunes-orbital-scene, .devis-orbital-scene, .indy-orbital-scene { height: 640px; }
}
@media (min-width: 2560px) { /* 27" / 32" hi-DPI */
  .desktop { --content-max: 1920px; --hero-max: 1680px; --section-min: 1120px; --globe: 640px; --globe-indy: 460px; }
  .aetherium { font-size: clamp(7rem, 12vw, 24rem); }
  .blue-corona, .aetherium-blue-star { width: clamp(900px, 52vw, 1600px); height: clamp(900px, 52vw, 1600px); }
  .fabre-orbital-scene, .jaunes-orbital-scene, .devis-orbital-scene, .indy-orbital-scene { height: 720px; }
}
@media (min-width: 3200px) { /* 32" at 100% DPI / 4K */
  .desktop { --content-max: 2200px; --hero-max: 1900px; --globe: 720px; --globe-indy: 520px; }
}
```

- Apply `--globe` to `.fabre-globe`, `.jaunes-globe`, `.devis-globe` (480px desktop) and
  `--globe-indy` to `.indy-globe` (330px desktop) via `width: var(--globe); height: var(--globe)`.
- Keep the tablet/phone override blocks setting explicit px (380/300/240) so the vars only
  govern desktop-and-up.

### 5. Small-phone fixes (extend the existing `max-width: 360px` block)

- `.aetherium`: allow graceful wrap — `white-space: normal; font-size: clamp(2.1rem, 13vw, 3.2rem)`
  so the word can split into two lines instead of overflowing at ~320px.
- Add `@media (max-width: 480px)`: telemetry rows `.fabre-telemetry`, `.jaunes-telemetry`,
  `.devis-telemetry`, `.indy-telemetry` → `flex-wrap: wrap`, each measurement `flex: 1 1 44%`
  so labels like "DISTANCE TO STAR" don't crush.
- Verify `.hero-header` (grid `1fr auto`) at ≤360; keep as-is if it fits.

### 6. Horizontal overflow + mobile chrome safety (theme.css / Page.module.css)

- `src/theme.css`: add `html, body { overflow-x: hidden; }` and keep body margin 0.
- `.persistent-blue-hypergiant`: `height: 100vh` → `height: 100svh` (mobile URL bar).
- Confirm the star backdrop (`position: absolute` + `right: -40px`) never creates a horizontal
  scrollbar at any width (guarded by overflow-x hidden).

### 7. Typography token scaling (tokens.module.css)

Append `min-width` blocks so large screens keep type proportionally larger:

```css
@media (min-width: 1920px) { .text-planet-display { font-size: 128px; } .text-cover-statement { font-size: 48px; } .text-orbital-value { font-size: 32px; } .text-field-notes { font-size: 19px; } .text-telemetry { font-size: 12px; } .text-micro-telemetry { font-size: 11px; } }
@media (min-width: 2560px) { .text-planet-display { font-size: 160px; } .text-cover-statement { font-size: 60px; } .text-orbital-value { font-size: 40px; } .text-field-notes { font-size: 21px; } .text-telemetry { font-size: 13px; } .text-micro-telemetry { font-size: 12px; } }
```

## Files to change

- `aether-web/src/Page.module.css` — primary (steps 1–6)
- `aether-web/src/tokens.module.css` — step 7
- `aether-web/src/theme.css` — step 6
- No changes to `Page.tsx`, `main.tsx`, `*.ts` effects, `index.html`, package deps.

## Validation

1. `npm run build` in `aether-web/` (runs `tsc -b && vite build`) — must pass.
2. `npm run dev`, then in devtools check every width for no horizontal scroll, no clipped
   text/globes, no overflow under the fold:
   - Phones: 320, 360, 390, 430, 480
   - Tablets: 768, 810, 900, 1024, 1199
   - Desktop/laptop: 1200, 1366, 1440, 1536, 1600
   - Large: 1920 (24"), 2560 (27" / 32" hi-DPI), 3840 (32" at 100% DPI)
3. Spot-check tablet 810–900px and phone landscape (e.g. 844×390): sections must grow
   (min-height) rather than clip.
4. Confirm hero `AETHERIUM` fits at 320px (wraps cleanly) and scales up on 1920/2560.
5. Re-verify scroll-reveal and hero-fade still animate on all sizes.

## Risks / notes

- Large-screen bumps are additive overrides; source order matters — the new `min-width`
  blocks must come after the existing `max-width` blocks.
- Keep remote image URLs untouched; only their rendered box sizes change.
- Do not restrict viewport zoom (`maximum-scale`) — accessibility.
- The `.n-05-orbital-atlas` placeholder is empty and stays untouched.
