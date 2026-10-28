/**
 * After the build:
 * - 404.html: static hosts (Vercel, `serve`) answer unknown paths with it.
 *   The SPA fallback shell hydrates into the router's catch-all route, which
 *   renders the not-invited page, so it doubles as the 404.
 * - sitemap.xml and robots.txt, from the pages that were actually
 *   prerendered, so the sitemap can never list a page that doesn't exist.
 *   robots.txt also names the AI search and assistant crawlers: `*` already
 *   allows them, but a group addressed to them by name is unambiguous.
 * - llms.txt, from src/content/llms.md with the FAQ /play renders
 *   (src/content/game.ts) and the origin in src/site.json, so a domain move
 *   is one edit.
 */
import { copyFile, readdir, readFile, writeFile } from 'node:fs/promises';
import { join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { FAQ, SITE_URL } from '../src/content/game.ts';
import { PLAY_LINKS } from '../src/play-links.ts';

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

const AI_CRAWLERS = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-SearchBot',
  'Claude-User',
  'PerplexityBot',
  'Perplexity-User',
  'Google-Extended',
  'Applebot-Extended',
  'CCBot',
];
await writeFile(
  join(dir, 'robots.txt'),
  [
    'User-agent: *',
    'Allow: /',
    '',
    ...AI_CRAWLERS.map((bot) => `User-agent: ${bot}`),
    'Allow: /',
    '',
    `Sitemap: ${SITE_URL}/sitemap.xml`,
    '',
  ].join('\n'),
);

const llms = (await readFile(new URL('../src/content/llms.md', import.meta.url), 'utf8'))
  .replaceAll('{{SITE_URL}}', SITE_URL)
  .replaceAll('{{PLAY_URL}}', PLAY_LINKS.web)
  .replaceAll('{{ANDROID_URL}}', PLAY_LINKS.android)
  .replace('{{FAQ}}', FAQ.map(({ q, a }) => `### ${q}\n\n${a}`).join('\n\n'));
await writeFile(join(dir, 'llms.txt'), llms);

console.log(
  `postbuild: wrote 404.html, robots.txt, llms.txt and sitemap.xml (${urls.length} URLs)`,
);
