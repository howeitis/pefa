import type { Config } from '@react-router/dev/config';
import { readdirSync } from 'node:fs';
import { prerenderPaths } from './src/site-map';

const newsSlugs = () =>
  readdirSync(new URL('./src/content/newsroom', import.meta.url))
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => f.replace(/\.mdx$/, ''));

export default {
  appDirectory: 'src',
  // Static site: every route is prerendered to HTML at build time and
  // hydrates as React. No server, so no cookies and nothing to collect.
  ssr: false,
  prerender: () => prerenderPaths(newsSlugs()),
} satisfies Config;
