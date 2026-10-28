import type { ReactNode } from 'react';
import { FICTION_NOTICE } from '~/components/shared/OocStrip';
import { FAQ, GAME_LD } from '~/content/game';
import { metaFor } from '~/meta';
import { PLAY_LINKS } from '~/play-links';

export const meta = () => [
  ...metaFor('/play'),
  {
    'script:ld+json': [
      GAME_LD,
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
        this in America. No real clubs, and it plays in your browser or on Android.
      </p>
      <p className="mt-6 text-lg leading-relaxed">
        This website is satire. PEFA™ is the villain of <strong>Superior League 2036</strong>, a
        football management game set after a fictional private equity fund dissolved the sport and
        rebuilt it as a subscription product. You take charge of a club in its closed league and try
        to win anyway.
      </p>
      <p className="mt-6 flex w-fit items-center gap-2 rounded-full bg-ooc px-3 py-1 text-xs font-semibold text-ooc-ink">
        New · Now live on Google Play
      </p>
      <div className="flex flex-wrap gap-x-3">
        <ActionLink href={PLAY_LINKS.web}>
          Play the free football manager game in your browser
        </ActionLink>
        <ActionLink href={PLAY_LINKS.android}>Get the Android app on Google Play</ActionLink>
      </div>

      <Section title="Watch the trailer">
        {/* The trailer is a self-contained page in public/ (fonts, art and
            score inlined), so it sends nothing and needs no video host. It
            lays itself out from its frame, so the 9:16 box on phones gets
            its portrait cut. */}
        <figure id="trailer">
          <div className="mx-auto aspect-[9/16] w-full max-w-sm overflow-hidden rounded-lg border border-rule bg-black sm:aspect-video sm:max-w-none">
            <iframe
              src="/trailer.html"
              title="Superior League 2036 trailer"
              allow="autoplay; fullscreen"
              allowFullScreen
              className="h-full w-full border-0"
            />
          </div>
          <figcaption className="mt-3 text-sm text-ink-muted">
            75 seconds, with sound. Press play inside the frame. The clubs and cards in it are the
            game’s own.
          </figcaption>
        </figure>
      </Section>

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
            and 32 more.
          </li>
          <li>
            <strong>Every club is invented.</strong> 30 clubs in the league’s world, each with a
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

      <Section title="On Android" tag="Now live on Google Play">
        <p>
          The Android app is out on Google Play. It is free, and anyone can install it from the
          store page, no test sign-up needed.
        </p>
        <ActionLink href={PLAY_LINKS.android}>Get it on Google Play</ActionLink>
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

function ActionLink({ href, children }: { href: string; children: ReactNode }) {
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
