import type { ReactNode } from 'react';

/** An oversized figure with a small-caps caption, as stamped in the intro reel. */
export function StampedStat({
  value,
  label,
  note,
}: {
  value: string;
  label: string;
  note?: string;
}) {
  return (
    <div className="reveal border-t-2 border-accent pt-5">
      <p className="figures font-display text-6xl leading-none text-ink sm:text-7xl">{value}</p>
      <p className="smallcaps mt-4 text-accent">{label}</p>
      {note && <p className="mt-2 text-sm text-ink-muted">{note}</p>}
    </div>
  );
}

export function StatRow({ children }: { children: ReactNode }) {
  return <div className="grid gap-10 sm:grid-cols-3 sm:gap-8">{children}</div>;
}
