import { type Club, wordmarkSrc } from '~/canon';

/**
 * Width-over-height aspect ratio for each of the 30 bespoke club wordmarks
 * (matching `CLUB_WORDMARK_ASPECTS` in superior-league-2036).
 */
const ASPECTS: Record<string, number> = {
  armory: 2.6243,
  kensington: 2.4607,
  'boston-reds': 2.2591,
  citizens: 2.4471,
  'red-devils': 2.9086,
  'white-hart-loan': 2.8133,
  almostico: 2.4115,
  'more-than-a-club': 2.1081,
  vardrid: 3.1978,
  'milano-runway': 2.5467,
  debito: 3.7036,
  piemonte: 3.6867,
  'saint-sovereign': 2.0288,
  'bavarian-monopoly': 2.0926,
  'borussia-export': 3.5231,
  'retirement-fund': 3.7407,
  'la-cameo': 5.0219,
  'ny-citizens': 2.0761,
  odiados: 2.4804,
  'rayados-industrial': 3.0738,
  'al-zaeem': 2.1586,
  'al-alami': 2.3123,
  'shanghai-supply': 2.347,
  'urawa-synthetic': 2.7605,
  'pyramid-scheme': 2.6453,
  'pretoria-gold': 3.4805,
  copacabana: 2.3058,
  'ba-millionaires': 2.6899,
  'red-star-beijing': 2.9854,
  'dc-diplomats': 2.6417,
};

/**
 * Renders a club's bespoke lettering wordmark. Use `tone="dark"` on Floodlight
 * (dark) surfaces and `tone="light"` on Filing (paper) surfaces.
 */
export function ClubWordmark({
  club,
  tone = 'dark',
  align = 'left',
  decorative = false,
  eager = false,
  className = '',
}: {
  club: Club;
  tone?: 'dark' | 'light';
  align?: 'left' | 'center' | 'right';
  /** Set true when adjacent visible text already names the club. */
  decorative?: boolean;
  eager?: boolean;
  className?: string;
}) {
  const ratio = ASPECTS[club.id] ?? 2.6;
  const alignClass =
    align === 'center' ? 'object-center' : align === 'right' ? 'object-right' : 'object-left';
  return (
    <img
      src={wordmarkSrc(club, tone)}
      alt={decorative ? '' : club.name}
      width={Math.round(100 * ratio)}
      height={100}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      className={`block max-w-full object-contain ${alignClass} ${className}`}
    />
  );
}
