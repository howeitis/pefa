import { Link } from 'react-router';
import { pageFor, type Material } from '~/site-map';
import { LegalTicker } from './LegalTicker';
import { LuxClock } from './LuxClock';
import { FictionNotice } from './OocStrip';

const COLUMNS: { heading: string; paths: string[] }[] = [
  {
    heading: 'The League',
    paths: ['/superior-league', '/synergy-draft', '/superior-venue', '/technology'],
  },
  {
    heading: 'Corporate',
    paths: ['/investors', '/governance', '/leadership', '/newsroom', '/careers', '/partners'],
  },
  { heading: 'Supporters', paths: ['/support', '/legal'] },
];

export function SiteFooter({ material }: { material: Material }) {
  const dark = material === 'floodlight';
  const emblem = dark ? '/brand/pefa-emblem-on-dark.svg' : '/brand/pefa-emblem.svg';
  const wordmark = dark ? '/brand/pefa-wordmark-on-dark.svg' : '/brand/pefa-wordmark.svg';

  return (
    <footer className="mt-auto">
      <LegalTicker />
      <div className="relative overflow-hidden bg-ground">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 pb-10 pt-16 sm:px-6 md:grid-cols-[1.4fr_repeat(3,1fr)] lg:px-8 lg:pt-24">
          <div className="max-w-xs">
            <img
              src={emblem}
              alt=""
              width={48}
              height={48}
              loading="lazy"
              className="mb-6 h-12 w-12"
            />
            <p className="font-display text-2xl leading-snug">
              Results remain unscripted.
              <br />
              <span className="text-accent">Revenue does not.</span>
            </p>
          </div>
          {COLUMNS.map((col) => (
            <nav key={col.heading} aria-label={col.heading}>
              <h2 className="smallcaps mb-5 text-ink-muted">{col.heading}</h2>
              <ul className="space-y-3 text-sm">
                {col.paths.map((path) => {
                  const page = pageFor(path);
                  return (
                    <li key={path}>
                      <Link to={path} viewTransition className="draw-link hover:text-accent">
                        {page?.label ?? page?.title ?? path}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-hidden="true">
          <img
            src={wordmark}
            alt=""
            width={296}
            height={104}
            loading="lazy"
            data-reveal="clip"
            className="w-full opacity-[0.07] [mask-image:linear-gradient(to_bottom,#000_40%,transparent)]"
          />
        </div>

        <div className="mx-auto flex max-w-7xl flex-col gap-3 border-t border-rule px-4 py-6 text-xs text-ink-muted sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>
            © PEFA™ Private Equity Football Accelerate™. All rights reserved, and several others
            acquired.
          </p>
          <p className="flex items-center gap-5">
            <LuxClock />
            <a href="#main" className="font-mono uppercase tracking-wider hover:text-ink">
              Top <span aria-hidden="true">↑</span>
            </a>
          </p>
        </div>
      </div>
      <FictionNotice />
    </footer>
  );
}
