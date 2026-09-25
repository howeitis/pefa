import type { ReactNode } from 'react';

/** The keynote opener for a Floodlight page. */
export function Hero({
  kicker,
  title,
  lede,
  actions,
  aside,
}: {
  kicker: string;
  title: ReactNode;
  lede?: ReactNode;
  actions?: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <section className="floodlight-glow relative overflow-hidden">
      <div className="mx-auto grid max-w-7xl items-end gap-12 px-4 pb-20 pt-16 sm:px-6 sm:pb-28 sm:pt-24 lg:grid-cols-[1fr_auto] lg:px-8">
        <div>
          <p className="smallcaps text-accent">{kicker}</p>
          <h1 className="mt-6 max-w-5xl text-balance font-display text-5xl leading-[1.02] sm:text-7xl lg:text-8xl">
            {title}
          </h1>
          {lede && (
            <div className="mt-10 max-w-2xl space-y-5 text-lg text-ink-muted sm:text-xl">
              {lede}
            </div>
          )}
          {actions && <div className="mt-12 flex flex-wrap items-center gap-4">{actions}</div>}
        </div>
        {aside}
      </div>
    </section>
  );
}
