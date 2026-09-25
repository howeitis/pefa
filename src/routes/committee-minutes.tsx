import { FactList } from '~/components/filing/FactList';
import { FilingDocument, FilingPage, FilingSection } from '~/components/filing/FilingPage';
import { Footnote } from '~/components/filing/Footnote';
import { Stamp } from '~/components/filing/Stamp';
import { DisclosureProvider, Redactable } from '~/components/shared/Disclosure';
import { Redacted } from '~/components/shared/Redacted';
import { metaFor } from '~/meta';

export const meta = () => metaFor('/governance/committee-minutes');

/**
 * Minutes of the Global Inclusion Committee, spring session 2036. Site canon
 * (`committee-minutes`). Everything but "Any other business" is redacted; the
 * text under the bars is real and stays in the DOM for screen readers.
 */
const ITEMS: { heading: string; body: string }[] = [
  {
    heading: 'Minutes of the previous meeting',
    body: 'Approved without being read, as is customary.',
  },
  {
    heading: 'Applications to the Synergy Draft™ 2036',
    body: 'The Committee reviewed forty-one applications from clubs on every continent. The weighting was applied. Each application was discussed for as long as its subscription tier allowed.',
  },
  {
    heading: 'Review of the weighting',
    body: 'The Committee agreed that previous footballing success would remain in the weighting, where relevant, and that it would continue not to be relevant.',
  },
  {
    heading: 'Regional representation',
    body: 'No region was excluded. Several were less included. The Committee noted this with satisfaction.',
  },
  {
    heading: 'Publication of reasoning',
    body: 'The Committee resolved not to publish its reasoning. The reasoning for this resolution was not recorded.',
  },
];

/** Each request for disclosure redacts more of the one legible section. */
const DISCLOSURE_RESPONSES = [
  'Request received. The Committee has reviewed the minutes and adjusted them.',
  'Request received. The minutes have been brought further into line with practice.',
  'The minutes are now fully consistent with the Committee’s practice. Thank you for your interest.',
];

export default function CommitteeMinutes() {
  return (
    <FilingPage back={{ to: '/governance', label: 'Governance' }} width="max-w-4xl">
      <FilingDocument
        issuer="PEFA™ · Global Inclusion Committee"
        reference="GIC-2036/1"
        title="Minutes of the spring session, 2036"
        subtitle="The Committee meets twice annually and does not publish its reasoning."
        stamp={<Stamp>Redacted for publication</Stamp>}
      >
        <FactList
          rows={[
            { label: 'Held at', value: <Redacted>Luxembourg, 12 March 2036</Redacted> },
            { label: 'Chair', value: 'O. Adeyemi-Clarke' },
            {
              label: 'Members',
              value: <Redacted>Four members, whose names are not published</Redacted>,
            },
            { label: 'In attendance', value: 'Broadcast partner (observer)' },
            { label: 'Apologies', value: 'Supporter representative (post vacant)' },
          ]}
        />

        {ITEMS.map((item, i) => (
          <FilingSection key={item.heading} number={`${i + 1}.`} heading={item.heading}>
            <p className="leading-loose">
              <Redacted>{item.body}</Redacted>
            </p>
          </FilingSection>
        ))}

        <FilingSection number={`${ITEMS.length + 1}.`} heading="Any other business">
          <DisclosureProvider responses={DISCLOSURE_RESPONSES}>
            <div className="space-y-4 leading-loose">
              <p>
                <Redactable from={2}>
                  The Chair noted that the coffee machine in the Luxembourg office had been replaced
                  with a subscription model. The Committee approved the change unanimously. The
                  machine was not consulted.
                </Redactable>
              </p>
              <p>
                <Redactable from={1}>
                  A member asked whether the Committee’s minutes should be published. The Chair
                  confirmed that they would be, and that they now had been.
                </Redactable>
              </p>
              <p>
                <Redactable from={3}>
                  There being no further business, the meeting closed at
                </Redactable>{' '}
                <Redacted>the end of the broadcast window</Redacted>.
              </p>
            </div>
          </DisclosureProvider>
        </FilingSection>

        <div className="mt-12">
          <Footnote>
            Next meeting: autumn session, <Redacted>date to be determined by the draw</Redacted>.
            These minutes are an accurate record of what may be disclosed.
          </Footnote>
        </div>
      </FilingDocument>
    </FilingPage>
  );
}
