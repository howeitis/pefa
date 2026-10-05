import type { ReactNode } from 'react';
import { CountUp } from '~/components/motion/CountUp';

/** An oversized figure that counts up, over a gold rule that draws across. */
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
    <div className="relative pt-6">
      <span
        aria-hidden="true"
        data-reveal="line"
        className="absolute inset-x-0 top-0 block h-px origin-left bg-accent"
      />
      <p data-reveal="clip" className="font-display text-7xl leading-none text-ink sm:text-8xl">
        <CountUp value={value} />
      </p>
      <p className="smallcaps mt-5 text-accent">{label}</p>
      {note && <p className="mt-2 max-w-xs text-sm text-ink-muted">{note}</p>}
    </div>
  );
}

export function StatRow({ children }: { children: ReactNode }) {
  return <div className="grid gap-12 sm:grid-cols-3 sm:gap-10">{children}</div>;
}
