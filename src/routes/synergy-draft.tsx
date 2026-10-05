import { Link } from 'react-router';
import { clubsIn, league, lore, scene } from '~/canon';
import { DraftCalculator } from '~/components/floodlight/DraftCalculator';
import { DraftConstellation } from '~/components/floodlight/DraftConstellation';
import { Hero } from '~/components/floodlight/Hero';
import { DraftMotif } from '~/components/home/Motifs';
import { ScrollQuote } from '~/components/home/ScrollQuote';
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
        backdrop="grid"
        aside={
          <div className="hidden h-[26rem] w-[26rem] rounded-full border border-rule p-12 lg:block">
            <DraftMotif />
          </div>
        }
        lede={
          <>
            <p>{draft.body}</p>
            <p className="font-display text-2xl text-ink">{draft.punch}</p>
          </>
        }
      />

      <Section index="01" id="how" kicker="How it works" title="Four steps to *inclusion.*">
        <ol className="relative grid gap-px overflow-hidden rounded-sm border border-rule bg-rule md:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <li
              key={s.title}
              data-reveal="clip"
              className="spotlight relative bg-ground p-8 transition-colors duration-500 hover:bg-surface"
            >
              <span
                aria-hidden="true"
                data-reveal="line"
                style={{ '--delay': `${300 + i * 250}ms` } as React.CSSProperties}
                className="absolute inset-x-0 top-0 block h-0.5 origin-left bg-accent"
              />
              <p className="figures font-display text-6xl text-accent">0{i + 1}</p>
              <h3 className="mt-4 font-display text-2xl">{s.title}</h3>
              <p className="mt-3 text-ink-muted">{s.body}</p>
            </li>
          ))}
        </ol>
        <p className="mt-8 text-sm text-ink-muted">{solution.body[3]}</p>
      </Section>

      <Section
        index="02"
        id="pool"
        kicker="The pool"
        title={`${league.globalIds.length} global partners. ${league.rotatingSlots} berths.`}
      >
        <DraftConstellation clubs={clubsIn(league.globalIds)} drawn={lore.intro.drawnClubIds} />
      </Section>

      <Section
        index="03"
        id="eligibility"
        kicker="Eligibility"
        title="Is your club *included?*"
        intro={
          <p>
            Answer four questions for an indicative assessment, weighted exactly as the Committee
            weights it, or as nearly as can be disclosed.
          </p>
        }
      >
        <DraftCalculator />
      </Section>

      <Section index="04" id="committee" kicker="The Committee">
        <figure className="max-w-4xl">
          <ScrollQuote
            text={globalGame.body[3]!}
            className="font-display text-4xl leading-tight sm:text-6xl"
          />
          <figcaption className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-ink-muted">
            <span>The Global Inclusion Committee</span>
            <Link
              viewTransition
              to="/governance/committee-minutes"
              className="group font-semibold text-ink hover:text-accent"
            >
              Read the minutes{' '}
              <span aria-hidden="true" className="arrow">
                →
              </span>
            </Link>
          </figcaption>
        </figure>
      </Section>
    </>
  );
}
