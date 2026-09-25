/**
 * Press releases: one MDX file per release in ./newsroom, with frontmatter.
 * Eagerly globbed so the index and every post prerender at build time.
 */
import type { ComponentType } from 'react';

export interface ReleaseFrontmatter {
  title: string;
  /** ISO date, in-world. */
  date: string;
  /** Dateline city, e.g. "Luxembourg". */
  dateline: string;
  summary: string;
  /** Count of redactions the release admits to. Displayed, never explained. */
  redactions?: number;
}

export interface Release extends ReleaseFrontmatter {
  slug: string;
  Content: ComponentType;
}

const modules = import.meta.glob<{ default: ComponentType; frontmatter: ReleaseFrontmatter }>(
  './newsroom/*.mdx',
  { eager: true },
);

export const RELEASES: Release[] = Object.entries(modules)
  .map(([file, mod]) => ({
    ...mod.frontmatter,
    slug: file.replace(/^.*\/(.+)\.mdx$/, '$1'),
    Content: mod.default,
  }))
  .sort((a, b) => b.date.localeCompare(a.date));

export const releaseBySlug = (slug: string) => RELEASES.find((r) => r.slug === slug);

export function formatReleaseDate(iso: string): string {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });
}
