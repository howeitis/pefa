/**
 * Builds the PEFA™ mark: emblem, wordmark and lockup SVGs in on-light and
 * on-dark variants, the favicon, the app icons, the manifest and the default
 * OG card.
 *
 * The emblem is a wireframe globe with a gold trend line climbing across it
 * and breaking out at the top right (after FIFA's globe, acquired). The
 * wordmark is PEF▲: heavy drawn capitals whose A takes the same trend line as
 * its crossbar. The Superior League (PEFA's product) keeps its own knot mark.
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

// ─── Emblem: the Breakout globe (200 × 200 design grid) ───

// The trend line climbs across the globe and leaves it at the top right, the
// same gesture as the crossbar of the wordmark's A.
const GLOBE_ARROW = 'M34 146L72 116L98 130L150 72L184 36M160 32H188V60';

/**
 * The globe's grid is cut away around the arrow with a mask rather than a
 * halo in the ground colour, so the mark stays transparent on any surface.
 * `solid` is the small-size cut: a filled disc with the meridian and equator
 * cut out, for the favicon and anything under ~40px.
 */
function globeGroup(
  { ink, accent },
  { id = 'g', solid = false, stroke = 8, trend = 12, gap = 28, detail = true } = {},
) {
  const round = 'stroke-linecap="round" stroke-linejoin="round"';
  if (solid) {
    return `
  <defs><mask id="${id}" maskUnits="userSpaceOnUse" x="0" y="0" width="200" height="200">
    <rect width="200" height="200" fill="#fff"/>
    <g fill="none" stroke="#000" ${round}>
      <ellipse cx="100" cy="100" rx="38" ry="80" stroke-width="12"/>
      <path d="M20 100H180" stroke-width="12"/>
      <path d="${GLOBE_ARROW}" stroke-width="${trend + 18}"/>
    </g>
  </mask></defs>
  <circle cx="100" cy="100" r="80" fill="${ink}" mask="url(#${id})"/>
  <path d="${GLOBE_ARROW}" fill="none" stroke="${accent}" stroke-width="${trend + 4}" ${round}/>`;
  }
  const extra = detail ? '<path d="M100 20V180M31 60H169M31 140H169"/>' : '';
  return `
  <defs><mask id="${id}" maskUnits="userSpaceOnUse" x="0" y="0" width="200" height="200">
    <rect width="200" height="200" fill="#fff"/>
    <path d="${GLOBE_ARROW}" fill="none" stroke="#000" stroke-width="${gap}" ${round}/>
  </mask></defs>
  <g fill="none" stroke="${ink}" stroke-width="${stroke}" ${round} mask="url(#${id})">
    <circle cx="100" cy="100" r="80"/>
    <ellipse cx="100" cy="100" rx="38" ry="80"/>
    <path d="M20 100H180"/>${extra}
  </g>
  <path d="${GLOBE_ARROW}" fill="none" stroke="${accent}" stroke-width="${trend}" ${round}/>`;
}

