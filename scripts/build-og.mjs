/**
 * Per-route OG cards (1200 × 630), one per prerendered page, in the page's
 * material: Floodlight pages get the dark card, Filing pages the paper one,
 * /play the flat out-of-character one. Club cards carry the crest, ticker
 * and TokTok reach (the media kit prints reach on every asset). Text is
 * outlined with opentype.js, so no system fonts are involved.
 *
 * Runs before every build (npm "prebuild"); output goes to public/og/,
 * which is gitignored.
 */
import { mkdir, readdir, readFile, rm } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { build } from 'esbuild';
import opentype from 'opentype.js';
import sharp from 'sharp';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const out = join(root, 'public', 'og');
const W = 1200;
const H = 630;

// ─── Data: the site map (bundled, so this script stays plain JS) ───

async function importTs(entry) {
  const result = await build({
    entryPoints: [join(root, entry)],
    bundle: true,
    format: 'esm',
    platform: 'node',
    write: false,
    logLevel: 'silent',
  });
  const code = result.outputFiles[0].text;
  return import(`data:text/javascript;base64,${Buffer.from(code).toString('base64')}`);
}

const siteMap = await importTs('src/site-map.ts');
const meta = await importTs('src/og.ts');
const clubs = JSON.parse(await readFile(join(root, 'src/canon/game/clubs.json'), 'utf8')).clubs;
const lore = JSON.parse(await readFile(join(root, 'src/canon/game/clubLore.json'), 'utf8'));

async function releases() {
  const dir = join(root, 'src/content/newsroom');
  const files = (await readdir(dir)).filter((f) => f.endsWith('.mdx'));
  return Promise.all(
    files.map(async (f) => {
      const text = await readFile(join(dir, f), 'utf8');
      const fm = Object.fromEntries(
        text
          .split('---')[1]
          .trim()
          .split('\n')
          .map((line) => {
            const i = line.indexOf(':');
            const value = line
              .slice(i + 1)
              .trim()
              .replace(/^'(.*)'$/, '$1');
            return [line.slice(0, i).trim(), value];
          }),
      );
      return { slug: f.replace(/\.mdx$/, ''), ...fm };
    }),
  );
}

// ─── Type ───

async function font(pkg, file) {
  const buf = await readFile(join(root, 'node_modules/@fontsource', pkg, 'files', file));
  return opentype.parse(buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength));
}
async function localFont(file) {
  const buf = await readFile(join(root, 'src/assets/fonts', file));
  return opentype.parse(buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength));
}
const serif = await font('playfair-display', 'playfair-display-latin-400-normal.woff');
const sans = await font('dm-sans', 'dm-sans-latin-400-normal.woff');
const sansBold = await font('dm-sans', 'dm-sans-latin-600-normal.woff');
const gabarito = await localFont('gabarito-variable.ttf');
const monoBold = await localFont('space-mono-bold.ttf');

const n2 = (v) => String(Math.round(v * 100) / 100);
function pathData(path) {
  return path.commands
    .map((c) =>
      c.type === 'M' || c.type === 'L'
        ? `${c.type}${n2(c.x)} ${n2(c.y)}`
        : c.type === 'Q'
          ? `Q${n2(c.x1)} ${n2(c.y1)} ${n2(c.x)} ${n2(c.y)}`
          : c.type === 'C'
            ? `C${n2(c.x1)} ${n2(c.y1)} ${n2(c.x2)} ${n2(c.y2)} ${n2(c.x)} ${n2(c.y)}`
            : 'Z',
    )
    .join('');
}

const glyphs = (f, text, variation) =>
  [...text]
    .map((ch) => {
      const g = f.charToGlyph(ch);
      return variation && f.variation ? f.variation.getTransform(g, variation) : g;
    })
    .filter((g) => g.index !== 0 || g.unicode === 32);

function measure(f, text, size, tracking = 0, variation) {
  const gs = glyphs(f, text, variation);
  return (
    gs.reduce((w, g) => w + (g.advanceWidth * size) / f.unitsPerEm + tracking, 0) -
    (gs.length ? tracking : 0)
  );
}

function line(f, text, x, y, size, color, tracking = 0, variation) {
  let cursor = x;
  const parts = [];
  for (const g of glyphs(f, text, variation)) {
    parts.push(pathData(g.getPath(cursor, y, size)));
    cursor += (g.advanceWidth * size) / f.unitsPerEm + tracking;
  }
  return `<path d="${parts.join('')}" fill="${color}"/>`;
}

