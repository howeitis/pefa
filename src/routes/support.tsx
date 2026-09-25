import type { ReactNode } from 'react';
import { Link } from 'react-router';
import { FilingDocument, FilingPage, FilingSection } from '~/components/filing/FilingPage';
import { SupporterFeedback } from '~/components/filing/SupporterFeedback';
import { metaFor } from '~/meta';

export const meta = () => metaFor('/support');

/** Site canon (`supporter-services`). */
const FAQ: { q: string; a: ReactNode }[] = [
  {
    q: 'Has my club been relegated?',
    a: 'No. It was not invited.',
  },
  {
    q: 'Can I still watch my old club?',
    a: 'Yes. The domestic competitions continue, and PEFA wishes them well. They are not shown on Superior League surfaces, and their clubs are not named here.',
  },
  {
    q: 'Why can’t you name the club a player came from?',
    a: (
      <>
        Under the settlement with the domestic associations, no club that stayed behind may be named
        on a Superior League surface. See{' '}
        <Link to="/governance#settlement" className="underline underline-offset-4">
          Governance
        </Link>
        .
      </>
    ),
  },
  {
    q: 'Are the results scripted?',
    a: 'No. Results remain unscripted. Revenue does not.',
  },
  {
    q: 'Why is the away end so loud?',
    a: 'Where the Synthetic Away End decree is in force, away support is generated, tireless, and worth +2 strength to the visitors. It never needs a train home.',
  },
  {
    q: 'Who decided that offside?',
    a: 'Where the Algorithmic Offside decree is in force, Clawed AI. It does not publish its reasoning. Appeals are reviewed by Clawed AI.',
  },
  {
    q: 'How do I become a shareholder?',
    a: 'Supporters are not shareholders. Please do not confuse the two.',
  },
  {
    q: 'Can I cancel my subscription?',
    a: 'Yes. Cancellation is available as a premium feature.',
  },
  {
    q: 'Who chooses the Synergy Draft™ clubs?',
    a: (
      <>
        An algorithmic lottery weighted by subscription tier, market size, brand compatibility and
        broadcast reach, assessed by the Global Inclusion Committee. The Committee does not publish
        its reasoning, but it does publish its{' '}
        <Link to="/governance/committee-minutes" className="underline underline-offset-4">
          minutes
        </Link>
        .
      </>
    ),
  },
  {
    q: 'Is “football” still called football?',
    a: 'For now. The word is subject to ongoing trademark review.',
  },
];

export default function Support() {
  return (
    <FilingPage width="max-w-4xl">
      <FilingDocument
        issuer="PEFA™ · Supporter Services"
        reference="SUP-2036"
        title="Supporter Services"
        subtitle="Every message is received, valued and answered."
      >
        <FilingSection number="1." heading="Frequently asked questions">
          <div className="divide-y divide-rule border-y border-rule">
            {FAQ.map((f) => (
              <details key={f.q} className="group py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold marker:hidden">
                  {f.q}
                  <span
                    aria-hidden="true"
                    className="text-accent transition-transform group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-3 text-ink-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </FilingSection>

        <FilingSection number="2." heading="Supporter feedback">
          <p>Tell us what you think. Your feedback shapes the Superior League, within tolerance.</p>
          <SupporterFeedback />
        </FilingSection>
      </FilingDocument>
    </FilingPage>
  );
}
