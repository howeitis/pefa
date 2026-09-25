import { useId, useState } from 'react';
import {
  type Application,
  assess,
  MARKETS,
  type Market,
  type Region,
  REGIONS,
  type Tier,
  TIERS,
} from '~/lib/draft';

const pct = (n: number) => `${Math.round(n * 100)}%`;

/**
 * The Synergy Draft™ eligibility calculator. Scores update as you answer;
 * everything is computed here, in the browser, and nothing is sent.
 */
export function DraftCalculator() {
  const id = useId();
  const [app, setApp] = useState<Application>({
    region: 'africa',
    market: 'city',
    tier: 'silver',
    success: 75,
  });
  const result = assess(app);
  const set = <K extends keyof Application>(key: K, value: Application[K]) =>
    setApp((a) => ({ ...a, [key]: value }));

  const field = 'mt-2 w-full rounded-sm border border-rule bg-surface px-3 py-2.5 text-ink';

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr]">
      <form
        className="space-y-7"
        onSubmit={(e) => e.preventDefault()}
        aria-label="Eligibility assessment"
      >
        <div>
          <label htmlFor={`${id}-region`} className="smallcaps text-ink-muted">
            Region
          </label>
          <select
            id={`${id}-region`}
            className={field}
            value={app.region}
            onChange={(e) => set('region', e.target.value as Region)}
          >
            {Object.entries(REGIONS).map(([k, r]) => (
              <option key={k} value={k}>
                {r.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor={`${id}-market`} className="smallcaps text-ink-muted">
            Market size
          </label>
          <select
            id={`${id}-market`}
            className={field}
            value={app.market}
            onChange={(e) => set('market', e.target.value as Market)}
          >
            {Object.entries(MARKETS).map(([k, m]) => (
              <option key={k} value={k}>
                {m.label}
              </option>
            ))}
          </select>
        </div>

        <fieldset>
          <legend className="smallcaps text-ink-muted">Subscription tier</legend>
          <div className="mt-2 grid grid-cols-3 gap-2 sm:grid-cols-5">
            {Object.entries(TIERS).map(([k, t]) => (
              <label
                key={k}
                className={`cursor-pointer rounded-sm border px-3 py-2.5 text-center text-sm font-semibold transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-gold ${
                  app.tier === k
                    ? 'border-accent bg-accent text-accent-ink'
                    : 'border-rule bg-surface hover:border-accent'
                }`}
              >
                <input
                  type="radio"
                  name={`${id}-tier`}
                  value={k}
                  checked={app.tier === k}
                  onChange={() => set('tier', k as Tier)}
                  className="sr-only"
                />
                {t.label}
              </label>
            ))}
          </div>
        </fieldset>

        <div>
          <label htmlFor={`${id}-success`} className="smallcaps text-ink-muted">
            Previous footballing success (where relevant)
          </label>
          <input
            id={`${id}-success`}
            type="range"
            min={0}
            max={100}
            value={app.success}
            onChange={(e) => set('success', Number(e.target.value))}
            aria-describedby={`${id}-success-note`}
            className="mt-3 w-full accent-gold"
          />
          <p id={`${id}-success-note`} className="figures mt-1 text-sm text-ink-muted">
            {app.success} / 100 · weighted at 0% · contributes 0 points
          </p>
        </div>

        <p className="ooc rounded px-3 py-2 text-sm">
          <strong>Out of character:</strong> this runs in your browser. Nothing you choose is sent
          or stored.
        </p>
      </form>

      <section
        aria-labelledby={`${id}-result`}
        className="rounded-sm border border-rule bg-surface p-6 sm:p-8"
      >
        <h3 id={`${id}-result`} className="smallcaps text-accent">
          Assessment
        </h3>
        <div role="status" aria-live="polite" aria-atomic="true">
          <p className="figures mt-3 font-display text-7xl leading-none">
            {result.score}
            <span className="text-2xl text-ink-muted"> / 100</span>
          </p>
          <p className="mt-4 font-display text-2xl leading-snug">{result.verdict}</p>
          {result.note && <p className="mt-3 text-ink-muted">{result.note}</p>}
        </div>

        <table className="figures mt-8 w-full text-sm">
          <caption className="sr-only">How the score is weighted</caption>
          <thead>
            <tr className="border-b border-rule text-left text-ink-muted">
              <th scope="col" className="smallcaps pb-2 font-semibold">
                Factor
              </th>
              <th scope="col" className="smallcaps pb-2 pl-4 text-right font-semibold">
                Weight
              </th>
              <th scope="col" className="smallcaps pb-2 pl-4 text-right font-semibold">
                Points
              </th>
            </tr>
          </thead>
          <tbody>
            {result.factors.map((f) => (
              <tr key={f.label} className="border-b border-rule">
                <td className="py-2 pr-2">{f.label}</td>
                <td className="py-2 pl-4 text-right">{pct(f.weight)}</td>
                <td className="py-2 pl-4 text-right">{f.points.toFixed(1)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-8 border-t-2 border-accent pt-5">
          {result.upgrade ? (
            <p>
              <span className="smallcaps text-accent">Recommended</span>
              <br />
              Upgrade to <strong>{TIERS[result.upgrade.tier].label}</strong> for a projected score
              of <strong className="figures">{result.upgrade.score}</strong>.
            </p>
          ) : (
            <p>
              <span className="smallcaps text-accent">Recommended</span>
              <br />
              You are at the highest tier. A higher tier is being designed for you.
            </p>
          )}
        </div>
        <p className="mt-6 text-xs text-ink-muted">
          This assessment is indicative and does not constitute an invitation. The Global Inclusion
          Committee does not publish its reasoning.
        </p>
      </section>
    </div>
  );
}
