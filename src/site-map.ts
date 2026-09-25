/**
 * The site map, in one place: every route's path, title, material and nav
 * placement. `routes.ts` builds the router from it, the root layout reads
 * the material from it, and `react-router.config.ts` prerenders from it.
 *
 * Materials (PLAN.md §3):
 * - `floodlight` — the dark brand pages. Keynote energy.
 * - `filing`     — the paper documents. Ledgers, footnotes, redactions.
 * - `ooc`        — out of character. Plain, flat, addressed to the real visitor.
 */
import clubsCanon from './canon/game/clubs.json' with { type: 'json' };

export type Material = 'floodlight' | 'filing' | 'ooc';

export interface SitePage {
  path: string;
  /** In-world page title (without the " · PEFA™" suffix). */
  title: string;
  /** Meta description. In character unless the page is `ooc`. */
  description: string;
  material: Material;
  /** Where the page is linked from. Pages with no nav are still prerendered. */
  nav?: 'primary' | 'secondary';
  /** Short label for nav, when the title is too long. */
  label?: string;
}

export const PAGES: SitePage[] = [
  {
    path: '/',
    title: 'Private Equity Football Accelerate™',
    description:
      'Football did not die. It was algorithmically optimized. PEFA™ is the owner and operator of the Superior League.',
    material: 'floodlight',
  },
  {
    path: '/superior-league',
    title: 'The Superior League',
    label: 'Superior League',
    description:
      'Fifteen permanent founders. Five Synergy Draft™ berths. Results remain unscripted. Revenue does not.',
    material: 'floodlight',
    nav: 'primary',
  },
  {
    path: '/synergy-draft',
    title: 'Synergy Draft™',
    description:
      'Five berths, redrawn every summer, weighted by subscription tier, market size, brand compatibility and broadcast reach.',
    material: 'floodlight',
    nav: 'primary',
  },
  {
    path: '/superior-venue',
    title: 'Superior Venue™',
    description:
      'The football stadium, replaced. Climate-controlled, dynamically priced, and generating value throughout.',
    material: 'floodlight',
    nav: 'primary',
  },
  {
    path: '/technology',
    title: 'Technology Partners',
    label: 'Technology',
    description: 'Microsack, Clawed AI and ChatGDP. The match is supervised.',
    material: 'floodlight',
    nav: 'primary',
  },
  {
    path: '/investors',
    title: 'Investor Relations',
    label: 'Investors',
    description:
      'Filings, the Official Media Kit, the Annual Report and an indicative board of all twenty-eight listed clubs.',
    material: 'filing',
    nav: 'primary',
  },
  {
    path: '/investors/prospectus',
    title: 'The Superior League — Official Media Kit, 2035',
    label: 'Prospectus',
    description: 'Confidential. Not for distribution.',
    material: 'filing',
  },
  {
    path: '/investors/annual-report',
    title: 'Annual Report 2035/36',
    label: 'Annual Report',
    description:
      'Objectives, key performance indicators and the Supporter Tolerance Index for PEFA’s first financial year.',
    material: 'filing',
  },
  {
    path: '/governance',
    title: 'Governance',
    description:
      'The Global Inclusion Committee, the decree register, and PEFA’s position on legacy supporter-trust “litigation”.',
    material: 'filing',
    nav: 'primary',
  },
  {
    path: '/governance/committee-minutes',
    title: 'Global Inclusion Committee: Minutes',
    label: 'Committee minutes',
    description: 'Minutes of the spring session. The Committee does not publish its reasoning.',
    material: 'filing',
  },
  {
    path: '/leadership',
    title: 'Leadership',
    description: 'President Giacomo Infamtino and the Board of PEFA™.',
    material: 'filing',
    nav: 'secondary',
  },
  {
    path: '/newsroom',
    title: 'Newsroom',
    description: 'Statements, clarifications and announcements from PEFA™.',
    material: 'filing',
    nav: 'primary',
  },
  {
    path: '/careers',
    title: 'Careers',
    description: 'Join the team that removed sporting merit from football.',
    material: 'floodlight',
    nav: 'secondary',
  },
  {
    path: '/partners',
    title: 'Partners',
    description: 'PEFA thanks its partners for their continued ownership of this moment.',
    material: 'floodlight',
    nav: 'secondary',
  },
  {
    path: '/support',
    title: 'Supporter Services',
    label: 'Support',
    description: 'Has my club been relegated? No. It was not invited.',
    material: 'filing',
    nav: 'secondary',
  },
  {
    path: '/legal',
    title: 'Legal & Disclaimers',
    label: 'Legal',
    description:
      'Disclaimers, the fiction notice, credits and licences. PEFA™ and the Superior League are fictional.',
    material: 'filing',
    nav: 'secondary',
  },
  {
    path: '/play',
    title: 'Play Superior League 2036',
    label: 'Play the game',
    description:
      'This site is a satirical companion to Superior League 2036, a football management game. Here is how to play it.',
    material: 'ooc',
  },
];

/** Club listing pages: one per club in the game's 28-club universe. */
export const CLUB_PATH = (slug: string) => `/superior-league/clubs/${slug}`;
export const clubSlugs = (): string[] => clubsCanon.clubs.map((c) => c.id);

/** Newsroom posts are MDX files; their slugs are passed in by the caller. */
export const NEWS_PATH = (slug: string) => `/newsroom/${slug}`;

export function pageFor(pathname: string): SitePage | undefined {
  const clean = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname;
  return PAGES.find((p) => p.path === clean);
}

/** The material a pathname renders in. Dynamic routes inherit from their section. */
export function materialFor(pathname: string): Material {
  const page = pageFor(pathname);
  if (page) return page.material;
  if (pathname.startsWith('/superior-league/clubs/')) return 'filing';
  if (pathname.startsWith('/newsroom/')) return 'filing';
  return 'filing';
}

export function prerenderPaths(newsSlugs: string[] = []): string[] {
  return [...PAGES.map((p) => p.path), ...clubSlugs().map(CLUB_PATH), ...newsSlugs.map(NEWS_PATH)];
}
