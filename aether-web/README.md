# Aetherium Project

```bash
npm install
npm run dev
```

## Layout

- `src/` — your components, CSS modules and design tokens
- `src/main.tsx` — entry point
- `theme.css`, `tokens.module.css` — variables read from your project

## Notes

- Images still point at Framer's CDN. Re-export with asset localisation,
  or replace the URLs, before relying on this offline.
- `_dump.json` is the raw project tree; the exporter can re-run from it
  without another export.
