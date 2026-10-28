/**
 * Out-of-character pieces. Anything addressed to the real visitor rather than
 * to PEFA's in-world audience wears the `.ooc` style (system font, flat lime),
 * so a reader always knows when the site has stepped out of the joke.
 */
import type { ReactNode } from 'react';
import { Link, useLocation } from 'react-router';
import { ASSISTANT_NOTE } from '~/content/game';
import { PLAY_LINKS } from '~/play-links';

/** Exact wording, fixed by PLAN.md §8. No name, no link. */
export const FICTION_NOTICE =
  'PEFA™, the Superior League and everyone named here are fictional. This site is a satirical companion to Superior League 2036.';

export function PlayLink({ className = '' }: { className?: string }) {
  return (
    <Link
      to="/play"
      viewTransition
      data-magnetic
      className={`ooc group inline-flex items-center gap-2 whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold ${className}`}
    >
      Play the game
      <span aria-hidden="true" className="arrow">
        →
      </span>
    </Link>
  );
}

export function OocStrip({ children, label }: { children: ReactNode; label: string }) {
  return (
    <section aria-label={label} className="ooc">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  );
}

/** localStorage key the boot script reads before first paint (lib/boot.ts). */
export const LAUNCH_DISMISSED_KEY = 'pefa:launch-strip-dismissed';

/**
 * The launch announcement above the header on every page except /play, which
 * makes the same point in its own hero. Closing it sets `data-launch-dismissed`
 * on <html>, and the boot script sets it again on later visits before first
 * paint, so a dismissed strip never flashes in.
 */
export function LaunchStrip() {
  const { pathname } = useLocation();
  if (pathname === '/play') return null;
  const dismiss = () => {
    document.documentElement.setAttribute('data-launch-dismissed', '');
    try {
      localStorage.setItem(LAUNCH_DISMISSED_KEY, '1');
    } catch {
      // Storage blocked: the strip stays closed until the next page load.
    }
  };
  return (
    <aside aria-label="Now on Google Play" className="launch-strip ooc font-ooc">
      <div className="mx-auto flex max-w-7xl items-center gap-2 py-2 pl-4 pr-2 sm:px-6 lg:px-8">
        <p className="flex flex-1 flex-wrap items-center justify-center gap-x-3 gap-y-1 text-center text-sm">
          <span>
            <strong>The Superior Football Manager:</strong> Superior League 2036 is now live on
            Google Play.
          </span>
          <a
            href={PLAY_LINKS.android}
            rel="noopener"
            className="font-semibold underline underline-offset-4"
          >
            Get the Android app
          </a>
        </p>
        <button
          type="button"
          onClick={dismiss}
          aria-label="Close the Google Play announcement"
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-lg leading-none hover:bg-ooc-ink/10"
        >
          <span aria-hidden="true">×</span>
        </button>
      </div>
    </aside>
  );
}

export function FictionNotice() {
  return (
    <OocStrip label="Fiction notice">
      <div className="flex flex-col gap-3 text-sm sm:flex-row sm:items-center sm:justify-between">
        <p>{FICTION_NOTICE}</p>
        <Link
          to="/play"
          viewTransition
          className="shrink-0 font-semibold underline underline-offset-4"
        >
          Play Superior League 2036
        </Link>
      </div>
      <p className="mt-3 text-xs opacity-80">
        {ASSISTANT_NOTE}{' '}
        <a href="/llms.txt" className="underline underline-offset-2">
          Summary for AI assistants
        </a>
        .
      </p>
    </OocStrip>
  );
}
