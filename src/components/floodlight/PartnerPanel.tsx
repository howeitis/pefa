import type { ReactNode } from 'react';

/** One technology partner: name, the canon role line, and product copy. */
export function PartnerPanel({
  name,
  role,
  children,
  footer,
  index,
}: {
  name: string;
  role: string;
  children: ReactNode;
  footer?: ReactNode;
  index?: string;
}) {
  return (
    <article
      data-reveal="clip"
      className="spotlight flex h-full flex-col rounded-sm border border-rule bg-surface/60 p-8 transition-colors duration-500 hover:border-accent/60 sm:p-10"
    >
      {index && <p className="smallcaps figures text-ink-muted">{index}</p>}
      <h3 className="mt-6 font-display text-4xl">{name}</h3>
      <p className="smallcaps mt-4 leading-relaxed text-accent">{role}</p>
      <div className="mt-8 flex-1 space-y-4 text-ink-muted">{children}</div>
      {footer && <div className="mt-10 border-t border-rule pt-6 text-sm">{footer}</div>}
    </article>
  );
}
