import type { ReactNode } from 'react';

/** The small print. Where the joke usually lives. */
export function Footnote({ children }: { children: ReactNode }) {
  return (
    <p className="border-t border-rule pt-3 text-xs leading-relaxed text-ink-muted">{children}</p>
  );
}
