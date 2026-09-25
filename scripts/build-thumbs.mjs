/**
 * Crest thumbnails for grids: the source crests are 435×512 (~64KB each),
 * and the league page shows all twenty-eight. Thumbs are 2× a 96px display
 * height. Output is committed; rerun after the game adds or changes a crest.
 */
import { mkdir, readdir } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const dir = fileURLToPath(new URL('../public/club-crests/', import.meta.url));
const out = join(dir, 'thumb');
await mkdir(out, { recursive: true });

const files = (await readdir(dir)).filter((f) => f.endsWith('.webp'));
for (const f of files) {
  await sharp(join(dir, f)).resize({ height: 192 }).webp({ quality: 82 }).toFile(join(out, f));
}
console.log(`thumbs: wrote ${files.length} crest thumbnails`);
