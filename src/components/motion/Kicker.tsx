import type { ReactNode } from 'react';

/** A section label: index number, rule, name. Mono caps on the brand pages. */
export function Kicker({
  index,
  children,
  live = false,
  className = '',
}: {
  index?: string;
  children: ReactNode;
  live?: boolean;
  className?: string;
}) {
  return (
    <p className={`smallcaps flex items-center gap-3 text-accent ${className}`}>
      {live && <span className="live-dot shrink-0" aria-hidden="true" />}
      {index && (
        <>
          <span className="figures">{index}</span>
          <span aria-hidden="true" className="h-px w-8 shrink-0 bg-accent/60" />
        </>
      )}
      <span>{children}</span>
    </p>
  );
}
