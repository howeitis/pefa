import { Link } from 'react-router';
import { formatReleaseDate, RELEASES } from '~/content/newsroom';
import { metaFor } from '~/meta';
import { NEWS_PATH } from '~/site-map';

export const meta = () => metaFor('/newsroom');

export default function Newsroom() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24">
      <p className="smallcaps text-ink-muted">PEFA™ · Newsroom</p>
      <h1 className="mt-4 font-display text-4xl sm:text-5xl">Statements and announcements</h1>
      <ol className="mt-12 divide-y divide-rule border-y border-rule">
        {RELEASES.map((r) => (
          <li key={r.slug} className="py-6">
            <p className="smallcaps figures text-ink-muted">
              {r.dateline} · <time dateTime={r.date}>{formatReleaseDate(r.date)}</time>
            </p>
            <h2 className="mt-2 font-display text-2xl">
              <Link to={NEWS_PATH(r.slug)} className="hover:text-accent">
                {r.title}
              </Link>
            </h2>
            <p className="mt-2 text-ink-muted">{r.summary}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
