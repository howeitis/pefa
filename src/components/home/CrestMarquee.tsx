import { Link } from 'react-router';
import { type Club, clubLore, clubs, crestThumb } from '~/canon';
import { Marquee } from '~/components/motion/Marquee';
import { CLUB_PATH } from '~/site-map';

function Holding({ club }: { club: Club }) {
  const lore = clubLore[club.id]!;
  return (
    <Link
      to={CLUB_PATH(club.id)}
      viewTransition
      className="group mx-2 flex w-64 shrink-0 items-center gap-4 rounded-sm border border-rule bg-surface/40 p-4 transition-colors duration-500 hover:border-accent/60 hover:bg-surface"
    >
      <img
        src={crestThumb(club)}
        alt=""
        width={41}
        height={48}
        loading="lazy"
        decoding="async"
        className="h-12 w-auto transition-transform duration-700 group-hover:scale-110"
      />
      <span className="min-w-0">
        <span className="block truncate text-sm font-medium">{club.name}</span>
        <span className="smallcaps mt-1 block text-ink-muted">
          {lore.ticker} · £{lore.valuationBn}bn
        </span>
      </span>
    </Link>
  );
}

/** All 28 holdings, in two rows running opposite ways. */
export function CrestMarquee() {
  const founders = clubs.filter((c) => c.membership === 'permanent');
  const pool = clubs.filter((c) => c.membership === 'global');
  return (
    <div className="space-y-4">
      <Marquee duration={70} label="Founder clubs">
        {founders.map((c) => (
          <Holding key={c.id} club={c} />
        ))}
      </Marquee>
      <Marquee duration={60} reverse label="Synergy Draft™ pool clubs">
        {pool.map((c) => (
          <Holding key={c.id} club={c} />
        ))}
      </Marquee>
    </div>
  );
}
