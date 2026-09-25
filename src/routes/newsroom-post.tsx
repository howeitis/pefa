import { Link } from 'react-router';
import type { Route } from './+types/newsroom-post';
import { NotInvited, notInvitedMeta } from '~/components/shared/NotInvited';
import { formatReleaseDate, releaseBySlug } from '~/content/newsroom';
import { pageMeta } from '~/meta';
import { NEWS_PATH } from '~/site-map';

// No loader, for the same reason as the club pages: releases are bundled MDX,
// so an unknown slug renders the 404 instead of a failed data fetch.
export const meta = ({ params }: Route.MetaArgs) => {
  const release = releaseBySlug(params.slug);
  return release
    ? pageMeta({
        path: NEWS_PATH(release.slug),
        title: release.title,
        description: release.summary,
      })
    : notInvitedMeta;
};

export default function NewsroomPost({ params }: Route.ComponentProps) {
  const release = releaseBySlug(params.slug);
  if (!release) return <NotInvited />;
  const { Content } = release;
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
      <Link to="/newsroom" className="smallcaps text-ink-muted hover:text-accent">
        ← Newsroom
      </Link>
      <article className="mt-6 border border-rule bg-surface p-6 sm:p-12">
        <p className="smallcaps text-ink-muted">For immediate release</p>
        <h1 className="mt-3 font-display text-3xl leading-tight sm:text-4xl">{release.title}</h1>
        <p className="smallcaps figures mt-4 text-ink-muted">
          {release.dateline} ·{' '}
          <time dateTime={release.date}>{formatReleaseDate(release.date)}</time>
        </p>
        <div className="prose-filing mt-8">
          <Content />
        </div>
        <p className="mt-10 text-center text-ink-muted" aria-label="End of release">
          ###
        </p>
      </article>
    </div>
  );
}
