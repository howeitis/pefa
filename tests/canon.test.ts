/**
 * Canon lint. The site may add lore, but it must not contradict the game's
 * locked canon (PLAN.md §2.1) or hand-edit the imported copy of it.
 */
import { createHash } from 'node:crypto';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { describe, expect, it } from 'vitest';
import checksum from '~/canon/game/checksum.json';
import clubsJson from '~/canon/game/clubs.json';
import clubLore from '~/canon/game/clubLore.json';
import decrees from '~/canon/game/decrees.json';
import { SITE_CANON } from '~/canon/site';

const root = join(import.meta.dirname, '..');
const gameDir = join(root, 'src', 'canon', 'game');

/** Every site-authored text file: routes, components, content. Not the imported canon. */
function siteSources(dir = join(root, 'src')): string[] {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) return path === gameDir ? [] : siteSources(path);
    return /\.(tsx?|mdx)$/.test(name) ? [path] : [];
  });
}

const WORDS: Record<string, number> = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
  ten: 10,
  eleven: 11,
  twelve: 12,
  thirteen: 13,
  fourteen: 14,
  fifteen: 15,
  sixteen: 16,
  seventeen: 17,
  eighteen: 18,
  nineteen: 19,
  twenty: 20,
  'twenty-eight': 28,
  'thirty-two': 32,
  forty: 40,
};
/** A figure as digits or words; NaN for anything else ("not redacted" is not a count). */
const num = (s: string) => WORDS[s.toLowerCase()] ?? (/^\d+(\.\d+)?$/.test(s) ? Number(s) : NaN);
const N = String.raw`(\d+|[a-z]+(?:-[a-z]+)?)`;

/**
 * Locked figures, each as a pattern that captures the figure in context and
 * the value it must be. Deliberately narrow: a pattern only fires where the
 * copy is clearly restating that fact.
 */
const LOCKED: { fact: string; pattern: RegExp; expected: number | string }[] = [
  {
    fact: 'permanent founders',
    pattern: new RegExp(`\\b${N} (?:permanent|founding|founder)\\b(?! objectives)`, 'gi'),
    expected: 15,
  },
  {
    fact: 'Synergy Draft berths',
    pattern: new RegExp(`\\b${N} (?:Synergy Draft™ )?(?:guest )?berths`, 'gi'),
    expected: 5,
  },
  {
    fact: 'global draft pool',
    pattern: new RegExp(`\\b${N}[- ]club (?:global )?(?:draft )?pool`, 'gi'),
    expected: 13,
  },
  {
    fact: 'global partners in the pool',
    pattern: new RegExp(`\\b${N} global partners`, 'gi'),
    expected: 13,
  },
  { fact: 'league size', pattern: new RegExp(`\\b${N} clubs in total`, 'gi'), expected: 20 },
  { fact: 'viewership drop', pattern: /[−-](\d+)% viewership/gi, expected: 69 },
  { fact: 'months to collapse', pattern: new RegExp(`within ${N} months`, 'gi'), expected: 18 },
  {
    fact: 'leagues in administration',
    pattern: new RegExp(`\\b${N} of Europe’s (?:six|6) largest`, 'gi'),
    expected: 4,
  },
  { fact: 'settlement markup', pattern: /marked[^.]{0,40}? up (\d+)%/gi, expected: 80 },
  {
    fact: 'stated objectives',
    pattern: new RegExp(`\\b${N} (?:stated )?objectives`, 'gi'),
    expected: 5,
  },
  {
    fact: 'redacted objectives',
    pattern: new RegExp(
      `\\b${N} (?:of them |of its five stated objectives )?(?:are )?redacted`,
      'gi',
    ),
    expected: 3,
  },
  {
    fact: 'incorporation date',
    pattern: /incorporated[^.]{0,40}? on (\d{1,2} \w+ \d{4})/gi,
    expected: '14 May 2035',
  },
  {
    fact: 'GBRC dissolution date',
    pattern: /Consortium[^.]{0,40}? on (\d{1,2} \w+ \d{4})/gi,
    expected: '5 May 2035',
  },
];

describe('imported game canon', () => {
  it('has not been hand-edited since import', () => {
    for (const [file, hash] of Object.entries(checksum.outputs)) {
      const actual = createHash('sha256')
        .update(readFileSync(join(gameDir, file), 'utf8'))
        .digest('hex');
      expect(actual, `${file} differs from its import checksum; rerun npm run canon:import`).toBe(
        hash,
      );
    }
  });

  it('matches the locked structure: 15 founders + 13 pool, 20 play, 5 drawn', () => {
    expect(clubsJson.permanentIds).toHaveLength(15);
    expect(clubsJson.globalIds).toHaveLength(13);
    expect(clubsJson.leagueSize).toBe(20);
    expect(clubsJson.rotatingSlots).toBe(5);
    expect(clubsJson.clubs).toHaveLength(28);
  });

  it('has lore for every club and all 32 decrees', () => {
    for (const club of clubsJson.clubs) expect(clubLore).toHaveProperty(club.id);
    expect(decrees).toHaveLength(32);
  });
});

describe('site copy', () => {
  const sources = siteSources().map((path) => ({
    path: relative(root, path),
    text: readFileSync(path, 'utf8'),
  }));

  it.each(LOCKED)('does not redefine $fact', ({ pattern, expected }) => {
    const violations: string[] = [];
    for (const { path, text } of sources) {
      for (const match of text.matchAll(pattern)) {
        const raw = match[1]!;
        const value = typeof expected === 'number' ? num(raw) : raw;
        if (typeof expected === 'number' && Number.isNaN(value)) continue; // not a figure
        if (value !== expected) violations.push(`${path}: "${match[0]}"`);
      }
    }
    expect(violations).toEqual([]);
  });

  it('only links to clubs that exist in the game', () => {
    const ids = new Set(clubsJson.clubs.map((c) => c.id));
    const unknown: string[] = [];
    for (const { path, text } of sources) {
      for (const m of text.matchAll(/\/superior-league\/clubs\/([a-z0-9-]+)/g)) {
        if (!ids.has(m[1]!)) unknown.push(`${path}: ${m[1]}`);
      }
      for (const m of text.matchAll(/clubById\(['"]([a-z0-9-]+)['"]\)/g)) {
        if (!ids.has(m[1]!)) unknown.push(`${path}: ${m[1]}`);
      }
    }
    expect(unknown).toEqual([]);
  });
});

describe('site-authored canon', () => {
  const log = readFileSync(join(root, 'CANON.md'), 'utf8');

  it.each(SITE_CANON)('$id is logged in CANON.md with its status', ({ id, status }) => {
    const line = log.split('\n').find((l) => l.includes(`\`${id}\``));
    expect(line, `CANON.md has no row for \`${id}\``).toBeDefined();
    expect(line).toContain(status);
  });
});
