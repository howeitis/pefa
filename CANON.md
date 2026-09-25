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

| Id                     | Added      | Status            | New facts                                                                                                                                                                                                                                                                                                                                                       | Where                                                       |
| ---------------------- | ---------- | ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------- |
| `pefa-mark`            | 2026-09-25 | proposed-for-game | PEFA's emblem is a pitch drawn as a chart, with a gold trend line climbing out of the frame. Wordmark in a high-contrast serif; the Superior League keeps its knot mark                                                                                                                                                                                         | Header, favicon, OG cards                                   |
| `website-launch`       | 2026-09-25 | site-only         | PEFA launched its corporate website on 1 July 2036. Transparency is one of the five stated objectives, and one of the two that are not redacted                                                                                                                                                                                                                 | `/newsroom/corporate-website-launch`                        |
| `venue-spec`           | 2026-09-25 | proposed-for-game | Every venue holds the pitch at 19°C under a closed roof. Prices track demand, form and the opponent's TokTok following. In-seat displays tuned per occupant; chants composed live and cleared for rights. Seats pulse on shots, tackles and price movements; financial wellness content at half-time                                                            | `/superior-venue`                                           |
| `partner-roles`        | 2026-09-25 | proposed-for-game | Microsack's audio calibration raises under-attended atmosphere and lowers off-message crowds; it also supports the Synthetic Away End. Clawed AI shares opposition modeling with all clubs equally, at tiered rates. ChatGDP issues statements within four seconds of the whistle and generates supporter reaction before the result                            | `/technology`                                               |
| `commercial`           | 2026-09-25 | site-only         | TokTok is the league's official short-form platform. The trophy is also a subscription tier. PEFA calls the Clawed AI Cup heritage content. House inventory includes naming rights to the Brand Damage zone and a presenting partnership for the Second Ball                                                                                                    | `/superior-league`, `/partners`                             |
| `owner-renames`        | 2026-09-25 | proposed-for-game | Club owner lines renamed so no real company or fund is named; see Game follow-ups below                                                                                                                                                                                                                                                                         | `/superior-league/clubs/*`                                  |
| `governance-procedure` | 2026-09-25 | proposed-for-game | Decree register numbers D-01 to D-32 in game order. Compliance officers keep instructions in line with commercial obligations. Clawed AI reviews appeals against its own offside rulings. Committee minutes will be filed; reasoning will not. PEFA uses "football" under licence from itself                                                                   | `/governance`                                               |
| `corporate-record`     | 2026-09-25 | site-only         | Infamtino has been President since incorporation; seat Luxembourg. Document refs MK-2035, IR-2036, GOV-2036, LDR-2036, LGL-2036. PEFA's privacy line: it has collected no data, and that is "a limitation, and it is under review"                                                                                                                              | `/investors`, `/leadership`, `/legal`                       |
| `president-letter`     | 2026-09-25 | proposed-for-game | Infamtino's letter to partners: football "was never about uncertainty. It was about belonging. And belonging, properly structured, is recurring." His word is "as ever, non-binding"                                                                                                                                                                            | `/`, `/leadership#letter`, `/investors/annual-report`       |
| `president-bio`        | 2026-09-25 | site-only         | Reorganised a regional lottery (2012), a hotel group (2017) and a national orchestra (2022). Joined the GBRC advisory board in 2033; calls the nine days to incorporation "a transition". No favourite club: fifteen, plus five each summer                                                                                                                     | `/leadership#president`                                     |
| `board`                | 2026-09-25 | proposed-for-game | Voss-Aldridge (Chief Inevitability Officer), Thornbury (CFO), Kallend (Chief Engagement Officer), Kvist (General Counsel), Marchetti-Brandt (Chief Supporter Tolerance Officer), Wierzba (Director, Superior Venue™), Adeyemi-Clarke (Chair, Global Inclusion Committee; bio redacted). Broadcast partner: non-voting, decisive observer. Supporter seat vacant | `/leadership#board`                                         |
| `annual-report`        | 2026-09-25 | proposed-for-game | Period 14 May 2035 to 30 June 2036, published 28 August 2036. Objectives in order: [redacted], Transparency, [redacted], Certainty, [redacted] (the redacted text is readable by screen readers). Supporter Tolerance Index 112 vs target 100. Revenue guaranteed; variance nil                                                                                 | `/investors/annual-report`                                  |
| `press-releases`       | 2026-09-25 | site-only         | Dated releases from incorporation (14 May 2035) to the Annual Report (28 August 2036); see the newsroom. The 2036 draw result is never named                                                                                                                                                                                                                    | `/newsroom`                                                 |
| `committee-minutes`    | 2026-09-25 | site-only         | Spring 2036 session, 12 March 2036 (redacted), forty-one draft applications reviewed. The office coffee machine became a subscription; the machine was not consulted                                                                                                                                                                                            | `/governance/committee-minutes`                             |
| `careers-support`      | 2026-09-25 | site-only         | Roles: Compliance Officer (Technical Area), Chant Designer (AI-assisted), Supporter Tolerance Analyst, Heritage Content Archivist; featured role Manager. ChatGDP writes Supporter Services replies. Cancellation is a premium feature                                                                                                                          | `/careers`, `/support`                                      |
| `draft-weighting`      | 2026-09-25 | proposed-for-game | Indicative weighting: tier 50%, market size 30%, broadcast window 20%, footballing success 0%. Tiers Bronze to Sovereign; every result recommends the next tier. European applicants are forwarded to the founders                                                                                                                                              | `/synergy-draft#eligibility`                                |
| `market-board`         | 2026-09-25 | site-only         | The in-world calendar runs ten years ahead of the real one. Indicative quotes drift within ±12% of listing, the same for everyone on a given day                                                                                                                                                                                                                | `/investors#board`                                          |
| `disclosure`           | 2026-09-25 | site-only         | Requesting disclosure makes a document more redacted; further requests are processed at a higher tier                                                                                                                                                                                                                                                           | `/investors/annual-report`, `/governance/committee-minutes` |

