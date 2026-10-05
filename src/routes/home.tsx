import type { CSSProperties } from 'react';
import { Link } from 'react-router';
import { clubLore, clubs, formatFollowers, league, lore, scene } from '~/canon';
import { Hero } from '~/components/floodlight/Hero';
import { Section } from '~/components/floodlight/Section';
import { CrestMarquee } from '~/components/home/CrestMarquee';
import { Portfolio } from '~/components/home/Portfolio';
import { ScrollQuote } from '~/components/home/ScrollQuote';
import { ThesisStory } from '~/components/home/ThesisStory';
import { CountUp } from '~/components/motion/CountUp';
import { Globe } from '~/components/motion/Globe';
import { Kicker } from '~/components/motion/Kicker';
import { SplitText } from '~/components/motion/SplitText';
import { TickerTape } from '~/components/motion/TickerTape';
import { OocStrip, PlayLink } from '~/components/shared/OocStrip';
import { LETTER } from '~/content/leadership';
import { formatReleaseDate, RELEASES } from '~/content/newsroom';
import { metaFor } from '~/meta';
import { NEWS_PATH } from '~/site-map';

export const meta = () => metaFor('/');

const close = scene('close');
const globalGame = lore.prospectus.sections.find((s) => s.heading === 'The Global Game')!;

const holdings = Object.values(clubLore);
const combinedValuation = holdings.reduce((s, l) => s + l.valuationBn, 0);
const combinedReach = holdings.reduce((s, l) => s + l.tokTokFollowers, 0);

const FIGURES = [
  {
    value: `£${combinedValuation.toFixed(1)}bn`,
    label: 'Combined club valuation',
    note: 'At listing. Revalued live by Clawed AI.',
  },
  {
    value: String(league.size),
    label: 'Clubs per season',
    note: 'Fifteen by right. Five by invitation.',
  },
  { value: '0', label: 'Relegations', note: 'Ever. Structurally.' },
  { value: '+80%', label: 'Mark-up on admission', note: 'Applied to the whole competition.' },
  {
    value: formatFollowers(combinedReach),
    label: 'TokTok reach',
    note: 'Printed on every asset, as required.',
  },
  { value: '3/5', label: 'Objectives redacted', note: 'Disclosure available on request.' },
];

const REGION: Record<string, string> = {
  England: 'Europe',
  Spain: 'Europe',
  Italy: 'Europe',
  France: 'Europe',
  Germany: 'Europe',
  USA: 'North America',
  Mexico: 'North America',
  'Saudi Arabia': 'Middle East',
  China: 'Asia',
  Japan: 'Asia',
  Egypt: 'Africa',
  'South Africa': 'Africa',
  Brazil: 'South America',
  Argentina: 'South America',
};
const regions = Object.entries(
  clubs.reduce<Record<string, string[]>>((acc, c) => {
    const r = REGION[c.country] ?? c.country;
    (acc[r] ??= []).push(c.city);
    return acc;
  }, {}),
).map(([name, cities]) => ({ name, count: cities.length, cities: [...new Set(cities)] }));

const latest = RELEASES.slice(0, 3);

