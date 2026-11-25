import { useEffect, useState, type CSSProperties } from 'react';
import { clubsIn, crestMini, league } from '~/canon';

/**
 * Three disjoint five-club spotlight waves covering all fifteen global
 * partners, so every crest gets the spotlight as the lottery cycles.
 */
const SPOTLIGHT_WAVES: string[][] = [
  ['la-cameo', 'al-alami', 'pretoria-gold', 'ba-millionaires', 'dc-diplomats'],
  ['ny-citizens', 'rayados-industrial', 'shanghai-supply', 'pyramid-scheme', 'red-star-beijing'],
  ['retirement-fund', 'odiados', 'al-zaeem', 'urawa-synthetic', 'copacabana'],
];

const WAVE_INTERVAL_MS = 2200;

/**
 * Synergy Draft™ hero diagram: all fifteen global partner crests inside the
 * draft ring, rotating five spotlights across every club in the pool.
 * Decorative; the full pool is listed interactively below.
 */
export function DraftCrestHero() {
  const pool = clubsIn(league.globalIds);
  const [wave, setWave] = useState(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = window.setInterval(
      () => setWave((w) => (w + 1) % SPOTLIGHT_WAVES.length),
      WAVE_INTERVAL_MS,
    );
    return () => window.clearInterval(id);
  }, []);

  const activeWave = SPOTLIGHT_WAVES[wave]!;

  return (
    <div
      aria-hidden="true"
      className="relative hidden h-[26rem] w-[26rem] shrink-0 flex-col items-center justify-center rounded-full border border-rule bg-[radial-gradient(circle,rgb(229_184_66/0.12),transparent_70%)] px-11 lg:flex"
    >
      <div className="grid grid-cols-5 gap-x-2.5 gap-y-3.5">
        {pool.map((club) => {
          const spotlightIndex = activeWave.indexOf(club.id);
          const isLit = spotlightIndex >= 0;
          return (
            <span
              key={club.id}
              className={
                isLit
                  ? 'flex h-[3.25rem] w-[3.25rem] scale-110 items-center justify-center rounded-full border-2 border-accent bg-accent/20 p-1.5 opacity-100 shadow-[0_0_24px_rgb(229_184_66/0.6)] transition-all duration-700 motion-reduce:scale-100 motion-reduce:transition-none'
                  : 'flex h-[3.25rem] w-[3.25rem] scale-100 items-center justify-center rounded-full border border-rule bg-ground/70 p-1.5 opacity-40 shadow-none transition-all duration-700 motion-reduce:transition-none'
              }
              style={
                isLit
                  ? ({ transitionDelay: `${spotlightIndex * 90}ms` } as CSSProperties)
                  : undefined
              }
            >
              <img
                src={crestMini(club)}
                alt=""
                width={34}
                height={34}
                className="h-8 w-8 object-contain"
              />
            </span>
          );
        })}
      </div>
      <span className="smallcaps mt-6 text-ink-muted">Weighted by tier</span>
    </div>
  );
}
