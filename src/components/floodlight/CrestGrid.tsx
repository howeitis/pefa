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
    <ul className={`grid gap-x-4 gap-y-8 ${columns}`}>
      {clubs.map((club) => {
        const dim = lit && !lit.includes(club.id);
        return (
          <li key={club.id} className="reveal">
            <Link to={CLUB_PATH(club.id)} className="group flex flex-col items-center text-center">
              <span className="relative flex h-24 w-24 items-center justify-center">
                {lit?.includes(club.id) && (
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 rounded-full bg-gold/25 blur-xl"
                  />
                )}
                <img
                  src={crestThumb(club)}
                  alt=""
                  width={82}
                  height={96}
                  loading="lazy"
                  decoding="async"
                  className={`relative h-24 w-auto transition group-hover:scale-105 ${dim ? 'opacity-40 grayscale group-hover:opacity-100 group-hover:grayscale-0 group-focus-visible:opacity-100' : ''}`}
                />
              </span>
              <span className="mt-3 text-sm font-medium leading-snug">{club.cardName}</span>
              <span className="text-xs text-ink-muted">{club.city}</span>
              {lit?.includes(club.id) && <span className="sr-only">(highlighted)</span>}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
