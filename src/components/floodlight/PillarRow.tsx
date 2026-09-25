import { Link } from 'react-router';

export interface Pillar {
  kicker: string;
  title: string;
  body: string;
  to: string;
  cta: string;
}

/** Three product pillars, each a card that links through. */
export function PillarRow({ pillars }: { pillars: Pillar[] }) {
  return (
    <ul className="grid gap-6 md:grid-cols-3">
      {pillars.map((p) => (
        <li key={p.to} className="reveal">
          <Link
            to={p.to}
            className="group flex h-full flex-col rounded-sm border border-rule bg-surface p-8 transition-colors hover:border-accent"
          >
            <p className="smallcaps text-accent">{p.kicker}</p>
            <h3 className="mt-4 font-display text-3xl">{p.title}</h3>
            <p className="mt-4 flex-1 text-ink-muted">{p.body}</p>
            <p className="mt-8 text-sm font-semibold">
              {p.cta}{' '}
              <span
                aria-hidden="true"
                className="inline-block transition-transform group-hover:translate-x-1"
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
