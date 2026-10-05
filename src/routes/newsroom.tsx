import { Link } from 'react-router';
import { FilingPage } from '~/components/filing/FilingPage';
import { Stamp } from '~/components/filing/Stamp';
import { SplitText } from '~/components/motion/SplitText';
import { formatReleaseDate, RELEASES } from '~/content/newsroom';
import { metaFor } from '~/meta';
import { NEWS_PATH } from '~/site-map';

export const meta = () => metaFor('/newsroom');

export default function Newsroom() {
  const [lead, ...rest] = RELEASES;
  return (
    <FilingPage width="max-w-6xl">
      <header className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
        <div>
          <p className="smallcaps flex items-center gap-2.5 text-ink-muted">
            <span aria-hidden="true" className="live-dot !bg-navy" /> PEFA™ · Newsroom
          </p>
          <h1 className="mt-5 max-w-3xl font-display text-5xl leading-[1.05] sm:text-7xl">
            <SplitText text="Statements and announcements" delay={120} />
          </h1>
        </div>
        <p className="smallcaps figures text-ink-muted sm:text-right">
          {RELEASES.length} releases on file
          <br />
          Alerts: by invitation
        </p>
      </header>

      {lead && (
        <Link
          viewTransition
          to={NEWS_PATH(lead.slug)}
          data-reveal="up"
          className="group relative mt-14 grid gap-8 overflow-hidden border border-rule bg-surface p-8 shadow-[0_30px_60px_-30px_rgb(15_30_54/0.35)] transition-colors hover:border-navy sm:p-12 lg:grid-cols-[1fr_auto]"
        >
          <div>
            <p className="smallcaps figures text-accent">
              Latest · {lead.dateline} ·{' '}
              <time dateTime={lead.date}>{formatReleaseDate(lead.date)}</time>
            </p>
            <h2 className="mt-5 max-w-3xl font-display text-3xl leading-tight transition-colors group-hover:text-accent sm:text-5xl">
              {lead.title}
            </h2>
            <p className="mt-5 max-w-2xl text-lg text-ink-muted">{lead.summary}</p>
            <p className="mt-8 font-semibold">
              Read the release{' '}
              <span aria-hidden="true" className="arrow">
                →
              </span>
            </p>
          </div>
          <div className="self-start lg:pt-2">
            <Stamp tone="navy">For immediate release</Stamp>
          </div>
        </Link>
      )}

      <ol className="mt-12 border-t-2 border-ink">
        {rest.map((r) => (
          <li key={r.slug} data-reveal="row" className="border-b border-rule">
            <Link
              viewTransition
              to={NEWS_PATH(r.slug)}
              className="group grid gap-2 py-6 transition-colors hover:bg-surface sm:grid-cols-[11rem_1fr_auto] sm:gap-8 sm:px-3"
            >
              <p className="smallcaps figures pt-1.5 text-ink-muted">
                <time dateTime={r.date}>{formatReleaseDate(r.date)}</time>
                <span className="block">{r.dateline}</span>
              </p>
              <div>
                <h2 className="font-display text-2xl leading-snug transition-colors group-hover:text-accent">
                  {r.title}
                </h2>
                <p className="mt-2 text-ink-muted">{r.summary}</p>
              </div>
              <span
                aria-hidden="true"
                className="arrow hidden h-10 w-10 items-center justify-center self-center rounded-full border border-rule transition-colors group-hover:border-navy group-hover:bg-navy group-hover:text-parchment sm:flex"
              >
                →
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </FilingPage>
  );
}
