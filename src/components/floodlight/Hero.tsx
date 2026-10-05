import type { ReactNode } from 'react';
import { FieldCanvas } from '~/components/motion/FieldCanvas';
import { Kicker } from '~/components/motion/Kicker';
import { SplitText } from '~/components/motion/SplitText';

export type Backdrop = 'field' | 'grid' | 'beams';

/** The moving ground behind a hero. All decorative. */
export function HeroBackdrop({ variant }: { variant: Backdrop }) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="floodlight-glow absolute inset-0" />
      {variant === 'field' && (
        <>
          <div data-reveal="fade" className="absolute inset-0">
            <FieldCanvas />
          </div>
          <div className="absolute inset-0 bg-[linear-gradient(90deg,var(--ground)_8%,rgb(11_15_25/0.75)_42%,transparent_75%)] max-lg:bg-[linear-gradient(0deg,var(--ground)_25%,rgb(11_15_25/0.6)_60%,transparent)]" />
        </>
      )}
      {variant === 'grid' && <div className="grid-lines absolute inset-0" />}
      {variant !== 'field' && <span className="beams" />}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ground to-transparent" />
    </div>
  );
}

/** The keynote opener for a Floodlight page. A string title rises word by word. */
export function Hero({
  kicker,
  title,
  lede,
  actions,
  aside,
  backdrop = 'beams',
  full = false,
  footer,
}: {
  kicker: string;
  /** A string may wrap words in *asterisks* for gold italic. */
  title: ReactNode;
  lede?: ReactNode;
  actions?: ReactNode;
  aside?: ReactNode;
  backdrop?: Backdrop;
  /** Fill the first screen (home). */
  full?: boolean;
  /** A strip pinned to the bottom of the hero: meta, ticker tape. */
  footer?: ReactNode;
}) {
  return (
    <section
      className={`relative isolate overflow-hidden ${full ? 'flex min-h-[calc(100svh-4.25rem)] flex-col' : ''}`}
    >
      <HeroBackdrop variant={backdrop} />
      <div
        className={`mx-auto grid w-full max-w-7xl items-end gap-12 px-4 pb-16 pt-16 sm:px-6 sm:pb-24 sm:pt-28 lg:grid-cols-[1fr_auto] lg:px-8 ${full ? 'flex-1 content-end' : ''}`}
      >
        <div className="min-w-0">
          <Kicker live>{kicker}</Kicker>
          <h1
            className={`mt-7 text-balance ${full ? 'max-w-4xl' : 'max-w-5xl'} font-display text-[2.75rem] leading-[1.02] tracking-[-0.01em] sm:text-7xl lg:text-[5.5rem]`}
          >
            {typeof title === 'string' ? <SplitText text={title} delay={120} /> : title}
          </h1>
          {lede && (
            <div
              data-reveal="up"
              style={{ '--delay': '450ms' } as React.CSSProperties}
              className="mt-10 max-w-2xl space-y-5 text-lg text-ink-muted sm:text-xl"
            >
              {lede}
            </div>
          )}
          {actions && (
            <div
              data-reveal="up"
              style={{ '--delay': '600ms' } as React.CSSProperties}
              className="mt-12 flex flex-wrap items-center gap-4"
            >
              {actions}
            </div>
          )}
        </div>
        {aside}
      </div>
      {footer}
    </section>
  );
}
