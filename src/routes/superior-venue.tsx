import { Link } from 'react-router';
import { decree, lore } from '~/canon';
import { Hero } from '~/components/floodlight/Hero';
import { Section } from '~/components/floodlight/Section';
import { metaFor } from '~/meta';

export const meta = () => metaFor('/superior-venue');

const matchday = lore.prospectus.sections.find((s) => s.heading === 'The Matchday Experience')!;

/**
 * Product copy for the nine features in the prospectus. The feature names are
 * locked canon (in prospectus order); the descriptions are site canon, logged
 * in CANON.md as `venue-spec`.
 */
const COPY: Record<string, string> = {
  'Climate-controlled conditions':
    'Every venue holds the pitch at a constant 19°C under a closed roof. Weather has been removed from the product, along with the excuses it provided.',
  'Dynamic ticket pricing':
    'Seat prices update continuously against demand, form and the opponent’s TokTok following. The price you paid is the price the moment deserved.',
  'Personalized in-seat advertising':
    'Each seat carries a display tuned to its occupant. Supporters report that the adverts know them better than their club does. We consider this a compliment.',
  'Sponsored substitutions':
    'A substitution is a broadcast moment, and every broadcast moment is available for purchase. Changes are announced by, and named after, their sponsor.',
  'AI-generated chants':
    'Chants are composed live from each crowd’s historical repertoire, cleared for rights and balanced by crowd audio calibration. The words are new. The feeling is licensed.',
  'Haptic seating':
    'Seats pulse on shots, tackles and price movements, so that no supporter misses a moment of value. Haptic seating is sold separately.',
  'Real-time Micro-Betting™':
    'In-play markets on every throw-in, corner and substitution, settled before the ball is back in play.',
  'Live player valuation updates':
    'Every player’s price updates on the venue boards as the match unfolds, calculated live by Clawed AI.',
  'Complimentary financial wellness content':
    'Included with every ticket and shown at half-time. Supporters who have followed dynamic pricing all season will find it especially relevant.',
};

/** Decrees that change the matchday itself. */
const MATCHDAY_DECREES = [
  'sponsored-substitutions',
  'micro-betting-window',
  'inventory-time',
  'live-valuation-boards',
  'synthetic-away-end',
  'wellness-breaks',
].map(decree);

export default function SuperiorVenue() {
  return (
    <>
      <Hero
        kicker="Superior Venue™ · Infrastructure by Microsack"
        title="The football stadium has been replaced."
        lede={
          <p>
            Every Superior League fixture is played in a Superior Venue™: a climate-controlled,
            fully instrumented matchday environment built around a single principle. You are not
            merely watching football. You are generating value.
          </p>
        }
      />

      <Section
        id="features"
        kicker="Specification"
        title="Standard in every venue."
        intro={<p>{matchday.body[0]}</p>}
      >
        <ol className="grid gap-px overflow-hidden rounded-sm border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-3">
          {matchday.bullets!.map((name, i) => (
            <li key={name} className="reveal bg-surface p-8">
              <p className="smallcaps figures text-accent">{String(i + 1).padStart(2, '0')}</p>
              <h3 className="mt-3 font-display text-2xl">{name}</h3>
              <p className="mt-3 text-ink-muted">{COPY[name]}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section
        id="regulations"
        kicker="Matchday regulations"
        title="Decrees that shape the experience."
        intro={
          <p>
            Some features are switched on by the season’s league decrees. When one is in force, it
            applies in every venue.
          </p>
        }
      >
        <ul className="grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {MATCHDAY_DECREES.map((d) => (
            <li key={d.id} className="reveal border-l-2 border-accent pl-6">
              <h3 className="font-display text-2xl">{d.name}</h3>
              <p className="mt-2 text-ink-muted">{d.tagline}</p>
            </li>
          ))}
        </ul>
        <Link to="/governance" className="mt-12 inline-block font-semibold hover:text-accent">
          The full decree register <span aria-hidden="true">→</span>
        </Link>
      </Section>

      <Section id="app" kicker="Superior League app™" title="Participation is encouraged.">
        <div className="reveal grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <p className="font-display text-3xl leading-snug">{matchday.footnote}</p>
          <div className="space-y-4 text-ink-muted">
            <p>
              Venue infrastructure, boards, seating and crowd audio calibration are provided by
              Microsack. Valuations are provided by Clawed AI.
            </p>
            <Link
              to="/technology"
              className="inline-block font-semibold text-ink hover:text-accent"
            >
              Meet the technology partners <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
