import { type CSSProperties, type ReactNode, useSyncExternalStore } from 'react';

const noSubscribe = () => () => {};
/** False in the prerendered HTML, true once hydrated. */
const useHydrated = () =>
  useSyncExternalStore(
    noSubscribe,
    () => true,
    () => false,
  );

/**
 * An endless horizontal strip: the content twice, scrolled by half. Pauses on
 * hover and focus, and stands still under reduced motion. The second copy is
 * hidden from assistive tech and from the tab order (`inert`), and only
 * rendered in the browser, so the prerendered HTML carries one copy. Carries the
 * `ticker` class, which the overflow test knows is meant to run off screen.
 */
export function Marquee({
  children,
  duration = 60,
  reverse = false,
  fade = true,
  className = '',
  label,
}: {
  children: ReactNode;
  duration?: number;
  reverse?: boolean;
  fade?: boolean;
  className?: string;
  label?: string;
}) {
  const hydrated = useHydrated();
  return (
    <div
      className={`marquee ticker overflow-hidden ${fade ? 'marquee-fade' : ''} ${className}`}
      role={label ? 'region' : undefined}
      aria-label={label}
    >
      <div
        className="marquee-track"
        data-direction={reverse ? 'reverse' : undefined}
        style={{ '--marquee-duration': `${duration}s` } as CSSProperties}
      >
        <div className="flex shrink-0">{children}</div>
        {hydrated && (
          <div className="flex shrink-0" aria-hidden="true" inert>
            {children}
          </div>
        )}
      </div>
    </div>
  );
}
