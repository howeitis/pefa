import type { ReactNode } from 'react';
import { FICTION_NOTICE } from '~/components/shared/OocStrip';
import { metaFor, SITE_URL } from '~/meta';
import { PLAY_LINKS } from '~/play-links';

/**
 * Plain answers to the questions people type into search engines and AI
 * assistants. Rendered on the page and repeated as FAQPage structured data,
 * so the two can't drift apart. Only facts the game's canon confirms.
 */
const FAQ: { q: string; a: string }[] = [
  {
    q: 'What kind of game is Superior League 2036?',
    a: 'A football management simulator, or soccer manager game. You manage one club: you pick the team, set the tactics, work the transfer market and keep the board happy, and the match engine plays out the results.',
  },
  {
    q: 'Is it a football simulator where I control the players?',
    a: 'No. It is a management sim, in the tradition of football manager games, rather than an action game where you control players on the pitch. You make the decisions; the simulation plays the matches.',
  },
  {
    q: 'Is Superior League 2036 free?',
    a: 'Yes. Superior League 2036 is free to play.',
  },
  {
    q: 'Can I play it in my browser?',
    a: 'Yes. The web version runs in any modern browser, on desktop or phone, with nothing to install. An Android app is in a closed test on Google Play.',
  },
  {
    q: 'Are real clubs or players in the game?',
    a: 'No. Every club, league and person is invented. There are 28 clubs in the Superior League world, plus five domestic leagues of invented clubs.',
  },
  {
    q: 'What is PEFA™?',
    a: 'PEFA™ (Private Equity Football Accelerate™) is the game’s fictional villain: a private equity fund that dissolved football and rebuilt it as a subscription product. This website is PEFA’s corporate site, written in character as satire.',
  },
];

export const meta = () => [
  ...metaFor('/play'),
  {
    'script:ld+json': [
      {
        '@context': 'https://schema.org',
        '@type': 'VideoGame',
        name: 'Superior League 2036',
        url: PLAY_LINKS.web,
        description:
          'A free, satirical football management simulator (soccer manager game). Manage a club in a closed, investor-owned super league and try to win anyway.',
        genre: ['Sports', 'Simulation', 'Football management', 'Soccer manager', 'Satire'],
        gamePlatform: ['Web browser', 'Android'],
        applicationCategory: 'Game',
        playMode: 'SinglePlayer',
        isAccessibleForFree: true,
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'GBP', url: PLAY_LINKS.web },
        inLanguage: 'en',
        image: `${SITE_URL}/og-image.jpg`,
      },
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: FAQ.map(({ q, a }) => ({
          '@type': 'Question',
          name: q,
          acceptedAnswer: { '@type': 'Answer', text: a },
        })),
      },
    ],
  },
];

/**
 * The one page written entirely out of character: plain type, flat colour,
 * no jokes in the instructions. Everything a real visitor needs to play.
 */
