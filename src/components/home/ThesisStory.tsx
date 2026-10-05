import { type CSSProperties, type ReactNode, useRef } from 'react';
import { scene } from '~/canon';
import { Kicker } from '~/components/motion/Kicker';
import { useReducedMotion, useScrollProgress } from '~/components/motion/hooks';
import { Redacted } from '~/components/shared/Redacted';

/**
 * The investment thesis, told while the chart beside it draws itself: the
 * collapse of the old game, then PEFA's line, which only goes one way.
 *
 * With motion, the section is five screens tall and the stage is pinned;
 * scroll position drives the chart and swaps the copy. Without script, or
 * under reduced motion, it is a plain stack of five paragraphs beside the
 * finished chart (styles in this file's <style> block).
 */

const problem = scene('problem');
const genesis = scene('genesis');
const close = scene('close');

const X0 = 2031;
const X1 = 2037;
const x = (year: number) => 48 + ((year - X0) / (X1 - X0)) * 532;
const y = (v: number) => 352 - (v / 110) * 320;

const smooth = (pts: [number, number][]) =>
  pts
    .map(([yr, v], i) => {
      if (i === 0) return `M${x(yr).toFixed(1)} ${y(v).toFixed(1)}`;
      const [py, pv] = pts[i - 1]!;
      const mx = (x(py) + x(yr)) / 2;
      return `C${mx.toFixed(1)} ${y(pv).toFixed(1)} ${mx.toFixed(1)} ${y(v).toFixed(1)} ${x(yr).toFixed(1)} ${y(v).toFixed(1)}`;
    })
    .join(' ');

const VIEWERSHIP = smooth([
  [2031, 94],
  [2032, 99],
  [2033, 100],
  [2034.5, 31],
  [2035.5, 30],
  [2037, 29],
]);
const INCORPORATED = 2035 + 133 / 365;
const REVENUE = smooth(
  Array.from({ length: 12 }, (_, i) => {
    const t = i / 11;
    return [INCORPORATED + t * (X1 - INCORPORATED), 4 + 104 * Math.pow(t, 2.2)] as [number, number];
  }),
);

interface Step {
  kicker: string;
  title: ReactNode;
  body: ReactNode;
}

const STEPS: Step[] = [
  {
    kicker: problem.kicker!,
    title: problem.headline!,
    body: (
      <>
        <span className="font-display text-2xl text-ink">{problem.punch}</span> In 2033 a finding
        showed that highlight packages outperformed live matches at one-fortieth of the cost.
      </>
    ),
  },
  {
    kicker: `${problem.stats![0]!.value} months`,
    title: `${problem.stats![1]!.value} viewership.`,
    body: 'Long-form broadcast rights collapsed within eighteen months. The Global Broadcast Rights Consortium was dissolved on 5 May 2035.',
  },
  {
    kicker: problem.stats![2]!.label,
    title: 'Four of six, in administration.',
    body: 'Four of Europe’s six largest domestic competitions entered administration. The structural defect was clear: the possibility of a bad outcome.',
  },
  {
    kicker: genesis.kicker!,
    title: genesis.headline!,
    body: (
      <>
        PEFA™ was incorporated in Luxembourg nine days later, on 14 May 2035. Objectives:{' '}
        <Redacted>{genesis.filing!.find((r) => r.redacted)!.value}</Redacted>.
      </>
    ),
  },
  {
    kicker: 'Outlook',
    title: (
      <>
        {close.punchline![0]} <span className="text-accent">{close.punchline![1]}</span>
      </>
    ),
    body: 'Fifteen founders hold permanent seats. Their revenues are guaranteed irrespective of performance, form, or final position.',
  },
];

const clamp = (v: number) => Math.min(1, Math.max(0, v));

