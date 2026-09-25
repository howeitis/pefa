import type { ReactNode } from 'react';
import { FICTION_NOTICE } from '~/components/shared/OocStrip';
import { metaFor } from '~/meta';
import { PLAY_LINKS } from '~/play-links';

export const meta = () => metaFor('/play');

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
      <p className="mt-6 text-lg leading-relaxed">
        This website is satire. PEFA™ is the villain of <strong>Superior League 2036</strong>, a
        football management game set after a fictional private equity fund dissolved the sport and
        rebuilt it as a subscription product. You take charge of a club in its closed league and try
        to win anyway.
      </p>

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
