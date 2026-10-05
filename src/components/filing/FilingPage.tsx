import type { ReactNode } from 'react';
import { Link } from 'react-router';
import { SplitText } from '~/components/motion/SplitText';

/** Outer layout for a Filing page: paper ground, faint ledger grid, optional breadcrumb. */
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
    <div className="relative isolate">
      <div aria-hidden="true" className="paper-grid absolute inset-x-0 top-0 -z-10 h-[40rem]" />
      <div className={`mx-auto ${width} px-4 py-12 sm:px-6 sm:py-20`}>
        {back && (
          <Link
            viewTransition
            to={back.to}
            className="group smallcaps inline-flex items-center gap-2 text-ink-muted hover:text-accent"
          >
            <span aria-hidden="true" className="transition-transform group-hover:-translate-x-1">
              ←
            </span>
            {back.label}
          </Link>
        )}
        <div className={back ? 'mt-6' : ''}>{children}</div>
      </div>
    </div>
  );
}

/**
 * A single paper document: a header strip (issuer and reference), then the
 * title block, then the body. Every Filing page is made of one or more. The
 * sheet slides up into place as it arrives.
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
    <article
      data-reveal="up"
      className="border border-rule bg-surface shadow-[0_1px_0_rgb(0_0_0/0.04),0_30px_60px_-30px_rgb(15_30_54/0.35)]"
    >
      <div className="smallcaps flex flex-wrap items-center justify-between gap-2 border-b border-rule px-6 py-3 text-ink-muted sm:px-10">
        <span className="flex items-center gap-2.5">
          <span aria-hidden="true" className="live-dot !bg-navy" />
          {issuer}
        </span>
        {reference && <span className="figures font-mono">Ref. {reference}</span>}
      </div>
      <div className="px-6 pb-10 pt-8 sm:px-10 sm:pb-14 sm:pt-12">
        <header>
          <Heading className="max-w-3xl text-balance font-display text-4xl leading-tight sm:text-6xl">
            {typeof title === 'string' ? <SplitText text={title} delay={150} /> : title}
          </Heading>
          {subtitle && (
            <div data-reveal="up" className="mt-5 text-lg text-ink-muted">
              {subtitle}
            </div>
          )}
          {stamp && <div className="mt-6">{stamp}</div>}
        </header>
        <div className="mt-10">{children}</div>
      </div>
    </article>
  );
}

/** A numbered section inside a document. Its rule draws across as it arrives. */
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
    <section id={id} className="relative mt-12 scroll-mt-24 pt-8">
      <span
        aria-hidden="true"
        data-reveal="line"
        className="absolute inset-x-0 top-0 block h-px origin-left bg-rule"
      />
      <h2 data-reveal="up" className="smallcaps flex gap-3 text-navy">
        {number && <span className="figures text-accent">{number}</span>}
        {heading}
      </h2>
      <div className="mt-5 space-y-4 leading-relaxed">{children}</div>
    </section>
  );
}
