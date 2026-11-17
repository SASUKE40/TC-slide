# TC-slide

Sprint 1 presentation for the Technical Credit (TC) Detector, built with [Slidev](https://sli.dev) from the [slide-tpl](https://github.com/SASUKE40/slide-tpl) scaffold.

Live deck: https://sasuke40.github.io/TC-slide/

## Run

```bash
pnpm install
pnpm dev        # opens the deck at http://localhost:3030
pnpm build      # static site in dist/
pnpm export     # PDF (needs Playwright Chromium: pnpm exec playwright install chromium)
```

`mise.toml` pins pnpm. Pushes to `main` build the deck and deploy it to GitHub Pages (`.github/workflows/pages.yml`).

## Layout

- `slides.md`: the deck
- `deck.ts`: footer label and the five parts shown on section dividers
- `layouts/`: `cover` and `divider` layouts
- `components/Bar.vue`: horizontal bar for metric comparisons
- `public/images/`: VS Code screenshots from the Sprint 1 feature and regression tests

## Sources

Numbers come from the Sprint 1 pilot in [SASUKE40/technicalcredit](https://github.com/SASUKE40/technicalcredit): `study/sprint-1-results.md` (results), `study/README.md` (pre-registration), and the VS Code feature test report.
