import { lore } from '~/canon';
import { FilingDocument, FilingPage, FilingSection } from '~/components/filing/FilingPage';
import { Footnote } from '~/components/filing/Footnote';
import { PullQuote } from '~/components/filing/PullQuote';
import { Redacted } from '~/components/shared/Redacted';
import { BIO, BOARD, BOARD_OBSERVERS, LETTER } from '~/content/leadership';
import { metaFor } from '~/meta';

export const meta = () => metaFor('/leadership');

const quote = lore.prospectus.sections.find((s) => s.quote)!.quote!;

const initials = (name: string) =>
  name
    .replace(/^Dr /, '')
    .split(/[\s-]+/)
    .map((w) => w[0])
    .slice(0, 2)
    .join('');

export default function Leadership() {
  return (
    <FilingPage>
      <FilingDocument
        issuer="PEFA™ · Leadership"
        reference="LDR-2036"
        title="Leadership"
        subtitle="The officers of Private Equity Football Accelerate™."
      >
        <nav aria-label="Contents">
          <ol className="flex flex-wrap gap-x-6 gap-y-1 text-sm">
            <li>
              <a href="#letter" className="hover:text-accent">
                1. {LETTER.title}
              </a>
            </li>
            <li>
              <a href="#president" className="hover:text-accent">
                2. The President
              </a>
            </li>
            <li>
              <a href="#board" className="hover:text-accent">
                3. The Board
              </a>
            </li>
          </ol>
        </nav>

        <FilingSection id="letter" number="1." heading={LETTER.title}>
          <div className="max-w-2xl space-y-4 font-display text-lg leading-relaxed">
            <p>{LETTER.salutation}</p>
            {LETTER.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
            <p className="pt-2">{LETTER.signOff}</p>
            <p>
              <span className="block text-2xl italic">{LETTER.signature}</span>
              <span className="smallcaps font-sans text-ink-muted">{LETTER.role}</span>
            </p>
          </div>
        </FilingSection>

        <FilingSection id="president" number="2." heading="The President">
          <div className="grid gap-8 sm:grid-cols-[9rem_1fr]">
            <div
              aria-hidden="true"
              className="flex h-36 w-36 items-center justify-center border border-rule bg-navy font-display text-5xl text-parchment"
            >
              GI
            </div>
            <div>
              <h3 className="font-display text-3xl">Giacomo Infamtino</h3>
              <p className="smallcaps mt-2 text-accent">President</p>
              <p className="mt-4">{BIO.summary}</p>
            </div>
          </div>
          <ol className="mt-8 border-l-2 border-rule">
            {BIO.timeline.map((t) => (
              <li key={t.when} className="relative pb-5 pl-6 last:pb-0">
                <span
                  aria-hidden="true"
                  className="absolute -left-[5px] top-2 h-2 w-2 rounded-full bg-accent"
                />
                <p className="smallcaps figures text-navy">{t.when}</p>
                <p className="mt-1">{t.what}</p>
              </li>
            ))}
          </ol>
          <PullQuote text={quote.text} attribution={quote.attribution} />
          <p className="italic text-ink-muted">{BIO.personal}</p>
        </FilingSection>

        <FilingSection id="board" number="3." heading="The Board">
          <ul className="grid gap-px border border-rule bg-rule sm:grid-cols-2">
            {BOARD.map((m) => (
              <li key={m.name} className="bg-surface p-6">
                <div className="flex items-center gap-4">
                  <span
                    aria-hidden="true"
                    className="flex h-12 w-12 shrink-0 items-center justify-center bg-surface-2 font-display text-lg text-navy"
                  >
                    {initials(m.name)}
                  </span>
                  <div>
                    <h3 className="font-display text-xl leading-tight">{m.name}</h3>
                    <p className="smallcaps mt-1 text-accent">{m.title}</p>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-ink-muted">
                  {m.redacted ? <Redacted>{m.bio}</Redacted> : m.bio}
                </p>
              </li>
            ))}
          </ul>
          <dl className="mt-6 grid gap-2 text-sm sm:grid-cols-2">
            {BOARD_OBSERVERS.map((o) => (
              <div key={o.seat} className="flex gap-2">
                <dt className="font-semibold">{o.seat}:</dt>
                <dd className="text-ink-muted">{o.note}</dd>
              </div>
            ))}
          </dl>
          <Footnote>
            All Board members are appointed by the President, on the recommendation of the
            President.
          </Footnote>
        </FilingSection>
      </FilingDocument>
    </FilingPage>
  );
}
