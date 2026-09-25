import type { ReactNode } from 'react';
import { Link } from 'react-router';

/** Outer layout for a Filing page: paper ground, optional breadcrumb. */
export function FilingPage({
  children,
  back,
  width = 'max-w-5xl',
}: {
  children: ReactNode;
  back?: { to: string; label: string };
  width?: string;
}) {
  return (
    <div className={`mx-auto ${width} px-4 py-12 sm:px-6 sm:py-20`}>
      {back && (
        <Link to={back.to} className="smallcaps text-ink-muted hover:text-accent">
          <span aria-hidden="true">← </span>
          {back.label}
        </Link>
      )}
      <div className={back ? 'mt-6' : ''}>{children}</div>
    </div>
  );
}

/**
 * A single paper document: a header strip (issuer and reference), then the
 * title block, then the body. Every Filing page is made of one or more.
 */
export function FilingDocument({
  issuer = 'PEFA™ · Public filing',
  reference,
  title,
  subtitle,
  stamp,
  children,
  headingLevel = 1,
}: {
  issuer?: string;
  reference?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  stamp?: ReactNode;
  children: ReactNode;
  headingLevel?: 1 | 2;
}) {
  const Heading = headingLevel === 1 ? 'h1' : 'h2';
  return (
    <article className="border border-rule bg-surface shadow-[0_1px_0_rgb(0_0_0/0.04),0_12px_32px_-18px_rgb(15_30_54/0.25)]">
      <div className="smallcaps flex flex-wrap items-center justify-between gap-2 border-b border-rule px-6 py-3 text-ink-muted sm:px-10">
        <span>{issuer}</span>
        {reference && <span className="figures">Ref. {reference}</span>}
      </div>
      <div className="px-6 pb-10 pt-8 sm:px-10 sm:pb-14 sm:pt-12">
        <header>
          <Heading className="max-w-3xl text-balance font-display text-4xl leading-tight sm:text-5xl">
            {title}
          </Heading>
          {subtitle && <div className="mt-4 text-lg text-ink-muted">{subtitle}</div>}
          {stamp && <div className="mt-6">{stamp}</div>}
        </header>
        <div className="mt-10">{children}</div>
      </div>
    </article>
  );
}

/** A numbered section inside a document. */
export function FilingSection({
  number,
  heading,
  id,
  children,
}: {
  number?: string;
  heading: string;
  id?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="mt-10 scroll-mt-8 border-t border-rule pt-8">
      <h2 className="smallcaps flex gap-3 text-navy">
        {number && <span className="figures text-accent">{number}</span>}
        {heading}
      </h2>
      <div className="mt-5 space-y-4 leading-relaxed">{children}</div>
    </section>
  );
}
