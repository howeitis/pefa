import { describe, expect, it } from 'vitest';
import { assess, MARKETS, REGIONS, score, TIERS, type Application } from '~/lib/draft';
import { drift, inWorldDate, quote } from '~/lib/market';

const base: Application = { region: 'africa', market: 'city', tier: 'silver', success: 50 };

describe('Synergy Draft™ eligibility', () => {
  it('ignores previous footballing success entirely', () => {
    for (const success of [0, 37, 100]) {
      expect(score({ ...base, success })).toBe(score(base));
    }
  });

  it('always scores within 0–100', () => {
    for (const region of Object.keys(REGIONS) as (keyof typeof REGIONS)[])
      for (const market of Object.keys(MARKETS) as (keyof typeof MARKETS)[])
        for (const tier of Object.keys(TIERS) as (keyof typeof TIERS)[]) {
          const s = score({ region, market, tier, success: 0 });
          expect(s).toBeGreaterThanOrEqual(0);
          expect(s).toBeLessThanOrEqual(100);
        }
  });

  it('always offers an upgrade that improves the score, until Sovereign', () => {
    const a = assess(base);
    expect(a.upgrade?.tier).toBe('gold');
    expect(a.upgrade!.score).toBeGreaterThan(a.score);
    expect(assess({ ...base, tier: 'sovereign' }).upgrade).toBeNull();
  });

  it('shows the success factor with a weight of zero', () => {
    const success = assess(base).factors.find((f) => f.label.startsWith('Previous'));
    expect(success).toMatchObject({ weight: 0, points: 0 });
  });

  it('redirects European applicants to the founders', () => {
    expect(assess({ ...base, region: 'europe' }).note).toMatch(/founders/);
  });
});

describe('indicative share quotes', () => {
  it('are deterministic for a ticker and date', () => {
    expect(quote('ARM.L', 151, '2026-09-25')).toEqual(quote('ARM.L', 151, '2026-09-25'));
  });

  it('stay within ±12% of the listing price', () => {
    for (let d = 0; d < 400; d++) {
      const date = new Date(Date.UTC(2026, 0, 1) + d * 86_400_000).toISOString().slice(0, 10);
      for (const t of ['ARM.L', 'VAR.MC', 'RDV.N']) {
        expect(Math.abs(drift(t, date))).toBeLessThanOrEqual(12);
      }
    }
  });

  it('move from one day to the next', () => {
    expect(quote('ARM.L', 151, '2026-09-25').price).not.toBe(
      quote('ARM.L', 151, '2026-09-26').price,
    );
  });

  it('run ten years ahead in-world', () => {
    expect(inWorldDate('2026-09-25')).toBe('2036-09-25');
  });
});
