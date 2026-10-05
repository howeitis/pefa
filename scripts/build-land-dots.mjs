/**
 * Samples the world's land masses into an even grid of dots for the globe on
 * the home page. Writes src/data/land-dots.json as a flat [lat, lng, ...]
 * array. Run once (`npm run land`); the output is committed.
 */
import { geoContains } from 'd3-geo';
import { writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { feature } from 'topojson-client';

const require = createRequire(import.meta.url);
const topo = require('world-atlas/land-110m.json');
const land = feature(topo, topo.objects.land);

const STEP = 2.2; // degrees between rows
const out = [];
for (let lat = -58; lat <= 80; lat += STEP) {
  const step = STEP / Math.max(Math.cos((lat * Math.PI) / 180), 0.2);
  for (let lng = -180; lng < 180; lng += step) {
    if (geoContains(land, [lng, lat])) out.push(+lat.toFixed(1), +lng.toFixed(1));
  }
}
writeFileSync(new URL('../src/data/land-dots.json', import.meta.url), JSON.stringify(out));
console.log(`${out.length / 2} land dots`);
