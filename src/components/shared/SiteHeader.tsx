import { type CSSProperties, useEffect, useId, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router';
import { PAGES, type Material } from '~/site-map';
import { LuxClock } from './LuxClock';
import { PlayLink } from './OocStrip';

const primary = PAGES.filter((p) => p.nav === 'primary');
const everything = PAGES.filter((p) => p.nav);

/**
 * The site header. Sticky; it turns to frosted glass once the page scrolls,
 * steps out of the way while reading downwards and comes back on the way up.
 * A gold line along its foot tracks reading progress. "Menu" opens a
 * full-screen index of every page.
 */
export function SiteHeader({ material }: { material: Material }) {
  // The menu remembers which page it was opened on, so navigating closes it
  // without an effect.
  const [openOn, setOpenOn] = useState<string | null>(null);
  const menuId = useId();
  const { pathname } = useLocation();
  const open = openOn === pathname;
  const [scrolled, setScrolled] = useState(false);
  const [tucked, setTucked] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);

  const lockup =
    material === 'floodlight' ? '/brand/pefa-lockup-on-dark.svg' : '/brand/pefa-lockup.svg';

  useEffect(() => {
    let last = window.scrollY;
    let frame = 0;
    const measure = () => {
      frame = 0;
      const y = window.scrollY;
      setScrolled(y > 12);
      if (Math.abs(y - last) > 6) {
        setTucked(y > last && y > 480);
        last = y;
      }
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const close = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpenOn(null);
        toggle.current?.focus();
      }
    };
    document.documentElement.style.overflow = 'hidden';
    panel.current?.querySelector<HTMLElement>('a')?.focus();
    window.addEventListener('keydown', close);
    return () => {
      document.documentElement.style.overflow = '';
      window.removeEventListener('keydown', close);
    };
  }, [open]);

  const solid = scrolled || open;

  return (
    <header
      className={`sticky top-0 z-50 transition-transform duration-500 [transition-timing-function:var(--ease-out-expo)] ${tucked && !open ? '-translate-y-full focus-within:translate-y-0' : ''}`}
      style={{ viewTransitionName: 'site-header' } as CSSProperties}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-surface focus:px-4 focus:py-2"
      >
        Skip to content
      </a>
      <div
        className={`relative border-b transition-[background-color,border-color,backdrop-filter] duration-500 ${solid ? 'border-rule bg-ground/85 backdrop-blur-xl backdrop-saturate-150' : 'border-transparent bg-ground'}`}
      >
        <div className="mx-auto flex h-[4.25rem] max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
          <Link to="/" viewTransition className="shrink-0" aria-label="PEFA™ home">
            <img src={lockup} alt="" width={472} height={120} className="h-9 w-auto sm:h-10" />
          </Link>

          <nav aria-label="Primary" className="hidden xl:block">
            <ul className="flex items-center gap-7 whitespace-nowrap text-[13px] font-medium">
              {primary.map((p) => (
                <li key={p.path}>
                  <NavLink
                    to={p.path}
                    viewTransition
                    className={({ isActive }) =>
                      `draw-link pb-1 transition-colors hover:text-ink ${isActive ? 'text-accent' : 'text-ink-muted'}`
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
              ref={toggle}
              type="button"
              className="group inline-flex h-10 items-center gap-3 rounded-full border border-rule pl-4 pr-3 text-[13px] font-medium transition-colors hover:border-accent"
              aria-expanded={open}
              aria-controls={menuId}
              onClick={() => setOpenOn(open ? null : pathname)}
            >
              <span className="hidden sm:inline">{open ? 'Close' : 'Menu'}</span>
              <span className="sr-only sm:hidden">{open ? 'Close menu' : 'Open menu'}</span>
              <span aria-hidden="true" className="relative block h-3 w-5">
                <span
                  className={`absolute left-0 block h-px w-5 bg-current transition-transform duration-500 ${open ? 'top-1.5 rotate-45' : 'top-0.5'}`}
                />
                <span
                  className={`absolute left-0 block h-px bg-current transition-all duration-500 ${open ? 'top-1.5 w-5 -rotate-45' : 'top-2.5 w-3.5 group-hover:w-5'}`}
                />
              </span>
            </button>
          </div>
        </div>
        <span
          aria-hidden="true"
          className="scroll-progress absolute inset-x-0 -bottom-px block h-px bg-accent"
        />
      </div>

      <div
        id={menuId}
        ref={panel}
        hidden={!open}
        className="menu-panel fixed inset-x-0 bottom-0 top-[4.25rem] overflow-y-auto bg-ground"
      >
        <div className="mx-auto grid min-h-full max-w-7xl gap-12 px-4 py-10 sm:px-6 lg:grid-cols-[1.6fr_1fr] lg:px-8 lg:py-16">
          <nav aria-label="Site menu">
            <ul className="divide-y divide-rule border-y border-rule">
              {everything.map((p, i) => (
                <li key={p.path} className="overflow-hidden">
                  <NavLink
                    to={p.path}
                    viewTransition
                    style={{ '--i': i } as CSSProperties}
                    className={({ isActive }) =>
                      `menu-rise group flex items-baseline gap-5 py-3 sm:py-4 ${isActive ? 'text-accent' : 'text-ink hover:text-accent'}`
                    }
                  >
                    <span className="smallcaps figures w-8 shrink-0 text-ink-muted">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="font-display text-3xl leading-tight transition-transform duration-500 group-hover:translate-x-2 sm:text-5xl">
                      {p.label ?? p.title}
                    </span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
          <div className="smallcaps flex flex-col gap-8 text-ink-muted lg:pt-4">
            <div className="space-y-2">
              <p className="text-accent">Registered office</p>
              <p>Luxembourg · Est. 14 May 2035</p>
              <LuxClock />
            </div>
            <div className="space-y-2">
              <p className="text-accent">Markets</p>
              <p className="flex items-center gap-2">
                <span className="live-dot" aria-hidden="true" /> Always open
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-accent">Enquiries</p>
              <p>By invitation</p>
            </div>
            <div className="normal-case tracking-normal">
              <PlayLink />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
