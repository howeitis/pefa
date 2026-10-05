# pefa-site

The corporate website of PEFA™ (Private Equity Football Accelerate™), the fictional owner of the
Superior League. The whole site is written in character, as a satirical companion to
[Superior League 2036](https://superior-league-2036.vercel.app/). See `PLAN.md` for the build plan
and `CANON.md` for the lore rules.

## Commands

| Command                | What it does                                                                                                         |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------- |
| `npm run dev`          | Dev server on :5173                                                                                                  |
| `npm run build`        | Generates OG cards, prerenders every route to `build/client`, then writes `404.html`, `sitemap.xml` and `robots.txt` |
| `npm run preview`      | Serves the build on :4173, the way a static host would                                                               |
| `npm run typecheck`    | Route typegen + `tsc`                                                                                                |
| `npm run lint`         | ESLint, zero warnings allowed                                                                                        |
| `npm test`             | Vitest: canon lint (see below)                                                                                       |
| `npm run test:e2e`     | Playwright against the build: every route, desktop + 375px, axe, no requests                                         |
| `npm run canon:import` | Re-imports locked canon from `../Superior League 2036/Howe to Manage` (read-only)                                    |
| `npm run brand`        | Regenerates the PEFA™ mark, favicon, app icons, manifest and default OG image                                        |
| `npm run og`           | Regenerates the per-page OG cards in `public/og/` (gitignored; runs before every build)                              |
| `npm run land`         | Regenerates `src/data/land-dots.json`, the land mask for the home-page globe (committed; rarely needed)              |
| `npm run thumbs`       | Regenerates the crest thumbnails and ledger minis from `public/club-crests/`                                         |

## Layout

- `src/site-map.ts` is the single source for routes: path, title, **material** and nav placement.
  The root layout sets `data-material` on `<body>` from it, and the prerender list comes from it.
- `src/styles/tokens.css` defines the three materials: `floodlight` (dark brand pages), `filing`
  (paper documents) and `ooc` (out of character, `/play` only). Utilities such as
  `bg-ground text-ink` resolve per material.
- `src/canon/game/` is generated. Don't edit it: the canon test checks it against its checksums.
  Site-authored lore goes in `src/canon/site/` and gets a row in `CANON.md`.
- `src/canon/site/clubOverrides.ts` replaces real company names in the game's club lore. The
  overrides are applied at build time (`vite.canon-overrides.ts`), so the originals never ship, and
  the canon test scans the build output for them. See "Game follow-ups" in `CANON.md`.
- `src/content/newsroom/*.mdx` are press releases, with frontmatter.
- `src/play-links.ts` holds the real, out-of-character links. The two Android closed-test URLs are
  still `null`, so `/play` shows placeholders until they are filled in.
- Search: a page's `seoTitle` in `src/site-map.ts` overrides its `<title>` for search results
  without changing its in-world title. `/play` is the search landing page for "football manager
  game" and "soccer simulator" queries, with VideoGame and FAQPage structured data.
  `public/llms.txt` is the out-of-character summary for AI assistants and agents.
- `_excluded/` (gitignored) holds assets that must not ship: real federation crests, the game's
  hero art (it shows real brands) and the game's own icons.

## Motion

The site is built to move, without ever hiding content from someone who can't run it.

- `src/lib/boot.ts` is inlined into `<head>` (`root.tsx`). It marks `<html data-js>` before first
  paint and reveals `.reveal`, `[data-reveal]`, `.split` and `.redacted` elements as they scroll
  in by setting `data-in`. It's started again at the end of `<body>`, so reveals never wait for the
  JavaScript bundle. Elements are only hidden under `[data-js]` with motion allowed, so the
  prerendered HTML and every reduced-motion visitor get the plain page.
- `src/styles/motion.css` holds the reveal vocabulary (`up`, `clip`, `line`, `line-y`, `scale`,
  `draw`, `stamp`, `row`, `fade`), marquees, beams, page transitions and the rest. Text moves or
  unmasks; only decorative pieces fade, because a half-faded word fails contrast.
- `src/components/motion/` has the React pieces: `SplitText` (headings rise word by word;
  `*asterisks*` set gold italic), `CountUp`, `Marquee`, `TickerTape`, `FieldCanvas` (the hero's
  data pitch), `Globe` and the scroll hooks. Canvases are decorative, pause off screen and stand
  still under reduced motion. `FieldCanvas` starts only once the page is idle.
- Internal links pass `viewTransition`, so client navigations wipe between pages.
- Anything that loops sideways carries the `ticker` class, which the overflow test exempts.

## Rules

- Anything addressed to the real visitor wears the `.ooc` style. The fiction notice is in every
  page's footer, in its exact wording.
- Nothing is sent anywhere except cookieless page views to Vercel Web Analytics, which go to the
  site's own `/_vercel/insights` path. No cookies, no font CDN (fonts are self-hosted), no form
  submissions. The e2e suite fails if a page makes a request off the site or sets a cookie.
- No real marks, and the satire is aimed at the breakaway, not at the clubs that stayed behind.
