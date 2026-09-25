/**
 * The Synergy Draft™ eligibility assessment. Pure and deterministic: the
 * same answers always give the same score, and nothing leaves the browser.
 *
 * The joke is in the weights. Subscription tier carries half the score,
 * market size and broadcast-window fit carry the rest, and "previous
 * footballing success (where relevant)" is weighted at exactly zero, which
 * the calculator shows rather than hides. Site canon: `draft-weighting`.
 */

export const REGIONS = {
  europe: { label: 'Europe', window: 1 },
  africa: { label: 'Africa', window: 0.9 },
  'middle-east': { label: 'Middle East', window: 0.95 },
  asia: { label: 'Asia', window: 0.7 },
  'south-america': { label: 'South America', window: 0.65 },
  'north-america': { label: 'North America', window: 0.6 },
  oceania: { label: 'Oceania', window: 0.3 },
} as const;

export const MARKETS = {
  village: { label: 'Village', value: 0.1 },
  town: { label: 'Town', value: 0.3 },
  city: { label: 'City', value: 0.55 },
  metropolis: { label: 'Metropolis', value: 0.8 },
  megacity: { label: 'Megacity', value: 1 },
} as const;

export const TIERS = {
  bronze: { label: 'Bronze', value: 0.2 },
  silver: { label: 'Silver', value: 0.4 },
  gold: { label: 'Gold', value: 0.65 },
  platinum: { label: 'Platinum', value: 0.85 },
  sovereign: { label: 'Sovereign', value: 1 },
} as const;

export type Region = keyof typeof REGIONS;
export type Market = keyof typeof MARKETS;
export type Tier = keyof typeof TIERS;

export const WEIGHTS = {
  tier: 0.5,
  market: 0.3,
  window: 0.2,
  /** Where relevant. It is not relevant. */
  success: 0,
} as const;

export interface Application {
  region: Region;
  market: Market;
  tier: Tier;
  /** 0–100. Collected, displayed, and multiplied by zero. */
  success: number;
}

export interface Factor {
  label: string;
  weight: number;
  /** 0–1 before weighting. */
  value: number;
  /** Points contributed to the 0–100 score. */
  points: number;
}

export interface Assessment {
  score: number;
  factors: Factor[];
  verdict: string;
  note?: string;
  upgrade: { tier: Tier; score: number } | null;
}

const TIER_ORDER = Object.keys(TIERS) as Tier[];

function factors(a: Application): Factor[] {
  const rows: Omit<Factor, 'points'>[] = [
    { label: 'Subscription tier', weight: WEIGHTS.tier, value: TIERS[a.tier].value },
    { label: 'Market size', weight: WEIGHTS.market, value: MARKETS[a.market].value },
    {
      label: 'Broadcast window alignment',
      weight: WEIGHTS.window,
      value: REGIONS[a.region].window,
    },
    {
      label: 'Previous footballing success (where relevant)',
      weight: WEIGHTS.success,
      value: Math.min(100, Math.max(0, a.success)) / 100,
    },
  ];
  return rows.map((r) => ({ ...r, points: r.weight * r.value * 100 }));
}

export function score(a: Application): number {
  return Math.round(factors(a).reduce((sum, f) => sum + f.points, 0));
}

function verdictFor(s: number): string {
  if (s >= 85) return 'Eligible. The Committee looks forward to not publishing its reasoning.';
  if (s >= 60) return 'Under consideration. Consideration is available at the next tier.';
  if (s >= 35) return 'Your region is not excluded. It is simply less included.';
  return 'Not currently included. Membership is reviewed annually. Payments are reviewed continuously.';
}

export function assess(a: Application): Assessment {
  const s = score(a);
  const next = TIER_ORDER[TIER_ORDER.indexOf(a.tier) + 1];
  return {
    score: s,
    factors: factors(a),
    verdict: verdictFor(s),
    note:
      a.region === 'europe'
        ? 'European clubs are represented by the fifteen founders. Your application has been forwarded to them, as a courtesy.'
        : undefined,
    upgrade: next ? { tier: next, score: score({ ...a, tier: next }) } : null,
  };
}
