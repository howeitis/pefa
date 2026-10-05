import { type KeyboardEvent, type PointerEvent, useId, useState } from 'react';
import { useToday } from '~/components/motion/hooks';
import { formatReleaseDate } from '~/content/newsroom';
import { inWorldDate } from '~/lib/market';

const W = 720;
const H = 260;
const PAD = { top: 16, right: 64, bottom: 28, left: 8 };

const shortDate = (iso: string) =>
  new Date(`${iso}T12:00:00Z`).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    timeZone: 'UTC',
  });

/**
 * An indicative price chart, the way an IR page shows its share price: range
 * tabs, a line that draws itself, and a crosshair that follows the pointer
 * (or the arrow keys). The series is a pure function of the date, so it only
 * exists in the browser; the prerendered page holds its place.
 */
export function PriceChart({
  label,
  series,
  format,
  ranges = [30, 90, 365],
  initialRange = 90,
}: {
  label: string;
  /** Daily values for the `days` up to and including `today`, oldest first. */
  series: (today: string, days: number) => number[];
  format: (n: number) => string;
  ranges?: number[];
  initialRange?: number;
}) {
  const today = useToday();
  const [days, setDays] = useState(initialRange);
  const [cursor, setCursor] = useState<number | null>(null);
  const id = useId();

  const values = today ? series(today, days) : [];
  const n = values.length;
  const min = n ? Math.min(...values) : 0;
  const max = n ? Math.max(...values) : 1;
  const span = max - min || 1;
  const px = (i: number) => PAD.left + (i / Math.max(1, n - 1)) * (W - PAD.left - PAD.right);
  const py = (v: number) => PAD.top + (1 - (v - min) / span) * (H - PAD.top - PAD.bottom);
  const line = values
    .map((v, i) => `${i ? 'L' : 'M'}${px(i).toFixed(1)} ${py(v).toFixed(1)}`)
    .join(' ');
  const area = n ? `${line} L${px(n - 1)} ${H - PAD.bottom} L${px(0)} ${H - PAD.bottom} Z` : '';
  const dateAt = (i: number) =>
    today
      ? inWorldDate(
          new Date(Date.parse(`${today}T00:00:00Z`) - (n - 1 - i) * 86_400_000)
            .toISOString()
            .slice(0, 10),
        )
      : '';
  const first = values[0] ?? 0;
  const last = values[n - 1] ?? 0;
  const change = first ? ((last - first) / first) * 100 : 0;
  const up = change >= 0;
  const at = cursor ?? n - 1;

  const onMove = (e: PointerEvent<SVGSVGElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * W;
    const i = Math.round(((x - PAD.left) / (W - PAD.left - PAD.right)) * (n - 1));
    setCursor(Math.max(0, Math.min(n - 1, i)));
  };
  const onKey = (e: KeyboardEvent<SVGSVGElement>) => {
    const step = e.shiftKey ? 7 : 1;
    if (e.key === 'ArrowLeft') setCursor(Math.max(0, at - step));
    else if (e.key === 'ArrowRight') setCursor(Math.min(n - 1, at + step));
    else if (e.key === 'Home') setCursor(0);
    else if (e.key === 'End') setCursor(n - 1);
    else return;
    e.preventDefault();
  };

  return (
    <figure className="rounded-sm border border-rule bg-surface-2/60 p-4 sm:p-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <figcaption className="smallcaps text-ink-muted">{label}</figcaption>
          <p className="figures mt-2 flex items-baseline gap-3">
            <span className="font-display text-4xl sm:text-5xl">
              {n ? format(values[at]!) : '—'}
            </span>
            {n > 0 && (
              <span className={`font-mono text-sm ${up ? 'text-navy' : 'text-accent'}`}>
                <span aria-hidden="true">{up ? '▲' : '▼'}</span>
                <span className="sr-only">{up ? 'up' : 'down'}</span>
                {Math.abs(change).toFixed(2)}% <span className="text-ink-muted">· {days}D</span>
              </span>
            )}
          </p>
          <p className="figures mt-1 font-mono text-xs text-ink-muted">
            {n ? formatReleaseDate(dateAt(at)) : 'Indicative series loads in your browser.'}
          </p>
        </div>
        <div role="group" aria-label="Range" className="flex rounded-full border border-rule p-0.5">
          {ranges.map((r) => (
            <button
              key={r}
              type="button"
              aria-pressed={days === r}
              onClick={() => {
                setDays(r);
                setCursor(null);
              }}
              className={`rounded-full px-3 py-1 font-mono text-xs transition-colors ${days === r ? 'bg-navy text-parchment' : 'text-ink-muted hover:text-ink'}`}
            >
              {r >= 365 ? '1Y' : r >= 90 ? '3M' : '1M'}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-5">
        {n ? (
          <svg
            viewBox={`0 0 ${W} ${H}`}
            className="w-full touch-pan-y overflow-visible outline-offset-4"
            role="img"
            tabIndex={0}
            aria-label={`${label}: ${format(first)} to ${format(last)} over ${days} days. Use the arrow keys to read values.`}
            onPointerMove={onMove}
            onPointerLeave={() => setCursor(null)}
            onKeyDown={onKey}
          >
            <defs>
              <linearGradient id={`${id}-fill`} x1="0" x2="0" y1="0" y2="1">
                <stop offset="0" stopColor="var(--color-navy)" stopOpacity="0.16" />
                <stop offset="1" stopColor="var(--color-navy)" stopOpacity="0" />
              </linearGradient>
            </defs>
            {[0, 0.25, 0.5, 0.75, 1].map((t) => {
              const v = min + span * (1 - t);
              const y = PAD.top + t * (H - PAD.top - PAD.bottom);
              return (
                <g key={t}>
                  <line x1={PAD.left} x2={W - PAD.right} y1={y} y2={y} stroke="var(--rule)" />
                  <text
                    x={W - PAD.right + 8}
                    y={y + 3}
                    className="fill-ink-muted font-mono text-[10px]"
                  >
                    {format(v)}
                  </text>
                </g>
              );
            })}
            {[0, Math.floor((n - 1) / 2), n - 1].map((i) => (
              <text
                key={i}
                x={px(i)}
                y={H - 8}
                textAnchor={i === 0 ? 'start' : i === n - 1 ? 'end' : 'middle'}
                className="fill-ink-muted font-mono text-[10px]"
              >
                {shortDate(dateAt(i))}
              </text>
            ))}
            <path key={`a${days}`} d={area} fill={`url(#${id}-fill)`} data-reveal="fade" />
            <path
              key={`l${days}`}
              d={line}
              fill="none"
              stroke="var(--color-navy)"
              strokeWidth={1.75}
              strokeLinejoin="round"
              pathLength={1}
              data-reveal="draw"
            />
            <g aria-hidden="true">
              <line
                x1={px(at)}
                x2={px(at)}
                y1={PAD.top}
                y2={H - PAD.bottom}
                stroke="var(--color-navy)"
                strokeDasharray="2 3"
                opacity={cursor === null ? 0 : 0.6}
              />
              <circle cx={px(at)} cy={py(values[at]!)} r={4} fill="var(--color-foil)" />
              <circle
                cx={px(at)}
                cy={py(values[at]!)}
                r={9}
                fill="none"
                stroke="var(--color-foil)"
                opacity={0.4}
              />
            </g>
          </svg>
        ) : (
          <div
            aria-hidden="true"
            className="aspect-[720/260] w-full animate-pulse rounded-sm bg-rule/40"
          />
        )}
      </div>
    </figure>
  );
}
