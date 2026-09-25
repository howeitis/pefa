import { lore } from '~/canon';
import { FactList } from '~/components/filing/FactList';
import { FilingDocument, FilingPage, FilingSection } from '~/components/filing/FilingPage';
import { PullQuote } from '~/components/filing/PullQuote';
import { Stamp } from '~/components/filing/Stamp';
import { metaFor } from '~/meta';

export const meta = () => metaFor('/leadership');

const quote = lore.prospectus.sections.find((s) => s.quote)!.quote!;
const solution = lore.prospectus.sections.find((s) => s.heading === 'The Solution')!;

// Phase 2 carries only what the game has established about the President.
// The biography and the Board are Phase 3 new canon (PLAN.md §2.3).
export default function Leadership() {
  return (
    <FilingPage>
      <FilingDocument
        issuer="PEFA™ · Leadership"
        reference="LDR-2036"
        title="Leadership"
        subtitle="The officers of Private Equity Football Accelerate™."
      >
        <FilingSection number="1." heading="The President">
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
              <p className="mt-4">{solution.body[1]}</p>
            </div>
          </div>
          <PullQuote text={quote.text} attribution={quote.attribution} />
          <FactList
            rows={[
              { label: 'Office', value: 'President, since incorporation' },
              { label: 'Seat', value: 'Luxembourg' },
              { label: 'Launch address', value: 'Delivered from a data center in Dublin' },
              { label: 'Biography', value: 'Pending filing' },
            ]}
          />
        </FilingSection>

        <FilingSection number="2." heading="The Board">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p>
              Appointments to the Board are pending regulatory filing. They will be published when
              it is commercially appropriate to do so.
            </p>
            <Stamp className="shrink-0">Pending</Stamp>
          </div>
        </FilingSection>
      </FilingDocument>
    </FilingPage>
  );
}
