import type { ReactNode } from 'react';

/** One technology partner: name, the canon role line, and product copy. */
export function PartnerPanel({
  name,
  role,
  children,
  footer,
}: {
  name: string;
  role: string;
  children: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <article className="reveal flex h-full flex-col rounded-sm border border-rule bg-surface p-8">
      <h3 className="font-display text-3xl">{name}</h3>
      <p className="smallcaps mt-3 leading-relaxed text-accent">{role}</p>
      <div className="mt-6 flex-1 space-y-4 text-ink-muted">{children}</div>
      {footer && <div className="mt-8 border-t border-rule pt-6 text-sm">{footer}</div>}
    </article>
  );
}
