import type { ReactNode } from 'react';

/** A rubber stamp: rotated, bordered small caps. Decorative, so hidden from AT by default. */
export function Stamp({
  children,
  tone = 'accent',
  className = '',
  decorative = true,
}: {
  children: ReactNode;
  tone?: 'accent' | 'navy';
  className?: string;
  decorative?: boolean;
}) {
  const color = tone === 'navy' ? 'border-navy text-navy' : 'border-accent text-accent';
  return (
    <span
      aria-hidden={decorative || undefined}
      className={`smallcaps inline-block rotate-[-3deg] border-2 px-3 py-1 ${color} ${className}`}
    >
      {children}
    </span>
  );
}
