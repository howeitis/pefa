import { Link } from 'react-router';
import { lore, scene } from '~/canon';
import { Hero } from '~/components/floodlight/Hero';
import { PillarRow } from '~/components/floodlight/PillarRow';
import { Section } from '~/components/floodlight/Section';
import { StampedStat, StatRow } from '~/components/floodlight/StampedStat';
import { OocStrip, PlayLink } from '~/components/shared/OocStrip';
import { Redacted } from '~/components/shared/Redacted';
import { LETTER } from '~/content/leadership';
import { metaFor } from '~/meta';

export const meta = () => metaFor('/');

const problem = scene('problem');
const genesis = scene('genesis');
const close = scene('close');
const launchQuote = lore.prospectus.sections.find((s) => s.quote)!.quote!;
const globalGame = lore.prospectus.sections.find((s) => s.heading === 'The Global Game')!;

export default function Home() {
  const { splash } = lore;
  return (
    <>
      <Hero
        kicker="Private Equity Football Accelerate™"
        title={splash.headline}
        lede={
          <p>
            PEFA™ owns and operates the Superior League: twenty clubs, fifteen of them permanent,
            played in Superior Venues™ and supervised by the world’s leading technology partners.
          </p>
        }
        actions={
          <>
            <Link
              to="/superior-league"
              className="inline-flex items-center rounded-full bg-accent px-6 py-3 font-semibold text-accent-ink"
            >
              Discover the Superior League
            </Link>
            <PlayLink />
          </>
        }
      />

      <Section
        id="problem"
        kicker={problem.kicker}
        title={problem.headline}
        intro={
          <>
            <p className="font-display text-2xl text-ink">{problem.punch}</p>
            <p>{lore.prospectus.sections[0]!.body[1]}</p>
          </>
        }
      >
        <StatRow>
          {problem.stats!.map((s) => (
            <StampedStat key={s.label} value={s.value} label={s.label} />
          ))}
        </StatRow>
      </Section>

      <Section id="solution" kicker={genesis.kicker} title={genesis.headline}>
        <div className="grid items-start gap-12 lg:grid-cols-[1.1fr_1fr]">
          <div className="reveal rounded-sm border border-rule bg-surface">
            <p className="smallcaps border-b border-rule px-6 py-4 text-ink-muted sm:px-8">
              {genesis.filingTitle}
            </p>
            <dl className="divide-y divide-rule">
              {genesis.filing!.map((row) => (
                <div
                  key={row.label}
                  className="grid grid-cols-[7.5rem_1fr] gap-4 px-6 py-4 sm:px-8"
                >
                  <dt className="smallcaps pt-1 text-ink-muted">{row.label}</dt>
                  <dd className="text-lg">
                    {row.redacted ? <Redacted>{row.value}</Redacted> : row.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
          <figure className="reveal">
            <blockquote className="font-display text-3xl leading-snug sm:text-4xl">
              “{launchQuote.text}”
            </blockquote>
            <figcaption className="mt-6 text-ink-muted">— {launchQuote.attribution}</figcaption>
          </figure>
        </div>
      </Section>

      <Section
        id="portfolio"
        kicker="The PEFA™ portfolio"
        title="Three products. One revenue line."
      >
        <PillarRow
          pillars={[
            {
              kicker: 'The competition',
              title: 'The Superior League',
              body: 'Fifteen permanent founders and five Synergy Draft™ berths. The world’s premier* football competition, with revenues guaranteed regardless of performance, form, or final position.',
              to: '/superior-league',
              cta: 'Meet the clubs',
            },
            {
              kicker: 'The global game',
              title: 'Synergy Draft™',
              body: 'Each summer, five berths are drawn from thirteen global partners by an algorithmic lottery weighted by subscription tier. Every continent is represented. Every continent pays.',
              to: '/synergy-draft',
              cta: 'How the draft works',
            },
            {
              kicker: 'The matchday',
              title: 'Superior Venue™',
              body: 'The stadium, replaced. Climate-controlled, dynamically priced and fitted with haptic seating, so that supporters are never merely watching football.',
              to: '/superior-venue',
              cta: 'Tour the venue',
            },
          ]}
        />
        <p className="mt-8 text-xs text-ink-muted">{globalGame.footnote}</p>
      </Section>

      <Section id="letter" kicker="From the President">
        <figure className="reveal grid gap-10 lg:grid-cols-[auto_1fr] lg:items-center">
          <div
            aria-hidden="true"
            className="flex h-28 w-28 items-center justify-center border border-rule bg-surface font-display text-4xl text-accent"
          >
            GI
          </div>
          <div>
            <blockquote className="max-w-4xl font-display text-3xl leading-snug sm:text-5xl">
              “{LETTER.excerpt}”
            </blockquote>
            <figcaption className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-ink-muted">
              <span>
                {LETTER.signature}, {LETTER.role}
              </span>
              <Link to="/leadership#letter" className="font-semibold text-ink hover:text-accent">
                Read the letter <span aria-hidden="true">→</span>
              </Link>
            </figcaption>
          </div>
        </figure>
      </Section>

      <section aria-labelledby="close-heading" className="border-t border-rule">
        <div className="floodlight-glow">
          <div className="mx-auto max-w-7xl px-4 py-24 text-center sm:px-6 sm:py-32 lg:px-8">
            <h2
              id="close-heading"
              className="reveal font-display text-5xl leading-tight sm:text-7xl"
            >
              {close.punchline![0]}
              <br />
              <span className="text-accent">{close.punchline![1]}</span>
            </h2>
            <p className="reveal mt-10 font-display text-2xl text-ink-muted">
              {close.welcome!.join(' ')}
            </p>
            <p className="mx-auto mt-10 max-w-xl text-sm text-ink-muted">{splash.disclaimer}</p>
          </div>
        </div>
      </section>

      <OocStrip label="About the game">
        <div className="flex flex-col gap-4 py-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-2xl">
            <strong>Out of character:</strong> PEFA™ is the villain of Superior League 2036, a
            football management game. Take a club into PEFA’s league and try to win anyway.
          </p>
          <Link
            to="/play"
            className="shrink-0 rounded-md bg-ooc-ink px-5 py-3 text-center font-semibold text-ooc"
          >
            How to play
          </Link>
        </div>
      </OocStrip>
    </>
  );
}
