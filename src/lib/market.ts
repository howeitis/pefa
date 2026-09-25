/**
 * Indicative daily quotes for the share board. No backend and no feed: each
 * quote is a pure function of the ticker and the date, so everyone sees the
 * same board on the same day, and it moves at midnight UTC.
 *
 * The game's own live quote is a function of league position, which this
 * site doesn't have, so these are labelled "indicative" and drift around the
 * listing price instead: a slow per-club swell plus a little daily noise,
 * bounded to ±12%.
 *
 * In-world dates run ten years ahead of the real calendar, so the board's
 * date falls after the site's 2035/36 filings (site canon: `market-board`).
 */

export const IN_WORLD_YEAR_OFFSET = 10;

/** 32-bit FNV-1a. */
function hash(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619);
  return h >>> 0;
}

/** Deterministic 0–1 from a string. */
function unit(s: string): number {
  return hash(s) / 4294967296;
}

/** Whole days since the Unix epoch, for a UTC date string (YYYY-MM-DD). */
function dayIndex(isoDate: string): number {
  return Math.floor(Date.parse(`${isoDate}T00:00:00Z`) / 86_400_000);
}

/** Percentage change from the listing price on a given day. Bounded to ±12. */
export function drift(ticker: string, isoDate: string): number {
  const day = dayIndex(isoDate);
  const phase = unit(`${ticker}:phase`) * Math.PI * 2;
  const period = 20 + unit(`${ticker}:period`) * 25; // 20–45 days
  const swell = 8 * Math.sin((day / period) * Math.PI * 2 + phase);
  const noise = (unit(`${ticker}:${isoDate}`) - 0.5) * 8; // ±4
  return Math.max(-12, Math.min(12, swell + noise));
}

export interface Quote {
  price: number;
  /** Percentage change versus the previous day's quote. */
  dayChange: number;
}

export function quote(ticker: string, listPrice: number, isoDate: string): Quote {
  const prev = new Date(Date.parse(`${isoDate}T00:00:00Z`) - 86_400_000).toISOString().slice(0, 10);
  const today = listPrice * (1 + drift(ticker, isoDate) / 100);
  const yesterday = listPrice * (1 + drift(ticker, prev) / 100);
  return { price: today, dayChange: ((today - yesterday) / yesterday) * 100 };
}

/** Today's date in UTC, YYYY-MM-DD. */
export const todayUtc = (now = new Date()) => now.toISOString().slice(0, 10);

/** The in-world date for a real date: same day, ten years on. */
export function inWorldDate(isoDate: string): string {
  const [y, m, d] = isoDate.split('-');
  return `${Number(y) + IN_WORLD_YEAR_OFFSET}-${m}-${d}`;
}
