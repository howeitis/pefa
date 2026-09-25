/**
 * Site-authored canon: facts this site adds to the world that the game does
 * not state. Every entry is also logged in CANON.md.
 *
 * - `site-only`         lives here and nowhere else.
 * - `proposed-for-game` could join the game later, via the game's own
 *                        web-first content drop. The site never edits the game.
 */
export type CanonStatus = 'site-only' | 'proposed-for-game';

export interface SiteCanonEntry {
  id: string;
  title: string;
  status: CanonStatus;
  /** The new facts, one per line, as they'd be stated in CANON.md. */
  facts: string[];
  /** Where on the site the facts appear. */
  surfaces: string[];
}

export const SITE_CANON: SiteCanonEntry[] = [
  {
    id: 'pefa-mark',
    title: 'The PEFA™ mark',
    status: 'proposed-for-game',
    facts: [
      'PEFA’s emblem is a football pitch drawn as a chart: a plain pitch outline with a gold trend line climbing through the centre circle and out of the frame.',
      'The PEFA™ wordmark is set in a high-contrast serif; the Superior League keeps its own knot mark as PEFA’s product.',
    ],
    surfaces: ['Header', 'Favicon', 'OG cards'],
  },
  {
    id: 'website-launch',
    title: 'PEFA™ corporate website',
    status: 'site-only',
    facts: [
      'PEFA™ launched its corporate website on 1 July 2036, ahead of the 2036 season.',
      'Transparency is one of PEFA’s five stated objectives, and one of the two that are not redacted.',
    ],
    surfaces: ['/newsroom/corporate-website-launch'],
  },
];
