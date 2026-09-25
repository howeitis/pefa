/**
 * Site-side overrides to the game's club lore.
 *
 * The game's `clubLore.ts` names some real companies and funds as club owners.
 * That breaks the "no real marks" rule (PLAN.md §1), and on a page styled as
 * an investor filing the names read as claims. The site replaces them with
 * invented names that keep each line's joke. The imported canon in
 * `src/canon/game/` is untouched; these are applied on top of it.
 *
 * GAME FOLLOW-UP: the same names are still in the game. Logged in CANON.md
 * under "Game follow-ups" (`owner-renames`) for a web-first content drop.
 */
import type { ClubLore } from '../index.ts';

type Override = Partial<Pick<ClubLore, 'owner' | 'riskFactor'>>;

export const CLUB_LORE_OVERRIDES: Record<string, Override> = {
  armory: { owner: 'Armory Group Holdings (Delaware) / The Silent Partner Legacy Trust' },
  'boston-reds': { owner: 'Back Bay Transatlantic Sporting Group' },
  citizens: { owner: 'Citizens Football Multiverse (a subsidiary of a subsidiary)' },
  'white-hart-loan': {
    owner: 'Lilywhite Structured Finance / stadium creditors (jointly)',
    riskFactor: 'Revenue is concentrated in gridiron fixtures, concerts, and the cheese room.',
  },
  almostico: {
    owner: 'Almostico Supporters’ Society (11%) / Perpetual Runner-Up Holdings (89%)',
  },
  'milano-runway': { owner: 'Catwalk Capital Partners / a Luxembourg vehicle nobody has met' },
  debito: { owner: 'A distressed-debt fund (involuntarily) and whoever refinances next' },
  piemonte: { owner: 'The family (Turin) / Dynastic Sporting Assets N.V.' },
  'saint-sovereign': { owner: 'Sovereign Sports Investments (Sovereign Division)' },
  'bavarian-monopoly': {
    owner: 'Members (50%+1), a carmaker, a bootmaker, an insurer, and another insurer',
  },
  'borussia-export': {
    owner: 'Public float (a real one, unusually) / a regional insurer with the naming rights',
  },
  'retirement-fund': { owner: 'Olympus Sporting Legacy Fund II / celebrity limited partners' },
  'ny-citizens': {
    owner: 'Citizens Football Multiverse (see also: Manchester, Melbourne, Mumbai)',
  },
  'al-zaeem': { owner: 'The Sovereign Wealth Fund (75%) / heritage supporters’ trust (25%)' },
  'al-alami': { owner: 'The Sovereign Wealth Fund (75%) / see above' },
};

/**
 * Real names the site must never show, from the game's lore. The canon test
 * fails if any of them appears in the club lore the site renders or in site
 * source. Remove an entry only if the game drops it too.
 */
export const BANNED_REAL_NAMES = [
  'Kroenke',
  'Kroenkecorp',
  'Fenway',
  'City Football Group',
  'City Football Multiverse',
  'ENIC',
  'NFL',
  'Quantum Pacific',
  'RedBird',
  'Oaktree',
  'Agnelli',
  'Exor',
  'Qatar Sports Investments',
  'Audi',
  'Adidas',
  'Allianz',
  'Signal Iduna',
  'Ares Sporting',
  'Public Investment Fund',
];