export default function Play() {
  return (
    <div className="font-ooc mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
      <p className="text-sm font-semibold uppercase tracking-wide text-ink-muted">
        Out of character
      </p>
      <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
        Play Superior League 2036
      </h1>
      <p className="mt-4 text-xl font-semibold leading-snug">
        A free, satirical football manager game. A soccer management simulator, if you’re reading
        this in America. No real clubs, no download, and it plays in your browser.
      </p>
      <p className="mt-6 text-lg leading-relaxed">
        This website is satire. PEFA™ is the villain of <strong>Superior League 2036</strong>, a
        football management game set after a fictional private equity fund dissolved the sport and
        rebuilt it as a subscription product. You take charge of a club in its closed league and try
        to win anyway.
      </p>
      <ActionLink href={PLAY_LINKS.web}>
        Play the free football manager game in your browser
      </ActionLink>

      <Section title="What you do as manager">
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong>Run a club</strong> in a 20-club super league, where 15 founders can never be
            relegated and five places are redrawn every summer.
          </li>
          <li>
            <strong>Pick the eleven and set the tactics</strong>, then watch the match engine decide
            whether you were right.
          </li>
          <li>
            <strong>Work the transfer market</strong> in an economy where every fee, budget and
            valuation has been marked up for broadcast.
          </li>
          <li>
            <strong>Survive the board</strong> and build your manager reputation over a 38-game
            league season and a knockout cup, the Clawed AI Cup.
          </li>
          <li>
            <strong>Adapt to league decrees</strong> that rewrite the rules each season: away wins
            worth four points, derby wins worth six, algorithmic offside, sponsored substitutions
            and 28 more.
          </li>
          <li>
            <strong>Every club is invented.</strong> 28 clubs in the league’s world, each with a
            share price, an owner and a history, plus five domestic leagues carrying on without
            them.
          </li>
        </ul>
      </Section>

      <Section title="Football or soccer?">
        <p>
          Both. Superior League 2036 is a football simulator in the management sense: you make the
          calls a manager makes, not the passes a player makes. If you came looking for a free
          soccer manager game, a football management sim or a browser football game with a sense of
          humour, this is that game. If you came looking for a governing body, you have found a
          parody of one.
        </p>
      </Section>

      <Section title="On Android" tag="Android only · closed test">
        <p>
          The Android app is in a closed test on Google Play. Joining takes two steps, in this
          order:
        </p>
        <ol className="mt-5 space-y-4">
          <Step n={1} title="Join the testers’ group">
            Joining the Google Group is what gives your Google account access to the test.
            <ActionLink href={PLAY_LINKS.testerGroup}>Join the testers’ group</ActionLink>
          </Step>
          <Step n={2} title="Opt in on Google Play and install">
            Open the opt-in link with the same Google account, accept the invitation, then install
            the app from the Play Store page it links to.
            <ActionLink href={PLAY_LINKS.playOptIn}>Open the Play opt-in page</ActionLink>
          </Step>
        </ol>
      </Section>

      <Section title="In your browser">
        <p>The web version runs in any modern browser, on desktop or phone.</p>
        <ActionLink href={PLAY_LINKS.web}>Play on the web</ActionLink>
      </Section>

      <Section title="Questions">
        <dl className="space-y-6">
          {FAQ.map(({ q, a }) => (
            <div key={q}>
              <dt className="font-semibold">{q}</dt>
              <dd className="mt-1 text-ink-muted">{a}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section title="About this site">
        <p>{FICTION_NOTICE}</p>
        <p className="mt-3">
          No real club, league or governing body is depicted. The forms on this site work out their
          answers in your browser and send nothing. The site sets no cookies.
        </p>
      </Section>
    </div>
  );
}

function Section({ title, tag, children }: { title: string; tag?: string; children: ReactNode }) {
  return (
    <section className="mt-12 border-t border-rule pt-8">
      <div className="flex flex-wrap items-center gap-3">
        <h2 className="text-2xl font-bold">{title}</h2>
        {tag && (
          <span className="rounded-full bg-ooc px-3 py-1 text-xs font-semibold text-ooc-ink">
            {tag}
          </span>
        )}
      </div>
      <div className="mt-4 leading-relaxed">{children}</div>
    </section>
  );
}

function Step({ n, title, children }: { n: number; title: string; children: ReactNode }) {
  return (
    <li className="flex gap-4 rounded-lg border border-rule bg-surface p-5">
      <span
        aria-hidden="true"
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ink font-bold text-ground"
      >
        {n}
      </span>
      <div>
        <h3 className="font-semibold">
          <span className="sr-only">Step {n}: </span>
          {title}
        </h3>
        <div className="mt-1 text-ink-muted">{children}</div>
      </div>
    </li>
  );
}

/** A real link, or — while the URL is still unknown — a clearly disabled placeholder. */
function ActionLink({ href, children }: { href: string | null; children: ReactNode }) {
  if (!href) {
    return (
      <span className="mt-3 flex w-fit items-center gap-2 rounded-md border border-dashed border-rule px-4 py-2 text-sm text-ink-muted">
        {children}
        <span className="font-semibold">· link coming soon</span>
      </span>
    );
  }
  return (
    <a
      href={href}
      className="ooc mt-3 flex w-fit items-center gap-2 rounded-md px-4 py-2 text-sm font-semibold"
      rel="noopener"
    >
      {children}
      <span aria-hidden="true">→</span>
    </a>
  );
}
