import { Link } from 'react-router';
import { type Club, crestThumb } from '~/canon';
import { CLUB_PATH } from '~/site-map';

/**
 * A grid of club crests linking to their listing pages. `lit` marks clubs to
 * highlight (the five in the promo reel's draft scene); everything else is
 * dimmed when any are lit. Highlighting is illustrative and never a result.
 */
export function CrestGrid({
  clubs,
  lit,
  columns = 'grid-cols-3 sm:grid-cols-5',
}: {
  clubs: Club[];
  lit?: string[];
  columns?: string;
}) {
  return (
    <ul className={`grid gap-px overflow-hidden rounded-sm border border-rule bg-rule ${columns}`}>
      {clubs.map((club) => {
        const on = lit?.includes(club.id);
        const dim = lit && !on;
        return (
          <li key={club.id} data-reveal="scale" className="bg-ground">
            <Link
              to={CLUB_PATH(club.id)}
              viewTransition
              className={`spotlight group relative flex h-full flex-col items-center px-2 py-8 text-center transition-colors duration-500 hover:bg-surface ${on ? 'bg-surface' : ''}`}
            >
              {on && (
                <span
                  aria-hidden="true"
                  className="absolute inset-0 animate-[pulse_2.4s_ease-in-out_infinite] bg-[radial-gradient(circle_at_50%_40%,rgb(229_184_66/0.22),transparent_60%)] motion-reduce:animate-none"
                />
              )}
              <span className="relative flex h-24 w-24 items-center justify-center">
                <img
                  src={crestThumb(club)}
                  alt=""
                  width={82}
                  height={96}
                  loading="lazy"
                  decoding="async"
                  className={`relative h-20 w-auto transition duration-700 [transition-timing-function:var(--ease-out-expo)] group-hover:-translate-y-1 group-hover:scale-110 sm:h-24 ${dim ? 'opacity-35 grayscale group-hover:opacity-100 group-hover:grayscale-0 group-focus-visible:opacity-100' : ''}`}
                />
              </span>
              <span className="relative mt-4 text-sm font-medium leading-snug">
                {club.cardName}
              </span>
              <span className="smallcaps relative mt-1 text-ink-muted">{club.city}</span>
              {on && <span className="sr-only">(highlighted)</span>}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