/** Greedy word wrap; the last allowed line gets an ellipsis if text remains. */
function wrap(f, text, size, maxWidth, maxLines, tracking = 0, variation) {
  const words = text.split(/\s+/);
  const lines = [];
  let current = '';
  for (let i = 0; i < words.length; i++) {
    const next = current ? `${current} ${words[i]}` : words[i];
    if (measure(f, next, size, tracking, variation) <= maxWidth) {
      current = next;
      continue;
    }
    if (current) lines.push(current);
    current = words[i];
    if (lines.length === maxLines) {
      lines[maxLines - 1] = lines[maxLines - 1].replace(/[\s,.;:]*$/, '') + '…';
      return lines;
    }
  }
  if (current) lines.push(current);
  if (lines.length > maxLines) {
    lines.length = maxLines;
    lines[maxLines - 1] = lines[maxLines - 1].replace(/[\s,.;:]*$/, '') + '…';
  }
  return lines;
}

function block(
  f,
  text,
  { x, y, size, width, maxLines, color, leading = 1.18, tracking = 0, variation },
) {
  const lines = wrap(f, text, size, width, maxLines, tracking, variation);
  return {
    svg: lines
      .map((l, i) => line(f, l, x, y + i * size * leading, size, color, tracking, variation))
      .join(''),
    bottom: y + (lines.length - 1) * size * leading,
  };
}

const smallcaps = (text, x, y, color, size = 15) =>
  line(monoBold, text.toUpperCase(), x, y, size, color, size * 0.12);

// ─── Materials ───

const THEMES = {
  floodlight: {
    ground: '#0B0F19',
    ink: '#F6F4EE',
    muted: '#B9BCC4',
    accent: '#E5B842',
    lockup: 'public/brand/pefa-lockup-on-dark.svg',
  },
  filing: {
    ground: '#EDE9E2',
    ink: '#14171C',
    muted: '#4E5561',
    accent: '#92400E',
    lockup: 'public/brand/pefa-lockup.svg',
  },
  ooc: { ground: '#D9F99D', ink: '#0A0A0A', muted: '#2A2A2A', accent: '#0A0A0A' },
};

const FICTION =
  'Satire. PEFA™ and the Superior League are fictional. A companion to Superior League 2036.';

async function lockupPng(theme, height) {
  return sharp(join(root, theme.lockup), { density: 300 }).resize({ height }).png().toBuffer();
}

function background(material, t) {
  if (material === 'floodlight') {
    return `<rect width="${W}" height="${H}" fill="${t.ground}"/>
      <defs><radialGradient id="g" cx="0.85" cy="-0.1" r="0.85">
        <stop offset="0" stop-color="#E5B842" stop-opacity="0.24"/>
        <stop offset="1" stop-color="#0B0F19" stop-opacity="0"/>
      </radialGradient></defs>
      <rect width="${W}" height="${H}" fill="url(#g)"/>`;
  }
  if (material === 'filing') {
    return `<rect width="${W}" height="${H}" fill="${t.ground}"/>
      <rect x="48" y="40" width="${W - 96}" height="${H - 80}" fill="#FFFFFF" stroke="#D5CFC4"/>
      <line x1="48" y1="96" x2="${W - 48}" y2="96" stroke="#D5CFC4"/>`;
  }
  return `<rect width="${W}" height="${H}" fill="${t.ground}"/>`;
}

/**
 * Render one card. `crest` is an optional path to a club crest composited
 * on the right; `wordmark` an optional club wordmark composited as the title
 * lockup; `stamp` an optional rubber stamp on Filing cards.
 */
