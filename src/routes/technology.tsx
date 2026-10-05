import { Link } from 'react-router';
import { decree, domestic, lore, scene } from '~/canon';
import { Hero } from '~/components/floodlight/Hero';
import { PartnerPanel } from '~/components/floodlight/PartnerPanel';
import { Section } from '~/components/floodlight/Section';
import { metaFor } from '~/meta';

export const meta = () => metaFor('/technology');

const partners = scene('partners');
const techSection = lore.prospectus.sections.find((s) => s.heading === 'Technology Partners')!;
const role = (name: string) => partners.partners!.find((p) => p.name === name)!.role;

/** One matchday, as the three partners produce it. Site canon: `match-production`. */
const PIPELINE = [
  {
    when: 'Before',
    who: 'Clawed AI',
    what: 'Models both sides’ intentions, prices every player and shares its opposition modeling with all clubs equally, at tiered rates.',
  },
  {
    when: 'During',
    who: 'Microsack',
    what: 'Runs the venue: the roof, the boards, the seats and the sound, with crowd audio calibrated to broadcast tolerances throughout.',
  },
  {
    when: 'During',
    who: 'Clawed AI',
    what: 'Updates live valuations on the boards and, where the decree is in force, rules on every offside margin.',
  },
  {
    when: 'After',
    who: 'ChatGDP',
    what: 'Issues the manager’s statement, the club’s response, the league’s clarification, and the supporter reaction to all three.',
  },
];

export default function Technology() {
  const offside = decree('algorithmic-offside');
  const awayEnd = decree('synthetic-away-end');
  return (
    <>
      <Hero
        kicker={partners.kicker!}
        title={partners.headline!}
        backdrop="field"
        lede={<p>{techSection.body[0]}</p>}
      />

      <Section
        index="01"
        id="partners"
        kicker="Technology leadership"
        title="Three partners. *One* match."
      >
        <div className="grid gap-6 lg:grid-cols-3">
          <PartnerPanel
            index="01"
            name="Microsack"
            role={role('Microsack')}
            footer={
              <p>
                <span className="text-ink-muted">Also supports:</span> {awayEnd.name}.{' '}
                {awayEnd.tagline}
              </p>
            }
          >
            <p>
              Microsack builds and runs every Superior Venue™. Its crowd audio calibration keeps
              atmosphere within broadcast tolerances: raising it where a fixture is under-attended,
              and lowering it where the crowd is off-message.
            </p>
            <p>No Superior League supporter has ever been inaudible, or audible by accident.</p>
          </PartnerPanel>

          <PartnerPanel
            index="02"
            name="Clawed AI"
            role={role('Clawed AI')}
            footer={
              <p>
                <span className="text-ink-muted">Title partner of</span> {domestic.cupName}.
              </p>
            }
          >
            <p>
              Clawed AI watches every match more closely than anyone in the venue. Its tactical
              inference anticipates each side’s intentions before the players form them, and its
              live valuation is the price on the board.
            </p>
            <p>
              Under the {offside.name} decree, Clawed AI rules on every margin. It does not publish
              its reasoning.
            </p>
          </PartnerPanel>

          <PartnerPanel
            index="03"
            name="ChatGDP"
            role={role('ChatGDP')}
            footer={
              <p className="text-ink-muted">
                Statements are issued within four seconds of the final whistle.
              </p>
            }
          >
            <p>
              ChatGDP writes everything said after the match. Managers have never been misquoted,
              because nobody else is quoted.
            </p>
            <p>
              Supporter reaction is generated in advance of the result, which PEFA™ considers
              efficient.
            </p>
          </PartnerPanel>
        </div>
      </Section>

      <Section
        index="02"
        id="production"
        kicker="Production"
        title="How a Superior League match is *made.*"
      >
        <ol className="relative space-y-12 border-l border-rule pl-10">
          <li
            aria-hidden="true"
            data-reveal="line-y"
            className="absolute -left-px top-0 block h-full w-px bg-accent"
          />
          {PIPELINE.map((step, i) => (
            <li key={i} className="reveal relative">
              <span aria-hidden="true" className="live-dot absolute -left-[45px] top-2" />
              <p className="smallcaps text-accent">
                {step.when} · {step.who}
              </p>
              <p className="mt-3 max-w-2xl font-display text-2xl leading-snug">{step.what}</p>
            </li>
          ))}
        </ol>
        <p className="reveal mt-20 font-display text-4xl text-accent">{partners.footnote}</p>
        <Link
          viewTransition
          to="/partners"
          className="group mt-8 inline-block font-semibold hover:text-accent"
        >
          All PEFA™ partners{' '}
          <span aria-hidden="true" className="arrow">
            →
          </span>
        </Link>
      </Section>
    </>
  );
}
