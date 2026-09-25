import { Link } from 'react-router';
import { lore } from '~/canon';
import { PlayLink } from '~/components/shared/OocStrip';
import { metaFor } from '~/meta';

export const meta = () => metaFor('/');

// Phase 0 home: the splash, straight from the game's canon. Phase 1 replaces
// this with the full Floodlight page (pillars, stamped stats, the letter).
export default function Home() {
  const { splash } = lore;
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_85%_-20%,rgb(229_184_66/0.22),transparent_55%)]"
      />
      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-32 lg:px-8">
        <p className="smallcaps text-accent">Private Equity Football Accelerate™</p>
        <h1 className="mt-6 max-w-5xl font-display text-5xl leading-[1.02] sm:text-7xl lg:text-8xl">
          {splash.headline}
        </h1>
        <div className="mt-10 max-w-2xl space-y-5 text-lg text-ink-muted">
          {splash.body.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
        <p className="mt-12 font-display text-3xl sm:text-4xl">
          {splash.punchline[0]}
          <br />
          <span className="text-accent">{splash.punchline[1]}</span>
        </p>
        <div className="mt-12 flex flex-wrap items-center gap-4">
          <Link
            to="/superior-league"
            className="inline-flex items-center rounded-full bg-accent px-6 py-3 font-semibold text-accent-ink"
          >
            Discover the Superior League
          </Link>
          <PlayLink />
        </div>
      </div>
    </section>
  );
}
