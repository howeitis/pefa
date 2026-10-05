import type { ReactNode } from 'react';

/**
 * A rubber stamp: rotated, bordered small caps that land with a thud as they
 * scroll into view. Decorative, so hidden from AT by default.
 */
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
    <span className="inline-block -rotate-3">
      <span
        aria-hidden={decorative || undefined}
        data-reveal="stamp"
        className={`smallcaps inline-block border-2 px-3 py-1 mix-blend-multiply ${color} ${className}`}
      >
        {children}
      </span>
    </span>
  );
}