## Game follow-ups

Things the site does differently from the game that the game should revisit, via its own web-first
content drop. The site never edits the game repos.

### `owner-renames`: real names in club owner lines (open)

`src/data/clubLore.ts` in the game names real companies and funds as club owners, which breaks
the game's own "no real marks" rule. The site overrides them at build time
(`src/canon/site/clubOverrides.ts` via `vite.canon-overrides.ts`), and the canon test fails if any
original name reaches the site or its build output. Proposed replacements:

| Club                      | Game text (real name)                                 | Site replacement                                         |
| ------------------------- | ----------------------------------------------------- | -------------------------------------------------------- |
| `armory`                  | Kroenkecorp Legacy Trust                              | The Silent Partner Legacy Trust                          |
| `boston-reds`             | Fenway Transatlantic Sporting Group                   | Back Bay Transatlantic Sporting Group                    |
| `citizens`, `ny-citizens` | City Football Multiverse                              | Citizens Football Multiverse                             |
| `white-hart-loan`         | ENIC Structured Finance; "NFL fixtures" (risk factor) | Lilywhite Structured Finance; "gridiron fixtures"        |
| `almostico`               | Quantum Pacific Sport                                 | Perpetual Runner-Up Holdings                             |
| `milano-runway`           | RedBird Fashion Capital                               | Catwalk Capital Partners                                 |
| `debito`                  | Oaktree                                               | A distressed-debt fund                                   |
| `piemonte`                | Agnelli family office / Exor Sporting Assets          | The family (Turin) / Dynastic Sporting Assets N.V.       |
| `saint-sovereign`         | Qatar Sports Investments                              | Sovereign Sports Investments                             |
| `bavarian-monopoly`       | Audi, Adidas, Allianz                                 | a carmaker, a bootmaker, an insurer, and another insurer |
| `borussia-export`         | Signal Iduna                                          | a regional insurer with the naming rights                |
| `retirement-fund`         | Ares Sporting Legacy Fund II                          | Olympus Sporting Legacy Fund II                          |
| `al-zaeem`, `al-alami`    | The Public Investment Fund                            | The Sovereign Wealth Fund                                |
