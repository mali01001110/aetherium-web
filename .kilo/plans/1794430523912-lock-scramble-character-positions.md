# Fix: Lock scramble character positions during shuffle (refined)

## Problem
During the character-shuffle effect, each `.scramble-char` span cycles through random glyphs of differing widths. CSS used `min-width: 1ch`, which pads narrow glyphs but does NOT constrain wide glyphs (m, w, M, W, –, —, …). A wide random glyph grows its span and pushes all subsequent characters right; neighbors snap back when it changes/locks. Characters visibly change position mid-shuffle.

## Root causes (two)
1. **Slot widths were not fixed** — only `min-width: 1ch`, so wide random glyphs still expanded slots and displaced followers.
2. **`text-align: center`** causes each glyph to be centered within its slot; as the glyph width changes, the glyph's edges shift within the slot (the slot is stable but the visible character wiggles left/right).

## Fix
Make every character slot an identical fixed width and anchor each glyph to the slot's left edge so neither the slot nor the glyph's left edge ever moves.

### `src/scramble.ts`
In `scrambleElement`, after `el.innerHTML = html` and building `spans`:
1. Collect candidates: `CHARSET ∪ targets`.
2. Measure each candidate's rendered advance width in the element's computed font via a hidden temp span (`display: inline-block`, `visibility: hidden`, `whiteSpace: pre`, computed font props copied from `el`), take `maxCharWidth`. Guard: if `maxCharWidth` is 0/NaN, fall back to `1ch` measured via a temp span so slots never collapse to zero width.
3. Apply `width: maxCharWidth + "px"` + `overflow: hidden` to every `.scramble-char` span (batched writes after reads).
4. Completion unchanged: `el.innerHTML = originalHTML` then remove `aria-hidden` (final text renders exactly like source; spans removed).

### `src/scramble.css`
```css
.scramble-char {
  display: inline-block;
  overflow: hidden;
  text-align: left;
}
```
(Remove `min-width: 1ch`; width is set per-element by JS; left-align anchors each glyph's left edge to its slot's left edge.)

## Serving / validation note
The Vite dev server fell back to **port 5175** because 5174 was occupied by an old instance running stale code. To verify the fix, open **http://localhost:5175/** (or kill the process on 5174 and restart `npm run dev -- --port 5174`). The fix is in source, so Vite serves it live — no rebuild needed for dev.

## Unchanged (keep)
- IntersectionObserver trigger (`threshold: 0`, `rootMargin: "0px 0px -8% 0%"`), per-element ~110ms delay, per-char ~25ms stagger, rising lock probability (~1s guaranteed), re-trigger on re-entry, `prefers-reduced-motion` instant render, cleanup on unmount, `aria-hidden` during shuffle, no new deps.

## Validation
- `npm run build` (`tsc -b && vite build`) passes with no TS errors.
- Open http://localhost:5175/; scroll to Fabre/Jaunes/Devis/Indy: each slot stays at a fixed horizontal position while glyphs cycle; no character drifts left/right; each locks to exact source text.
- Scroll away and back → effect re-runs.
- Final DOM text equals source text; no console errors.
- `prefers-reduced-motion: reduce` → text appears instantly, no shuffling.

## Open questions
None — implementation-ready.
