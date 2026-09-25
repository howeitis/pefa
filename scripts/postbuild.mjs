/**
 * After the build:
 * - 404.html: static hosts (Vercel, `serve`) answer unknown paths with it.
 *   The SPA fallback shell hydrates into the router's catch-all route, which
 *   renders the not-invited page, so it doubles as the 404.
 * - sitemap.xml and robots.txt, from the pages that were actually
 *   prerendered, so the sitemap can never list a page that doesn't exist.
 */
import { copyFile, readdir, writeFile } from 'node:fs/promises';
import { join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const SITE_URL = 'https://pefa-alpha.vercel.app';
const dir = fileURLToPath(new URL('../build/client/', import.meta.url));

await copyFile(join(dir, '__spa-fallback.html'), join(dir, '404.html'));

async function pages(d) {
  const found = [];
  for (const entry of await readdir(d, { withFileTypes: true })) {
    const path = join(d, entry.name);
    if (entry.isDirectory()) found.push(...(await pages(path)));
    else if (entry.name === 'index.html') found.push(path);
  }
  return found;
}

const urls = (await pages(dir))
  .map((p) => {
    const route = relative(dir, p).split(sep).slice(0, -1).join('/');
    return route ? `${SITE_URL}/${route}` : SITE_URL;
  })
  .sort();

const today = new Date().toISOString().slice(0, 10);
await writeFile(
  join(dir, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${u}</loc><lastmod>${today}</lastmod></url>`).join('\n')}
</urlset>
`,
);

await writeFile(
  join(dir, 'robots.txt'),
  `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`,
);

console.log(`postbuild: wrote 404.html, robots.txt and sitemap.xml (${urls.length} URLs)`);
