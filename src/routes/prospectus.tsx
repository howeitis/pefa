import { lore } from '~/canon';
import { FilingDocument, FilingPage, FilingSection } from '~/components/filing/FilingPage';
import { Footnote } from '~/components/filing/Footnote';
import { PullQuote } from '~/components/filing/PullQuote';
import { Stamp } from '~/components/filing/Stamp';
import { metaFor } from '~/meta';

export const meta = () => metaFor('/investors/prospectus');

const slug = (s: string) => s.toLowerCase().replace(/[^a-z]+/g, '-');

/** The Official Media Kit, 2035: the game's prospectus text, in full and in order. */
export default function Prospectus() {
  const { prospectus, splash } = lore;
  return (
    <FilingPage back={{ to: '/investors', label: 'Investor Relations' }} width="max-w-4xl">
      <FilingDocument
        issuer="PEFA™ · Official Media Kit"
        reference="MK-2035"
        title={prospectus.title}
        subtitle={prospectus.subtitle}
        stamp={<Stamp>{prospectus.confidentiality}</Stamp>}
      >
        <nav aria-label="Contents" className="mb-12">
          <p className="smallcaps text-ink-muted">Contents</p>
          <ol className="mt-3 grid gap-x-8 gap-y-1 text-sm sm:grid-cols-2">
            {prospectus.sections.map((s, i) => (
              <li key={s.heading}>
                <a href={`#${slug(s.heading)}`} className="hover:text-accent">
                  <span className="figures text-ink-muted">{i + 1}.</span> {s.heading}
                </a>
              </li>
            ))}
            <li>
              <a href="#appendix-a" className="hover:text-accent">
                <span className="text-ink-muted">A.</span> Partner onboarding notice
              </a>
            </li>
          </ol>
        </nav>

        {prospectus.sections.map((s, i) => (
          <FilingSection
            key={s.heading}
            id={slug(s.heading)}
            number={`${i + 1}.`}
            heading={s.heading}
          >
            {s.body.map((p, j) => (
              // The one-line kicker paragraphs ("Football's biggest problem was football.") land harder set large.
              <p key={j} className={p.length < 60 ? 'font-display text-2xl' : ''}>
                {p}
              </p>
            ))}
            {s.bullets && (
              <ul className="grid gap-x-8 gap-y-2 sm:grid-cols-2">
                {s.bullets.map((b) => (
                  <li key={b} className="flex gap-3">
                    <span aria-hidden="true" className="text-accent">
                      ■
                    </span>
                    {b}
                  </li>
                ))}
              </ul>
            )}
            {s.quote && <PullQuote text={s.quote.text} attribution={s.quote.attribution} />}
            {s.footnote && <Footnote>{s.footnote}</Footnote>}
          </FilingSection>
        ))}

        <FilingSection id="appendix-a" number="A." heading="Partner onboarding notice">
          <p className="smallcaps text-ink-muted">{splash.kicker}</p>
          <p className="font-display text-2xl">{splash.headline}</p>
          {splash.body.map((p) => (
            <p key={p}>{p}</p>
          ))}
          <p className="font-display text-xl">
            {splash.punchline[0]} {splash.punchline[1]}
          </p>
          <p>{splash.welcome.join(' ')}</p>
          <Footnote>{splash.disclaimer}</Footnote>
        </FilingSection>

        <p className="mt-12 border-t-2 border-ink pt-4 text-xs leading-relaxed text-ink-muted">
          {prospectus.footer}
        </p>
      </FilingDocument>
    </FilingPage>
  );
}
