/**
 * Crest thumbnails for grids: the source crests are 435×512 (~64KB each),
 * and the league page shows all twenty-eight. Thumbs are 2× a 96px display
 * height, plus 48px minis for ledger rows. Output is committed; rerun after the game adds or changes a crest.
 */
import { mkdir, readdir } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const dir = fileURLToPath(new URL('../public/club-crests/', import.meta.url));
const out = join(dir, 'thumb');
const mini = join(dir, 'mini');
await mkdir(out, { recursive: true });
await mkdir(mini, { recursive: true });

const files = (await readdir(dir)).filter((f) => f.endsWith('.webp'));
for (const f of files) {
  await sharp(join(dir, f)).resize({ height: 192 }).webp({ quality: 82 }).toFile(join(out, f));
  // 2× a 24px ledger row.
  await sharp(join(dir, f)).resize({ height: 48 }).webp({ quality: 80 }).toFile(join(mini, f));
}
console.log(`thumbs: wrote ${files.length} crest thumbnails`);
