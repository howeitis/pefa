/**
 * Imports the locked canon from the game's web repo into src/canon/game/.
 *
 * Read-only against the game: each data module is bundled in memory with
 * esbuild, evaluated, and the exports this site needs are written out as
 * JSON. Nothing is ever written to the game repo. The output is committed,
 * so the site builds without the game checked out next to it; rerun this
 * after a game content drop and review the diff.
 *
 *   npm run canon:import                  # default: ../Superior League 2036/Howe to Manage
 *   GAME_REPO=/path/to/repo npm run canon:import
 */
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { build } from 'esbuild';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const gameRepo =
  process.env.GAME_REPO ?? join(root, '..', 'Superior League 2036', 'Howe to Manage');
const gameSrc = join(gameRepo, 'src');
const outDir = join(root, 'src', 'canon', 'game');

if (!existsSync(gameSrc)) {
  console.error(`canon: game repo not found at ${gameRepo} (set GAME_REPO)`);
  process.exit(1);
}

/** Resolve the game's `@/…` alias to its src directory. */
const aliasPlugin = {
  name: 'game-alias',
  setup(b) {
    b.onResolve({ filter: /^@\// }, (args) => {
      const base = join(gameSrc, args.path.slice(2));
      for (const ext of ['.ts', '.tsx', '/index.ts']) {
        if (existsSync(base + ext)) return { path: base + ext };
      }
      return { path: base };
    });
  },
};

/** Bundle a snippet of TS against the game's src and evaluate it. */
async function load(contents) {
  const result = await build({
    stdin: { contents, resolveDir: gameSrc, loader: 'ts', sourcefile: 'canon-entry.ts' },
    bundle: true,
    format: 'esm',
    platform: 'node',
    write: false,
    logLevel: 'silent',
    plugins: [aliasPlugin],
  });
  const code = result.outputFiles[0].text;
  return import(`data:text/javascript;base64,${Buffer.from(code).toString('base64')}`);
}

/** Source files the JSON is derived from, for the checksum record. */
const SOURCES = [
  'data/lore.ts',
  'data/clubs.ts',
  'data/clubLore.ts',
  'engine/decrees.ts',
  'data/domesticLeagues.ts',
  'data/league.ts',
  'engine/legacyMarket.ts',
];

const lore = await load(`export * from '@/data/lore';`);
const clubs = await load(`
  export { CLUBS, PERMANENT_CLUBS, GLOBAL_CLUBS, LEAGUE_SIZE, ROTATING_SLOTS, CLUB_CARD_NAMES } from '@/data/clubs';
`);
const clubLore = await load(`export { CLUB_LORE } from '@/data/clubLore';`);
const decrees = await load(`export { DECREES } from '@/engine/decrees';`);
const domestic = await load(`
  export { DOMESTIC_LEAGUES, DOMESTIC_CLUBS } from '@/data/domesticLeagues';
  export { LEAGUE_NAME, LEAGUE_NAME_SHORT, LEAGUE_SEASON_LABEL, CUP_NAME, CUP_NAME_SHORT, ZONE_LABELS, BOTTOM_ZONE_PHRASE } from '@/data/league';
  export { LEGACY_CLUB_NAME } from '@/engine/legacyMarket';
`);

// Only the public face of each club. Budgets and name pools are game balance,
// not canon the site should repeat.
const clubView = (c) => ({
  id: c.id,
  name: c.name,
  shortName: c.shortName,
  cardName: clubs.CLUB_CARD_NAMES[c.name] ?? c.shortName,
  membership: c.membership,
  country: c.country,
  city: c.city,
  logo: c.logo,
  colors: c.colors,
  rivalries: c.rivalries ?? [],
});

const outputs = {
  'lore.json': {
    splash: {
      kicker: lore.SPLASH_KICKER,
      headline: lore.SPLASH_HEADLINE,
      body: lore.SPLASH_BODY,
      punchline: lore.SPLASH_PUNCHLINE,
      welcome: lore.SPLASH_WELCOME,
      disclaimer: lore.SPLASH_DISCLAIMER,
    },
    prospectus: {
      title: lore.PROSPECTUS_TITLE,
      subtitle: lore.PROSPECTUS_SUBTITLE,
      confidentiality: lore.PROSPECTUS_CONFIDENTIALITY,
      sections: lore.PROSPECTUS_SECTIONS,
      footer: lore.PROSPECTUS_FOOTER,
    },
    intro: {
      scenes: lore.INTRO_SCENES.map(({ durationMs: _d, ...scene }) => scene),
      ticker: lore.INTRO_TICKER,
      drawnClubIds: lore.INTRO_DRAWN_CLUB_IDS,
    },
  },
  'clubs.json': {
    leagueSize: clubs.LEAGUE_SIZE,
    rotatingSlots: clubs.ROTATING_SLOTS,
    permanentIds: clubs.PERMANENT_CLUBS.map((c) => c.id),
    globalIds: clubs.GLOBAL_CLUBS.map((c) => c.id),
    clubs: clubs.CLUBS.map(clubView),
  },
  'clubLore.json': clubLore.CLUB_LORE,
  'decrees.json': Object.values(decrees.DECREES).map((d) => ({
    id: d.id,
    name: d.name,
    tagline: d.tagline,
    description: d.description,
    accent: d.accent,
  })),
  'domesticLeagues.json': {
    leagueName: domestic.LEAGUE_NAME,
    leagueNameShort: domestic.LEAGUE_NAME_SHORT,
    seasonLabel: domestic.LEAGUE_SEASON_LABEL,
    cupName: domestic.CUP_NAME,
    cupNameShort: domestic.CUP_NAME_SHORT,
    zoneLabels: domestic.ZONE_LABELS,
    bottomZonePhrase: domestic.BOTTOM_ZONE_PHRASE,
    legacyClubName: domestic.LEGACY_CLUB_NAME,
    leagues: domestic.DOMESTIC_LEAGUES,
    clubs: domestic.DOMESTIC_CLUBS,
  },
};

const sha = (buf) => createHash('sha256').update(buf).digest('hex');

await mkdir(outDir, { recursive: true });
const written = {};
for (const [file, data] of Object.entries(outputs)) {
  const text = JSON.stringify(data, null, 2) + '\n';
  await writeFile(join(outDir, file), text);
  written[file] = sha(text);
}

const sources = {};
for (const rel of SOURCES) {
  sources[`src/${rel}`] = sha(await readFile(join(gameSrc, rel)));
}

let commit = null;
try {
  commit = execFileSync('git', ['-C', gameRepo, 'rev-parse', 'HEAD'], { encoding: 'utf8' }).trim();
} catch {
  // Not a git checkout; the source hashes still pin the content.
}

await writeFile(
  join(outDir, 'checksum.json'),
  JSON.stringify({ gameCommit: commit, sources, outputs: written }, null, 2) + '\n',
);

console.log(
  `canon: imported from ${relative(root, gameRepo) || gameRepo}${commit ? ` @ ${commit.slice(0, 7)}` : ''}`,
);
console.log(
  `  ${outputs['clubs.json'].clubs.length} clubs, ${Object.keys(outputs['clubLore.json']).length} lore entries, ${outputs['decrees.json'].length} decrees`,
);
