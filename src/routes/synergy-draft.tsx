import { Link } from 'react-router';
import { clubsIn, league, lore, scene } from '~/canon';
import { DraftCalculator } from '~/components/floodlight/DraftCalculator';
import { DraftConstellation } from '~/components/floodlight/DraftConstellation';
import { Hero } from '~/components/floodlight/Hero';
import { Section } from '~/components/floodlight/Section';
import { metaFor } from '~/meta';

export const meta = () => metaFor('/synergy-draft');

const draft = scene('draft');
const globalGame = lore.prospectus.sections.find((s) => s.heading === 'The Global Game')!;
const solution = lore.prospectus.sections.find((s) => s.heading === 'The Solution')!;

const STEPS = [
  {
    title: 'Apply',
    body: `Clubs outside Europe apply to the Global Inclusion Committee, which meets twice annually and does not publish its reasoning.`,
  },
  {
    title: 'Be weighted',
    body: 'Applications are scored on market size, brand compatibility, social engagement, broadcast reach, luxury hospitality demand, subscription conversion rate, private equity interest, and previous footballing success where relevant.',
  },
  {
    title: 'Be drawn',
    body: `Each summer an algorithmic lottery, weighted by subscription tier, draws ${league.rotatingSlots} berths from the pool of ${league.globalIds.length} global partners.`,
  },
  {
    title: 'Play one season',
    body: 'Berths are redrawn every summer, regardless of where their holders finish. Membership is reviewed annually. Payments are reviewed continuously.',
  },
];

export default function SynergyDraft() {
  return (
    <>
      <Hero
        kicker={draft.kicker!}
        title={draft.headline!}
        lede={
          <>
            <p>{draft.body}</p>
            <p className="font-display text-2xl text-ink">{draft.punch}</p>
          </>
        }
      />

      <Section id="how" kicker="How it works" title="Four steps to inclusion.">
        <ol className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <li key={s.title} className="reveal rounded-sm border border-rule bg-surface p-7">
              <p className="figures font-display text-5xl text-accent">{i + 1}</p>
              <h3 className="mt-4 font-display text-2xl">{s.title}</h3>
              <p className="mt-3 text-ink-muted">{s.body}</p>
            </li>
          ))}
        </ol>
        <p className="mt-8 text-sm text-ink-muted">{solution.body[3]}</p>
      </Section>

      <Section
        id="pool"
        kicker="The pool"
        title={`${league.globalIds.length} global partners. ${league.rotatingSlots} berths.`}
      >
        <DraftConstellation clubs={clubsIn(league.globalIds)} drawn={lore.intro.drawnClubIds} />
      </Section>

      <Section
        id="eligibility"
        kicker="Eligibility"
        title="Is your club included?"
        intro={
          <p>
            Answer four questions for an indicative assessment, weighted exactly as the Committee
            weights it, or as nearly as can be disclosed.
          </p>
        }
      >
        <DraftCalculator />
      </Section>

      <Section id="committee" kicker="The Committee">
        <figure className="reveal max-w-4xl">
          <blockquote className="font-display text-4xl leading-tight sm:text-5xl">
            “{globalGame.body[3]}”
          </blockquote>
          <figcaption className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-ink-muted">
            <span>The Global Inclusion Committee</span>
            <Link
              to="/governance/committee-minutes"
              className="font-semibold text-ink hover:text-accent"
            >
              Read the minutes <span aria-hidden="true">→</span>
            </Link>
          </figcaption>
        </figure>
      </Section>
    </>
  );
}
