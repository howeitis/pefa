import type { ReactNode } from 'react';

/** Label / value rows on hairline ledger rules. */
export function FactList({
  rows,
  columns = 1,
}: {
  rows: { label: string; value: ReactNode }[];
  columns?: 1 | 2;
}) {
  return (
    <dl
      className={`grid border-t border-rule ${columns === 2 ? 'lg:grid-cols-2 lg:gap-x-10' : ''}`}
    >
      {rows.map((r) => (
        <div
          key={r.label}
          className="grid grid-cols-[9rem_1fr] gap-4 border-b border-rule py-3 sm:grid-cols-[11rem_1fr]"
        >
          <dt className="smallcaps pt-0.5 text-ink-muted">{r.label}</dt>
          <dd className="figures">{r.value}</dd>
        </div>
      ))}
    </dl>
  );
}
