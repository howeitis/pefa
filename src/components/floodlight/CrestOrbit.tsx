import type { CSSProperties } from 'react';
import { clubsIn, crestMini, league } from '~/canon';

/**
 * Fifteen founder crests on a slow inner orbit, five empty gold berths on
 * the outer one turning the other way: the shape of the league as a
 * diagram. Decorative; the page lists the clubs properly below.
 */
export function CrestOrbit() {
  const founders = clubsIn(league.permanentIds);
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
        {Array.from({ length: league.rotatingSlots }, (_, i) => {
          const a = (i / league.rotatingSlots) * 360 + 18;
          return (
            <span
              key={i}
              className="absolute left-1/2 top-1/2 -ml-3 -mt-3 h-6 w-6 rounded-full border-2 border-accent bg-ground shadow-[0_0_24px_rgb(229_184_66/0.6)]"
              style={{ transform: `rotate(${a}deg) translateY(-15rem)` }}
            />
          );
        })}
      </div>
    </div>
  );
}
