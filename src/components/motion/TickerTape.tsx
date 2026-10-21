import { Link } from 'react-router';
import { clubLore, clubs } from '~/canon';
import { quote } from '~/lib/market';
import { CLUB_PATH } from '~/site-map';
import { useToday } from './hooks';
import { Marquee } from './Marquee';

/**
 * A terminal-style tape of all 30 listed clubs. Prerendered at listing
 * prices; on hydration it switches to the day's indicative quotes (the same
 * deterministic numbers as the Investor Relations board).
 */
export function TickerTape({ className = '' }: { className?: string }) {
  const today = useToday();
  return (
    <Marquee
      duration={90}
      label="Indicative club quotes"
      className={`border-y border-rule bg-ground/70 backdrop-blur-sm ${className}`}
    >
      {clubs.map((c) => {
        const lore = clubLore[c.id]!;
        const q = today ? quote(lore.ticker, lore.listPrice, today) : null;
        const up = (q?.dayChange ?? 0) >= 0;
        return (
          <Link
            key={c.id}
            to={CLUB_PATH(c.id)}
            viewTransition
            className="figures flex items-center gap-2.5 border-r border-rule px-5 py-2.5 font-mono text-[11px] tracking-wide whitespace-nowrap hover:bg-surface"
          >
            <span className="font-medium text-ink">{lore.ticker}</span>
            <span className="text-ink-muted">£{(q?.price ?? lore.listPrice).toFixed(2)}</span>
            {q && (
              <span className={up ? 'text-[#7dd3a8]' : 'text-[#f08a7e]'}>
                <span aria-hidden="true">{up ? '▲' : '▼'}</span>
                <span className="sr-only">{up ? 'up' : 'down'}</span>
                {Math.abs(q.dayChange).toFixed(2)}%
              </span>
            )}
          </Link>
        );
      })}
    </Marquee>
  );
}

/** A small price line. Decorative: the figures beside it carry the meaning. */
export function Sparkline({
  values,
  className = '',
  width = 96,
  height = 28,
}: {
  values: number[];
  className?: string;
  width?: number;
  height?: number;
}) {
  if (values.length < 2) return null;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = max - min || 1;
  const d = values
    .map((v, i) => {
      const x = (i / (values.length - 1)) * width;
      const y = height - 2 - ((v - min) / span) * (height - 4);
      return `${i ? 'L' : 'M'}${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(' ');
  const up = values[values.length - 1]! >= values[0]!;
  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      height={height}
      aria-hidden="true"
      className={`overflow-visible ${className}`}
    >
      <path
        d={d}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
        pathLength={1}
        data-reveal="draw"
        className={up ? 'text-navy' : 'text-foil'}
      />
    </svg>
  );
}
