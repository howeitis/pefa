/**
 * Builds the PEFA™ mark: emblem, wordmark and lockup SVGs in on-light and
 * on-dark variants, the favicon, the app icons, the manifest and the default
 * OG card.
 *
 * The emblem is a football pitch drawn as a chart: a plain pitch outline with
 * a gold trend line climbing through the centre circle and out of the frame.
 * The Superior League (PEFA's product) keeps its own knot mark; this is the
 * owner's, so it is colder and more geometric.
 *
 * Text is converted to outlines with opentype.js, so no SVG here depends on a
 * font being installed. Run with `npm run brand`. Output is committed.
 */
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import opentype from 'opentype.js';
import sharp from 'sharp';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const pub = join(root, 'public');
const fontDir = join(root, 'node_modules', '@fontsource');

const COLORS = {
  light: { ink: '#0F1E36', accent: '#B45309', sub: '#4E5561' },
  dark: { ink: '#F6F4EE', accent: '#E5B842', sub: '#B9BCC4' },
};
const NAVY = '#0B0F19';

async function loadFont(pkg, file) {
  const buf = await readFile(join(fontDir, pkg, 'files', file));
  return opentype.parse(buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength));
}

const serif = await loadFont('playfair-display', 'playfair-display-latin-700-normal.woff');
const sans = await loadFont('dm-sans', 'dm-sans-latin-600-normal.woff');

/**
 * Serialise path commands ourselves: opentype.js's toPathData emits `NaN` for
 * some coordinates, which truncates the whole path when rendered.
 */
function pathData(path) {
  const n = (v) => String(Math.round(v * 100) / 100);
  return path.commands
    .map((c) => {
      switch (c.type) {
        case 'M':
        case 'L':
          return `${c.type}${n(c.x)} ${n(c.y)}`;
        case 'Q':
          return `Q${n(c.x1)} ${n(c.y1)} ${n(c.x)} ${n(c.y)}`;
        case 'C':
          return `C${n(c.x1)} ${n(c.y1)} ${n(c.x2)} ${n(c.y2)} ${n(c.x)} ${n(c.y)}`;
        default:
          return 'Z';
      }
    })
    .join('');
}

/** Lay a string out glyph by glyph with extra tracking; returns path data and advance width. */
function textPath(font, text, x, y, size, tracking = 0) {
  const scale = size / font.unitsPerEm;
  let cursor = x;
  const parts = [];
  // charToGlyph, not stringToGlyphs: the latter runs a shaping pass that
  // chokes on these fonts' GSUB tables, and a wordmark needs no shaping.
  const glyphs = [...text].map((ch) => font.charToGlyph(ch));
  glyphs.forEach((g, i) => {
    parts.push(pathData(g.getPath(cursor, y, size)));
    cursor += g.advanceWidth * scale;
    if (i < glyphs.length - 1) {
      cursor += font.getKerningValue(g, glyphs[i + 1]) * scale + tracking;
    }
  });
  return { d: parts.join(''), width: cursor - x };
}

// ─── Emblem (64 × 64 design grid) ───

function emblemGroup({ ink, accent }, { stroke = 2.5, trend = 4 } = {}) {
  return `
  <g fill="none" stroke-linecap="round" stroke-linejoin="round">
    <rect x="8" y="15" width="48" height="34" rx="1.5" stroke="${ink}" stroke-width="${stroke}"/>
    <path d="M32 15V49" stroke="${ink}" stroke-width="${stroke}"/>
    <circle cx="32" cy="32" r="7" stroke="${ink}" stroke-width="${stroke}"/>
    <path d="M8 26h5v12H8M56 26h-5v12h5" stroke="${ink}" stroke-width="${stroke}"/>
    <path d="M5 55L19 42l7 5L39 30l8 4L59 12" stroke="${accent}" stroke-width="${trend}"/>
    <path d="M51 11.5L59 12l-.5 8" stroke="${accent}" stroke-width="${trend}"/>
  </g>`;
}

