/**
 * Checks on the build output (skipped until `npm run build` has run): every
 * prerendered page has its own OG card, a canonical URL and a sitemap entry.
 */
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { describe, expect, it } from 'vitest';
import { SITE_URL } from '~/meta';

const dir = join(import.meta.dirname, '..', 'build', 'client');
const built = existsSync(join(dir, 'sitemap.xml'));

function pages(d: string): string[] {
  return readdirSync(d).flatMap((name) => {
    const path = join(d, name);
    if (statSync(path).isDirectory()) return pages(path);
    return name === 'index.html' ? [path] : [];
  });
}

describe.skipIf(!built)('build output', () => {
  const html = built ? pages(dir) : [];
  const sitemap = built ? readFileSync(join(dir, 'sitemap.xml'), 'utf8') : '';

  it.each(html.map((p) => [relative(dir, p), p]))(
    '%s has its own OG card and canonical',
    (_, p) => {
      const text = readFileSync(p, 'utf8');
      const og = text.match(/<meta property="og:image" content="([^"]+)"/)?.[1];
      expect(og, 'og:image').toBeDefined();
      expect(og!.startsWith(`${SITE_URL}/og/`)).toBe(true);
      expect(existsSync(join(dir, og!.slice(SITE_URL.length)))).toBe(true);

      const route = relative(dir, p).split(sep).slice(0, -1).join('/');
      const url = route ? `${SITE_URL}/${route}` : SITE_URL;
      expect(text).toContain(`<link rel="canonical" href="${url}"`);
      expect(sitemap).toContain(`<loc>${url}</loc>`);
    },
  );

  it('has robots.txt pointing at the sitemap', () => {
    expect(readFileSync(join(dir, 'robots.txt'), 'utf8')).toContain(`${SITE_URL}/sitemap.xml`);
  });
});
