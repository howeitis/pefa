import type { ReactNode } from 'react';

/** A Floodlight page section: kicker, display heading, optional intro, then content. */
export function Section({
  id,
  kicker,
  title,
  intro,
  children,
  className = '',
}: {
  id?: string;
  kicker?: string;
  title?: ReactNode;
  intro?: ReactNode;
  children?: ReactNode;
  className?: string;
}) {
  const headingId = id ? `${id}-heading` : undefined;
  return (
    <section
      id={id}
      aria-labelledby={title ? headingId : undefined}
      className={`border-t border-rule ${className}`}
    >
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        {(kicker || title || intro) && (
          <header className="reveal max-w-3xl">
            {kicker && <p className="smallcaps text-accent">{kicker}</p>}
            {title && (
              <h2 id={headingId} className="mt-4 font-display text-4xl leading-tight sm:text-5xl">
                {title}
              </h2>
            )}
            {intro && <div className="mt-6 space-y-4 text-lg text-ink-muted">{intro}</div>}
          </header>
        )}
        {children && <div className={kicker || title || intro ? 'mt-14' : ''}>{children}</div>}
      </div>
    </section>
  );
}
