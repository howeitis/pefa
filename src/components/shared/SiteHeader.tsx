import { useId, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router';
import { PAGES, type Material } from '~/site-map';
import { PlayLink } from './OocStrip';

const primary = PAGES.filter((p) => p.nav === 'primary');

export function SiteHeader({ material }: { material: Material }) {
  // The menu remembers which page it was opened on, so navigating closes it
  // without an effect.
  const [openOn, setOpenOn] = useState<string | null>(null);
  const menuId = useId();
  const { pathname } = useLocation();
  const open = openOn === pathname;

  const lockup =
    material === 'floodlight' ? '/brand/pefa-lockup-on-dark.svg' : '/brand/pefa-lockup.svg';

  return (
    <header className="border-b border-rule bg-ground">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-surface focus:px-4 focus:py-2"
      >
        Skip to content
      </a>
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="shrink-0" aria-label="PEFA™ home">
          <img src={lockup} alt="" width={472} height={120} className="h-10 w-auto sm:h-11" />
        </Link>

        <nav aria-label="Primary" className="hidden xl:block">
          <ul className="flex items-center gap-6 whitespace-nowrap text-sm font-medium">
            {primary.map((p) => (
              <li key={p.path}>
                <NavLink
                  to={p.path}
                  className={({ isActive }) =>
                    `transition-colors hover:text-accent ${isActive ? 'text-accent' : 'text-ink-muted'}`
                  }
                >
                  {p.label ?? p.title}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden sm:block">
            <PlayLink />
          </div>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded border border-rule xl:hidden"
            aria-expanded={open}
            aria-controls={menuId}
            onClick={() => setOpenOn(open ? null : pathname)}
          >
            <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
            <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" />
              )}
            </svg>
          </button>
        </div>
      </div>

      <nav
        id={menuId}
        aria-label="Primary"
        hidden={!open}
        className="border-t border-rule xl:hidden"
      >
        <ul className="mx-auto max-w-7xl px-4 py-2 sm:px-6">
          {primary.map((p) => (
            <li key={p.path}>
              <NavLink
                to={p.path}
                className={({ isActive }) =>
                  `block py-3 text-base ${isActive ? 'text-accent' : 'text-ink'}`
                }
              >
                {p.label ?? p.title}
              </NavLink>
            </li>
          ))}
          <li className="py-3 sm:hidden">
            <PlayLink />
          </li>
        </ul>
      </nav>
    </header>
  );
}
