import { Link } from 'react-router';

export interface Pillar {
  kicker: string;
  title: string;
  body: string;
  to: string;
  cta: string;
}

/** Product pillars: tall cards that catch the light and lift on hover. */
export function PillarRow({ pillars }: { pillars: Pillar[] }) {
  return (
    <ul className="grid gap-px overflow-hidden rounded-sm border border-rule bg-rule md:grid-cols-3">
      {pillars.map((p, i) => (
        <li key={p.to} data-reveal="clip" className="bg-ground">
          <Link
            to={p.to}
            viewTransition
            className="spotlight group flex h-full min-h-[26rem] flex-col p-8 transition-colors duration-500 hover:bg-surface sm:p-10"
          >
            <div className="flex items-center justify-between">
              <p className="smallcaps text-accent">{p.kicker}</p>
              <p className="smallcaps figures text-ink-muted">0{i + 1}</p>
            </div>
            <h3 className="mt-auto pt-16 font-display text-4xl leading-tight transition-transform duration-700 [transition-timing-function:var(--ease-out-expo)] group-hover:-translate-y-2">
              {p.title}
            </h3>
            <p className="mt-5 text-ink-muted">{p.body}</p>
            <p className="mt-10 flex items-center justify-between border-t border-rule pt-5 text-sm font-semibold">
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
