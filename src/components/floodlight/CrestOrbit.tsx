import { useEffect, useState, type CSSProperties } from 'react';
import { clubsIn, crestMini, league } from '~/canon';

/**
 * Three disjoint five-club waves covering all fifteen global partners so every
 * club takes a turn orbiting the fifteen permanent founders.
 */
const SLOT_ROTATIONS = [
  ['ny-citizens', 'la-cameo', 'retirement-fund'],
  ['rayados-industrial', 'al-alami', 'odiados'],
  ['shanghai-supply', 'pretoria-gold', 'al-zaeem'],
  ['pyramid-scheme', 'ba-millionaires', 'urawa-synthetic'],
  ['red-star-beijing', 'dc-diplomats', 'copacabana'],
].map(clubsIn);

const SWAP_INTERVAL_MS = 900;

/**
 * Fifteen founder crests on a slow inner orbit, five rotating global club
 * crests on the outer one turning the other way and cycling frequently through
 * all fifteen global partners. Decorative; the page lists the clubs properly below.
 */
export function CrestOrbit() {
  const founders = clubsIn(league.permanentIds);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = window.setInterval(() => setTick((t) => t + 1), SWAP_INTERVAL_MS);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div aria-hidden="true" className="orbit relative hidden h-[30rem] w-[30rem] shrink-0 lg:block">
      <div className="absolute inset-0 rounded-full border border-dashed border-rule" />
      <div className="absolute inset-[18%] rounded-full border border-rule" />
      <div className="absolute inset-[34%] rounded-full bg-[radial-gradient(circle,rgb(229_184_66/0.18),transparent_70%)]" />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="font-display text-7xl text-ink">{league.size}</span>
        <span className="smallcaps mt-2 text-ink-muted">Clubs · 15 + 5</span>
      </div>
      <div
        className="orbit-ring absolute inset-[18%]"
        style={{ '--orbit': '80s' } as CSSProperties}
      >
        {founders.map((c, i) => {
          const a = (i / founders.length) * 360;
          return (
            <span
              key={c.id}
              className="absolute left-1/2 top-1/2 -ml-5 -mt-5 h-10 w-10"
              style={{ transform: `rotate(${a}deg) translateY(-9.6rem) rotate(${-a}deg)` }}
            >
              <img
                src={crestMini(c)}
                alt=""
                width={34}
                height={40}
                className="orbit-counter h-10 w-auto"
              />
            </span>
          );
        })}
      </div>
      <div
        className="orbit-ring absolute inset-0"
        style={{ '--orbit': '50s', animationDirection: 'reverse' } as CSSProperties}
      >
        {SLOT_ROTATIONS.map((slotClubs, i) => {
          const a = (i / SLOT_ROTATIONS.length) * 360 + 18;
          const cycle = Math.floor(
            (tick + (SLOT_ROTATIONS.length - 1 - i)) / SLOT_ROTATIONS.length,
          );
          const club = slotClubs[cycle % slotClubs.length]!;
          return (
            <span
              key={i}
              className="absolute left-1/2 top-1/2 -ml-5 -mt-5 flex h-10 w-10 items-center justify-center"
              style={{ transform: `rotate(${a}deg) translateY(-15rem) rotate(${-a}deg)` }}
            >
              <span className="orbit-ring flex h-10 w-10 items-center justify-center">
                <img
                  key={club.id}
                  src={crestMini(club)}
                  alt=""
                  width={34}
                  height={40}
                  className="orbit-swap h-10 w-auto object-contain"
                />
              </span>
            </span>
          );
        })}
      </div>
    </div>
  );
}
