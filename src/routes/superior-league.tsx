import { Link } from 'react-router';
import { clubsIn, decree, domestic, league, lore, scene } from '~/canon';
import { CrestGrid } from '~/components/floodlight/CrestGrid';
import { DraftConstellation } from '~/components/floodlight/DraftConstellation';
import { Hero } from '~/components/floodlight/Hero';
import { Section } from '~/components/floodlight/Section';
import { StampedStat, StatRow } from '~/components/floodlight/StampedStat';
import { metaFor } from '~/meta';

export const meta = () => metaFor('/superior-league');

const founders = scene('founders');
const draft = scene('draft');
const globalGame = lore.prospectus.sections.find((s) => s.heading === 'The Global Game')!;

/** A few decrees that show the flavour of the register. The full list is on /governance. */
const FEATURED_DECREES = [
  'subscription-tiebreak',
  'founder-veto',
  'retroactive-scoring',
  'broadcast-dimensions',
].map(decree);

export default function SuperiorLeague() {
  const zones = domestic.zoneLabels;
  return (
    <>
      <Hero
        kicker="A PEFA™ Global Property"
        title="The Superior League"
        lede={
          <>
            <p>
              Twenty clubs. Fifteen seats held in perpetuity, and five berths redrawn every summer.
              No relegation. No qualification. No existential risk.
            </p>
            <p className="font-display text-2xl text-ink">
              {lore.splash.punchline[0]}{' '}
              <span className="text-accent">{lore.splash.punchline[1]}</span>
            </p>
          </>
        }
      />

      <Section id="structure" kicker="Structure" title="The shape of the competition">
        <StatRow>
          <StampedStat
            value={String(league.permanentIds.length)}
            label="Permanent founders"
            note="Un-relegatable. Held in perpetuity."
          />
          <StampedStat
            value={String(league.rotatingSlots)}
            label="Synergy Draft™ berths"
            note={`Drawn each summer from ${league.globalIds.length} global partners.`}
          />
          <StampedStat
            value={String(league.size)}
            label="Clubs each season"
            note="Fifteen by right. Five by invitation."
          />
        </StatRow>
      </Section>

      <Section
        id="founders"
        kicker={founders.kicker}
        title={founders.headline}
        intro={<p>{founders.body}</p>}
      >
        <p className="reveal smallcaps mb-12 inline-block rotate-[-2deg] border-2 border-accent px-4 py-2 text-accent">
          {founders.stamp}
        </p>
        <CrestGrid clubs={clubsIn(league.permanentIds)} />
        <p className="mt-12 text-sm text-ink-muted">{founders.footnote}</p>
      </Section>

      <Section
        id="draft"
        kicker={draft.kicker}
        title={draft.headline}
        intro={
          <>
            <p>{draft.body}</p>
            <p className="font-display text-2xl text-ink">{draft.punch}</p>
          </>
        }
      >
        <DraftConstellation clubs={clubsIn(league.globalIds)} drawn={lore.intro.drawnClubIds} />
        <div className="mt-10 flex flex-col gap-6 border-t border-rule pt-6 text-sm text-ink-muted sm:flex-row sm:items-center sm:justify-between">
          <p>{draft.footnote}</p>
          <Link to="/synergy-draft" className="shrink-0 font-semibold text-ink hover:text-accent">
            How the Synergy Draft™ works <span aria-hidden="true">→</span>
          </Link>
        </div>
      </Section>

      <Section
        id="table"
        kicker="The table"
        title="Every position has a price."
        intro={
          <p>
            There is no relegation. The fifteen permanent members cannot be removed, and the five
            guest berths are redrawn by lottery regardless of where their holders finished. The
            table is retained for its commercial value.
          </p>
        }
      >
        <ol className="grid gap-6 md:grid-cols-3">
          {[
            {
              where: '1st',
              name: zones.champion,
              body: 'Champions of the Superior League. The trophy is also available as a subscription tier.',
            },
            {
              where: 'Top 4',
              name: zones.european,
              body: 'Qualification for the intercontinental play-off series, and the broadcast windows that come with it.',
            },
            {
              where: 'Bottom 3',
              name: zones.relegation,
              body: 'No sporting consequence. A considerable commercial one.',
            },
          ].map((z) => (
            <li key={z.name} className="reveal rounded-sm border border-rule bg-surface p-8">
              <p className="smallcaps text-ink-muted">{z.where}</p>
              <h3 className="mt-3 font-display text-3xl text-accent">{z.name}</h3>
              <p className="mt-4 text-ink-muted">{z.body}</p>
            </li>
          ))}
        </ol>
        <p className="reveal mt-10 max-w-3xl text-lg text-ink-muted">
          Knockout football continues in <strong className="text-ink">{domestic.cupName}</strong>,
          presented by our technology partner, where ties can still be lost. PEFA™ regards this as
          heritage content.
        </p>
      </Section>

      <Section
        id="decrees"
        kicker="League decrees"
        title="The rules change every summer."
        intro={
          <p>
            Each summer the Rules Committee hands down the season’s decrees, in consultation with
            the broadcast partner and nobody else. A selection from the register:
          </p>
        }
      >
        <ul className="grid gap-6 sm:grid-cols-2">
          {FEATURED_DECREES.map((d) => (
            <li key={d.id} className="reveal border-l-2 border-accent pl-6">
              <h3 className="font-display text-2xl">{d.name}</h3>
              <p className="mt-2 text-ink-muted">{d.tagline}</p>
            </li>
          ))}
        </ul>
        <Link to="/governance" className="mt-12 inline-block font-semibold hover:text-accent">
          Read the decree register <span aria-hidden="true">→</span>
        </Link>
      </Section>

      <Section id="global" kicker={globalGame.heading} title="Global, by design.">
        <div className="reveal max-w-3xl space-y-5 text-lg text-ink-muted">
          {globalGame.body.map((p) => (
            <p
              key={p}
              className={p.startsWith('No region') ? 'font-display text-2xl text-ink' : ''}
            >
              {p}
            </p>
          ))}
          <p className="text-xs">{globalGame.footnote}</p>
        </div>
      </Section>
    </>
  );
}