export function ThesisStory() {
  const ref = useRef<HTMLElement>(null);
  const scrolled = useScrollProgress(ref, 'pin');
  // Under reduced motion the stage isn't pinned: show the finished chart.
  const p = useReducedMotion() ? 1 : scrolled;
  const active = Math.min(STEPS.length - 1, Math.floor(p * STEPS.length));
  const seg = (from: number, to: number) => clamp((p - from) / (to - from));
  const draw = (v: number): CSSProperties => ({ strokeDashoffset: 1 - v });
  const fall = seg(0.12, 0.36);
  const revenue = seg(0.72, 0.95);
  const pct = Math.round(-69 * clamp(fall * 1.15));

  return (
    <section ref={ref} id="thesis" aria-labelledby="thesis-heading" className="thesis relative">
      <span
        aria-hidden="true"
        data-reveal="line"
        className="absolute inset-x-0 top-0 block h-px origin-left bg-rule"
      />
      <div className="thesis-stage">
        <div className="mx-auto grid h-full max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-center lg:gap-16 lg:px-8">
          <div className="thesis-copy relative min-w-0">
            <Kicker index="01">
              <span id="thesis-heading">The investment thesis</span>
            </Kicker>
            <ol className="thesis-steps relative mt-8">
              {STEPS.map((s, i) => (
                <li
                  key={i}
                  className="thesis-step story-step"
                  data-state={i === active ? 'on' : i < active ? 'past' : 'next'}
                >
                  <p className="smallcaps text-ink-muted">{s.kicker}</p>
                  <h3 className="mt-3 font-display text-4xl leading-tight sm:text-5xl">
                    {s.title}
                  </h3>
                  <p className="mt-5 max-w-md text-lg text-ink-muted">{s.body}</p>
                </li>
              ))}
            </ol>
            <div className="thesis-pager mt-10 flex gap-2" aria-hidden="true">
              {STEPS.map((_, i) => (
                <span
                  key={i}
                  className={`h-0.5 flex-1 transition-colors duration-500 ${i <= active ? 'bg-accent' : 'bg-rule'}`}
                />
              ))}
            </div>
          </div>

          <figure className="thesis-chart relative min-w-0 rounded-sm border border-rule bg-surface/50 p-4 backdrop-blur sm:p-6">
            <figcaption className="smallcaps flex items-center justify-between text-ink-muted">
              <span>Index · 2033 = 100</span>
              <span className="figures text-accent" aria-hidden="true">
                {pct === 0 ? '±0%' : `${pct}%`}
              </span>
            </figcaption>
            <svg
              viewBox="0 0 600 380"
              className="mt-4 w-full overflow-visible"
              role="img"
              aria-label="Chart: football viewership falls 69 per cent between 2033 and 2035; PEFA revenue rises steeply from its incorporation in May 2035."
            >
              {[0, 25, 50, 75, 100].map((v) => (
                <g key={v}>
                  <line x1={48} x2={580} y1={y(v)} y2={y(v)} stroke="var(--rule)" />
                  <text
                    x={40}
                    y={y(v) + 3}
                    textAnchor="end"
                    className="fill-ink-muted font-mono text-[10px]"
                  >
                    {v}
                  </text>
                </g>
              ))}
              {[2031, 2032, 2033, 2034, 2035, 2036, 2037].map((yr) => (
                <text
                  key={yr}
                  x={x(yr)}
                  y={372}
                  textAnchor="middle"
                  className="fill-ink-muted font-mono text-[10px]"
                >
                  {yr}
                </text>
              ))}

              {/* The leagues: six blocks, four of which fail. */}
              <g transform="translate(70 236)" className="thesis-leagues">
                {Array.from({ length: 6 }, (_, i) => {
                  const failed = i < 4 && seg(0.42 + i * 0.03, 0.46 + i * 0.03) >= 1;
                  return (
                    <g key={i} transform={`translate(${(i % 3) * 66} ${Math.floor(i / 3) * 34})`}>
                      <rect
                        width={60}
                        height={28}
                        rx={2}
                        className="thesis-league transition-all duration-500"
                        data-failed={failed ? '' : undefined}
                        fill={failed ? 'rgb(240 138 126 / 0.16)' : 'rgb(246 244 238 / 0.05)'}
                        stroke={failed ? '#f08a7e' : 'var(--rule)'}
                      />
                      <text
                        x={30}
                        y={18}
                        textAnchor="middle"
                        className="font-mono text-[8px]"
                        fill={failed ? '#f08a7e' : 'var(--ink-muted)'}
                      >
                        {failed ? 'ADMIN.' : `LEAGUE ${i + 1}`}
                      </text>
                    </g>
                  );
                })}
              </g>

              <path
                d={VIEWERSHIP}
                fill="none"
                stroke="var(--ink)"
                strokeWidth={2}
                pathLength={1}
                strokeDasharray={1}
                style={draw(seg(0, 0.36))}
                className="thesis-path"
              />
              <g style={{ opacity: seg(0.55, 0.62) }} className="thesis-fade">
                <line
                  x1={x(INCORPORATED)}
                  x2={x(INCORPORATED)}
                  y1={y(110)}
                  y2={y(0)}
                  stroke="var(--accent)"
                  strokeDasharray="3 4"
                />
                <text
                  x={x(INCORPORATED) - 6}
                  y={y(104)}
                  textAnchor="end"
                  className="fill-accent font-mono text-[10px]"
                >
                  PEFA™ INC. 14.05.2035
                </text>
              </g>
              <path
                d={REVENUE}
                fill="none"
                stroke="var(--accent)"
                strokeWidth={3}
                pathLength={1}
                strokeDasharray={1}
                style={draw(revenue)}
                className="thesis-path"
              />
              <g style={{ opacity: seg(0.9, 0.98) }} className="thesis-fade">
                <circle cx={x(X1)} cy={y(108)} r={5} fill="var(--accent)" />
                <text
                  x={x(X1) - 10}
                  y={y(108) + 4}
                  textAnchor="end"
                  className="fill-ink font-mono text-[10px]"
                >
                  REVENUE · GUARANTEED
                </text>
              </g>
            </svg>
            <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-xs text-ink-muted">
              <span className="flex items-center gap-2">
                <span aria-hidden="true" className="h-0.5 w-5 bg-ink" /> Live match viewership
              </span>
              <span className="flex items-center gap-2">
                <span aria-hidden="true" className="h-0.5 w-5 bg-accent" /> PEFA™ revenue
              </span>
            </div>
          </figure>
        </div>
      </div>
      <style>{`
        .thesis-stage { padding: 6rem 0; }
        .thesis-step + .thesis-step { margin-top: 3rem; }
        .thesis-pager { display: none; }
        html:not([data-js]) .thesis-path { stroke-dashoffset: 0 !important; }
        html:not([data-js]) .thesis-fade { opacity: 1 !important; }
        @media (prefers-reduced-motion: no-preference) {
          [data-js] .thesis { height: 520vh; }
          [data-js] .thesis-stage { position: sticky; top: 4.25rem; height: calc(100svh - 4.25rem); padding: 2rem 0; display: flex; align-items: center; }
          [data-js] .thesis-stage > div { width: 100%; height: auto; }
          [data-js] .thesis-steps { display: grid; }
          [data-js] .thesis-step { grid-area: 1 / 1; margin: 0 !important; }
          [data-js] .thesis-step[data-state='past'] { opacity: 0; transform: translateY(-2.5rem); pointer-events: none; }
          [data-js] .thesis-step[data-state='next'] { opacity: 0; transform: translateY(2.5rem); pointer-events: none; }
          [data-js] .thesis-pager { display: flex; }
          @media (max-width: 1023px) {
            [data-js] .thesis-stage > div { display: flex; flex-direction: column-reverse; justify-content: center; gap: 1.25rem; }
            [data-js] .thesis-step h3 { font-size: 1.85rem; }
            [data-js] .thesis-step p:last-child { font-size: 1rem; margin-top: .75rem; }
            [data-js] .thesis-steps { margin-top: 1rem; }
            [data-js] .thesis-pager { margin-top: 1.25rem; }
          }
        }
      `}</style>
    </section>
  );
}
