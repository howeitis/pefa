# pefa-site

The corporate website of PEFA™ (Private Equity Football Accelerate™), the fictional owner of the
Superior League. The whole site is written in character, as a satirical companion to
[Superior League 2036](https://superior-league-2036.vercel.app/). See `PLAN.md` for the build plan
and `CANON.md` for the lore rules.

## Commands

| Command                | What it does                                                                      |
| ---------------------- | --------------------------------------------------------------------------------- |
| `npm run dev`          | Dev server on :5173                                                               |
| `npm run build`        | Prerenders every route to static HTML in `build/client`, plus `404.html`          |
| `npm run preview`      | Serves the build on :4173, the way a static host would                            |
| `npm run typecheck`    | Route typegen + `tsc`                                                             |
| `npm run lint`         | ESLint, zero warnings allowed                                                     |
| `npm test`             | Vitest: canon lint (see below)                                                    |
| `npm run test:e2e`     | Playwright against the build: every route, desktop + 375px, axe, no requests      |
| `npm run canon:import` | Re-imports locked canon from `../Superior League 2036/Howe to Manage` (read-only) |
| `npm run brand`        | Regenerates the PEFA™ mark, favicon, app icons, manifest and default OG image     |

## Layout

- `src/site-map.ts` is the single source for routes: path, title, **material** and nav placement.
  The root layout sets `data-material` on `<body>` from it, and the prerender list comes from it.
- `src/styles/tokens.css` defines the three materials: `floodlight` (dark brand pages), `filing`
  (paper documents) and `ooc` (out of character, `/play` only). Utilities such as
  `bg-ground text-ink` resolve per material.
- `src/canon/game/` is generated. Don't edit it: the canon test checks it against its checksums.
  Site-authored lore goes in `src/canon/site/` and gets a row in `CANON.md`.
- `src/content/newsroom/*.mdx` are press releases, with frontmatter.
- `src/play-links.ts` holds the real, out-of-character links. The two Android closed-test URLs are
  still `null`, so `/play` shows placeholders until they are filled in.
- `_excluded/` (gitignored) holds assets that must not ship: real federation crests, the game's
  hero art (it shows real brands) and the game's own icons.

## Rules

- Anything addressed to the real visitor wears the `.ooc` style. The fiction notice is in every
  page's footer, in its exact wording.
- Nothing is sent anywhere. No cookies, no font CDN (fonts are self-hosted), no form submissions.
  The e2e suite fails if a page makes a request off the site or sets a cookie.
- No real marks, and the satire is aimed at the breakaway, not at the clubs that stayed behind.
