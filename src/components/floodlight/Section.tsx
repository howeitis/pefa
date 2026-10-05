import type { ReactNode } from 'react';
import { Kicker } from '~/components/motion/Kicker';
import { SplitText } from '~/components/motion/SplitText';

/**
 * A Floodlight page section. The hairline above it draws across as it
 * arrives, the label sits in the left column with its index, and a string
 * title rises word by word on the right.
 */
export function Section({
  id,
  index,
  kicker,
  title,
  intro,
  children,
  className = '',
  stacked = false,
}: {
  id?: string;
  /** "01", "02"… shown before the kicker. */
  index?: string;
  kicker?: string;
  /** A string may wrap words in *asterisks* for gold italic. */
  title?: ReactNode;
  intro?: ReactNode;
  children?: ReactNode;
  className?: string;
  /** Kicker above the title, rather than beside it. */
  stacked?: boolean;
}) {
  const headingId = id ? `${id}-heading` : undefined;
  const hasHeader = kicker || title || intro;
  return (
    <section
      id={id}
      aria-labelledby={title ? headingId : undefined}
      className={`defer-render relative scroll-mt-20 ${className}`}
    >
      <span
        aria-hidden="true"
        data-reveal="line"
        className="absolute inset-x-0 top-0 block h-px origin-left bg-rule"
      />
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-32 lg:px-8">
        {hasHeader && (
          <header
            className={
              stacked
                ? 'max-w-4xl'
                : 'grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,2.4fr)] lg:gap-12'
            }
          >
            <div className="lg:pt-3">
              {kicker && (
                <div data-reveal="up">
                  <Kicker index={index}>{kicker}</Kicker>
                </div>
              )}
            </div>
            <div className={stacked ? 'mt-5' : ''}>
              {title && (
                <h2
                  id={headingId}
                  className="max-w-4xl text-balance font-display text-4xl leading-[1.08] sm:text-6xl"
                >
                  {typeof title === 'string' ? <SplitText text={title} /> : title}
                </h2>
              )}
              {intro && (
                <div data-reveal="up" className="mt-7 max-w-2xl space-y-4 text-lg text-ink-muted">
                  {intro}
                </div>
              )}
            </div>
          </header>
        )}
        {children && <div className={hasHeader ? 'mt-16 sm:mt-20' : ''}>{children}</div>}
      </div>
    </section>
  );
}