function svg(width, height, body, title) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" role="img" aria-labelledby="t"><title id="t">${title}</title>${body}
</svg>
`;
}

function tm(font, x, y, size, color) {
  return `<path d="${textPath(font, '™', x, y, size).d}" fill="${color}"/>`;
}

// ─── Wordmark and lockup ───

function wordmark(c) {
  const size = 96;
  const word = textPath(serif, 'PEFA', 0, 80, size, 6);
  const sup = tm(sans, word.width + 4, 40, 26, c.ink);
  const w = Math.ceil(word.width + 34);
  return { body: `<path d="${word.d}" fill="${c.ink}"/>${sup}`, w, h: 104 };
}

function lockup(c) {
  // Emblem scaled to 112px tall, then PEFA™ and the full name beneath it.
  const e = `<g transform="translate(0 4) scale(1.75)">${emblemGroup(c)}</g>`;
  const x = 136;
  const word = textPath(serif, 'PEFA', x, 74, 84, 5);
  const sup = tm(sans, x + word.width + 4, 38, 22, c.ink);
  const tag = textPath(sans, 'PRIVATE EQUITY FOOTBALL ACCELERATE', x + 2, 106, 13.5, 2.1);
  const w = Math.ceil(Math.max(x + word.width + 30, x + tag.width + 4));
  return {
    body: `${e}<path d="${word.d}" fill="${c.ink}"/>${sup}<path d="${tag.d}" fill="${c.sub}"/>`,
    w,
    h: 120,
  };
}

// ─── Favicon / app icons: filled tile, heavier strokes so it survives 16px ───

function tile(size, { maskable = false } = {}) {
  // Maskable icons keep the art inside the central 80% safe zone.
  const inset = maskable ? 0.2 : 0.1;
  const s = (size * (1 - inset * 2)) / 64;
  const o = size * inset;
  const radius = maskable ? 0 : size * 0.18;
  return `<rect width="${size}" height="${size}" rx="${radius}" fill="${NAVY}"/>
  <g transform="translate(${o} ${o}) scale(${s})">${emblemGroup(COLORS.dark, { stroke: 3.6, trend: 5.5 })}</g>`;
}

// ─── OG card (1200 × 630) ───

function ogCard() {
  const c = COLORS.dark;
  const l = lockup(c);
  const head1 = textPath(serif, 'Football did not die.', 96, 372, 68);
  const head2 = textPath(serif, 'It was algorithmically optimized.', 96, 452, 68);
  const foot = textPath(
    sans,
    'A satirical companion to Superior League 2036. Everyone named is fictional.',
    96,
    560,
    20,
    0.4,
  );
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630">
  <defs>
    <radialGradient id="flood" cx="0.82" cy="-0.1" r="0.9">
      <stop offset="0" stop-color="#E5B842" stop-opacity="0.22"/>
      <stop offset="0.5" stop-color="#1A2234" stop-opacity="0.35"/>
      <stop offset="1" stop-color="#0B0F19" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="${NAVY}"/>
  <rect width="1200" height="630" fill="url(#flood)"/>
  <g transform="translate(96 84)">${l.body}</g>
  <path d="${head1.d}" fill="${c.ink}"/>
  <path d="${head2.d}" fill="${c.accent}"/>
  <rect x="96" y="508" width="1008" height="1" fill="#F6F4EE" fill-opacity="0.18"/>
  <path d="${foot.d}" fill="${c.sub}"/>
</svg>`;
}

// ─── Write everything ───

await mkdir(join(pub, 'brand'), { recursive: true });
await mkdir(join(pub, 'icons'), { recursive: true });

const out = [];
async function put(rel, content) {
  await writeFile(join(pub, rel), content);
  out.push(rel);
}

for (const [variant, c] of Object.entries(COLORS)) {
  const suffix = variant === 'dark' ? '-on-dark' : '';
  await put(`brand/pefa-emblem${suffix}.svg`, svg(64, 64, emblemGroup(c), 'PEFA™ emblem'));
  const wm = wordmark(c);
  await put(`brand/pefa-wordmark${suffix}.svg`, svg(wm.w, wm.h, wm.body, 'PEFA™'));
  const lk = lockup(c);
  await put(
    `brand/pefa-lockup${suffix}.svg`,
    svg(lk.w, lk.h, lk.body, 'PEFA™ Private Equity Football Accelerate'),
  );
}

const favicon = svg(64, 64, tile(64), 'PEFA™');
await put('favicon.svg', favicon);

async function png(rel, source, size) {
  await sharp(Buffer.from(source)).resize(size, size).png().toFile(join(pub, rel));
  out.push(rel);
}
await png('favicon-32.png', svg(512, 512, tile(512), 'PEFA™'), 32);
await png('icons/apple-touch-icon.png', svg(512, 512, tile(512, { maskable: true }), 'PEFA™'), 180);
await png('icons/icon-192.png', svg(512, 512, tile(512), 'PEFA™'), 192);
await png('icons/icon-512.png', svg(512, 512, tile(512), 'PEFA™'), 512);
await png(
  'icons/icon-maskable-512.png',
  svg(512, 512, tile(512, { maskable: true }), 'PEFA™'),
  512,
);

await sharp(Buffer.from(ogCard())).jpeg({ quality: 88 }).toFile(join(pub, 'og-image.jpg'));
out.push('og-image.jpg');

await put(
  'manifest.webmanifest',
  JSON.stringify(
    {
      name: 'PEFA™ — Private Equity Football Accelerate™',
      short_name: 'PEFA™',
      description:
        'The corporate site of PEFA™, owner of the Superior League. A satirical companion to Superior League 2036.',
      id: '/',
      start_url: '/',
      scope: '/',
      display: 'standalone',
      theme_color: NAVY,
      background_color: NAVY,
      icons: [
        { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
        { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
        {
          src: '/icons/icon-maskable-512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'maskable',
        },
      ],
    },
    null,
    2,
  ) + '\n',
);

console.log(`brand: wrote ${out.length} files\n  ${out.join('\n  ')}`);
