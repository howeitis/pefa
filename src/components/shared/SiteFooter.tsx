import { Link } from 'react-router';
import { pageFor, type Material } from '~/site-map';
import { LegalTicker } from './LegalTicker';
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
  const emblem =
    material === 'floodlight' ? '/brand/pefa-emblem-on-dark.svg' : '/brand/pefa-emblem.svg';

  return (
    <footer className="mt-auto">
      <LegalTicker />
      <div className="bg-ground">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.4fr_repeat(3,1fr)] lg:px-8">
          <div className="max-w-xs">
            <img
              src={emblem}
              alt=""
              width={48}
              height={48}
              loading="lazy"
              className="mb-4 h-12 w-12"
            />
            <p className="font-display text-lg leading-snug">
              Results remain unscripted.
              <br />
              Revenue does not.
            </p>
          </div>
          {COLUMNS.map((col) => (
            <nav key={col.heading} aria-label={col.heading}>
              <h2 className="smallcaps mb-3 text-ink-muted">{col.heading}</h2>
              <ul className="space-y-2 text-sm">
                {col.paths.map((path) => {
                  const page = pageFor(path);
                  return (
                    <li key={path}>
                      <Link to={path} className="hover:text-accent">
                        {page?.label ?? page?.title ?? path}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          ))}
        </div>
        <div className="mx-auto max-w-7xl border-t border-rule px-4 py-5 text-xs text-ink-muted sm:px-6 lg:px-8">
          © PEFA™ Private Equity Football Accelerate™. All rights reserved, and several others
          acquired.
        </div>
      </div>
      <FictionNotice />
    </footer>
  );
}
