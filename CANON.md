# PEFA™ Site — Canon

The site is allowed to **expand** the world of Superior League 2036. It is not allowed to
**contradict** it. This file is the rulebook for both halves.

- **Locked canon** comes from the game's web repo and is imported read-only into
  `src/canon/game/` by `npm run canon:import`. Never hand-edit those files; the canon test checks
  them against `checksum.json`.
- **Site canon** is written here and lives in `src/canon/site/`. Every new fact the site states
  gets a row in the log below, and the canon test fails if an entry in `src/canon/site/index.ts`
  has no row here.

## Locked facts

Source: `League Lore.md`, `src/data/lore.ts`, `clubLore.ts`, `clubs.ts`, `league.ts`,
`engine/decrees.ts`, `balance.ts`, `legacyMarket.ts` and `domesticLeagues.ts` in
`Superior League 2036/Howe to Manage`. Figures in **bold** are checked by `tests/canon.test.ts`.

| Area       | Fact                                                                                                                                                       |
| ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Timeline   | **2033** finding: highlight packages beat live matches at **1/40th** the production cost                                                                   |
|            | Long-form rights collapse within **18 months**; viewership **−69%**                                                                                        |
|            | **4 of Europe's 6** largest domestic competitions enter administration                                                                                     |
|            | Global Broadcast Rights Consortium dissolved **5 May 2035**                                                                                                |
|            | PEFA incorporated in Luxembourg **14 May 2035**, nine days later                                                                                           |
|            | Emergency working group met in the spring of 2035. Official Media Kit dated 2035                                                                           |
| People     | President **Giacomo Infamtino**. Launch address from a data center in Dublin: _"We have not taken the game from anyone. We have asked them to subscribe."_ |
| Partners   | **Microsack**: Superior Venue™ infrastructure, crowd audio calibration                                                                                     |
|            | **Clawed AI**: tactical inference, opposition modeling, live player valuation. Also title sponsor of the knockout cup (**The Clawed AI Cup**)              |
|            | **ChatGDP**: post-match statements, press responses, and the supporter reaction to both                                                                    |
| Structure  | **15** permanent, un-relegatable founders + **5** Synergy Draft™ berths drawn each summer from **13** global partners = **20** clubs                       |
|            | Draft weighted by subscription tier, market size, brand compatibility and broadcast reach                                                                  |
|            | Global Inclusion Committee meets twice a year and does not publish its reasoning                                                                           |
| Filings    | **Five** stated objectives, **three** redacted                                                                                                             |
| Products   | Superior Venue™, Synergy Draft™, Micro-Betting™, Superior League app™, TokTok                                                                              |
| Settlement | Domestic associations gave up their marks. No legacy club may be named on a Superior League surface (rendered `████████`)                                  |
|            | Economy marked up **80%** on admission (club budgets, valuations and fees)                                                                                 |
| Governance | Supporter-trust "litigation" not recognised, not material. "Football" under trademark review. Compliance officers in technical areas                       |
| Clubs      | The 28 clubs: tickers, exchanges, owners, positioning, histories, risk factors (`clubLore.json`)                                                           |
| Decrees    | The 32 league decrees (`decrees.json`)                                                                                                                     |
| Domestic   | Five domestic leagues carry on; every club in them is invented and written straight                                                                        |

## Site canon log

Status is `site-only` (lives on this site only) or `proposed-for-game` (could join the game via the
game's own web-first content drop; the site never edits the game).

| Id               | Added      | Status            | New facts                                                                                                                                                               | Where                                |
| ---------------- | ---------- | ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------ |
| `pefa-mark`      | 2026-09-25 | proposed-for-game | PEFA's emblem is a pitch drawn as a chart, with a gold trend line climbing out of the frame. Wordmark in a high-contrast serif; the Superior League keeps its knot mark | Header, favicon, OG cards            |
| `website-launch` | 2026-09-25 | site-only         | PEFA launched its corporate website on 1 July 2036. Transparency is one of the five stated objectives, and one of the two that are not redacted                         | `/newsroom/corporate-website-launch` |
