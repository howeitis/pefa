import { decrees, domestic, lore } from '~/canon';
import { FilingDocument, FilingPage, FilingSection } from '~/components/filing/FilingPage';
import { Footnote } from '~/components/filing/Footnote';
import { metaFor } from '~/meta';

export const meta = () => metaFor('/governance');

const governance = lore.prospectus.sections.find((s) => s.heading === 'Governance')!;
const globalGame = lore.prospectus.sections.find((s) => s.heading === 'The Global Game')!;

/** Register numbers are site canon (`decree-register`): D-01 to D-32, in the game's order. */
const ref = (i: number) => `D-${String(i + 1).padStart(2, '0')}`;

const SECTIONS = [
  { id: 'committee', heading: 'The Global Inclusion Committee' },
  { id: 'decrees', heading: 'The Rules Committee and the decree register' },
  { id: 'officiating', heading: 'Officiating and compliance' },
  { id: 'litigation', heading: 'Legacy supporter-trust proceedings' },
  { id: 'trademark', heading: 'Trademark review' },
  { id: 'settlement', heading: 'The domestic settlement' },
];

export default function Governance() {
  const n = (id: string) => `${SECTIONS.findIndex((s) => s.id === id) + 1}.`;
  const h = (id: string) => SECTIONS.find((s) => s.id === id)!.heading;
  return (
    <FilingPage>
      <FilingDocument
        issuer="PEFA™ · Governance"
        reference="GOV-2036"
        title="Governance"
        subtitle="How the Superior League is run, and by whom, where disclosed."
      >
        <nav aria-label="Contents">
          <p className="smallcaps text-ink-muted">Contents</p>
          <ol className="mt-3 grid gap-x-8 gap-y-1 text-sm sm:grid-cols-2">
            {SECTIONS.map((s, i) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className="hover:text-accent">
                  <span className="figures text-ink-muted">{i + 1}.</span> {s.heading}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <FilingSection id="committee" number={n('committee')} heading={h('committee')}>
          <p>{globalGame.body[1]}</p>
          <p>{globalGame.body[2]}</p>
          <p>
            Minutes of the Committee’s meetings will be filed with Investor Relations. Its reasoning
            will not.
          </p>
        </FilingSection>

        <FilingSection id="decrees" number={n('decrees')} heading={h('decrees')}>
          <p>
            Each summer the Rules Committee hands down the coming season’s decrees, in consultation
            with the broadcast partner and nobody else. Decrees apply league-wide for one season and
            lapse before the next draw. The register below lists every decree available to the
            Committee.
          </p>
          <ol className="mt-6 divide-y divide-rule border-y border-rule">
            {decrees.map((d, i) => (
              <li key={d.id} id={`decree-${d.id}`} className="scroll-mt-8 py-5">
                <div className="flex items-baseline gap-4">
                  <span className="smallcaps figures w-12 shrink-0 text-ink-muted">{ref(i)}</span>
                  <div>
                    <h3 className="flex items-center gap-2 font-display text-xl">
                      <span
                        aria-hidden="true"
                        className="h-2.5 w-2.5 shrink-0 rounded-full"
                        style={{ background: d.accent }}
                      />
                      {d.name}
                    </h3>
                    <p className="mt-1 font-semibold">{d.tagline}</p>
                    <p className="mt-2 text-ink-muted">{d.description}</p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </FilingSection>

        <FilingSection id="officiating" number={n('officiating')} heading={h('officiating')}>
          <p>
            Compliance officers stand in each technical area throughout every fixture, to ensure
            that instructions given to players are consistent with the club’s commercial
            obligations.
          </p>
          <p>
            Where the Algorithmic Offside decree is in force, offside is adjudicated by Clawed AI,
            which does not publish its reasoning. Appeals are reviewed by Clawed AI.
          </p>
        </FilingSection>

        <FilingSection id="litigation" number={n('litigation')} heading={h('litigation')}>
          <p>{governance.body[0]}</p>
        </FilingSection>

        <FilingSection id="trademark" number={n('trademark')} heading={h('trademark')}>
          <p>{governance.body[1]}</p>
          <p>
            Until the review concludes, PEFA™ will continue to use the word under licence from
            itself.
          </p>
        </FilingSection>

        <FilingSection id="settlement" number={n('settlement')} heading={h('settlement')}>
          <p>
            Under the settlement with the domestic associations, the associations surrendered their
            marks, and no club that stayed behind may be named on any Superior League surface.
            Players signed from those clubs are listed as coming from{' '}
            <span aria-hidden="true">{domestic.legacyClubName}</span>
            <span className="sr-only">a redacted club name</span>. On admission, club budgets,
            valuations and transfer fees were marked up 80% to reflect the new broadcast terms.
          </p>
          <p>
            The domestic competitions continue. PEFA™ lists them here for completeness, and wishes
            them well.
          </p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {domestic.leagues.map((l) => (
              <div key={l}>
                <h3 className="smallcaps text-navy">{l}</h3>
                <ul className="mt-2 text-sm text-ink-muted">
                  {(domestic.clubs as Record<string, string[]>)[l]!.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <Footnote>
            Clubs in the domestic competitions are independent of PEFA™ and are not party to the
            Superior League.
          </Footnote>
        </FilingSection>
      </FilingDocument>
    </FilingPage>
  );
}
