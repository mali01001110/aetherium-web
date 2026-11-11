# Remove text character-shuffle (scramble) effect

## Goal
Remove the character-shuffle "writing" effect so chapter body text (h2/h3/p description/observation-note for Fabre, Jaunes, Devis, Indy) renders its real text immediately without scrambling.

## Context
The effect is implemented in `aether-web/src/scramble.ts` + `aether-web/src/scramble.css`, wired up in `aether-web/src/Page.tsx`, and triggered via `data-scramble=""` attributes on 12 elements.

## Affected files
- `aether-web/src/Page.tsx`
- `aether-web/src/scramble.ts` (delete)
- `aether-web/src/scramble.css` (delete)

## Tasks
1. `aether-web/src/Page.tsx`: remove `import "./scramble.css"`.
2. `aether-web/src/Page.tsx`: remove `import { initScramble } from "./scramble"`.
3. `aether-web/src/Page.tsx`: remove `const cleanupScramble = initScramble()` and the `cleanupScramble()` call inside the `useEffect` cleanup.
4. `aether-web/src/Page.tsx`: remove all `data-scramble=""` attributes (12 occurrences across Fabre/Jaunes/Devis/Indy h2/h3/p elements).
5. Delete `aether-web/src/scramble.ts`.
6. Delete `aether-web/src/scramble.css`.
7. Verify no remaining references to `scramble`, `initScramble`, or `data-scramble` under `aether-web/src`.
8. Run typecheck/lint/build (e.g. `tsc`, `npm run lint`, `npm run dev` build) to confirm no breakage.

## Decisions
- Remove the effect entirely rather than disabling it; no reduced-motion fallback needed since the feature is being deleted.
- Do not touch `reveal.ts`/`heroFade.ts` or other `Page.tsx` effects; keep their imports/cleanup intact.

## Risks
- Missing a `data-scramble` attribute leaves dead markup but no runtime effect (scramble.ts removed) — still remove all for cleanliness.
- Orphaned `scramble.ts`/`scramble.css` if deletion fails — verify deletion.

## Validation
- `grep -R "scramble\|initScramble\|data-scramble" aether-web/src` returns no matches.
- Typecheck and lint pass; dev build succeeds.

## Open questions
None. This session is plan-only (source edits denied); hand off to an implementation-capable agent to execute Tasks 1-8.