export default function Home() {
  const { splash } = lore;
  return (
    <>
      <Hero
        full
        backdrop="field"
        kicker="Private Equity Football Accelerate™ · Luxembourg"
        title="Football did not die. It was algorithmically *optimized.*"
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
              viewTransition
              data-magnetic
              className="group inline-flex items-center gap-3 rounded-full bg-accent py-3 pl-6 pr-3 font-semibold text-accent-ink"
            >
              Discover the Superior League
              <span
                aria-hidden="true"
                className="arrow flex h-8 w-8 items-center justify-center rounded-full bg-accent-ink text-accent"
              >
                →
              </span>
            </Link>
            <PlayLink className="py-3" />
          </>
        }
        footer={
          <div className="relative">
            <div className="mx-auto hidden max-w-7xl items-center justify-between px-4 pb-5 sm:flex sm:px-6 lg:px-8">
              <p className="smallcaps text-ink-muted">Registered in Luxembourg · Est. 14.05.2035</p>
              <p className="smallcaps flex items-center gap-3 text-ink-muted">
                Scroll
                <span
                  aria-hidden="true"
                  className="scroll-cue relative block h-8 w-px overflow-hidden bg-rule"
                />
              </p>
            </div>
            <TickerTape />
          </div>
        }
      />

      <section aria-labelledby="figures-heading" className="relative">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <h2 id="figures-heading" className="font-display text-3xl sm:text-4xl">
              <SplitText text="PEFA™ at a glance." />
            </h2>
            <p className="smallcaps flex items-center gap-2 text-ink-muted">
              <span className="live-dot" aria-hidden="true" /> As at listing · indicative
            </p>
          </div>
          <dl className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-sm border border-rule bg-rule lg:grid-cols-3">
            {FIGURES.map((f) => (
              <div key={f.label} data-reveal="clip" className="spotlight bg-ground p-6 sm:p-10">
                <dt className="smallcaps text-accent">{f.label}</dt>
                <dd className="mt-6">
                  <span className="block font-display text-5xl leading-none sm:text-7xl">
                    <CountUp value={f.value} />
                  </span>
                  <span className="mt-4 block text-sm text-ink-muted">{f.note}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <ThesisStory />

      <Section
        id="portfolio"
        index="02"
        kicker="The PEFA™ portfolio"
        title="Three products. *One* revenue line."
        intro={<p>{splash.body[1]}</p>}
      >
        <Portfolio />
        <p className="mt-8 text-xs text-ink-muted">{globalGame.footnote}</p>
      </Section>

      <section
        id="holdings"
        aria-labelledby="holdings-heading"
        className="defer-render relative pb-20 sm:pb-32"
      >
        <span
          aria-hidden="true"
          data-reveal="line"
          className="absolute inset-x-0 top-0 block h-px origin-left bg-rule"
        />
        <div className="mx-auto grid max-w-7xl gap-6 px-4 pt-20 sm:px-6 sm:pt-32 lg:grid-cols-[minmax(0,1fr)_minmax(0,2.4fr)] lg:gap-12 lg:px-8">
          <div data-reveal="up" className="lg:pt-3">
            <Kicker index="03">Holdings</Kicker>
          </div>
          <div>
            <h2
              id="holdings-heading"
              className="max-w-4xl text-balance font-display text-4xl leading-[1.08] sm:text-6xl"
            >
              <SplitText text={`${clubs.length} listed clubs. *Zero* relegations.`} />
            </h2>
            <p data-reveal="up" className="mt-7 max-w-2xl text-lg text-ink-muted">
              Fifteen founders in perpetuity and thirteen global partners in the Synergy Draft™
              pool, each listed with a ticker, an exchange and a risk factor.
            </p>
          </div>
        </div>
        <div className="mt-16">
          <CrestMarquee />
        </div>
        <div className="mx-auto mt-10 max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link
            to="/investors#board"
            viewTransition
            className="group smallcaps inline-flex items-center gap-2 text-ink hover:text-accent"
          >
            View the board{' '}
            <span aria-hidden="true" className="arrow">
              →
            </span>
          </Link>
        </div>
      </section>

      <Section id="global" index="04" kicker={globalGame.heading} title="Global, *by design.*">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
          <div>
            <p data-reveal="up" className="max-w-md font-display text-2xl leading-snug">
              {globalGame.body.find((p) => p.startsWith('No region')) ?? globalGame.body[0]}
            </p>
            <ul className="mt-10 divide-y divide-rule border-y border-rule">
              {regions.map((r) => (
                <li
                  key={r.name}
                  data-reveal="up"
                  className="flex items-baseline justify-between gap-4 py-4"
                >
                  <span>
                    <span className="block font-medium">{r.name}</span>
                    <span className="mt-1 block text-sm text-ink-muted">
                      {r.cities.join(' · ')}
                    </span>
                  </span>
                  <span className="figures font-display text-3xl text-accent">
                    <CountUp value={String(r.count).padStart(2, '0')} />
                  </span>
                </li>
              ))}
            </ul>
            <p className="smallcaps mt-6 flex items-center gap-4 text-ink-muted">
              <span className="flex items-center gap-2">
                <span aria-hidden="true" className="h-2 w-2 rounded-full bg-ink" /> Founder
              </span>
              <span className="flex items-center gap-2">
                <span aria-hidden="true" className="h-2 w-2 rounded-full bg-accent" /> Draft pool
              </span>
            </p>
          </div>
          <div data-reveal="fade" className="relative mx-auto w-full max-w-xl">
            <Globe />
            <p className="smallcaps absolute bottom-0 right-0 text-ink-muted max-sm:hidden">
              Drag to rotate
            </p>
          </div>
        </div>
      </Section>

      <Section id="letter" index="05" kicker="From the President">
        <div className="grid gap-12 lg:grid-cols-[auto_1fr] lg:items-start lg:gap-16">
          <div aria-hidden="true" className="relative h-36 w-36 shrink-0">
            <svg
              viewBox="0 0 100 100"
              className="absolute inset-0 h-full w-full animate-[spin_30s_linear_infinite] motion-reduce:animate-none"
            >
              <defs>
                <path id="ring" d="M50 50 m-42 0 a42 42 0 1 1 84 0 a42 42 0 1 1 -84 0" />
              </defs>
              <text className="fill-ink-muted font-mono text-[6.4px] uppercase tracking-[0.3em]">
                <textPath href="#ring">
                  Office of the President · Luxembourg · Non-binding ·
                </textPath>
              </text>
            </svg>
            <span className="absolute inset-7 flex items-center justify-center rounded-full border border-accent/60 bg-surface font-display text-3xl text-accent">
              GI
            </span>
          </div>
          <figure>
            <ScrollQuote
              text={LETTER.excerpt}
              className="max-w-5xl font-display text-3xl leading-snug sm:text-5xl lg:text-6xl"
            />
            <figcaption className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-ink-muted">
              <span>
                <span className="text-ink">{LETTER.signature}</span>, {LETTER.role}
              </span>
              <Link
                to="/leadership#letter"
                viewTransition
                className="group font-semibold text-ink hover:text-accent"
              >
                Read the letter{' '}
                <span aria-hidden="true" className="arrow">
                  →
                </span>
              </Link>
            </figcaption>
          </figure>
        </div>
      </Section>

      <Section id="newsroom" index="06" kicker="Newsroom" title="Statements and *clarifications.*">
        <ul className="grid gap-px overflow-hidden rounded-sm border border-rule bg-rule md:grid-cols-3">
          {latest.map((r, i) => (
            <li
              key={r.slug}
              data-reveal="clip"
              style={{ '--delay': `${i * 90}ms` } as CSSProperties}
              className="bg-ground"
            >
              <Link
                to={NEWS_PATH(r.slug)}
                viewTransition
                className="spotlight group flex h-full min-h-[20rem] flex-col p-8 transition-colors duration-500 hover:bg-surface"
              >
                <p className="smallcaps flex justify-between text-ink-muted">
                  <span className="figures">{formatReleaseDate(r.date)}</span>
                  <span>{r.dateline}</span>
                </p>
                <h3 className="mt-8 font-display text-2xl leading-snug transition-colors group-hover:text-accent">
                  {r.title}
                </h3>
                <p className="mt-4 flex-1 text-sm text-ink-muted">{r.summary}</p>
                <p className="mt-8 text-sm font-semibold">
                  Read the release{' '}
                  <span aria-hidden="true" className="arrow">
                    →
                  </span>
                </p>
              </Link>
            </li>
          ))}
        </ul>
        <Link
          to="/newsroom"
          viewTransition
          className="group smallcaps mt-10 inline-flex items-center gap-2 text-ink hover:text-accent"
        >
          All releases{' '}
          <span aria-hidden="true" className="arrow">
            →
          </span>
        </Link>
      </Section>

      <section
        aria-labelledby="close-heading"
        className="defer-render relative isolate overflow-hidden"
      >
        <span
          aria-hidden="true"
          data-reveal="line"
          className="absolute inset-x-0 top-0 block h-px origin-left bg-rule"
        />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <div className="floodlight-glow absolute inset-0" />
          <div className="grid-lines absolute inset-0" />
          <span className="beams" />
        </div>
        <div className="mx-auto max-w-7xl px-4 py-28 text-center sm:px-6 sm:py-44 lg:px-8">
          <h2 id="close-heading" className="font-display text-5xl leading-[1.05] sm:text-8xl">
            <SplitText text={close.punchline![0]!} className="block" />
            <SplitText text={`*${close.punchline![1]}*`} className="block" delay={300} />
          </h2>
          <p data-reveal="up" className="mt-12 font-display text-2xl text-ink-muted">
            {close.welcome!.join(' ')}
          </p>
          <p className="mx-auto mt-8 max-w-xl text-sm text-ink-muted">{splash.disclaimer}</p>
        </div>
      </section>

      <OocStrip label="About the game">
        <div className="flex flex-col gap-4 py-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-2xl">
            <strong>Out of character:</strong> PEFA™ is the villain of Superior League 2036, a
            satirical football manager game (a soccer management simulator, in American). Take a
            club into PEFA’s league and try to win anyway. It’s free and plays in your browser.
          </p>
          <div className="flex shrink-0 flex-col gap-3 sm:items-end">
            <Link
              to="/play"
              viewTransition
              className="rounded-md bg-ooc-ink px-5 py-3 text-center font-semibold text-ooc"
            >
              Play the free football manager game
            </Link>
            <Link
              to="/play#trailer"
              viewTransition
              className="text-center font-semibold underline underline-offset-4"
            >
              Watch the trailer
            </Link>
          </div>
        </div>
      </OocStrip>
    </>
  );
}
