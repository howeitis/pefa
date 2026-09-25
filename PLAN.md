# PEFA™ Site — Build Plan

*Private Equity Football Accelerate™ — the corporate web presence of the organisation that owns
the Superior League, written entirely in character, with a clearly-marked route into the game.*

Drafted 2026-09-25. Decisions taken with the owner:

| Decision | Choice |
|---|---|
| Purpose | In-world corporate site **and** a funnel into Superior League 2036 (web + Google Play) |
| Stack | Vite + React + Tailwind (the game's own toolchain) |
| Content | **Expand the canon.** The site is a place to write new lore, not just re-host the prospectus |
| Look | **Both, by section.** Dark "brand" pages for marketing, paper "Filing" pages for documents |

---

## 1. What we are building

PEFA is the villain of the game's world: a Luxembourg-registered fund that dissolved football and
reconstituted it as a subscription product. Its website should be the site PEFA would actually
commission — confident, glossy, investor-first — where every page is sincere in tone and the joke
lives in the gap between what is said and what is meant. The game's design doc names this gap:
*the league writes itself as a financial instrument and sells itself as a football club.*

The site has two readers:

1. **The in-world reader**, who sees a governing body's corporate site: brand story, the
   Superior League, the Synergy Draft™, investor relations, governance, press.
2. **The real visitor**, who needs to know within one screen that this is satire about a game,
   and to find the "play" button. Every real call to action is visually **out of character**.

### Satire guardrails (carried over from the game)

- **No real marks.** The game invents every club and league name so it never uses anybody's
  trademarks. The site does the same. See §7 for assets that break this rule today.
- **Aim the satire at the breakaway, not at the clubs that stayed behind.** Domestic clubs are
  written straight.
- **Clearly fiction, on every page.** A persistent footer notice reads: *PEFA™, the Superior
  League and everyone named here are fictional. This site is a satirical companion to Superior
  League 2036.* A parody
  of a real governing body must never be mistakable for one.
- **No personal data collection disguised as satire.** In-world forms (Draft application, FOI
  request, "Supporter Feedback") compute a result client-side and send nothing. If analytics are
  added, they are cookieless (Vercel Web Analytics) so no consent banner is needed. A parody
  cookie banner is fine as a joke, but only if the site sets no cookies at all.
- **Advertising honesty** (from `docs/launch/05`): if real sponsor inventory ever appears here,
  it carries a real **Advertisement** label. House content is never presented as real demand.

---

## 2. Canon

Choosing "expand the canon" means the site will introduce new facts, so it needs a rule for what
it can and can't change.

### 2.1 Locked canon (the site must not contradict)

Pulled from `League Lore.md`, `src/data/lore.ts`, `clubLore.ts`, `clubs.ts`, `engine/decrees.ts`,
`balance.ts`, `legacyMarket.ts` and `domesticLeagues.ts` in the web repo:

- **Timeline:** 2033 finding that highlight packages beat live matches at 1/40th the production
  cost → long-form rights collapse within **18 months** → **−69%** viewership → **4 of Europe's 6**
  largest domestic competitions enter administration → Global Broadcast Rights Consortium
  dissolved **5 May 2035** → PEFA incorporated in **Luxembourg, 14 May 2035** (nine days later) →
  emergency working group met in the spring of 2035. Official Media Kit dated 2035.
- **People:** President **Giacomo Infamtino**. Launch address delivered from a data center in
  Dublin: *"We have not taken the game from anyone. We have asked them to subscribe."*
- **Partners:** **Microsack** (Superior Venue™ infrastructure, crowd audio calibration),
  **Clawed AI** (tactical inference, opposition modeling, live player valuation), **ChatGDP**
  (post-match statements, press responses, and the supporter reaction to both).
- **Structure:** 15 permanent, un-relegatable founders, plus 5 Synergy Draft™ berths drawn each
  summer from a pool of 13 global partners, for **20 clubs** in total. The draft is weighted by
  subscription tier, market size, brand compatibility and broadcast reach. The Global Inclusion
  Committee meets twice a year and doesn't publish its reasoning.
- **Filings:** five stated objectives, three of them redacted.
- **Products:** Superior Venue™, Synergy Draft™, Micro-Betting™, Superior League app™, TokTok
  (reach is printed on every asset, because PEFA's media kit requires it).
- **Settlement:** the domestic associations gave up their marks. No legacy club may be named on
  a Superior League surface. PEFA marked the whole competition up **80%** on admission.
- **Governance:** supporter-trust "litigation" is not recognised. The word "football" is under
  trademark review. Compliance officers stand in technical areas.
- **The 28 clubs:** tickers, exchanges, owners, positioning lines, histories and risk factors, as
  listed in `clubLore.ts`. The 32 league decrees, as listed in `decrees.ts`.

### 2.2 How canon is stored in the site

```
src/canon/
  game/        GENERATED by scripts/import-game-canon.mjs from the web repo (read-only source).
               lore.json, clubs.json, clubLore.json, decrees.json, domesticLeagues.json
               + checksum.json. Never hand-edited.
  site/        Site-authored lore. Each entry carries  status: 'site-only' | 'proposed-for-game'.
CANON.md       The locked-facts list above, plus a running log of every new fact the site adds.
```

- The import script **only reads** the web repo (`../Superior League 2036/Howe to Manage`). It
  never writes there.
- A Vitest "canon lint" test checks that site-authored copy doesn't redefine locked numbers
  (dates, 15/13/5/20, −69%, 80%) and that every club slug the site uses exists in `game/`.
- **Site lore stays site only.** Entries that could later join the game are tagged
  `proposed-for-game` and listed in `CANON.md`. If one is ever adopted, it follows the game's own
  protocol: web first, then regenerate `lore.json`, then port to Android. The site never edits
  game repos.

### 2.3 New canon to write (first pass)

| Piece | Where it appears | Notes |
|---|---|---|
| **Letter from the President** | Home and About | Infamtino's voice: warm, visionary, unaccountable |
| **Giacomo Infamtino: biography** | Leadership | Career told as a series of "reorganisations" |
| **Leadership & Board** | Leadership | 6–8 invented executives with titles like *Chief Inevitability Officer*. No real people |
| **Annual Report 2035/36** | Investor Relations | Objectives 1–5, with 3 redacted. KPIs: "Supporter Tolerance Index", revenue that is "guaranteed irrespective of results" |
| **Press releases** (8–12) | Newsroom | e.g. *Synergy Draft™ 2036 berths confirmed*, *A clarification on the word "football"*, *PEFA notes supporter-trust proceedings (not material)*, *Welcoming Clawed AI as Official Referee Partner* |
| **Global Inclusion Committee: minutes** | Governance | Almost entirely redacted, with a legible "Any other business" |
| **Decree register** | Governance | The 32 decrees from `decrees.ts`, presented as regulations with effective dates |
| **Superior Venue™ spec sheet** | Superior Venue™ | Expands the nine venue bullets into product copy |
| **Careers** | Careers | Open roles: Compliance Officer (Technical Area), Chant Designer (AI-assisted), **Manager**, which links out to the game |
| **Partners** | Partners | *"PEFA thanks its partners for their continued ownership of this moment."* Holds house content for future sponsor slots |
| **FAQ / Supporter Services** | Support | *"Has my club been relegated?" "No. It was not invited."* |
| **Legal & Disclaimers** | Footer | In-world legalese plus the real fiction and game disclosure |

---

## 3. Site map and materials

Every route declares a **material**. The root layout sets `data-material` on `<body>`, which
switches the token set, so each page is fully one material or fully the other.

| Route | Material | Content |
|---|---|---|
| `/` | Floodlight | Hero ("Football did not die. It was algorithmically optimized."), the three pillars, stamped stats, the president's letter excerpt, CTA band |
| `/superior-league` | Floodlight | The competition: 15 founder crests, the 13-club draft pool, "Results remain unscripted. Revenue does not." |
| `/superior-league/clubs/:slug` | Filing | 28 listing pages from `clubLore`: ticker, valuation, owner, history, risk factor, TokTok reach |
| `/synergy-draft` | Floodlight | How the draft works, plus the **eligibility calculator** (§5) |
| `/superior-venue` | Floodlight | Venue product page |
| `/technology` | Floodlight | Microsack / Clawed AI / ChatGDP partner panels |
| `/investors` | Filing | IR hub: the **prospectus** (full `lore.ts` text), annual report, share-price board for all 28 clubs |
| `/investors/prospectus` | Filing | The Official Media Kit, 2035, as a paper document |
| `/governance` | Filing | Committee, decree register, litigation stance, trademark review |
| `/leadership` | Filing | President and board |
| `/newsroom` + `/newsroom/:slug` | Filing | Press releases (MDX) |
| `/careers` | Floodlight | Roles. "Manager" is the main out-of-character CTA |
| `/partners` | Floodlight | Partner wall and house inventory |
| `/support` | Filing | FAQ, and a Supporter Feedback form that goes nowhere, on purpose |
| `/legal` | Filing | Disclaimers, fiction notice, credits and licences |
| `/play` | Out of character | The plain real page: what the game is, links to web and Google Play, screenshots |

### Materials

- **Floodlight** (dark brand pages): midnight navy ground `#0B0F19`, surfaces `#121826 /
  #1A2234`, parchment ink `#F6F4EE`, gold `#E5B842`. Big display serif, generous negative space,
  slow parallax, stadium-light gradients. It should feel like a keynote.
- **Filing** (paper documents): paper `#EDE9E2`, card `#FFFFFF`, ink `#14171C / #4E5561`, league
  navy `#0F1E36`, foil `#B45309`. Hairline ledger rules, letterspaced small caps, tabular figures,
  redaction bars, footnotes and asterisks.
- **Type:** Playfair Display (display) and DM Sans (body), the game's pair, so the site reads as
  the same world. Tabular-nums everywhere a figure appears.
- **Out-of-character strip:** a visually distinct band (a plain system-font sans on a flat colour
  that belongs to neither material) used only for real CTAs and the fiction notice, so the reader
  always knows when they're being addressed out of character.

---

## 4. Stack and structure

- **Vite + React 19 + TypeScript (strict)**, matching the game's web repo.
- **React Router v7 in framework mode with `prerender`.** Every route builds to static HTML, so
  pages are crawlable, OG cards work and first paint is fast, while the interactive pieces
  hydrate as React. The 28 club pages and the press releases are enumerated at build time.
- **Tailwind CSS v4** with CSS-variable tokens, one set per material. No `slm-` prefix: the site
  is standalone and isn't embedded in the game.
- **MDX** for press releases and long documents, with frontmatter (`date`, `status`, `redactions`).
- **Motion:** CSS plus a little `motion` (Framer). Everything respects `prefers-reduced-motion`.
- **Tooling:** ESLint (strict, zero warnings), Prettier, Vitest (canon lint and component
  logic), Playwright smoke tests with axe accessibility checks on every route.
- **Hosting:** a new Vercel project, separate from `superior-league-2036`. Pushing to `main`
  deploys.

```
PEFA Site/
  PLAN.md  CANON.md  README.md
  public/                     (curated; see §7)
  scripts/import-game-canon.mjs
  src/
    canon/game/  canon/site/
    content/newsroom/*.mdx  content/documents/*.mdx
    components/
      floodlight/   Hero, PillarRow, StampedStat, CrestConstellation, PartnerPanel
      filing/       FilingCard, LedgerTable, RedactionBar, Footnote, PullQuote, Stamp
      shared/       SiteHeader, SiteFooter, LegalTicker, OocStrip, ClubCrest, ShareQuote
    routes/  root.tsx  (sets data-material)
    styles/tokens.css
  tests/  canon.test.ts  e2e/*.spec.ts
```

---

## 5. Interactive pieces

Each piece earns its place as a joke you *do*, not just one you read. None of them send data.

1. **Synergy Draft™ eligibility calculator.** Pick a region, market size, subscription tier and
   "previous footballing success (where relevant)". It returns a weighted score, a verdict ("Your
   region is not excluded. It is simply less included.") and a suggested upgrade tier. The
   weighting reads as deterministic and pay-to-win, and the footballing-success slider visibly
   does nothing.
2. **Share-price board.** The 28 club tickers, with list prices from `clubLore`. Prices drift
   deterministically, seeded by date, so everyone sees the same board on the same day and there's
   no backend. The game's own live-quote helper is a function of league position, which the site
   doesn't have, so the drift is labelled "indicative".
3. **Redaction.** Redaction bars follow the game's accessibility rule: the redacted value stays in
   the DOM, so screen readers read the joke. A "Request disclosure" button returns a *more*
   redacted copy.
4. **Legal ticker.** The game's `INTRO_TICKER` marquee along the footer. It pauses on hover and
   under reduced motion.
5. **Founders / draft constellation** on the league page: 15 fixed crests and 13 pool crests, 5
   of which light up. As in the game's intro reel, this is a promo and never implies a result.

---

## 6. Build phases

Each phase ends with a deployable site and a review pass in the browser at desktop and 375px.

| Phase | Scope | Done when |
|---|---|---|
| **0. Foundations** | `git init`, scaffold (Vite, RR7 prerender, Tailwind v4, MDX, lint/test), canon import script, `CANON.md`, both material token sets, header, footer, fiction notice, `/play` | Empty routes prerender, both materials render, canon test passes |
| **1. Brand (Floodlight)** | Home, Superior League, Superior Venue™, Technology, Partners | The core pitch reads end to end on mobile and desktop |
| **2. The Filing** | Prospectus, Investors hub, 28 club listing pages, Governance and decree register, Leadership, Legal | Every locked-canon document is on the site |
| **3. New canon** | President's letter, bio, board, annual report, 8–12 press releases, committee minutes, careers, FAQ | `CANON.md` logs each new fact, with status |
| **4. Interactions** | Draft calculator, share board, redaction and disclosure, crest constellation | Works with the keyboard and under reduced motion. Nothing is sent over the network |
| **5. Polish & launch** | OG images per route, favicon and manifest for PEFA, sitemap, axe clean, Lighthouse ≥ 95, copy edit, Vercel project and domain | Live URL shared |

---

## 7. Asset audit of `public/`

The folder is a copy of the game's `public/`. What to keep and what to change:

| Asset | Verdict |
|---|---|
| `brand-logo*`, `brand-emblem*`, `brand-text*`, `league-wordmark*` | **Keep.** These are the *Superior League* marks, PEFA's product. **PEFA itself has no mark yet**; I design one in Phase 0 (§8) |
| `club-crests/*` (28) | **Keep.** These are the invented clubs |
| `trophies/*` | **Keep** |
| `national flags/*` | **Keep, but rename to `flags/`** (no spaces in URLs). Country flags aren't trademarks |
| `National team logos/*` (69 SVGs from football-logos.cc) | **Do not ship.** These are real federation crests: real marks, which the game deliberately avoids. Remove them, or keep them out of the build |
| `hero.webp` | **Don't use as-is.** It shows a Nike swoosh on the manager's coat and a Hyundai hoarding. Crop, repaint, or commission new art |
| `og-image.jpg`, `favicon.png`, `icons/*`, `manifest.webmanifest` | **Replace** with PEFA versions. They currently identify the game (`"name": "Superior League 2036"`) |

---

## 8. Decisions and open questions

Decided 2026-09-25:

- **The PEFA mark: I'll design it**, as a typographic PEFA™ wordmark plus an emblem in SVG, with
  on-light and on-dark variants, a favicon and app icons. It's the first task of Phase 0, because
  the header, OG images and manifest all depend on it.
- **URL:** `pefa.vercel.app` (Vercel projects live on `*.vercel.app`; `vercel.com` is Vercel's own
  site). If `pefa` is taken, fall back to `pefa-site.vercel.app`.
- **Name:** the project, repo and Vercel project are all called **pefa-site**.
- **Play CTA:** link to **joining the Android closed test**, labelled out of character
  ("Android only · closed test"). If testers are added through a Google Group, joining takes two
  steps: join the group, then open the Play opt-in link. `/play` walks through both. The
  closed-test risk note still applies: no screenshots that haven't cleared the rights review.

- **Canon flow-back:** site lore stays **site only** for now. Pieces that could later join the
  game are tagged `proposed-for-game` and listed in `CANON.md`. Nothing moves into the game
  without a separate, web-first content drop.
- **Fiction notice** (footer of every page, exact wording, no name or link):
  *PEFA™, the Superior League and everyone named here are fictional. This site is a satirical
  companion to Superior League 2036.*

Still open:

- **Tester links:** the Google Group join URL and the Play opt-in URL, once the closed-test track
  is live. Until then, `/play` shows placeholders.