async function card({ file, material, kicker, title, subtitle, footer, crest, wordmark, stamp }) {
  const t = THEMES[material];
  const left = material === 'filing' ? 96 : 80;
  const textWidth = crest ? 680 : W - left * 2;
  let svg = background(material, t);
  const layers = [];

  if (material === 'filing') {
    svg += smallcaps(kicker, left, 76, t.muted, 15);
  } else if (material === 'floodlight') {
    svg += smallcaps(kicker, left, 190, t.accent);
  } else {
    svg += smallcaps('Out of character', left, 120, t.muted);
  }

  let contentBottom;
  if (wordmark) {
    const png = await sharp(join(root, 'public/club-wordmarks', wordmark))
      .resize({ width: textWidth, height: 155, fit: 'inside', withoutEnlargement: true })
      .png()
      .toBuffer();
    const wmMeta = await sharp(png).metadata();
    const wmTop = 148;
    layers.push({ input: png, left, top: wmTop });
    contentBottom = wmTop + wmMeta.height;
  } else {
    const titleTop = material === 'filing' ? 190 : material === 'floodlight' ? 268 : 210;
    const titleSize = title.length > 48 ? 58 : 70;
    const titleFont = material === 'floodlight' ? gabarito : material === 'ooc' ? sansBold : serif;
    const titleVariation = material === 'floodlight' ? { wght: 800 } : undefined;
    const titleTracking = material === 'floodlight' ? -titleSize * 0.02 : 0;
    const tb = block(titleFont, title, {
      x: left,
      y: titleTop,
      size: titleSize,
      width: textWidth,
      maxLines: 3,
      color: t.ink,
      tracking: titleTracking,
      variation: titleVariation,
    });
    svg += tb.svg;
    contentBottom = tb.bottom;
  }

  if (subtitle) {
    svg += block(material === 'floodlight' ? gabarito : sans, subtitle, {
      x: left,
      y: contentBottom + (wordmark ? 54 : 64),
      size: 27,
      width: textWidth,
      maxLines: 2,
      color: t.muted,
      leading: 1.35,
    }).svg;
  }

  if (stamp) {
    const sw = measure(monoBold, stamp.toUpperCase(), 15, 15 * 0.12) + 36;
    svg += `<g transform="rotate(-3 ${left + sw / 2} ${H - 128})">
      <rect x="${left}" y="${H - 150}" width="${sw}" height="40" fill="none" stroke="${t.accent}" stroke-width="2.5"/>
      ${smallcaps(stamp, left + 18, H - 124, t.accent)}</g>`;
  }

  const footY = material === 'filing' ? H - 64 : H - 48;
  svg += line(
    material === 'floodlight' ? gabarito : sans,
    footer ?? FICTION,
    left,
    footY,
    17,
    t.muted,
  );

  if (t.lockup) {
    const h = material === 'filing' ? 34 : 64;
    const png = await lockupPng(t, h);
    const meta = await sharp(png).metadata();
    layers.push({
      input: png,
      left: material === 'filing' ? W - 96 - meta.width : left,
      top: material === 'filing' ? 50 : 72,
    });
  }
  if (crest) {
    const png = await sharp(join(root, 'public/club-crests', crest))
      .resize({ height: 300 })
      .png()
      .toBuffer();
    const meta = await sharp(png).metadata();
    layers.push({ input: png, left: W - 96 - 40 - meta.width, top: 160 });
  }

  await sharp(
    Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">${svg}</svg>`),
  )
    .composite(layers)
    .jpeg({ quality: 84, mozjpeg: true })
    .toFile(join(out, `${file}.jpg`));
}

// ─── Cards ───

await rm(out, { recursive: true, force: true });
await mkdir(out, { recursive: true });

const KICKERS = {
  floodlight: 'Private Equity Football Accelerate™',
  filing: 'PEFA™ · Public filing',
};
const jobs = [];

for (const page of siteMap.PAGES) {
  const home = page.path === '/';
  jobs.push({
    file: meta.ogSlug(page.path),
    material: page.material,
    kicker: KICKERS[page.material] ?? '',
    title: home ? 'Football did not die. It was algorithmically optimized.' : page.title,
    subtitle: home ? 'PEFA™ owns and operates the Superior League.' : page.description,
    footer:
      page.material === 'ooc'
        ? 'A football management game. Web, Android and iOS (TestFlight).'
        : undefined,
  });
}

for (const club of clubs) {
  const l = lore[club.id];
  const reach =
    l.tokTokFollowers >= 1e8
      ? `${(l.tokTokFollowers / 1e6).toFixed(0)}M`
      : `${(l.tokTokFollowers / 1e6).toFixed(1)}M`;
  jobs.push({
    file: meta.ogSlug(siteMap.CLUB_PATH(club.id)),
    material: 'filing',
    kicker: `PEFA™ · Listing document · ${l.ticker}`,
    title: club.name,
    subtitle: `${l.ticker} · ${l.exchange} · £${l.listPrice} · TokTok reach ${reach}`,
    crest: club.logo,
    wordmark: `${club.id}-light.webp`,
    stamp: club.membership === 'permanent' ? 'Founder · Un-relegatable' : 'Synergy Draft™ pool',
  });
}

for (const r of await releases()) {
  const date = new Date(`${r.date}T12:00:00Z`).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });
  jobs.push({
    file: meta.ogSlug(siteMap.NEWS_PATH(r.slug)),
    material: 'filing',
    kicker: `PEFA™ · Newsroom · ${r.dateline}, ${date}`,
    title: r.title,
    subtitle: r.summary,
  });
}

// A few at a time: sharp is already multi-threaded.
for (let i = 0; i < jobs.length; i += 6) await Promise.all(jobs.slice(i, i + 6).map(card));
console.log(`og: wrote ${jobs.length} cards to public/og/`);
