/**
 * Small animated diagrams for the three products. Decorative (aria-hidden);
 * each stands still under reduced motion.
 */

/** The league: fifteen fixed seats, and five guest berths circling outside them. */
export function LeagueMotif() {
  return (
    <svg viewBox="0 0 200 200" aria-hidden="true" className="h-full w-full overflow-visible">
      <circle cx="100" cy="100" r="58" fill="none" stroke="var(--rule)" />
      <circle cx="100" cy="100" r="86" fill="none" stroke="var(--rule)" strokeDasharray="2 5" />
      {Array.from({ length: 15 }, (_, i) => {
        const a = (i / 15) * Math.PI * 2 - Math.PI / 2;
        return (
          <circle
            key={i}
            cx={100 + Math.cos(a) * 58}
            cy={100 + Math.sin(a) * 58}
            r="5"
            fill="var(--ink)"
          />
        );
      })}
      <g className="origin-center animate-[spin_24s_linear_infinite] motion-reduce:animate-none [transform-box:view-box]">
        {Array.from({ length: 5 }, (_, i) => {
          const a = (i / 5) * Math.PI * 2;
          return (
            <circle
              key={i}
              cx={100 + Math.cos(a) * 86}
              cy={100 + Math.sin(a) * 86}
              r="6"
              fill="var(--accent)"
            />
          );
        })}
      </g>
      <text x="100" y="96" textAnchor="middle" className="fill-ink font-display text-[26px]">
        15
      </text>
      <text x="100" y="114" textAnchor="middle" className="fill-ink-muted font-mono text-[8px]">
        + 5 BY DRAW
      </text>
    </svg>
  );
}

/** The draft: fifteen balls, five lighting in turn. */
export function DraftMotif() {
  const lit = [1, 5, 8, 11, 13];
  return (
    <svg viewBox="0 0 200 200" aria-hidden="true" className="h-full w-full">
      {Array.from({ length: 15 }, (_, i) => {
        const row = Math.floor(i / 5);
        const cx = 100 + ((i % 5) - 2) * 34;
        const cy = 62 + row * 38;
        const on = lit.indexOf(i);
        return (
          <g key={i}>
            <circle cx={cx} cy={cy} r="13" fill="none" stroke="var(--rule)" />
            {on >= 0 && (
              <circle
                cx={cx}
                cy={cy}
                r="13"
                fill="var(--accent)"
                className="motif-blink"
                style={{ animationDelay: `${on * 0.6}s` }}
              />
            )}
          </g>
        );
      })}
      <text x="100" y="186" textAnchor="middle" className="fill-ink-muted font-mono text-[8px]">
        WEIGHTED BY TIER
      </text>
    </svg>
  );
}

/** The venue: a stadium bowl, swept by a scanning beam. */
export function VenueMotif() {
  return (
    <svg viewBox="0 0 200 200" aria-hidden="true" className="h-full w-full">
      <defs>
        <linearGradient id="sweep" x1="0" x2="1">
          <stop offset="0" stopColor="var(--accent)" stopOpacity="0" />
          <stop offset="1" stopColor="var(--accent)" stopOpacity="0.55" />
        </linearGradient>
        <clipPath id="bowl">
          <ellipse cx="100" cy="100" rx="88" ry="62" />
        </clipPath>
      </defs>
      {[88, 70, 52].map((rx, i) => (
        <ellipse
          key={rx}
          cx="100"
          cy="100"
          rx={rx}
          ry={rx * 0.7}
          fill="none"
          stroke={i === 2 ? 'var(--ink)' : 'var(--rule)'}
        />
      ))}
      <rect x="66" y="78" width="68" height="44" fill="none" stroke="var(--ink)" />
      <line x1="100" y1="78" x2="100" y2="122" stroke="var(--ink)" />
      <g clipPath="url(#bowl)">
        <path
          d="M100 100 L200 60 L200 140 Z"
          fill="url(#sweep)"
          className="origin-center animate-[spin_6s_linear_infinite] motion-reduce:animate-none [transform-box:view-box]"
        />
      </g>
      <text x="100" y="186" textAnchor="middle" className="fill-ink-muted font-mono text-[8px]">
        19°C · ALWAYS
      </text>
    </svg>
  );
}
