import type { MetaDescriptor } from 'react-router';
import { pageFor, type SitePage } from './site-map';

export const SITE_NAME = 'PEFA™';
export const SITE_URL = 'https://pefa-alpha.vercel.app';

/** Standard title/description/OG tags for a page. */
export function pageMeta(
  page: Pick<SitePage, 'title' | 'description' | 'path'>,
  { image = '/og-image.jpg' }: { image?: string } = {},
): MetaDescriptor[] {
  const title = page.path === '/' ? page.title : `${page.title} · ${SITE_NAME}`;
  const url = `${SITE_URL}${page.path === '/' ? '' : page.path}`;
  return [
    { title },
    { name: 'description', content: page.description },
    { property: 'og:type', content: 'website' },
    { property: 'og:site_name', content: SITE_NAME },
    { property: 'og:title', content: title },
    { property: 'og:description', content: page.description },
    { property: 'og:url', content: url },
    { property: 'og:image', content: `${SITE_URL}${image}` },
    { name: 'twitter:card', content: 'summary_large_image' },
    { tagName: 'link', rel: 'canonical', href: url },
  ];
}

/** Meta for a static page registered in the site map. */
export function metaFor(path: string): MetaDescriptor[] {
  const page = pageFor(path);
  return page ? pageMeta(page) : [{ title: SITE_NAME }];
}