function svg(width, height, body, title) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" role="img" aria-labelledby="t"><title id="t">${title}</title>${body}
</svg>
`;
}

function tm(font, x, y, size, color) {
  return `<path d="${textPath(font, '™', x, y, size).d}" fill="${color}"/>`;
}

// ─── Wordmark: PEF▲ (drawn letters, 120 tall) ───

// Heavy block capitals drawn as 26px strokes, so they need no font. The A has
// no crossbar: the gold trend line stands in for it and breaks out of the
// letter at the top right.
const LETTERS = [
  'M13 120V13H52A29 29 0 0 1 52 71H13', // P
  'M197 13H125V107H197M125 60H184', // E
  'M300 13H228V120M228 60H287', // F
];
const A_LEGS = 'M318 124L363 13L408 124';
const A_ARROW = 'M308 100L340 78L362 90L422 22M402 20H424V42';
const WORDMARK_W = 466;

function wordmarkGroup(c, id = 'w') {
  const round = 'stroke-linecap="round" stroke-linejoin="round"';
  return `
  <defs>
    <clipPath id="${id}-base"><rect x="290" y="-20" width="200" height="140"/></clipPath>
    <mask id="${id}-gap" maskUnits="userSpaceOnUse" x="0" y="-20" width="${WORDMARK_W}" height="160">
      <rect x="0" y="-20" width="${WORDMARK_W}" height="160" fill="#fff"/>
      <path d="${A_ARROW}" fill="none" stroke="#000" stroke-width="26" ${round}/>
    </mask>
  </defs>
  <g fill="none" stroke="${c.ink}" stroke-width="26" stroke-linejoin="round" mask="url(#${id}-gap)">
    ${LETTERS.map((d) => `<path d="${d}"/>`).join('')}
    <path d="${A_LEGS}" clip-path="url(#${id}-base)"/>
  </g>
  <path d="${A_ARROW}" fill="none" stroke="${c.accent}" stroke-width="13" ${round}/>
  ${tm(sans, 432, 34, 34, c.accent)}`;
}

function wordmark(c) {
  return { body: wordmarkGroup(c), w: WORDMARK_W, h: 120 };
}

function lockup(c) {
  // Globe at 120px, then PEF▲™ and the full name beneath it.
  const e = `<g transform="scale(0.6)">${globeGroup(c, { id: 'lk-g' })}</g>`;
  const x = 140;
  const ws = 0.62;
  const wm = `<g transform="translate(${x} 6) scale(${ws})">${wordmarkGroup(c, 'lk-w')}</g>`;
  const tag = textPath(sans, 'PRIVATE EQUITY FOOTBALL ACCELERATE', x + 1, 112, 13.5, 2.1);
  const w = Math.ceil(Math.max(x + WORDMARK_W * ws, x + tag.width + 4));
  return { body: `${e}${wm}<path d="${tag.d}" fill="${c.sub}"/>`, w, h: 120 };
}

// ─── Favicon / app icons: filled tile ───

function tile(size, { maskable = false, small = false } = {}) {
  // Maskable icons keep the art inside the central 80% safe zone. Small tiles
  // (the favicon) use the solid cut so the globe survives 16px.
  const inset = maskable ? 0.2 : 0.1;
  const s = (size * (1 - inset * 2)) / 200;
  const o = size * inset;
  const radius = maskable ? 0 : size * 0.18;
  const art = small
    ? globeGroup(COLORS.dark, { id: 'tile', solid: true, trend: 16 })
    : globeGroup(COLORS.dark, { id: 'tile', stroke: 10, trend: 16, gap: 34 });
  return `<rect width="${size}" height="${size}" rx="${radius}" fill="${NAVY}"/>
  <g transform="translate(${o} ${o}) scale(${s})">${art}</g>`;
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
  await put(`brand/pefa-emblem${suffix}.svg`, svg(200, 200, globeGroup(c), 'PEFA™ emblem'));
  const wm = wordmark(c);
  await put(`brand/pefa-wordmark${suffix}.svg`, svg(wm.w, wm.h, wm.body, 'PEFA™'));
  const lk = lockup(c);
  await put(
    `brand/pefa-lockup${suffix}.svg`,
    svg(lk.w, lk.h, lk.body, 'PEFA™ Private Equity Football Accelerate'),
  );
}

const favicon = svg(64, 64, tile(64, { small: true }), 'PEFA™');
await put('favicon.svg', favicon);

async function png(rel, source, size) {
  await sharp(Buffer.from(source)).resize(size, size).png().toFile(join(pub, rel));
  out.push(rel);
}
await png('favicon-32.png', svg(512, 512, tile(512, { small: true }), 'PEFA™'), 32);
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
        'The corporate site of PEFA™, owner of the Superior League. A satirical companion to Superior League 2036, a free football manager game.',
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
