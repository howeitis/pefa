/**
 * Out-of-character pieces. Anything addressed to the real visitor rather than
 * to PEFA's in-world audience wears the `.ooc` style (system font, flat lime),
 * so a reader always knows when the site has stepped out of the joke.
 */
import type { ReactNode } from 'react';
import { Link } from 'react-router';

/** Exact wording, fixed by PLAN.md §8. No name, no link. */
export const FICTION_NOTICE =
  'PEFA™, the Superior League and everyone named here are fictional. This site is a satirical companion to Superior League 2036.';

export function PlayLink({ className = '' }: { className?: string }) {
  return (
    <Link
      to="/play"
      className={`ooc inline-flex items-center gap-2 whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold ${className}`}
    >
      Play the game
      <span aria-hidden="true">→</span>
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

export function FictionNotice() {
  return (
    <OocStrip label="Fiction notice">
      <div className="flex flex-col gap-3 text-sm sm:flex-row sm:items-center sm:justify-between">
        <p>{FICTION_NOTICE}</p>
        <Link to="/play" className="shrink-0 font-semibold underline underline-offset-4">
          Play Superior League 2036
        </Link>
      </div>
    </OocStrip>
  );
}
