/**
 * Where a route's OG card lives. Shared by the page metadata (src/meta.ts)
 * and the card generator (scripts/build-og.mjs), so the two can't disagree.
 */
export function ogSlug(path: string): string {
  if (path === '/') return 'home';
  return path.replace(/^\/+|\/+$/g, '').replace(/\//g, '--');
}

export const ogImagePath = (path: string) => `/og/${ogSlug(path)}.jpg`;
