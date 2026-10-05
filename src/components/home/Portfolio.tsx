import type { ReactNode } from 'react';
import { Link } from 'react-router';
import { DraftMotif, LeagueMotif, VenueMotif } from './Motifs';

interface Product {
  index: string;
  kicker: string;
  title: string;
  body: string;
  to: string;
  cta: string;
  motif: ReactNode;
}

const PRODUCTS: Product[] = [
  {
    index: '01',
    kicker: 'The competition',
    title: 'The Superior League',
    body: 'Fifteen permanent founders and five Synergy Draft™ berths. The world’s premier* football competition, with revenues guaranteed regardless of performance, form, or final position.',
    to: '/superior-league',
    cta: 'Meet the clubs',
    motif: <LeagueMotif />,
  },
  {
    index: '02',
    kicker: 'The global game',
    title: 'Synergy Draft™',
    body: 'Each summer, five berths are drawn from thirteen global partners by an algorithmic lottery weighted by subscription tier. Every continent is represented. Every continent pays.',
    to: '/synergy-draft',
    cta: 'How the draft works',
    motif: <DraftMotif />,
  },
  {
    index: '03',
    kicker: 'The matchday',
    title: 'Superior Venue™',
    body: 'The stadium, replaced. Climate-controlled, dynamically priced and fitted with haptic seating, so that supporters are never merely watching football.',
    to: '/superior-venue',
    cta: 'Tour the venue',
    motif: <VenueMotif />,
  },
];

/**
 * The three products as panels. On wide screens the one under the pointer
 * (or focus) widens and the others give way, the way a fund lays out its
 * strategies.
 */
export function Portfolio() {
  return (
    <ul className="flex flex-col gap-px overflow-hidden rounded-sm border border-rule bg-rule lg:h-[34rem] lg:flex-row">
      {PRODUCTS.map((p) => (
        <li
          key={p.to}
          data-reveal="clip"
          className="group/panel bg-ground transition-[flex-grow] duration-700 [transition-timing-function:var(--ease-out-expo)] lg:flex-1 lg:hover:flex-[1.6] lg:has-[:focus-visible]:flex-[1.6]"
        >
          <Link
            to={p.to}
            viewTransition
            className="spotlight group flex h-full flex-col p-8 transition-colors duration-500 hover:bg-surface sm:p-10"
          >
            <div className="flex items-center justify-between">
              <p className="smallcaps text-accent">{p.kicker}</p>
              <p className="smallcaps figures text-ink-muted">{p.index}</p>
            </div>
            <div className="mx-auto my-8 h-40 w-40 transition-transform duration-700 [transition-timing-function:var(--ease-out-expo)] group-hover:scale-110 lg:h-44 lg:w-44">
              {p.motif}
            </div>
            <h3 className="mt-auto font-display text-3xl leading-tight sm:text-4xl">{p.title}</h3>
            <p className="mt-4 max-w-md text-ink-muted">{p.body}</p>
            <p className="mt-8 flex items-center justify-between border-t border-rule pt-5 text-sm font-semibold">
              {p.cta}
              <span
                aria-hidden="true"
                className="arrow flex h-9 w-9 items-center justify-center rounded-full border border-rule transition-colors group-hover:border-accent group-hover:bg-accent group-hover:text-accent-ink"
              >
                →
              </span>
            </p>
          </Link>
        </li>
      ))}
    </ul>
  );
}
